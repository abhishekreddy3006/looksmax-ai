# AI ARCHITECTURE — Refine

## Principles

1. **Provider-agnostic:** Interface, not hard-coded to OpenAI/Gemini/Anthropic
2. **Never fake real AI:** If no key, label as "Demo analysis — AI vision provider not configured"
3. **Safety first:** Validation layer blocks medical diagnosis, hardmaxxing, unsafe advice
4. **Structured output:** Always return validated JSON, not free text blob
5. **Privacy:** Photos sent to provider only with explicit consent, minimal retention, no logging of images
6. **Cost-aware:** Compress, rate limit, cache

## High-Level Flow

```
Mobile App
  → POST /api/analyze (photo + goals + preferences + consent)
  → Backend: Auth check, rate limit, quality check, store photo (private bucket)
  → AI Orchestrator
    → Select Vision Provider (based on config, fallback chain)
    → Build prompt with user context (goals, preferences, NOT medical history)
    → Call Vision Provider
    → Parse structured output
    → Safety Validation (block disallowed content, medical, hardmaxxing)
    → Recommendation Engine (map observations → Top 3 + Impact Map + Plan)
    → Save to DB (analyses, observations, recommendations)
  → Return structured analysis to app
```

Coach flow:
```
App POST /api/coach/message (history + current message + context: profile, analysis, plan, completions)
  → Orchestrator → LLM Provider (Anthropic/OpenAI) with system prompt that includes context
  → Safety Validation
  → Return answer + optional cards (plan item, look)
```

## Provider Interface

```python
# backend/app/services/providers/base.py
from abc import ABC, abstractmethod
from typing import Optional
from pydantic import BaseModel

class AnalysisInput(BaseModel):
    photo_url: str  # signed URL or base64 (prefer URL)
    goals: list[str]
    preferences: dict
    age_range: Optional[str]
    gender_presentation: Optional[str]  # for recommendation tailoring, inclusive

class StructuredAnalysis(BaseModel):
    profile_summary: str  # qualitative, 2-3 sentences
    strengths: list[Strength]  # 3-4
    opportunities: list[Opportunity]  # 5-8, then prioritized to Top 3
    categories: dict[str, CategoryAssessment]  # face, hair, etc
    impact_map: ImpactMap
    confidence: str  # "low" | "medium" | "high" — never fake precision
    is_demo: bool

class VisionProvider(ABC):
    @abstractmethod
    async def analyze(self, input: AnalysisInput) -> StructuredAnalysis:
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass

class LLMProvider(ABC):
    @abstractmethod
    async def chat(self, messages: list[dict], system: str, context: dict) -> str:
        pass
```

Implementations:
- `mock_provider.py`: heuristic based on photo metadata? Actually no real analysis, returns demo with random but plausible strengths/opportunities, labeled is_demo=True. Used when no API key or for tests. Must NOT be presented as real.
- `openai_provider.py`: uses gpt-4o vision, structured output via function calling / json mode
- `gemini_provider.py`: uses gemini-1.5-pro vision
- `anthropic_provider.py`: for coach (Claude), no vision needed for coach MVP, but can use vision if needed

Selection logic in `ai_orchestrator.py`:
```python
def get_vision_provider():
    if os.getenv("OPENAI_API_KEY"):
        return OpenAIProvider()
    elif os.getenv("GEMINI_API_KEY"):
        return GeminiProvider()
    else:
        return MockProvider()
```

## Prompt Design (Vision)

System prompt (core):

```
You are Refine, a premium personal appearance and self-care coach. Your job is to help users understand what suits them and what to improve, with a focus on realistic, healthy, actionable advice.

Philosophy: Enhance, don't obsess.

You will analyze a user's photo and provide:
- Overall profile summary (2-3 sentences, qualitative, supportive, not judgmental)
- 3-4 strengths (what is working, how to leverage)
- 5-8 opportunities (realistic, non-medical, no hardmaxxing)
- Category assessments for: face_presentation, hair, facial_hair, skin_appearance, grooming, smile, style, posture
  Each category: status = "strong" | "good" | "opportunity", notes = 1 sentence, no numeric score
- Impact map: high/medium/low priority categories
- For each opportunity: WHAT, WHY, HOW, effort (low/med/high), timeline (days/weeks), maintenance (low/med/high)

Rules:
- Do NOT provide a 1-10 attractiveness score. Do NOT say user is ugly. Do NOT shame.
- Do NOT diagnose medical conditions (acne severity okay as appearance observation, but not disease diagnosis)
- Do NOT recommend surgery, bone smashing, steroids, black-market hormones, leg-lengthening, unsafe DIY
- Do NOT claim scientific certainty. Use qualitative language: "may", "could", "appears"
- Do NOT mention race/ethnicity as flaw. Be inclusive, ethnicity-aware for suitability but not judgmental.
- If photo quality poor, note it and still provide best effort, but flag confidence low
- Keep tone premium, calm, confident, supportive, like personal stylist
- Return ONLY valid JSON matching schema
```

User prompt includes:
- Goals
- Preferences (maintenance tolerance, time, budget)
- Age range (if provided)
- Photo

Structured output schema enforced via function calling.

