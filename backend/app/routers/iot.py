from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.iot import IoTPollinationRequest
from app.schemas.tree import TreeRead
from app.services.tree import process_iot_pollination

router = APIRouter(prefix="/iot", tags=["iot"])


@router.post("/pollination", response_model=TreeRead)
async def iot_pollination(
    request: IoTPollinationRequest,
    db: Session = Depends(get_db)
):
    """
    IoT endpoint for pollination detection and processing.
    Updates tree status and creates a log entry.
    """
    tree = process_iot_pollination(db, request.tree_id, request.flower_status, request.pollination_status)
    
    if not tree:
        raise HTTPException(status_code=404, detail="Tree not found")
    
    return tree