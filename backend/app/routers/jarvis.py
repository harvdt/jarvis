from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from app.services.jarvis import jarvis_service

router = APIRouter(prefix="/jarvis", tags=["jarvis"])


class ChatRequest(BaseModel):
    message: str
    chat_history: Optional[List[Dict[str, str]]] = None
    username: Optional[str] = None
    user_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str


@router.post("/chat", response_model=ChatResponse)
async def chat_with_jarvis(request: ChatRequest):
    """Chat with Jarvis AI assistant for plantation management."""
    try:
        response = await jarvis_service.chat(
            message=request.message,
            chat_history=request.chat_history,
            username=request.username,
            user_id=request.user_id
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}"
        )