Example output (simplified):
```json
{
  "profile_summary": "Balanced proportions with strong eye area and natural grooming baseline. Hair texture offers versatility, with opportunity to refine consistency.",
  "strengths": [
    {"title": "Eye Presentation", "evidence": "Clear, well-rested appearance", "leverage": "Keep natural brow grooming, avoid over-plucking"},
    ...
  ],
  "opportunities": [
    {
      "id": "hair_texture",
      "category": "hair",
      "title": "Define Hair Texture",
      "what": "Use lightweight curl cream to define natural texture",
      "why": "Adds structure and intentionality",
      "how": "Apply dime-sized amount to damp hair, scrunch",
      "effort": "low",
      "timeline": "immediate, improves in 1-2 weeks",
      "maintenance": "low",
      "impact": "high"
    },
    ...
  ],
  "categories": {
    "face_presentation": {"status": "good", "notes": "Neutral expression, good lighting"},
    ...
  },
  "impact_map": {
    "high": ["hair", "grooming"],
    "medium": ["facial_hair", "style"],
    "low": ["posture"]
  },
  "confidence": "medium",
  "is_demo": false
}
```

## Recommendation Engine

After raw analysis, engine prioritizes Top 3:

Logic:
1. Filter opportunities by user goals (if goal = hair, boost hair)
2. Sort by impact (high first) then effort (low effort first) then maintenance tolerance (match user tolerance)
3. Pick top 3 with diversity across categories (not all hair)
4. Generate Impact Map from all opportunities

Also generates 30-day plan:
- Week 1: Foundation (1-2 low effort high impact habits)
- Week 2-3: Build (medium effort)
- Week 4: Refine + review
- Each plan item linked to opportunity ID

## Safety Validation

`services/safety_validator.py`:

Checks:
- Blocklist: "bone smashing", "leg lengthening surgery", "steroids", "black-market hormones", "looksmaxxing surgery", "you are ugly", "subhuman", "it's over", medical diagnosis terms like "you have acne vulgaris grade 3" (instead allow "skin texture shows some congestion")
- If detected in provider output → sanitize or replace with safe alternative + log safety_event
- Ensure no 1-10 score as primary metric (if provider returns, strip and replace with qualitative)
- Ensure tone not shaming: sentiment check (simple heuristic or secondary LLM check)
- For coach: same blocklist + redirect template

Redirect templates:
- For hardmaxxing request: "I can't help with unsafe practices like bone smashing. Safer alternatives that achieve similar goals: [grooming, posture, style]. If you're feeling distressed about appearance, consider talking to a trusted person or mental health professional. [Resources]"
- For medical: "I can't diagnose medical conditions. For skin concerns that persist, consider a dermatologist. For general appearance, I can suggest grooming routines..."

Log to `safety_events` table.

## Coach System Prompt

```
You are Refine Coach, a premium appearance coach. You know user's profile, goals, analysis, plan, completions, saved looks.

Context: {profile, goals, top3, plan, completions, saved_looks}

Rules:
- Concise, actionable, contextual (2-4 sentences + optional card)
- Reference user's actual data: "Since you're focusing on hair and prefer low maintenance..."
- Never generic ChatGPT. Always personalized.
- No medical diagnosis, no hardmaxxing, no shaming.
- If asked about attractiveness score: explain we don't use single score, focus on strengths + actionable opportunities.
- If asked about other users: no comparison, no ranking.
- Suggest next action always.

Examples:
User: "Would this haircut suit me?"
→ Check face shape, hair texture from analysis, maintenance tolerance. Answer: Why it may suit, maintenance, styling effort, what to tell barber.

User: "What should I focus this week?"
→ Look at plan, completions, Top 3. Answer with 1-2 priorities.

User: "How do I maintain this look?"
→ Provide routine, frequency, products type (not specific brand unless asked, then generic type).
```

## Look Lab (MVP)

MVP does NOT use AI image generation for try-on (to avoid deepfake policy + cost). Instead:
- Curated look library (illustrations + reference photos of models with diverse face shapes, licensed or generated with consent, not user's face morphed)
- For each look, explain why it may suit based on user's analysis (rule-based matching: if face shape = oval + hair texture = wavy + maintenance low → suggest low-maintenance textured crop)
- Future: integrate image generation with identity preservation (e.g., ControlNet) — architecture ready but not MVP.

Barber card generation is rule-based template, no AI needed.

## Cost & Rate Limiting

- Compress image to 1024px max before sending to provider
- Cache analysis by photo hash + goals hash (if same photo re-uploaded within 24h, return cached)
- Rate limit: 10/day free, 50/day premium (prevent abuse)
- Log token usage per provider

## Observability

- Log provider name, latency, token count, confidence, is_demo, safety flags
- No photo in logs
- Alert if provider error rate > 10%

## Fallbacks

- If OpenAI fails → try Gemini → Mock labeled demo
- If all fail → return error with retry CTA, not fake analysis
- Coach: if LLM fails → return cached suggestions or "I'm having trouble, try again"

## Future Extensions

- Face shape detection via dense landmark (on-device) to augment LLM
- Hair segmentation for better Look Lab matching
- Skin analysis via dedicated model (but careful not to diagnose)
- Voice for coach
```

