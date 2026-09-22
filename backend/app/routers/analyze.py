from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.analysis import AnalysisRequest
from app.services.providers.mock_provider import MockProvider
from app.services.providers.base import VisionProvider
from app.services.safety_validator import validate_analysis_output
from app.services.recommendation_engine import prioritize_top3
from app.config import settings
import json

router = APIRouter()

def get_vision_provider() -> VisionProvider:
    # For now, only mock. Future: check OPENAI_API_KEY, GEMINI_API_KEY
    # if settings.openai_api_key:
    #     from app.services.providers.openai_provider import OpenAIProvider
    #     return OpenAIProvider()
    # elif settings.gemini_api_key:
    #     from app.services.providers.gemini_provider import GeminiProvider
    #     return GeminiProvider()
    return MockProvider()

@router.post("/api/analyze")
async def analyze_photo(
    photo: UploadFile = File(...),
    goals: str = Form("[]"),
    maintenance_tolerance: str = Form("medium"),
    time_availability: str = Form("10"),
    budget: str = Form("$$"),
    age_range: str = Form(None),
    gender_presentation: str = Form(None),
):
    try:
        goals_list = json.loads(goals) if goals else []
    except:
        goals_list = []

    request = AnalysisRequest(
        goals=goals_list,
        maintenance_tolerance=maintenance_tolerance,
        time_availability=time_availability,
        budget=budget,
        age_range=age_range,
        gender_presentation=gender_presentation,
    )

    # Read photo bytes
    photo_bytes = await photo.read()
    if len(photo_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Photo too large, max 10MB")

    provider = get_vision_provider()
    analysis = await provider.analyze(photo_bytes, request)

    # Safety check
    is_safe, cleaned, reason = validate_analysis_output(analysis.profile_summary)
    if not is_safe:
        raise HTTPException(status_code=400, detail=f"Analysis blocked for safety: {reason}")

    # Prioritize
    analysis = prioritize_top3(analysis, goals_list)

    return analysis

@router.get("/api/analyze/{analysis_id}")
async def get_analysis(analysis_id: str):
    # Mock for now - in real implementation, fetch from DB
    provider = MockProvider()
    request = AnalysisRequest(goals=["Grooming", "Hair"])
    analysis = await provider.analyze(b"", request)
    return analysis
