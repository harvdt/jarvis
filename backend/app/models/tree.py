import uuid

from sqlalchemy import Column, String, ForeignKey, Boolean, Float, Integer
from sqlalchemy.dialects.postgresql import UUID

from app.utils.database import Base

class Tree(Base):
    __tablename__ = "tree"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True, unique=True)

    name = Column(String, nullable=False)
    flower_status = Column(Boolean)
    pollination_status = Column(Boolean)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    camera_id = Column(Integer, nullable=True, unique=True)  # Camera ID for IoT mapping

    plantation_id = Column(UUID(as_uuid=True), ForeignKey("plantation.id"), nullable=False)