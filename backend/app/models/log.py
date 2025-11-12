import uuid

from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.utils.database import Base

class Log(Base):
    __tablename__ = "log"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True, unique=True)

    message = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)

    plantation_id = Column(UUID(as_uuid=True), ForeignKey("plantation.id"), nullable=False)
