from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.dependencies import get_db
from app.schemas.tree import TreeCreate, TreeRead
from app.services.tree import (
    create_tree,
    get_all_trees,
    get_tree_by_id,
    get_trees_by_plantation_id,
    update_tree,
    delete_tree
)

router = APIRouter(prefix="/trees", tags=["trees"])


@router.post("/", response_model=TreeRead)
async def create_tree_endpoint(tree: TreeCreate, db: Session = Depends(get_db)):
    return create_tree(db, tree)


@router.get("/", response_model=List[TreeRead])
async def get_trees(db: Session = Depends(get_db)):
    return get_all_trees(db)


@router.get("/{tree_id}", response_model=TreeRead)
async def get_tree(tree_id: UUID, db: Session = Depends(get_db)):
    tree = get_tree_by_id(db, tree_id)
    if not tree:
        raise HTTPException(status_code=404, detail="Tree not found")
    return tree


@router.get("/plantation/{plantation_id}", response_model=List[TreeRead])
async def get_trees_by_plantation(plantation_id: UUID, db: Session = Depends(get_db)):
    return get_trees_by_plantation_id(db, plantation_id)


@router.put("/{tree_id}", response_model=TreeRead)
async def update_tree_endpoint(tree_id: UUID, tree: TreeCreate, db: Session = Depends(get_db)):
    updated_tree = update_tree(db, tree_id, tree)
    if not updated_tree:
        raise HTTPException(status_code=404, detail="Tree not found")
    return updated_tree


@router.delete("/{tree_id}")
async def delete_tree_endpoint(tree_id: UUID, db: Session = Depends(get_db)):
    deleted_tree = delete_tree(db, tree_id)
    if not deleted_tree:
        raise HTTPException(status_code=404, detail="Tree not found")
    return {"message": "Tree deleted successfully"}