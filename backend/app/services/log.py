from sqlalchemy.orm import Session
from app.models.log import Log
from app.schemas.log import LogCreate, LogRead
from uuid import UUID
from datetime import datetime

def create_log(db: Session, log: LogCreate):
    db_log = Log(
        message=log.message,
        timestamp=log.timestamp or datetime.utcnow(),
        plantation_id=log.plantation_id
    )
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_all_logs(db: Session):
    return db.query(Log).all()

def get_log_by_id(db: Session, log_id: UUID):
    return db.query(Log).filter(Log.id == log_id).first()

def get_logs_by_plantation_id(db: Session, plantation_id: UUID):
    return db.query(Log).filter(Log.plantation_id == plantation_id).order_by(Log.timestamp.desc()).all()

def update_log(db: Session, log_id: UUID, log: LogCreate):
    db_log = db.query(Log).filter(Log.id == log_id).first()
    if db_log:
        db_log.message = log.message
        db_log.timestamp = log.timestamp or db_log.timestamp
        db_log.plantation_id = log.plantation_id
        db.commit()
        db.refresh(db_log)
    return db_log

def delete_log(db: Session, log_id: UUID):
    db_log = db.query(Log).filter(Log.id == log_id).first()
    if db_log:
        db.delete(db_log)
        db.commit()
    return db_log
