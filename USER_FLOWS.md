# USER FLOWS — Refine

## Information Architecture

```
Root (Auth Gate)
├── Onboarding (first launch)
│   ├── Welcome (value prop)
│   ├── Goals (select up to 3)
│   ├── Preferences (maintenance, time, budget)
│   ├── Privacy Consent + Photo Guidance
│   └── Auth (Apple, Google, Email)
├── Main Tabs (after onboarding)
│   ├── Today (Dashboard) — DEFAULT
│   ├── Analysis (Profile + Results + Impact Map)
│   ├── Plan (30-day + routines)
│   ├── Look Lab (Explore + Saved + Barber Mode)
│   ├── Progress (Timeline + Photos + Reflections)
│   └── Coach (AI Chat)
└── Settings
    ├── Profile
    ├── Privacy & Data
    ├── Notifications
    ├── Subscription / Paywall
    ├── Help & Safety
    └── Account Deletion
```

## Flow 1: First Launch → Aha Moment

1. Splash (logo, 800ms)
2. Welcome: 3 slides (Know what suits you / Know what to improve / Know what to do next) + CTA "Start"
3. Goals: "What do you want to focus on?" Chips: Grooming, Hair, Facial Hair, Skin, Style, Smile, Posture, Confidence, Routine. Max 3. Show personalized example.
4. Preferences: Maintenance tolerance (Low/Medium/High), Daily time (5/10/15+ min), Budget ($/$$/$$$). Sliders, not forms.
5. Privacy Consent: Plain language: "Your photos are private, encrypted, never sold, deleted on request. We send them to [Provider] for analysis only with your consent." Checkbox + link to Privacy.
6. Auth: Apple/Google/Email. Explain why account needed (save progress).
7. Photo Guidance: Beautiful illustration + bullet list: natural light facing window, 30-50cm distance, neutral expression, hair visible, no filter. CTA "Take Photo" + "Upload from Gallery".
8. Capture: Camera with oval guide, live quality hints (too dark, too close). After capture, quality check (blur, lighting). If fail → specific fix, not generic error.
9. Analysis Loading: Premium purposeful animation (not fake tech). Steps: "Analyzing proportions... Identifying strengths... Prioritizing opportunities..." 3-5 sec even if mock, with ability to background.
10. Results: Strengths first → Top 3 Opportunities → Impact Map → CTA "See My 30-Day Plan". This is Aha: "This app actually understands me".
11. Plan: 30-day plan generated. CTA "Start Today".
12. Today Dashboard: First tasks checked? Show empty state with first action.

Analytics: onboarding_started, goal_selected, preferences_completed, photo_started, photo_uploaded, photo_quality_failed, analysis_started, analysis_completed, plan_created.

## Flow 2: Photo Capture / Re-Analysis

Entry: Analysis tab → "New Analysis" or Progress → "Add Progress Photo" or Weekly Review → "Re-analyze".

Steps: Guidance → Capture → Quality Check → Consent re-confirmation if needed → Upload → Analysis → Comparison view (if re-analysis): "What's changed since last time? Consistency improved" not "You are 0.3 more attractive".

Edge: Poor lighting → show example good vs bad, allow retake. Multiple faces → "We detected multiple faces, please use solo photo". No face → specific.

## Flow 3: Today Dashboard Daily Loop

Morning open:
- Greeting: "Good morning, Alex"
- Daily Focus: "Hair + Grooming" (based on plan)
- Top Priority: Card with 1 action from Top 3
- Today's Actions: Checklist (5-min grooming routine, skincare, review saved hairstyle, hydration). Each with time estimate.
- Progress Ring: Weekly completion 4/5
- Quick Insight: "Your routine is becoming more consistent"
- Progress Snapshot: Mini timeline
- Weekly Consistency: Sparkline

Interaction:
- Check task → micro-feedback animation + haptic + "Nice consistency!"
- Tap task → detail sheet: WHAT/WHY/HOW/Effort/Timeline/Maintenance
- All done → celebration, not shaming for incomplete.

Evening: Optional reflection prompt "How did grooming feel today?" (not mandatory).

## Flow 4: Analysis Results Deep Dive

Structure:
1. Overall Profile: Qualitative summary, not 1-10 score. Example: "Balanced proportions with strong eye area, opportunity in grooming consistency"
2. Strengths (3-4): Each with evidence and how to leverage
3. Top 3 Opportunities: Cards with impact label (High/Med), effort, timeline
   - Tap → Detail: What, Why, How, Effort, Timeline, Maintenance, Related Plan Items
