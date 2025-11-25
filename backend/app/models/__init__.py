from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

from .log import *
from .plantation import *
from .tree import *
from .user import *
from .iot import *

__all__ = ["Base"]