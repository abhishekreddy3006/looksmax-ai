from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.services.providers.mock_provider import MockLLMProvider
from app.services.safety_validator import validate_analysis_output, get_safe_redirect

router = APIRouter()

class CoachMessageRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    context: Optional[dict] = None

class CoachMessageResponse(BaseModel):
    response: str
    conversation_id: str
    is_demo: bool = True

@router.post("/api/coach/message", response_model=CoachMessageResponse)
async def coach_message(req: CoachMessageRequest):
    # Safety check on input
    is_safe, _, reason = validate_analysis_output(req.message)
    if not is_safe:
        return CoachMessageResponse(
            response=get_safe_redirect(reason),
            conversation_id=req.conversation_id or "new",
            is_demo=True
        )

    provider = MockLLMProvider()
    
    messages = [
        {"role": "user", "content": req.message}
    ]
    
    system = "You are Refine Coach, premium appearance coach. Context: user goals, Top 3, plan. Be concise, actionable, supportive. No medical diagnosis, no hardmaxxing."
    
    response = await provider.chat(messages, system, req.context or {})

    # Safety check on output
    is_safe_out, cleaned, reason_out = validate_analysis_output(response)
    if not is_safe_out:
        response = get_safe_redirect(reason_out)

    return CoachMessageResponse(
        response=response,
        conversation_id=req.conversation_id or "mock-conv-1",
        is_demo=True
    )
