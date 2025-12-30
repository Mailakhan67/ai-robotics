import google.generativeai as genai
from typing import List, Dict
from app.config import settings


class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.gemini_api_key)
        self.embedding_model = settings.embedding_model
        self.chat_model = settings.chat_model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text"""
        response = genai.embed_content(
            model=self.embedding_model,
            content=text
        )
        if isinstance(response, dict) and "embedding" in response:
            return response["embedding"]
        elif hasattr(response, '__getitem__'):
            return response["embedding"]
        else:
            raise ValueError("Could not extract embedding from response")

    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Get embeddings for multiple texts"""
        # Gemini's embed_content can handle a list of strings directly
        response = genai.embed_content(
            model=self.embedding_model,
            content=texts
        )
        # The response structure is a dictionary with 'embedding' key containing a list of embeddings
        if isinstance(response, dict) and "embedding" in response:
            return response["embedding"]
        elif hasattr(response, '__getitem__'):
            return response["embedding"]
        else:
            raise ValueError("Could not extract embeddings from response")

    def chat_completion(
        self,
        user_message: str,
        context: str,
        selected_text: str = None
    ) -> str:
        """Generate chat completion with RAG context using Gemini"""

        # Gemini typically integrates system messages into the initial user prompt
        # or as part of the model's setup if it supports distinct system roles.
        # For this setup, we'll construct a prompt that includes the system instructions
        # and context for the user's question.

        prompt_parts = []

        if selected_text:
            prompt_parts.append(f"""You are a helpful AI assistant for a Physical AI & Humanoid Robotics course.
The user has selected specific text from the course material and is asking a question about it.

Selected Text:
{selected_text}

Relevant Context from the Course:
{context}

Answer the user's question based on the selected text and the provided context. Be specific and reference the selected text when relevant.

User's Question: {user_message}""")
        else:
            prompt_parts.append(f"""You are a helpful AI assistant for a Physical AI & Humanoid Robotics course.
You have access to the course material and should answer questions based on that content.

Relevant Context from the Course:
{context}

Answer the user's question using the provided context. If the answer isn't in the context, say so politely and offer to help with related topics that are covered in the course.

User's Question: {user_message}""")

        model = genai.GenerativeModel(self.chat_model)
        
        # generate_content expects a list of parts or a single string
        response = model.generate_content(
            prompt_parts,
            generation_config=genai.GenerationConfig(
                temperature=0.7,
                max_output_tokens=1000
            )
        )

        return response.text

    def health_check(self) -> bool:
        """Check if Gemini API is accessible"""
        try:
            # Attempt to list models as a health check
            # genai.list_models()
            # A simpler check might be to just try to access the model
            # For a more robust check, one might try a simple generate_content call
            model = genai.GenerativeModel(self.chat_model)
            model.count_tokens("hello") # A light-weight operation to check connectivity
            return True
        except Exception as e:
            print(f"Gemini health check failed: {e}")
            return False
