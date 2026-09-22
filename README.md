# Refine — AI Personal Appearance & Self-Care Coach

> **Working identity:** Refine  
> **Tagline:** Know what suits you. Know what to improve. Know what to do next.  
> **Discovery alias:** Looksmax AI (for SEO, but product identity is premium wellness)

Premium, trustworthy, psychologically healthy **personal appearance operating system** that replaces random TikTok/Reddit advice with a personalized, actionable roadmap.

**Not a generic face-rating app. Attractiveness scoring is not the core mechanic.**

## Core Loop

```
ANALYZE → UNDERSTAND → PRIORITIZE → RECOMMEND → EXECUTE → TRACK → RE-ANALYZE → PERSONALIZE
```

Signature: **Top 3 Opportunities** + **Impact Map** + **Barber Mode** + **Contextual AI Coach**

Philosophy: **Enhance, don't obsess.**

## Product Vision

Help users:
1. Understand current appearance
2. Identify realistic improvement opportunities
3. Prioritize highest-impact areas
4. Receive personalized recommendations (WHAT/WHY/HOW/Effort/Timeline/Maintenance)
5. Build daily/weekly routines
6. Experiment with hairstyles, facial hair, style (Look Lab)
7. Track meaningful progress (consistency, not fake scores)
8. Re-analyze and continuously personalize

Feeling: "This app actually understands me and tells me exactly what I should work on."

## Documentation

Before building, we documented everything per brief §39:

- [PRODUCT_PRD.md](./PRODUCT_PRD.md) — Vision, problem, target, features, success metrics
- [COMPETITOR_ANALYSIS.md](./COMPETITOR_ANALYSIS.md) — UMAX, LooksMax, Hiface, QOVES, MogMax, Youmax, gaps
- [USER_FLOWS.md](./USER_FLOWS.md) — IA + 10 flows (onboarding, photo, dashboard, analysis, plan, Look Lab, progress, coach, settings, paywall)
- [MVP_SCOPE.md](./MVP_SCOPE.md) — In scope/out of scope, quality checklist, phases
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Color psychology, palette (warm off-white + charcoal + terracotta clay), typography, spacing, components, motion, accessibility
- [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md) — Expo + TS frontend, FastAPI + Supabase backend, structure, security, payments, performance
- [AI_ARCHITECTURE.md](./AI_ARCHITECTURE.md) — Provider-agnostic interface, prompts, safety validation, recommendation engine, cost
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) — Tables (users, profiles, photos, analyses, observations, plans, routines, progress, saved_looks, ai_conversations, subscriptions, etc), RLS
- [PRIVACY_AND_SAFETY.md](./PRIVACY_AND_SAFETY.md) — Consent, storage, deletion, AI disclosure, safety rails, App Store/Play compliance
- [ANALYTICS_PLAN.md](./ANALYTICS_PLAN.md) — North Star WAT, events, funnels, dashboards
- [MONETIZATION_PLAN.md](./MONETIZATION_PLAN.md) — Freemium with real free value, $9.99/mo or $39.99/yr, no dark patterns
- [LAUNCH_PLAN.md](./LAUNCH_PLAN.md) — Store guidelines 2026, listings, beta, phased release, monitoring
- [ROADMAP.md](./ROADMAP.md) — Phases 0-17 MVP + post-MVP
- [PRODUCT_DECISIONS.md](./PRODUCT_DECISIONS.md) — Key decisions log

## Design Direction

Premium wellness + modern fashion editorial + high-end beauty tech + Apple simplicity + premium fintech clarity.

- Base: warm off-white #FDFCFB, deep charcoal #1A1C1E, subtle neutral borders
- Accent: terracotta clay #C17C60 (confidence, vitality, personalization)
- Semantic tokens, light + dark mode, WCAG AA
- Typography: serif display (Instrument Serif) + sans UI (Inter), hierarchy via type not excessive cards
- Spacing: 4pt base, generous whitespace, 44pt touch targets
- Motion: subtle fade/slide/scale, breathing for analysis, reduced-motion support

