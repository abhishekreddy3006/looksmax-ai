# PRODUCT PRD — Refine: AI Personal Appearance & Self-Care Coach

> Working product identity: **Refine**
> Tagline: *Know what suits you. Know what to improve. Know what to do next.*
> SEO/discovery alias: Looksmax AI (for App Store search), but product identity is premium wellness.

## 1. Vision

Build a premium, trustworthy, psychologically healthy **personal appearance operating system** that replaces random TikTok/Reddit advice with a personalized, actionable roadmap.

We are NOT building a generic "rate my face" app. Attractiveness scoring is not the core mechanic.

Core promise:
- Understand current appearance
- Identify realistic improvement opportunities
- Prioritize highest-impact areas
- Receive personalized recommendations
- Build daily/weekly routines
- Experiment with looks safely
- Track meaningful progress
- Continuously personalize

### Core Loop
```
ANALYZE → UNDERSTAND → PRIORITIZE → RECOMMEND → EXECUTE → TRACK → RE-ANALYZE → PERSONALIZE
```

## 2. Problem

Young adults (18-30) interested in grooming/style face:
- Contradictory advice across TikTok, YouTube, Reddit
- No personalization to face shape, hair type, maintenance tolerance
- Anxiety from rating-focused apps (UMAX etc) that score 1-10 and hide results behind $4/week paywall
- No system to prioritize what matters vs obsess over micro-flaws
- No tracking for consistency
- No coach to ask "would this haircut suit me?"

User quote we want to earn:
> "I finally have a personalized roadmap instead of random advice."

## 3. Target User

Primary: 18-30, male and female, interested in grooming, skincare, hair, facial hair, smile presentation, style, posture, self-care, transformation. Early adopters from looksmaxing curiosity but seeking healthier approach.

Secondary: Anyone starting new job, dating, post-breakup glow-up, or maintaining professional presentation.

Psychographics:
- Wants clarity not vanity metrics
- Willing to do 5-15 min daily
- Values premium, calm, intelligent UX
- Worried about being judged or scammed

## 4. Product Philosophy

**"Enhance, don't obsess."**

Do:
- Build confidence
- Encourage self-care
- Make improvement actionable (What/Why/How/Effort/Timeline/Maintenance)
- Discover what suits user
- Encourage consistency
- Make progress visible
- Reduce decision fatigue
- Personalize

Do NOT:
- Tell user they are ugly
- Shame, create anxiety, encourage obsessive checking
- Promote bone smashing, unsafe DIY, dangerous dieting, hardmaxxing
- Diagnose medical conditions
- Promise unrealistic transformations
- Claim scientific certainty where none exists
- Define worth via attractiveness score

If user asks for unsafe practices → redirect to safer alternatives + mental health resources if needed.

## 5. Key Features (MVP)

### 5.1 Onboarding & Profile
- Short onboarding: age range, gender presentation for recommendations (inclusive), goals (3 max), grooming priorities, maintenance tolerance, budget, time availability
- Progressive disclosure, not 30 questions upfront
- Explicit photo consent

### 5.2 Photo Guidance & Capture
- Premium capture UI: lighting, distance, angle, neutral expression, hair visibility, quality checks
- Upload from gallery fallback
- Client-side quality validation before upload

### 5.3 AI Analysis (Provider-Agnostic)
- Face presentation, hair, facial hair, skin appearance, grooming, smile/dental presentation, style direction, posture/presentation
- Strengths first, then opportunities
- No 1-10 hotness score as hero metric. Use qualitative profile + bounded insights.
- If no provider configured: clearly label "Demo analysis — AI vision provider not configured"

### 5.4 Strengths + Top 3 Opportunities
Signature: Identify 3 highest-impact realistic opportunities, not 20 problems.
Each opportunity:
- WHAT, WHY, HOW, effort, timeline, maintenance

### 5.5 Impact Map
Visual matrix:
- HIGH IMPACT: Hair, Grooming, Skin routine
- MEDIUM: Facial hair styling, eyewear, clothing fit
- LOW PRIORITY: Minor details
Purpose: prevent obsession over tiny imperfections.

### 5.6 Personalized 30-Day Plan
- 7/30/60/90 architecture, MVP focuses on 30-day
- Each item: title, explanation, time, frequency, difficulty, category, completion, maintenance

### 5.7 Today Dashboard
Answers "What should I do today?"
- Greeting
- Daily focus
- Top priority
- Today's actions (checkable)
- Routine progress ring
- Quick insight
- Weekly consistency sparkline

### 5.8 Progress Tracking
Track consistency, not fake attractiveness scores:
- Routine completions, hairstyle changes, grooming, skincare consistency, saved looks, progress photos, weekly reflections
- Timeline, milestones, before/after with consistent lighting guidance
- No claim of scientifically measured improvement from small visual diffs

### 5.9 Look Lab
Explore hairstyles, hair length/texture, beard/moustache, grooming variations, eyewear, style direction
- Grounded in user face characteristics, preferences, maintenance tolerance
- For each look: Why it may suit, maintenance, styling effort, what to tell barber
- Not disconnected AI generator

### 5.10 Barber Mode
Generate concise barber card: cut name, sides/top/back, texture, fringe, styling, maintenance, reference image. Shareable as image/PDF.

### 5.11 AI Coach
Context-aware, not generic ChatGPT clone. Knows profile, goals, previous analysis, plan, completions, saved looks.
Answers: "What should I focus this week?", "Would this haircut suit me?"
Concise, actionable, contextual. Safety rails for medical/hardmaxxing.

### 5.12 Privacy/Settings
- Secure upload/storage, auth, deletion, privacy settings, minimal retention, no public exposure default, no selling facial data
- API keys server-side only

## 6. Non-Goals (MVP)
- Community/social feed, leaderboards, public ranking
- Medical diagnosis
- Surgery recommendations
- Marketplace for products (future consideration)
- Heavy gamification

## 7. Success Metrics

North Star: **Weekly Active Transformations (WAT)** — user who meaningfully analyzes, acts on, or tracks improvement in a week.

Funnel:
app_open → onboarding_completed → photo_uploaded → analysis_completed → plan_created → task_completed → weekly_review_completed → re-analysis

Retention: D1, D7, D30, WAT/WAU ratio

Qualitative: % users reporting clarity/confidence (survey), not just rating.

## 8. Emotional Journey

Before: Curiosity → Anticipation
During analysis: Discovery → Personalization
After: Clarity → Motivation → Confidence
During routine: Momentum → Consistency
Progress: Reflection → Visible progress → Motivation

Never make user feel "Something is wrong with me." Instead "Now I understand what suits me."

## 9. Constraints
- Must work on iOS + Android via Expo
- Provider-agnostic AI
- App Store + Play Store compliance: AI disclosure, subscription transparency, data safety, UGC moderation (for AI content flagging), health disclaimer
- Accessibility from start
- Premium editorial visual identity

## 10. Open Questions (to validate in beta)
- Ideal paywall timing: after first full value (not before results like UMAX)
- Will users pay $9.99/mo vs $39.99/year? Need price testing
- Look Lab realism expectations vs barber card utility
