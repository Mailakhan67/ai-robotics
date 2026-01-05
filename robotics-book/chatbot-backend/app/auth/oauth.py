from fastapi import APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from sqlalchemy.orm import Session
from datetime import timedelta
import httpx

from app.config import settings
from app.database import get_db
from app.auth.models import User
from app.auth.crud import get_user_by_email, create_user
from app.auth.schemas import UserCreate
from app.auth.utils import create_access_token
from fastapi import Depends

router = APIRouter(tags=["OAuth"])


@router.get("/google/login")
async def google_login():
    """
    Redirect user to Google OAuth login page
    """
    if not settings.google_client_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth not configured"
        )

    # Google OAuth URL
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={settings.google_client_id}"
        f"&redirect_uri={settings.google_redirect_uri}"
        "&response_type=code"
        "&scope=openid email profile"
        "&access_type=offline"
        "&prompt=consent"
    )

    return RedirectResponse(url=google_auth_url)


@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    """
    Handle Google OAuth callback
    """
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth not configured"
        )

    try:
        # Exchange authorization code for access token
        async with httpx.AsyncClient() as client:
            token_response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": code,
                    "client_id": settings.google_client_id,
                    "client_secret": settings.google_client_secret,
                    "redirect_uri": settings.google_redirect_uri,
                    "grant_type": "authorization_code",
                }
            )

            if token_response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to get access token from Google"
                )

            token_data = token_response.json()
            id_token_str = token_data.get("id_token")

            if not id_token_str:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No ID token received from Google"
                )

            # Verify and decode ID token
            idinfo = id_token.verify_oauth2_token(
                id_token_str,
                google_requests.Request(),
                settings.google_client_id
            )

            # Extract user info
            email = idinfo.get("email")
            full_name = idinfo.get("name", "")

            if not email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email not provided by Google"
                )

            # Check if user exists
            user = get_user_by_email(db, email)

            if not user:
                # Create new user
                user_create = UserCreate(
                    email=email,
                    full_name=full_name,
                    password="",  # No password for OAuth users
                    software_background="Beginner",
                    hardware_background="None",
                    purpose_of_learning="Student"
                )
                user = create_user(db, user_create)

            # Create access token
            access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
            access_token = create_access_token(
                data={"sub": user.email}, expires_delta=access_token_expires
            )

            # Redirect to frontend with token
            frontend_url = "http://localhost:3000"
            redirect_url = f"{frontend_url}/auth/callback?token={access_token}&user={user.id}"

            return RedirectResponse(url=redirect_url)

    except Exception as e:
        print(f"OAuth error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OAuth authentication failed: {str(e)}"
        )


@router.get("/github/login")
async def github_login():
    """
    Redirect user to GitHub OAuth login page
    """
    if not settings.github_oauth_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth not configured"
        )

    # GitHub OAuth URL
    github_auth_url = (
        "https://github.com/login/oauth/authorize"
        f"?client_id={settings.github_oauth_id}"
        f"&redirect_uri={settings.github_redirect_uri}"
        "&scope=read:user user:email"
    )

    return RedirectResponse(url=github_auth_url)


@router.get("/github/callback")
async def github_callback(code: str, db: Session = Depends(get_db)):
    """
    Handle GitHub OAuth callback
    """
    if not settings.github_oauth_id or not settings.github_oauth_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GitHub OAuth not configured"
        )

    try:
        # Exchange authorization code for access token
        async with httpx.AsyncClient() as client:
            # Get access token from GitHub
            token_response = await client.post(
                "https://github.com/login/oauth/access_token",
                data={
                    "client_id": settings.github_oauth_id,
                    "client_secret": settings.github_oauth_secret,
                    "code": code,
                    "redirect_uri": settings.github_redirect_uri,
                },
                headers={"Accept": "application/json"}
            )

            if token_response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to get access token from GitHub"
                )

            token_data = token_response.json()
            access_token = token_data.get("access_token")

            if not access_token:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="No access token received from GitHub"
                )

            # Get user info from GitHub
            user_response = await client.get(
                "https://api.github.com/user",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/json"
                }
            )

            if user_response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to get user info from GitHub"
                )

            github_user = user_response.json()

            # Get user email (might need separate API call)
            email = github_user.get("email")

            # If email is null, fetch from emails endpoint
            if not email:
                emails_response = await client.get(
                    "https://api.github.com/user/emails",
                    headers={
                        "Authorization": f"Bearer {access_token}",
                        "Accept": "application/json"
                    }
                )

                if emails_response.status_code == 200:
                    emails = emails_response.json()
                    # Get primary email
                    for email_obj in emails:
                        if email_obj.get("primary"):
                            email = email_obj.get("email")
                            break

                    # If no primary, get first verified email
                    if not email:
                        for email_obj in emails:
                            if email_obj.get("verified"):
                                email = email_obj.get("email")
                                break

            if not email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email not provided by GitHub"
                )

            full_name = github_user.get("name") or github_user.get("login", "")

            # Check if user exists
            user = get_user_by_email(db, email)

            if not user:
                # Create new user
                user_create = UserCreate(
                    email=email,
                    full_name=full_name,
                    password="",  # No password for OAuth users
                    software_background="Beginner",
                    hardware_background="None",
                    purpose_of_learning="Student"
                )
                user = create_user(db, user_create)

            # Create access token
            access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
            jwt_token = create_access_token(
                data={"sub": user.email}, expires_delta=access_token_expires
            )

            # Redirect to frontend with token
            frontend_url = "http://localhost:3000"
            redirect_url = f"{frontend_url}/auth/callback?token={jwt_token}&user={user.id}"

            return RedirectResponse(url=redirect_url)

    except Exception as e:
        print(f"GitHub OAuth error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"GitHub OAuth authentication failed: {str(e)}"
        )
