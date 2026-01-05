from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from app.auth.dependencies import get_current_user
from app.auth.models import User
import google.generativeai as genai
import os
from app.config import settings

router = APIRouter()

class TranslationRequest(BaseModel):
    content: str
    target_language: str
    source_language: Optional[str] = "en"

class TranslationResponse(BaseModel):
    translated_content: str
    source_language: str
    target_language: str

@router.post("/translate", response_model=TranslationResponse)
async def translate_content(
    request: TranslationRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Translate content from one language to another using Google Gemini
    """
    try:
        # Configure the API key
        genai.configure(api_key=settings.google_api_key)
        
        # Select the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt for translation
        prompt = f"""
        Translate the following content to {request.target_language}. 
        Preserve the markdown formatting and structure.
        
        Content to translate:
        {request.content}
        
        Translation:
        """
        
        # Generate the translation
        response = model.generate_content(prompt)
        
        translated_content = response.text.strip()
        
        return TranslationResponse(
            translated_content=translated_content,
            source_language=request.source_language,
            target_language=request.target_language
        )
        
    except Exception as e:
        print(f"Translation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

# Mock translation for development without API key
@router.post("/translate-mock", response_model=TranslationResponse)
async def translate_content_mock(
    request: TranslationRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Mock translation endpoint for development
    """
    # In a real implementation, this would connect to a translation service
    # For now, we'll return the original content with some mock translation indicators
    mock_translated = f"[{request.target_language.upper()} MOCK TRANSLATION] {request.content}"
    
    return TranslationResponse(
        translated_content=mock_translated,
        source_language=request.source_language,
        target_language=request.target_language
    )