## Tech Stack

- **Mobile:** React Native + Expo + TypeScript + Expo Router + Zustand + React Query
- **Backend:** Python + FastAPI + Pydantic + Supabase (Postgres, Auth, Storage, RLS)
- **AI:** Provider-agnostic (Mock labeled demo + OpenAI vision + Gemini + Anthropic for coach), safety validation, recommendation engine
- **Payments:** StoreKit 2 + Play Billing Library 6+
- **Analytics:** Abstraction (PostHog)
- **Infra:** Fly.io/Render + Supabase Cloud + EAS Build + EAS Update

## MVP Features

1. Onboarding (welcome, goals, preferences, privacy consent, photo guidance)
2. Auth (Apple, Google, Email)
3. Photo capture/upload with quality check
4. AI analysis architecture (provider-agnostic, demo labeled)
5. Strengths + Top 3 Opportunities + Impact Map
6. Category breakdown (face, hair, facial hair, skin, grooming, smile, style, posture)
7. Personalized 30-day plan (WHAT/WHY/HOW/Effort/Timeline/Maintenance)
8. Today dashboard (focus, priority, actions, progress ring, insight)
9. Progress tracking (timeline, consistency, photos, weekly review)
10. AI Coach (context-aware, safety rails, 3/day free)
11. Look Lab basic (explore, save, Barber Mode card)
12. Privacy/settings + account deletion in-app
13. Analytics + subscriptions (architecture, responsible paywall)

Out of scope MVP: community, leaderboards, surgery recs, marketplace, heavy gamification

## Safety & Privacy

- Explicit consent before AI processing
- Photos private, encrypted, never sold, deletable anytime
- API keys server-side only
- No medical diagnosis, no hardmaxxing (bone smashing, steroids, etc) — redirect to safer alternatives + crisis resources
- AI-generated content labeled, in-app reporting
- Data deletion in-app (Apple 5.1.1(v)), Data Safety form accurate, App Privacy labels accurate
- Target API 36, StoreKit 2, Play Billing 6+, reminder before trial converts

## Implementation Plan (Concise)

**Phase 0 (Done):** Research + documentation (this repo)

**Next — Awaiting approval to build:**

- **Phase 1:** Foundation + design system (tokens, theme, UI components, navigation)
- **Phase 2:** Auth + onboarding
- **Phase 3:** Profile + goals
- **Phase 4:** Photo capture/upload
- **Phase 5:** AI analysis architecture (FastAPI + providers + safety)
- **Phase 6-7:** Results + Top 3 + Impact Map
- **Phase 8-9:** Plan + Today dashboard
- **Phase 10:** Progress tracking
- **Phase 11:** AI Coach
- **Phase 12:** Look Lab + Barber Mode
- **Phase 13-15:** Subscriptions + Analytics + Privacy/Security
- **Phase 16-17:** QA + polish + App Store/Play prep

Each phase: build → loading/empty/error/success states → light/dark → accessibility → commit.

## Getting Started (After Approval)

```bash
# Mobile
npx create-expo-app@latest --template blank-typescript
npm install zustand @tanstack/react-query lucide-react-native expo-secure-store expo-camera expo-image-picker expo-image-manipulator

# Backend
cd backend
python -m venv venv
pip install fastapi uvicorn supabase openai google-generativeai anthropic pydantic python-multipart
```

Env (server-side only):
```
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
OPENAI_API_KEY= # optional, else mock demo
GEMINI_API_KEY= # optional
ANTHROPIC_API_KEY= # optional
```

## Quality Bar

Feels like real startup product, not AI prototype. Every screen polished. No lorem ipsum, no dead buttons, no inconsistent spacing/colors/typography, no fake data as real, no exposed keys.

## License

Private — All rights reserved.
