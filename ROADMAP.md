# ROADMAP — Refine

## Vision
Build premium appearance OS that replaces random advice with personalized roadmap.

## Phase 0: Foundation (Week 1-2) — CURRENT
- [x] Market & competitor research (UMAX, LooksMax, Hiface, QOVES, MogMax, Youmax)
- [x] Store policy research (Apple 2026, Google Play July 2026 AI update)
- [x] Privacy/safety risks, technical risks
- [x] PRD, competitor analysis, user flows, MVP scope, design system, technical arch, AI arch, DB schema, privacy/safety, analytics, monetization, launch plan, roadmap, product decisions, README
- [ ] Implementation plan approval

## Phase 1: Foundation + Design System (Week 3)
- Expo + TypeScript + Expo Router setup
- Design tokens (light/dark), theme context, typography, spacing
- Core UI components: Button, Card, Chip, Tabs, Progress Ring/Bar, TextField, Bottom Sheet, Toast, Skeleton, Empty/Error
- Navigation: tabs + stack, safe areas, gestures
- Analytics abstraction, Supabase client
- EAS Build config

## Phase 2: Auth + Onboarding (Week 4)
- Supabase Auth (Apple, Google, Email OTP)
- Welcome slides (3)
- Goals selection (max 3)
- Preferences (maintenance, time, budget)
- Privacy consent + photo guidance
- Onboarding persistence, profile creation

## Phase 3: Profile + Goals (Week 4-5)
- Profile store (Zustand)
- Edit goals/preferences
- Privacy settings skeleton

## Phase 4: Photo Capture/Upload (Week 5)
- Camera with oval guide, quality hints
- Gallery upload
- Client-side quality check (blur, brightness, face count via expo-face-detector)
- Compress (1080p, JPEG 0.8)
- Secure upload to Supabase Storage private bucket
- Photo session creation

## Phase 5: AI Analysis Architecture (Week 6)
- FastAPI backend setup, Docker, deploy to Fly.io
- Provider interface + MockProvider (demo labeled)
- OpenAI + Gemini providers (if keys)
- Safety validator
- Recommendation engine (Top 3 prioritization, Impact Map)
- Endpoints: POST /api/analyze, GET /api/analyze/:id
- Supabase tables: photos, photo_sessions, analyses, analysis_observations
- RLS policies

## Phase 6: Analysis Results + Top 3 (Week 7)
- Results screen: profile summary, strengths, Top 3 opportunities, category breakdown
- Opportunity detail bottom sheet (WHAT/WHY/HOW/Effort/Timeline/Maintenance)
- No primary 1-10 score
- Demo label handling

## Phase 7: Impact Map (Week 7)
- Signature visual: High/Med/Low matrix
- Category cards

## Phase 8: Personalized Plan (Week 8)
- Plan generation (30-day) based on Top 3
- Plan items: title, explanation, time, frequency, difficulty, category, week, completion
- 7-day + 30-day tabs
- Completion toggle → updates dashboard/progress
- Backend: POST /api/plan/generate, GET /api/plan/current, POST /api/plan/item/:id/complete

## Phase 9: Today Dashboard (Week 8-9)
- Greeting, daily focus, top priority, today's actions checklist, progress ring, quick insight, weekly consistency sparkline
- Checkable tasks with micro-feedback + haptics
- Empty state

## Phase 10: Progress Tracking (Week 9-10)
- Timeline (analyses, photos, milestones)
- Consistency calendar/heatmap, streaks, weekly completion
- Progress photos with guidance, before/after comparison
- Weekly review (summary + reflection + re-analyze CTA)
- Backend: progress_entries, routine_completions

## Phase 11: AI Coach (Week 10-11)
- Chat UI with context header
- Suggested prompts
- Backend: POST /api/coach/message with streaming or JSON
- LLM provider (Anthropic/OpenAI) with system prompt including profile/analysis/plan
- Safety rails, report feature
- Free 3/day limit, premium unlimited
- Tables: ai_conversations, ai_messages

