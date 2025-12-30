import requests
from app.config import settings

def test_openrouter_models():
    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}"
    }
    
    try:
        response = requests.get("https://openrouter.ai/api/v1/models", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # First 500 chars
        
        if response.status_code == 200:
            data = response.json()
            print("\nAvailable models:")
            for model in data.get('data', [])[:10]:  # Show first 10 models
                print(f"- {model['id']}")
        else:
            print(f"Error: {response.status_code}")
            
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_openrouter_models()