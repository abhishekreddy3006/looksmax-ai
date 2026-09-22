from app.services.providers.base import VisionProvider, LLMProvider
from app.models.analysis import StructuredAnalysis, Strength, Opportunity, CategoryAssessment, ImpactMap, AnalysisRequest
import random

class MockProvider(VisionProvider):
    @property
    def name(self) -> str:
        return "mock"

    async def analyze(self, photo_bytes: bytes, request: AnalysisRequest) -> StructuredAnalysis:
        # Deterministic but varied mock based on goals
        goals = request.goals or ["Grooming", "Hair"]
        
        strengths = [
            Strength(title="Eye Presentation", evidence="Clear, well-rested appearance with natural brow shape", leverage="Keep natural brow grooming, avoid over-plucking"),
            Strength(title="Facial Proportion", evidence="Balanced thirds, good symmetry", leverage="Maintain neutral expression in photos, good for most hairstyles"),
            Strength(title="Hair Density", evidence="Good volume at crown and sides", leverage="Versatile for textured styles, low maintenance options available"),
            Strength(title="Skin Baseline", evidence="Even tone with minimal congestion", leverage="Consistent routine will maintain this strength"),
        ]

        all_opportunities = [
            Opportunity(
                id="hair_texture",
                category="hair",
                title="Define Hair Texture",
                what="Use lightweight curl cream to define natural texture",
                why="Adds structure and intentionality, makes hair look styled without heavy product",
                how="Apply dime-sized amount to damp hair, scrunch with fingers, air dry or diffuse low heat",
                effort="low",
                timeline="Immediate, improves in 1-2 weeks with consistency",
                maintenance="low",
                impact="high"
            ),
            Opportunity(
                id="grooming_routine",
                category="grooming",
                title="5-Minute Grooming Routine",
                what="Consistent morning grooming: cleanse, brow tidy, lip balm, light moisturizer",
                why="Intentional presentation signals self-care, high impact for low effort",
                how="2 min cleanse + 1 min brow check + 1 min lip balm + 1 min moisturizer. Keep tools in one place",
                effort="low",
                timeline="3-5 days to feel habitual, 2 weeks visible",
                maintenance="low",
                impact="high"
            ),
            Opportunity(
                id="skin_routine",
                category="skin_appearance",
                title="Consistent Skin Routine",
                what="AM/PM: gentle cleanser + moisturizer + SPF AM",
                why="Even tone and hydration improve overall presentation, reduces decision fatigue",
                how="AM: cleanser, moisturizer, SPF 30. PM: cleanser, moisturizer. Patch test new products",
                effort="low",
                timeline="2-3 weeks for texture, 4-6 weeks for tone",
                maintenance="medium",
                impact="high"
            ),
            Opportunity(
                id="eyewear",
                category="style",
                title="Eyewear Fit",
                what="Try rectangular frames with 52-54mm lens width",
                why="Complements face shape, balances proportions, adds professional edge",
                how="Visit optician with measurements: face width, pupillary distance. Try acetate in tortoise or black",
                effort="medium",
                timeline="1 visit, immediate impact",
                maintenance="low",
                impact="medium"
            ),
            Opportunity(
                id="beard_shape",
                category="facial_hair",
                title="Beard Shape Refinement",
                what="Low fade on sides, keep 5-7mm length on chin, clean neckline",
                why="Adds jawline definition, intentional vs unkempt",
                how="Use trimmer guard #3 on chin, #2 on sides, define neckline 1cm above Adam's apple",
                effort="medium",
                timeline="Immediate after trim, maintain weekly",
                maintenance="medium",
                impact="medium"
            ),
            Opportunity(
                id="posture",
                category="posture",
                title="Posture Check",
                what="Shoulder roll + chin tuck 3x daily",
                why="Presentation affects confidence and how clothes fit",
                how="Set 3 reminders: roll shoulders back/down, tuck chin slightly, hold 10 sec. 1 min total",
                effort="low",
                timeline="1-2 weeks to feel natural",
                maintenance="low",
                impact="low"
            ),
        ]

        # Prioritize based on goals
        def score(op: Opportunity):
            s = 0
            if op.category in [g.lower() for g in goals] or op.title.lower() in [g.lower() for g in goals]:
                s += 10
            if op.impact == "high":
                s += 5
            if op.effort == "low":
                s += 3
            return s

        sorted_ops = sorted(all_opportunities, key=score, reverse=True)

        categories = {
            "face_presentation": CategoryAssessment(status="good", notes="Neutral expression, good lighting, balanced proportions"),
            "hair": CategoryAssessment(status="opportunity", notes="Natural texture present, could use definition product"),
            "facial_hair": CategoryAssessment(status="good", notes="Natural growth, shape could be refined for definition"),
            "skin_appearance": CategoryAssessment(status="good", notes="Even tone baseline, routine consistency opportunity"),
            "grooming": CategoryAssessment(status="opportunity", notes="Good baseline, consistency would elevate"),
            "smile": CategoryAssessment(status="strong", notes="Natural presentation, maintain oral care routine"),
            "style": CategoryAssessment(status="good", notes="Neutral style, eyewear could add character"),
            "posture": CategoryAssessment(status="good", notes="Upright baseline, minor shoulder check helpful"),
        }

        impact_map = ImpactMap(
            high=["hair", "grooming", "skin_appearance"],
            medium=["facial_hair", "style", "smile"],
            low=["posture", "face_presentation"]
        )

        return StructuredAnalysis(
            profile_summary="Balanced proportions with strong eye area and natural grooming baseline. Hair texture offers versatility, with opportunity to refine consistency for intentional presentation. Overall profile suggests high impact from low-effort grooming and hair definition.",
            strengths=strengths[:3],
            opportunities=sorted_ops,
            categories=categories,
            impact_map=impact_map,
            confidence="medium",
            is_demo=True,
            provider="mock"
        )

