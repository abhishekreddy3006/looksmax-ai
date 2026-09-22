from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.services.providers.mock_provider import MockProvider
from app.models.analysis import AnalysisRequest
from app.services.recommendation_engine import prioritize_top3, generate_plan_items

router = APIRouter()

class GeneratePlanRequest(BaseModel):
    analysis_id: Optional[str] = None
    goals: list = []

@router.post("/api/plan/generate")
async def generate_plan(req: GeneratePlanRequest):
    provider = MockProvider()
    analysis_req = AnalysisRequest(goals=req.goals)
    analysis = await provider.analyze(b"", analysis_req)
    analysis = prioritize_top3(analysis, req.goals)
    
    plan_items = generate_plan_items(analysis)
    
    return {
        "id": "mock-plan-1",
        "type": "30day",
        "title": "Your 30-Day Refine Plan",
        "analysis_id": req.analysis_id or "mock-analysis-1",
        "items": plan_items,
        "is_demo": True
    }

@router.get("/api/plan/current")
async def get_current_plan():
    provider = MockProvider()
    analysis_req = AnalysisRequest(goals=["Grooming", "Hair"])
    analysis = await provider.analyze(b"", analysis_req)
    analysis = prioritize_top3(analysis, ["Grooming", "Hair"])
    plan_items = generate_plan_items(analysis)
    
    return {
        "id": "mock-plan-1",
        "type": "30day",
        "title": "Your 30-Day Refine Plan",
        "items": plan_items,
        "is_demo": True
    }

@router.post("/api/plan/item/{item_id}/complete")
async def complete_item(item_id: str):
    return {"id": item_id, "completed": True, "completed_at": "2026-09-22T00:00:00Z"}
