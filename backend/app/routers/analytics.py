from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from typing import Dict, Any

from app.dependencies import get_db
from app.models.tree import Tree
from app.models.log import Log

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/")
async def get_analytics(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Get analytics data including tree counts, pollination rates, and chart data.
    """
    try:
        # Tree count
        tree_count = db.query(Tree).count()

        # Pollination rate
        total_trees = tree_count
        pollinated_trees = db.query(Tree).filter(Tree.pollination_status == True).count()
        pollination_rate = (pollinated_trees / total_trees * 100) if total_trees > 0 else 0

        # Active drones (for now, return a static value as this might come from IoT)
        active_drones = 2

        # Pie chart data
        pie_data = [
            {"pollination_status": "pollinated", "value": pollinated_trees},
            {"pollination_status": "not_pollinated", "value": total_trees - pollinated_trees}
        ]

        # Area chart data - monthly data (simplified for demo)
        # Since we don't have timestamps on trees, we'll provide sample data
        # In a real app, you'd track pollination over time
        area_data = [
            {"month": "January", "pollinated": 186, "not_pollinated": 80},
            {"month": "February", "pollinated": 305, "not_pollinated": 200},
            {"month": "March", "pollinated": 237, "not_pollinated": 120},
            {"month": "April", "pollinated": 73, "not_pollinated": 190},
            {"month": "May", "pollinated": 209, "not_pollinated": 130},
            {"month": "June", "pollinated": 214, "not_pollinated": 140},
        ]

        return {
            "tree_count": tree_count,
            "pollination_rate": f"{pollination_rate:.1f}%",
            "active_drones": active_drones,
            "pie_chart": pie_data,
            "area_chart": area_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")


@router.get("/summary")
async def get_analytics_summary(db: Session = Depends(get_db)) -> Dict[str, Any]:
    """
    Get a summary of key analytics metrics.
    """
    try:
        tree_count = db.query(Tree).count()
        pollinated_trees = db.query(Tree).filter(Tree.pollination_status == True).count()
        pollination_rate = (pollinated_trees / tree_count * 100) if tree_count > 0 else 0

        return {
            "tree_count": tree_count,
            "pollination_rate": f"{pollination_rate:.1f}%",
            "active_drones": 2
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics summary: {str(e)}")