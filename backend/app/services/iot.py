from sqlalchemy.orm import Session
from app.models.iot import IoTMessage
from app.schemas.iot import IoTMessageRead
from typing import List


def create_iot_message(db: Session, iot_message: IoTMessage) -> IoTMessage:
    db.add(iot_message)
    db.commit()
    db.refresh(iot_message)
    return iot_message


def get_all_iot_messages(db: Session) -> List[IoTMessage]:
    return db.query(IoTMessage).order_by(IoTMessage.timestamp.desc()).all()


def get_iot_messages_by_camera(db: Session, camera_id: int) -> List[IoTMessage]:
    return db.query(IoTMessage).filter(IoTMessage.camera == camera_id).order_by(IoTMessage.timestamp.desc()).all()


def get_iot_message_by_id(db: Session, message_id: str) -> IoTMessage:
    return db.query(IoTMessage).filter(IoTMessage.id == message_id).first()