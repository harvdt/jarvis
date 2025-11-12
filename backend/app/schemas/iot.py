from pydantic import BaseModel
from uuid import UUID
from typing import Optional
from datetime import datetime


class IoTPollinationRequest(BaseModel):
    tree_id: UUID
    flower_status: bool
    pollination_status: bool
    timestamp: Optional[datetime] = None

    class Config:
        orm_mode = True