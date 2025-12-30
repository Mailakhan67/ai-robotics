from pydantic_settings import BaseSettings
from typing import List
from typing import List, Optional


# class Settings(BaseSettings):
#     # OpenAI
#     openai_api_key: str
#     embedding_model: str = "text-embedding-3-small"
#     chat_model: str = "gpt-4o-mini"

#     # Qdrant
#     qdrant_url: str
#     qdrant_api_key: str
#     qdrant_collection_name: str = "robotics_book"

#     # Neon Postgres
#     database_url: str

#     # API
#     api_host: str = "0.0.0.0"
#     api_port: int = 8000
#     cors_origins: str = "http://localhost:3000,https://wasia93.github.io"

#     @property
#     def cors_origins_list(self) -> List[str]:
#         return [origin.strip() for origin in self.cors_origins.split(",")]

#     class Config:
#         env_file = ".env"
#         case_sensitive = False


# settings = Settings()















# from pydantic_settings import BaseSettings
# from typing import List, Optional


# class Settings(BaseSettings):
#     # Gemini
#     gemini_api_key: str
#     gemini_model: str = "gemini-2.5-flash"
#     embedding_model: str = "models/text-embedding-004"
#     chat_model: str = "gemini-2.5-flash"

#     # Qdrant
#     qdrant_url: str
#     qdrant_api_key: str
#     qdrant_collection_name: str = "robotics_book"

#     # Neon Postgres
#     database_url: str

#     # Auth
#     secret_key: str = "your-secret-key-here"  # Should be set in .env
#     algorithm: str = "HS256"
#     access_token_expire_minutes: int = 30

#     # API
#     api_host: str = "0.0.0.0"
#     api_port: int = 8000
#     cors_origins: str = "http://localhost:3000,http://localhost:3001,https://ai-robotics-zuez.vercel.app,http://localhost:3002"

#     @property
#     def cors_origins_list(self) -> List[str]:
#         return [origin.strip() for origin in self.cors_origins.split(",")]

#     class Config:
#         env_file = ".env"
#         case_sensitive = False

# settings = Settings()












































from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    # OpenRouter
    openrouter_api_key: str
    openrouter_model: str = "mistralai/mistral-7b-instruct"  # Free model available on OpenRouter
    embedding_model: str = "nomic-ai/nomic-embed-text-v1.5"  # Available embedding model on OpenRouter
    chat_model: str = "mistralai/mistral-7b-instruct"  # Free model available on OpenRouter

    # Qdrant
    qdrant_url: str
    qdrant_api_key: str
    qdrant_collection_name: str = "hackthon-ai"  # <- updated collection name

    # Neon Postgres
    database_url: str

    # Auth
    secret_key: str = "your-secret-key-here"  # Should be set in .env
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_origins: str = "http://localhost:3000,http://localhost:3001,https://ai-robotics-seven.vercel.app,http://localhost:3002"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

















