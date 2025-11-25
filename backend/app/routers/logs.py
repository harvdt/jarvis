from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.dependencies import get_db
from app.schemas.log import LogCreate, LogRead
from app.services.log import (
    create_log,
    get_all_logs,
    get_log_by_id,
    get_logs_by_plantation_id,
    update_log,
    delete_log
)

router = APIRouter(prefix="/logs", tags=["logs"])


@router.post("/", response_model=LogRead)
async def create_log_endpoint(log: LogCreate, db: Session = Depends(get_db)):
    return create_log(db, log)


@router.get("/", response_model=List[LogRead])
async def get_logs(db: Session = Depends(get_db)):
    return get_all_logs(db)


@router.get("/{log_id}", response_model=LogRead)
async def get_log(log_id: UUID, db: Session = Depends(get_db)):
    log = get_log_by_id(db, log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    return log


@router.get("/plantation/{plantation_id}", response_model=List[LogRead])
async def get_logs_by_plantation(plantation_id: UUID, db: Session = Depends(get_db)):
    return get_logs_by_plantation_id(db, plantation_id)


@router.put("/{log_id}", response_model=LogRead)
async def update_log_endpoint(log_id: UUID, log: LogCreate, db: Session = Depends(get_db)):
    updated_log = update_log(db, log_id, log)
    if not updated_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return updated_log


@router.delete("/{log_id}")
async def delete_log_endpoint(log_id: UUID, db: Session = Depends(get_db)):
    deleted_log = delete_log(db, log_id)
    if not deleted_log:
        raise HTTPException(status_code=404, detail="Log not found")
    return {"message": "Log deleted successfully"}