4. Impact Map: Visual matrix High/Med/Low priority categories
5. Categories Breakdown: Face Presentation, Hair, Facial Hair, Skin, Grooming, Smile, Style, Posture — each with qualitative status (Strong / Good / Opportunity) not numeric.
6. CTA: "Create My Plan" or "Explore Looks for This"

Empty: No analysis yet → CTA to capture.

## Flow 5: Personalized Plan

- Tabs: 7-day / 30-day (MVP focus 30-day) / 60 / 90 (locked for premium teaser)
- List of items grouped by week
- Each item: checkbox, category chip, time, difficulty dots
- Tap → Bottom sheet with full details + "Why recommended" linked to analysis + completion toggle + "Add to Today"
- Progress bar per week
- Premium upsell: "Unlock 60/90 day + advanced routines"

Completion: Mark done → updates Today dashboard + Progress + streak.

## Flow 6: Look Lab

Entry: Tab → Explore / Saved / Barber Mode

Explore:
- Filters: Category (Hair, Beard, Moustache, Eyewear), Length, Maintenance, Face Shape Suitability
- Grid of looks (illustrations or AI-generated try-on that preserves identity)
- Tap look → Detail: Why it may suit you (based on face shape, hair texture), Maintenance (Low/Med/High), Styling effort (minutes), What to tell barber, Save, Try Barber Mode
- "Ask Coach" CTA: "Would this suit me?"

Saved:
- Collection of saved looks, with notes
- Compare: side-by-side current vs saved

Barber Mode:
- Generate card: Haircut name, Sides (fade #), Top (length), Back, Texture, Fringe, Styling, Maintenance, Reference image
- Share as image, PDF, or show fullscreen for barber
- Edit fields

Empty: "Save your first look" with suggested.

## Flow 7: Progress Tracking

- Timeline: Vertical timeline of analyses, progress photos, completed milestones, saved looks
- Consistency: Calendar heatmap, streaks, weekly completion %
- Photos: Grid, tap → before/after comparison with lighting guidance. Prompt for consistent capture.
- Milestones: "7-day streak", "First barber visit", etc. Lightweight, no attractiveness ranking
- Weekly Review: Every Sunday, summary: completed actions, consistency, reflection prompt, option to re-analyze
- Insights: "You've improved grooming consistency" not "You are more attractive"

Add Photo Flow: Guidance → Capture → Tag (haircut, grooming, etc) → Add note → Save.

## Flow 8: AI Coach

- Chat UI with context header: "Coach knows your Top 3 and plan"
- Suggested prompts: "What should I focus this week?", "Would this haircut suit me?", "How do I maintain this?", "Why did you recommend this?"
- Message types: text, recommendation card, plan item, look card
- Safety: If user asks medical diagnosis, hardmaxxing, bone smashing → redirect: "I can't help with that, but here's safer alternative..." + resources
- Premium: Free users get 3 messages/day, preview of contextual answers. Paywall after limit, not before first value.

## Flow 9: Settings & Privacy

- Profile: Edit goals, preferences
- Privacy & Data: What data we store, who we share with (AI provider), retention, delete photos, delete account, download data
- Notifications: Weekly review, daily reminders (opt-in, not spam)
- Subscription: Manage, restore, terms, pricing, cancellation instructions (App Store compliance)
- Help & Safety: How analysis works, limitations, mental health resources, report AI content
- Account Deletion: In-app deletion per Apple requirement (not just website)

## Flow 10: Paywall (Responsible)

Trigger points (after value, not before):
- After first analysis results: show full results free, but "Unlock 60/90 day plan + advanced Look Lab + unlimited Coach" → paywall
- Look Lab: 3 free explores, then paywall
- Coach: 3 messages/day free
- Progress: Advanced insights premium

Paywall must show:
- Price, renewal terms, trial length if any, what you get, cancellation instructions, link to Terms/Privacy
- No dark patterns: No pre-checked, no hidden trial end, no 5+ taps to cancel, reminder before trial converts (per Google sweep 2025)

## Error States

- No internet: Friendly illustration + retry
- Analysis failed: "We couldn't analyze this photo — lighting too low" + specific fix + retry, not generic
- Photo quality failed: Show why + example
- AI provider down: "Demo analysis — provider not configured" + retry later
- Auth failed: Clear message
- Empty states for each tab with CTA

## Accessibility Flows

- VoiceOver labels for all interactive elements
- Dynamic Type support
- Reduced motion: Disable entrance animations if OS setting on
- Color-independent status: Icons + text, not just color
- Touch targets min 44pt
