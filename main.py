from fastapi import FastAPI
from pydantic import BaseModel
from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# 🧠 Initialize Inference Client for DeepSeek model
client = InferenceClient(
    model="deepseek-ai/DeepSeek-R1-0528",
    token=HF_TOKEN
)

# 🚀 Initialize FastAPI app
app = FastAPI()

# 📦 Define request structure
class ChatRequest(BaseModel):
    message: str

# 📬 Define POST endpoint for chatbot
@app.post("/chat")
async def chat(request: ChatRequest):
    messages = [
        {"role": "system", "content": "You are a helpful medical assistant."},
        {"role": "user", "content": request.message}
    ]
    
    try:
        # Get reply from DeepSeek model
        response = client.chat_completion(messages=messages)
        reply = response.choices[0].message.content
        return {"response": reply}
    except Exception as e:
        return {"error": str(e)}