class MockLLMProvider(LLMProvider):
    @property
    def name(self) -> str:
        return "mock"

    async def chat(self, messages: list, system: str, context: dict) -> str:
        last_user = messages[-1]["content"] if messages else ""
        last_lower = last_user.lower()

        if "focus this week" in last_lower:
            return "Based on your Top 3 (Define Hair Texture, 5-min Grooming, Eyewear Fit) and low maintenance preference, focus this week on: 1) Curl cream daily (3 min) — your highest impact low effort win. 2) Grooming routine consistency — you've done 1/4 today, aim for 3/4 tomorrow. Save eyewear for weekend. Want a detailed HOW for curl cream?"

        if "haircut" in last_lower or "hair cut" in last_lower:
            return "Textured Crop suits you: oval face + wavy texture + low maintenance tolerance. WHY: adds structure without daily styling. MAINTENANCE: low, 3 min styling. WHAT TO TELL BARBER: sides low fade #2, top 3cm textured, natural wave, point cut for texture. Want me to generate a barber card?"

        if "maintain" in last_lower:
            return "To maintain Textured Crop: 1) Wash 2-3x/week, not daily 2) Curl cream to damp hair, air dry 3) Trim every 3-4 weeks (sides) 4) Night: light oil if dry. Total 3 min/day. Low maintenance as you prefer. Should I add this to your plan?"

        if "why" in last_lower and "recommend" in last_lower:
            return "I recommended Define Hair Texture because: your analysis shows natural wave + good density (strength), your goal is Hair + Grooming, you prefer low maintenance, and it's high impact low effort — 3 min/day vs 30 min for other styles. It also works with your 10 min/day time. Does that make sense? Want alternatives?"

        return "Great question! Since you prefer low maintenance and 10 min/day, I'd suggest focusing on high-impact, low-effort actions first. Your Top 3 is hair texture, grooming routine, and eyewear fit. Each has WHAT/WHY/HOW + timeline. Which one should we break down into a daily habit? Remember: Enhance, don't obsess — consistency beats intensity."
