from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.dependencies import get_db
from app.schemas.plantation import PlantationCreate, PlantationRead
from app.services.plantation import (
    create_plantation,
    get_all_plantations,
    get_plantation_by_id,
    get_plantations_by_user_id,
    update_plantation,
    delete_plantation
)

router = APIRouter(prefix="/plantations", tags=["plantations"])


@router.post("/", response_model=PlantationRead)
async def create_plantation_endpoint(plantation: PlantationCreate, db: Session = Depends(get_db)):
    return create_plantation(db, plantation)


@router.get("/", response_model=List[PlantationRead])
async def get_plantations(db: Session = Depends(get_db)):
    return get_all_plantations(db)


@router.get("/{plantation_id}", response_model=PlantationRead)
async def get_plantation(plantation_id: UUID, db: Session = Depends(get_db)):
    plantation = get_plantation_by_id(db, plantation_id)
    if not plantation:
        raise HTTPException(status_code=404, detail="Plantation not found")
    return plantation


@router.get("/user/{user_id}", response_model=List[PlantationRead])
async def get_plantations_by_user(user_id: UUID, db: Session = Depends(get_db)):
    return get_plantations_by_user_id(db, user_id)


@router.put("/{plantation_id}", response_model=PlantationRead)
async def update_plantation_endpoint(plantation_id: UUID, plantation: PlantationCreate, db: Session = Depends(get_db)):
    updated_plantation = update_plantation(db, plantation_id, plantation)
    if not updated_plantation:
        raise HTTPException(status_code=404, detail="Plantation not found")
    return updated_plantation


@router.delete("/{plantation_id}")
async def delete_plantation_endpoint(plantation_id: UUID, db: Session = Depends(get_db)):
    deleted_plantation = delete_plantation(db, plantation_id)
    if not deleted_plantation:
        raise HTTPException(status_code=404, detail="Plantation not found")
    return {"message": "Plantation deleted successfully"}