import openai
from app.config import settings

# Configure OpenAI with OpenRouter settings
openai.api_key = settings.openrouter_api_key
openai.base_url = "https://openrouter.ai/api/v1"

def test_basic_request():
    import requests
    import json
    
    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json"
    }
    
    # Test the models endpoint directly
    try:
        response = requests.get("https://openrouter.ai/api/v1/models", headers=headers)
        print(f"Models endpoint status: {response.status_code}")
        if response.status_code == 200:
            print("Models endpoint working correctly")
        else:
            print(f"Models endpoint error: {response.text[:200]}...")
    except Exception as e:
        print(f"Models endpoint request failed: {e}")

def test_chat_completion():
    try:
        print("Testing chat completion with basic model...")
        response = openai.chat.completions.create(
            model="mistralai/mistral-7b-instruct:free",
            messages=[{"role": "user", "content": "Hello"}],
            max_tokens=10
        )
        print(f"Chat completion successful: {type(response)}")
        print(f"Response: {response}")
    except Exception as e:
        print(f"Chat completion failed: {e}")

def test_embeddings():
    try:
        print("Testing embeddings...")
        response = openai.embeddings.create(
            model="nomic-ai/nomic-embed-text-v1.5",
            input="Hello world"
        )
        print(f"Embeddings successful: {type(response)}")
        print(f"Response: {response}")
    except Exception as e:
        print(f"Embeddings failed: {e}")

if __name__ == "__main__":
    print("Testing OpenRouter API configuration...")
    print(f"API Key: {settings.openrouter_api_key[:10]}...")
    print(f"Base URL: {openai.base_url}")
    print(f"Chat Model: {settings.chat_model}")
    print(f"Embedding Model: {settings.embedding_model}")
    
    print("\n1. Testing models endpoint...")
    test_basic_request()
    
    print("\n2. Testing chat completion...")
    test_chat_completion()
    
    print("\n3. Testing embeddings...")
    test_embeddings()