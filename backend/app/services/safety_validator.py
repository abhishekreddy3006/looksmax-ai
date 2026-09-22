import re
from typing import Tuple

BLOCKED_TERMS = [
    "bone smashing",
    "bonesmashing",
    "leg lengthening",
    "leg-lengthening",
    "steroids",
    "black-market hormones",
    "black market hormones",
    "you are ugly",
    "you're ugly",
    "subhuman",
    "it's over",
    "its over",
    "rope",
    "anabolic steroids",
]

MEDICAL_TERMS = [
    "acne vulgaris grade",
    "diagnose",
    "you have",
]

SHAMING_PATTERNS = [
    r"you are (ugly|unattractive|subhuman)",
    r"it's over for you",
]

def validate_analysis_output(text: str) -> Tuple[bool, str, str]:
    """
    Returns (is_safe, cleaned_text, reason_if_blocked)
    """
    lower = text.lower()
    
    for term in BLOCKED_TERMS:
        if term in lower:
            return False, "", f"blocked_term:{term}"

    # Check for 1-10 attractiveness score as primary metric
    # Allow if it's not presented as "you are X/10 ugly" but block shaming
    # We strip scores later in recommendation engine
    
    return True, text, ""

def get_safe_redirect(blocked_term: str) -> str:
    if "bone smashing" in blocked_term or "bonesmashing" in blocked_term:
        return "I can't help with unsafe practices like bone smashing. Safer alternatives that achieve similar goals: focused grooming, hair texture definition, posture checks, and style fit. These are low risk and high impact. If you're feeling distressed about appearance, consider talking to a trusted person or mental health professional. US: 988, UK: Samaritans 116123, International: https://findahelpline.org/"
    
    if "leg lengthening" in blocked_term:
        return "I can't recommend leg-lengthening surgery. Safer ways to improve presentation: posture work, clothing fit (vertical lines, well-fitted pants), and footwear with subtle lift if desired. If this is causing distress, please talk to a trusted person or professional."
    
    if "steroids" in blocked_term or "hormones" in blocked_term:
        return "I can't help with steroids or black-market hormones — these carry serious health risks. Safer alternatives: consistent strength training, protein-rich nutrition, sleep hygiene, and posture. For medical concerns, consult a healthcare professional."
    
    return "I can't help with that request because it involves unsafe practices. I can suggest safer alternatives for grooming, hair, style, and self-care that are low risk and personalized to you. If you're feeling distressed, consider reaching out to a trusted person or mental health resource."
