import openai
from typing import List, Dict
from app.config import settings


class OpenRouterService:
    def __init__(self):
        openai.api_key = settings.openrouter_api_key
        openai.base_url = "https://openrouter.ai/api/v1/"
        self.chat_model = settings.chat_model
        # Using OpenAI compatible embedding model
        self.embedding_model = settings.embedding_model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a text using OpenAI compatible API"""
        try:
            response = openai.embeddings.create(
                model=self.embedding_model,
                input=text
            )
            # Handle response based on the actual structure returned
            if hasattr(response, 'data') and len(response.data) > 0:
                if hasattr(response.data[0], 'embedding'):
                    return response.data[0].embedding
                elif isinstance(response.data[0], dict) and 'embedding' in response.data[0]:
                    return response.data[0]['embedding']
            raise ValueError("Could not extract embedding from response")
        except Exception as e:
            # Log the error for debugging
            print(f"Embedding error: {str(e)}")
            # Check if the error is related to the API key or connection
            error_msg = str(e).lower()
            if 'api' in error_msg or 'key' in error_msg or 'auth' in error_msg or '401' in error_msg or '403' in error_msg:
                # If it's an API key issue, return a specific error
                raise ValueError(f"API authentication error: {str(e)}")
            elif 'str' in error_msg and 'data' in error_msg:
                # This indicates the API returned HTML instead of JSON
                raise ValueError("Invalid API response format - check your API key and model name")
            else:
                # For other errors, raise as is
                raise e

    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Get embeddings for multiple texts"""
        try:
            response = openai.embeddings.create(
                model=self.embedding_model,
                input=texts
            )
            # Handle response based on the actual structure returned
            if hasattr(response, 'data'):
                embeddings = []
                for item in response.data:
                    if hasattr(item, 'embedding'):
                        embeddings.append(item.embedding)
                    elif isinstance(item, dict) and 'embedding' in item:
                        embeddings.append(item['embedding'])
                    else:
                        raise ValueError("Could not extract embedding from response item")
                return embeddings
            raise ValueError("Could not extract embeddings from response")
        except Exception as e:
            # Log the error for debugging
            print(f"Embeddings error: {str(e)}")
            # Check if the error is related to the API key or connection
            error_msg = str(e).lower()
            if 'api' in error_msg or 'key' in error_msg or 'auth' in error_msg or '401' in error_msg or '403' in error_msg:
                # If it's an API key issue, return a specific error
                raise ValueError(f"API authentication error: {str(e)}")
            elif 'str' in error_msg and 'data' in error_msg:
                # This indicates the API returned HTML instead of JSON
                raise ValueError("Invalid API response format - check your API key and model name")
            else:
                # For other errors, raise as is
                raise e

    def chat_completion(
        self,
        user_message: str,
        context: str,
        selected_text: str = None
    ) -> str:
        """Generate chat completion with RAG context using OpenRouter"""

        if selected_text:
            system_message = f"""You are a helpful AI assistant for a Physical AI & Humanoid Robotics course.
The user has selected specific text from the course material and is asking a question about it.

Selected Text:
{selected_text}

Relevant Context from the Course:
{context}

Answer the user's question based on the selected text and the provided context. Be specific and reference the selected text when relevant."""
        else:
            system_message = f"""You are a helpful AI assistant for a Physical AI & Humanoid Robotics course.
You have access to the course material and should answer questions based on that content.

Relevant Context from the Course:
{context}

Answer the user's question using the provided context. If the answer isn't in the context, say so politely and offer to help with related topics that are covered in the course."""

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ]

        try:
            response = openai.chat.completions.create(
                model=self.chat_model,
                messages=messages,
                temperature=0.7,
                max_tokens=1000
            )

            # Handle response based on the actual structure returned
            if hasattr(response, 'choices') and len(response.choices) > 0:
                if hasattr(response.choices[0], 'message') and hasattr(response.choices[0].message, 'content'):
                    return response.choices[0].message.content
                elif isinstance(response.choices[0], dict) and 'message' in response.choices[0] and 'content' in response.choices[0]['message']:
                    return response.choices[0]['message']['content']

            return "Error: Could not extract response from API."
        except Exception as e:
            # Log the error for debugging
            print(f"Chat completion error: {str(e)}")
            # Check if the error is related to the API key or connection
            error_msg = str(e).lower()
            if 'api' in error_msg or 'key' in error_msg or 'auth' in error_msg or '401' in error_msg or '403' in error_msg:
                return f"API authentication error: {str(e)}"
            elif 'str' in error_msg and 'choices' in error_msg:
                # This indicates the API returned HTML instead of JSON
                return "Error: Invalid API response format - check your API key and model name"
            else:
                return f"Error: Failed to get response from API - {str(e)}"

    def health_check(self) -> bool:
        """Check if OpenRouter API is accessible"""
        try:
            # Attempt a simple completion to check connectivity
            response = openai.chat.completions.create(
                model=self.chat_model,
                messages=[{"role": "user", "content": "Hello"}],
                max_tokens=10
            )
            return True
        except Exception as e:
            print(f"OpenRouter health check failed: {e}")
            return False