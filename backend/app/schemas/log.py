from typing import Optional
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class LogBase(BaseModel):
    message: str
    timestamp: Optional[datetime] = None


class LogCreate(BaseModel):
    message: str
    plantation_id: UUID
    timestamp: Optional[datetime] = None


class LogRead(LogBase):
    id: UUID
    plantation_id: UUID

    class Config:
        orm_mode = True