## Phase 12: Look Lab (Week 11-12)
- Curated look library (illustrations + reference photos, diverse, licensed)
- Explore grid, filters (category, maintenance, length)
- Detail: Why suits, maintenance, styling effort, what to tell barber, Save, Ask Coach
- Saved looks collection, compare
- Barber Mode: generate card (haircut name, sides/top/back, texture, fringe, styling, maintenance, reference image), share as image
- Backend: saved_looks, barber card generation (rule-based)
- No AI image gen in MVP (labeled clearly if used)

## Phase 13: Subscriptions (Week 12-13)
- StoreKit 2 + Play Billing Library 6+ integration
- Paywall component with clear pricing, renewal, cancellation, restore
- Entitlement check
- Backend receipt verification
- Free tier enforcement: 1 analysis/month, 3 looks, 3 coach/day, 7-day plan full
- Premium: unlimited, advanced, 30/60/90 day
- Reminder notification before trial ends

## Phase 14: Analytics (Week 13)
- PostHog integration via abstraction
- All events from ANALYTICS_PLAN.md
- Dashboards: acquisition, activation, retention (WAT), engagement, monetization, quality
- Funnel tracking

## Phase 15: Privacy/Security (Week 13-14)
- Privacy & Data screen: what stored, deletion, download, AI toggle
- Delete photo, delete account in-app
- Download data JSON
- Data Safety + App Privacy accurate
- Safety validator + safety_events + report AI content + crisis resources
- Audit: no keys in client, RLS, private buckets, JWT verification, rate limiting, no PII in logs

## Phase 16: QA + Polish (Week 14-15)
- QA checklist per screen (DESIGN_SYSTEM.md)
- Test on iOS + Android physical devices, light/dark, dynamic type, VoiceOver, reduced motion
- Performance: bundle size, image compression, analysis latency
- E2E: Maestro for onboarding → analysis → plan → task → progress
- Bug bash, fix crashes, empty/error states
- Copy polish: supportive, not shaming, premium tone

## Phase 17: App Store / Play Store Prep (Week 15-16)
- Screenshots, preview video, descriptions, keywords, support/privacy URLs
- TestFlight internal + external beta (2 weeks)
- Play Internal + Closed testing
- App Review Information: demo account, steps, permissions, subscription sandbox
- Submit for review
- Phased release plan (1% → 100%)

## Post-MVP (Month 4-6)

### 2.1 Advanced Personalization
- Skin appearance tracking (not diagnosis)
- Style direction with wardrobe
- Posture/presentation via video guidance
- Adaptive plans based on completions

### 2.2 Look Lab v2
- AI try-on with identity preservation (ControlNet + face parsing)
- Hair color, eyewear AR
- Barber Mode v2 with PDF + QR

### 2.3 Coach v2
- Voice, proactive nudges ("Your weekly review is ready")
- Integration with plan (auto-suggest next action)

### 2.4 Community (Careful)
- Anonymous transformation timelines (opt-in), no scores, no ranking
- Reporting, blocking, moderation, age safeguards
- Only after core loop excellent

### 2.5 Monetization Expansion
- One-time barber card pack
- Partnerships with barbershops (referral, not ads)
- Web app for progress

### 2.6 Platform
- i18n (Spanish, etc)
- Apple Watch complications for daily reminder
- Widgets

## Success Criteria for MVP Launch

- Crash-free >99.5%
- Onboarding completion >60%
- Analysis success >90%
- First task completion within 24h >50%
- D7 WAT >30%
- Trial start 5-10%, trial→paid 40%+
- App Store rating >4.5 after 50 reviews
- Zero critical privacy/safety incidents
- No App Store rejection for AI content or subscriptions (pass first time with proper disclosures)

## Risks & Mitigations (Ongoing)

- AI provider cost → compress, cache, rate limit, mock for dev
- App Store rejection → follow LAUNCH_PLAN checklist, provide demo account, video, clear disclosures
- Privacy concerns → explicit consent, deletion, minimal retention, data safety accurate
- Mental health → responsible messaging, no shaming, crisis resources, safety validator
- Competition → differentiation via personalization + actionability + responsible approach, not score
