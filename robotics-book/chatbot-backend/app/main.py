




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.config import settings
# from app.database import init_db
# from app.routers import chat, admin

# app = FastAPI(
#     title="Robotics Book RAG Chatbot API",
#     description="Retrieval-Augmented Generation chatbot for Physical AI & Humanoid Robotics course",
#     version="1.0.0"
# )

# # CORS configuration
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=settings.cors_origins_list,
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )




# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",
#         "http://localhost:3001",
#         # "https://docusaurus-robotics-book-production.up.railway.app"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )



# # Initialize database
# init_db()

# # Include routers
# app.include_router(chat.router, prefix="/api", tags=["Chat"])
# app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])


# @app.get("/")
# async def root():
#     return {
#         "message": "Robotics Book RAG Chatbot API",
#         "docs": "/docs",
#         "health": "/api/admin/health"
#     }


# @app.on_event("startup")
# async def startup_event():
#     print("Starting Robotics Book RAG Chatbot API...")
#     print(f"CORS Origins: {settings.cors_origins_list}")


































# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.config import settings
# from app.database import init_db
# from app.routers import chat, admin
# from app.auth.routers import router as auth_router
# # Import auth models to register them with SQLAlchemy
# from app.auth import models

# app = FastAPI(
#     title="Robotics Book RAG Chatbot API",
#     description="Retrieval-Augmented Generation chatbot for Physical AI & Humanoid Robotics course",
#     version="1.0.0"
# )

# # CORS configuration
# # Allowed origins: local dev + Vercel frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",
#         "http://localhost:3001",
#         "https://ai-robotics-zuez.vercel.app",  # Vercel frontend
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Initialize database
# init_db()

# # Include routers
# app.include_router(chat.router, prefix="/api", tags=["Chat"])
# app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
# app.include_router(auth_router)

# @app.get("/")
# async def root():
#     return {
#         "message": "Robotics Book RAG Chatbot API",
#         "docs": "/docs",
#         "health": "/api/admin/health"
#     }

# @app.on_event("startup")
# async def startup_event():
#     print("Starting Robotics Book RAG Chatbot API...")
#     print(f"CORS Origins: {settings.cors_origins_list}")




























from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.routers import chat, admin
from app.auth.routers import router as auth_router

# Import auth models to register them with SQLAlchemy Base before initializing DB
import app.auth.models

app = FastAPI(
    title="Robotics Book RAG Chatbot API",
    description="Retrieval-Augmented Generation chatbot for Physical AI & Humanoid Robotics course",
    version="1.0.0",
)

# ✅ CORS CONFIG — FIXED
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "https://ai-robotics-seven.vercel.app",  # ✅ correct Vercel URL
        "http://localhost:3002",  # Additional common port
        "http://127.0.0.1:3002",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables
try:
    init_db()
    print("✅ Database tables initialized successfully")
except Exception as e:
    print(f"❌ Error initializing database: {e}")

# Routers
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

@app.get("/")
async def root():
    return {
        "message": "Robotics Book RAG Chatbot API",
        "docs": "/docs",
        "health": "/api/admin/health",
    }

@app.on_event("startup")
async def startup_event():
    print("🚀 Starting Robotics Book RAG Chatbot API...")
