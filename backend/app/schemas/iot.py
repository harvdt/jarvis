from pydantic import BaseModel
from uuid import UUID
from typing import Optional, List, Any
from datetime import datetime


class IoTPollinationRequest(BaseModel):
    tree_id: UUID
    flower_status: bool
    pollination_status: bool
    timestamp: Optional[datetime] = None

    class Config:
        orm_mode = True


class IoTMessageBase(BaseModel):
    timestamp: datetime
    camera: int
    detections: List[Any]  # JSON data


class IoTMessageRead(IoTMessageBase):
    id: UUID
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True