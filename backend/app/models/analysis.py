from pydantic import BaseModel
from typing import List, Optional, Dict, Literal

class Strength(BaseModel):
    title: str
    evidence: str
    leverage: str

class Opportunity(BaseModel):
    id: str
    category: str
    title: str
    what: str
    why: str
    how: str
    effort: Literal["low", "medium", "high"]
    timeline: str
    maintenance: Literal["low", "medium", "high"]
    impact: Literal["high", "medium", "low"]

class CategoryAssessment(BaseModel):
    status: Literal["strong", "good", "opportunity"]
    notes: str

class ImpactMap(BaseModel):
    high: List[str]
    medium: List[str]
    low: List[str]

class StructuredAnalysis(BaseModel):
    profile_summary: str
    strengths: List[Strength]
    opportunities: List[Opportunity]
    categories: Dict[str, CategoryAssessment]
    impact_map: ImpactMap
    confidence: Literal["low", "medium", "high"]
    is_demo: bool
    provider: str

class AnalysisRequest(BaseModel):
    goals: List[str] = []
    maintenance_tolerance: str = "medium"
    time_availability: str = "10"
    budget: str = "$$"
    age_range: Optional[str] = None
    gender_presentation: Optional[str] = None
