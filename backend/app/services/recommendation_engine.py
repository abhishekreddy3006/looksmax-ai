from app.models.analysis import StructuredAnalysis
from typing import List

def prioritize_top3(analysis: StructuredAnalysis, goals: List[str]) -> StructuredAnalysis:
    """
    Prioritize opportunities based on goals, impact, effort, and diversity
    """
    def score(op):
        s = 0
        # Boost if matches goals
        goal_lower = [g.lower() for g in goals]
        if op.category in goal_lower or any(g in op.title.lower() for g in goal_lower):
            s += 10
        if op.impact == "high":
            s += 5
        elif op.impact == "medium":
            s += 2
        if op.effort == "low":
            s += 3
        elif op.effort == "medium":
            s += 1
        return s

    sorted_ops = sorted(analysis.opportunities, key=score, reverse=True)
    
    # Ensure diversity across categories for Top 3
    top3 = []
    seen_categories = set()
    for op in sorted_ops:
        if len(top3) >= 3:
            break
        if op.category not in seen_categories or len(top3) < 2:
            top3.append(op)
            seen_categories.add(op.category)
    
    # If still less than 3, fill with next highest
    for op in sorted_ops:
        if len(top3) >= 3:
            break
        if op not in top3:
            top3.append(op)

    # Mark is_top3
    for op in analysis.opportunities:
        op_dict = op.model_dump()
        # We can't mutate easily, so we return with top3 list separate
        pass

    # For simplicity, reorder opportunities with top3 first
    remaining = [op for op in sorted_ops if op not in top3]
    analysis.opportunities = top3 + remaining

    return analysis

def generate_plan_items(analysis: StructuredAnalysis):
    """
    Generate 30-day plan from Top 3
    """
    top3 = analysis.opportunities[:3]
    plan = []
    
    # Week 1: Foundation - 2 low effort high impact
    for i, op in enumerate(top3[:2]):
        plan.append({
            "title": op.title,
            "explanation": op.how,
            "estimated_time": "5 min" if op.effort == "low" else "10 min",
            "frequency": "daily",
            "difficulty": op.effort,
            "category": op.category,
            "week": 1,
            "sort_order": i,
            "observation_id": op.id
        })
    
    # Week 2-3: Build
    for op in top3:
        plan.append({
            "title": f"Consistency: {op.title}",
            "explanation": f"Build habit: {op.how}",
            "estimated_time": "5 min",
            "frequency": "daily",
            "difficulty": op.effort,
            "category": op.category,
            "week": 2,
            "sort_order": len(plan),
            "observation_id": op.id
        })
    
    # Week 4: Refine + review
    plan.append({
        "title": "Weekly Review + Progress Photo",
        "explanation": "Compare progress, note consistency, decide next focus",
        "estimated_time": "10 min",
        "frequency": "weekly",
        "difficulty": "low",
        "category": "progress",
        "week": 4,
        "sort_order": len(plan),
        "observation_id": None
    })

    return plan
