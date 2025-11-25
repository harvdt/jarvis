from sqlalchemy.orm import Session
from app.models.plantation import Plantation
from app.schemas.plantation import PlantationCreate, PlantationRead
from uuid import UUID

def create_plantation(db: Session, plantation: PlantationCreate):
    db_plantation = Plantation(
        name=plantation.name,
        location=plantation.location,
        user_id=plantation.user_id
    )
    db.add(db_plantation)
    db.commit()
    db.refresh(db_plantation)
    return db_plantation

def get_all_plantations(db: Session):
    return db.query(Plantation).all()

def get_plantation_by_id(db: Session, plantation_id: UUID):
    return db.query(Plantation).filter(Plantation.id == plantation_id).first()

def get_plantations_by_user_id(db: Session, user_id: UUID):
    return db.query(Plantation).filter(Plantation.user_id == user_id).all()

def update_plantation(db: Session, plantation_id: UUID, plantation: PlantationCreate):
    db_plantation = db.query(Plantation).filter(Plantation.id == plantation_id).first()
    if db_plantation:
        db_plantation.name = plantation.name
        db_plantation.location = plantation.location
        db_plantation.user_id = plantation.user_id
        db.commit()
        db.refresh(db_plantation)
    return db_plantation

def delete_plantation(db: Session, plantation_id: UUID):
    db_plantation = db.query(Plantation).filter(Plantation.id == plantation_id).first()
    if db_plantation:
        db.delete(db_plantation)
        db.commit()
    return db_plantation
