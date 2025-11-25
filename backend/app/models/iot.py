import uuid
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.utils.database import Base
from datetime import datetime


class IoTMessage(Base):
    __tablename__ = "iot_message"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True, unique=True)

    timestamp = Column(DateTime, nullable=False)
    camera = Column(Integer, nullable=False)
    detections = Column(JSON, nullable=False)  # Store the full detections array

    created_at = Column(DateTime, default=datetime.utcnow)