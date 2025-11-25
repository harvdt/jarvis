from sqlalchemy.orm import Session
from app.models.tree import Tree
from app.schemas.tree import TreeCreate, TreeRead
from app.schemas.log import LogCreate
from app.services.log import create_log
from uuid import UUID
from datetime import datetime

def create_tree(db: Session, tree: TreeCreate):
    db_tree = Tree(
        name=tree.name,
        flower_status=tree.flower_status,
        pollination_status=tree.pollination_status,
        latitude=tree.latitude,
        longitude=tree.longitude,
        camera_id=tree.camera_id,
        plantation_id=tree.plantation_id
    )
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    return db_tree

def get_all_trees(db: Session):
    return db.query(Tree).all()

def get_tree_by_id(db: Session, tree_id: UUID):
    return db.query(Tree).filter(Tree.id == tree_id).first()

def get_trees_by_plantation_id(db: Session, plantation_id: UUID):
    return db.query(Tree).filter(Tree.plantation_id == plantation_id).all()

def update_tree(db: Session, tree_id: UUID, tree: TreeCreate):
    db_tree = db.query(Tree).filter(Tree.id == tree_id).first()
    if db_tree:
        db_tree.name = tree.name
        db_tree.flower_status = tree.flower_status
        db_tree.pollination_status = tree.pollination_status
        db_tree.latitude = tree.latitude
        db_tree.longitude = tree.longitude
        db_tree.camera_id = tree.camera_id
        db_tree.plantation_id = tree.plantation_id
        db.commit()
        db.refresh(db_tree)
    return db_tree

def delete_tree(db: Session, tree_id: UUID):
    db_tree = db.query(Tree).filter(Tree.id == tree_id).first()
    if db_tree:
        db.delete(db_tree)
        db.commit()
    return db_tree


def process_iot_pollination(db: Session, tree_id: UUID, flower_status: bool, pollination_status: bool):
    # Get the tree
    db_tree = get_tree_by_id(db, tree_id)
    if not db_tree:
        return None
    
    # Update tree status with IoT detected values
    db_tree.flower_status = flower_status
    db_tree.pollination_status = pollination_status
    
    # Create log entry
    status_text = []
    if flower_status:
        status_text.append("ripe flower detected")
    if pollination_status:
        status_text.append("pollination completed")
    
    log_message = f"IoT update: {', '.join(status_text) if status_text else 'no status changes'}"
    
    create_log(db, LogCreate(
        message=log_message,
        plantation_id=db_tree.plantation_id,
        timestamp=datetime.utcnow()
    ))
    
    db.commit()
    db.refresh(db_tree)
    return db_tree
