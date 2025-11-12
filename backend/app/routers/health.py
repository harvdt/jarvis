from fastapi import APIRouter
from datetime import datetime

from app.utils.helper import api_response

router = APIRouter()

@router.get("/health")
async def health_check():
    return api_response(True, "Service is healthy", {"datetime": datetime.utcnow().isoformat()})