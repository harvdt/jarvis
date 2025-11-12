from typing import Optional
from pydantic import BaseModel
from uuid import UUID


class TreeBase(BaseModel):
    name: str
    flower_status: Optional[bool] = None
    pollination_status: Optional[bool] = None
    latitude: float
    longitude: float


class TreeCreate(BaseModel):
    name: str
    plantation_id: UUID
    flower_status: Optional[bool] = None
    pollination_status: Optional[bool] = None
    latitude: float
    longitude: float


class TreeRead(TreeBase):
    id: UUID
    plantation_id: UUID

    class Config:
        orm_mode = True
