from pydantic import BaseModel
from uuid import UUID


class PlantationBase(BaseModel):
    name: str
    location: str


class PlantationCreate(PlantationBase):
    user_id: UUID


class PlantationRead(PlantationBase):
    id: UUID
    user_id: UUID

    class Config:
        orm_mode = True
