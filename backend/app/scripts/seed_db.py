#!/usr/bin/env python3
"""
Database seeding script for RAPID system.
Populates the database with sample users, plantations, trees, and logs.
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.utils.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.plantation import Plantation
from app.models.tree import Tree
from app.models.log import Log
from datetime import datetime

def seed_database():
    """Seed the database with sample data."""
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Create a sample user
        user = User(
            username="admin",
            password="password123"  # In production, this should be hashed
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Create plantations
        plantations_data = [
            {"name": "Hackaton 2025", "location": "PIDI 4.0"},
            {"name": "North Field", "location": "Sumatra Region A"},
            {"name": "South Valley", "location": "Sumatra Region B"},
        ]

        plantations = []
        for plantation_data in plantations_data:
            plantation = Plantation(
                name=plantation_data["name"],
                location=plantation_data["location"],
                user_id=user.id
            )
            db.add(plantation)
            db.commit()
            db.refresh(plantation)
            plantations.append(plantation)

        # Create trees
        trees_data = [
            {"name": "Palm Tree #1", "flower_status": True, "pollination_status": True, "latitude": 3.5952, "longitude": 98.6722, "plantation_index": 0},
            {"name": "Palm Tree #2", "flower_status": False, "pollination_status": None, "latitude": 3.5955, "longitude": 98.6725, "plantation_index": 0},
            {"name": "Palm Tree #3", "flower_status": None, "pollination_status": False, "latitude": 3.5958, "longitude": 98.6728, "plantation_index": 0},
            {"name": "Palm Tree #4", "flower_status": True, "pollination_status": False, "latitude": 3.5950, "longitude": 98.6730, "plantation_index": 0},
            {"name": "Palm Tree #5", "flower_status": False, "pollination_status": True, "latitude": 3.5953, "longitude": 98.6720, "plantation_index": 0},
            {"name": "Palm Tree #6", "flower_status": True, "pollination_status": None, "latitude": 3.5956, "longitude": 98.6718, "plantation_index": 1},
            {"name": "Palm Tree #7", "flower_status": None, "pollination_status": True, "latitude": 3.5949, "longitude": 98.6724, "plantation_index": 1},
            {"name": "Palm Tree #8", "flower_status": True, "pollination_status": True, "latitude": 3.5954, "longitude": 98.6727, "plantation_index": 1},
            {"name": "Palm Tree #9", "flower_status": False, "pollination_status": False, "latitude": 3.5957, "longitude": 98.6721, "plantation_index": 2},
            {"name": "Palm Tree #10", "flower_status": None, "pollination_status": None, "latitude": 3.5951, "longitude": 98.6726, "plantation_index": 2},
        ]

        trees = []
        for tree_data in trees_data:
            tree = Tree(
                name=tree_data["name"],
                flower_status=tree_data["flower_status"],
                pollination_status=tree_data["pollination_status"],
                latitude=tree_data["latitude"],
                longitude=tree_data["longitude"],
                plantation_id=plantations[tree_data["plantation_index"]].id
            )
            db.add(tree)
            db.commit()
            db.refresh(tree)
            trees.append(tree)

        # Create logs
        logs_data = [
            {"message": "Tree #1 pollination completed successfully", "plantation_index": 0},
            {"message": "Flower detected on Tree #2", "plantation_index": 0},
            {"message": "Tree #3 pollination initiated", "plantation_index": 0},
            {"message": "Tree #4 flower status updated", "plantation_index": 0},
            {"message": "Tree #5 pollination completed", "plantation_index": 0},
            {"message": "Tree #6 flower detected", "plantation_index": 1},
            {"message": "Tree #7 pollination successful", "plantation_index": 1},
            {"message": "Tree #8 status updated", "plantation_index": 1},
        ]

        for log_data in logs_data:
            log = Log(
                message=log_data["message"],
                timestamp=datetime.utcnow(),
                plantation_id=plantations[log_data["plantation_index"]].id
            )
            db.add(log)

        db.commit()

        print("Database seeded successfully!")
        print(f"Created 1 user, {len(plantations)} plantations, {len(trees)} trees, and {len(logs_data)} logs.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()