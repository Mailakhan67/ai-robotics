import openai
from app.config import settings

# Configure OpenAI with OpenRouter settings
openai.api_key = settings.openrouter_api_key
openai.base_url = "https://openrouter.ai/api/v1"

def test_embedding():
    try:
        print("Testing embedding API...")
        response = openai.embeddings.create(
            model=settings.embedding_model,
            input="Hello, world!"
        )
        print(f"Response type: {type(response)}")
        print(f"Response: {response}")
        
        if hasattr(response, 'data'):
            print("Success: Response has 'data' attribute")
            if len(response.data) > 0:
                print(f"First embedding: {response.data[0]}")
                if hasattr(response.data[0], 'embedding'):
                    print("Success: First item has 'embedding' attribute")
                    return True
                else:
                    print(f"Error: First item doesn't have 'embedding' attribute. Keys: {response.data[0].keys() if hasattr(response.data[0], 'keys') else 'N/A'}")
        else:
            print(f"Error: Response doesn't have 'data' attribute. Response content: {response}")
            
    except Exception as e:
        print(f"Exception occurred: {e}")
        import traceback
        traceback.print_exc()
    
    return False

def test_chat():
    try:
        print("\nTesting chat API...")
        response = openai.chat.completions.create(
            model=settings.chat_model,
            messages=[{"role": "user", "content": "Hello"}],
            max_tokens=10
        )
        print(f"Chat response type: {type(response)}")
        print(f"Chat response: {response}")
        
        if hasattr(response, 'choices'):
            print("Success: Chat response has 'choices' attribute")
            return True
        else:
            print(f"Error: Chat response doesn't have 'choices' attribute")
            
    except Exception as e:
        print(f"Chat exception occurred: {e}")
        import traceback
        traceback.print_exc()
    
    return False

if __name__ == "__main__":
    print(f"API Key: {settings.openrouter_api_key[:10]}..." if settings.openrouter_api_key else "No API key found")
    print(f"Base URL: {openai.base_url}")
    print(f"Embedding model: {settings.embedding_model}")
    print(f"Chat model: {settings.chat_model}")
    
    test_embedding()
    test_chat()