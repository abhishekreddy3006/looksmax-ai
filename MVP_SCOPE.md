# MVP SCOPE — Refine

## MVP Goal
Deliver a production-quality, App Store-ready mobile app that proves the core loop:
ANALYZE → UNDERSTAND → PRIORITIZE → RECOMMEND → EXECUTE → TRACK → RE-ANALYZE

First aha: "This app actually understands me and tells me exactly what I should work on."

Quality bar: Feels like real startup product, not AI prototype. Every screen has loading, empty, error, success states. No lorem ipsum, no dead buttons.

## In Scope (Must Have)

### 1. Foundation + Design System
- Expo + TypeScript + React Native
- Design tokens (light/dark), typography, spacing, components (see DESIGN_SYSTEM.md)
- Navigation: tabs + stack, safe areas, gestures
- Accessibility baseline

### 2. Authentication + Onboarding
- Apple, Google, Email auth (Supabase Auth)
- Welcome slides (3)
- Goals selection (max 3)
- Preferences (maintenance, time, budget)
- Privacy consent
- Photo guidance screen

### 3. Profile + Goals
- Profile storage, edit goals/preferences
- Onboarding data → personalization

### 4. Photo Capture/Upload
- Camera with oval guide, quality hints
- Gallery upload fallback
- Client-side quality check (blur, brightness, face count via on-device detection if possible, else server)
- Secure upload to object storage (Supabase Storage)

### 5. AI Analysis Architecture
- Backend: FastAPI + provider interface
- Providers: Mock/heuristic (labeled as demo) + OpenAI vision + Gemini vision (interface ready)
- Safety validation layer
- Structured analysis output: profile, strengths, opportunities, impact map
- Never expose API keys in client
- If no key: "Demo analysis — AI vision provider not configured"

### 6. Analysis Results
- Overall profile (qualitative)
- Strengths (3-4 cards)
- Top 3 Opportunities (cards with WHAT/WHY/HOW/Effort/Timeline/Maintenance)
- Category breakdown (Face Presentation, Hair, Facial Hair, Skin, Grooming, Smile, Style, Posture)
- No primary 1-10 attractiveness score

### 7. Impact Map
- Signature visual: High/Medium/Low priority matrix
- Prevents obsession over micro-flaws

### 8. Personalized Plan
- 30-day plan generation based on Top 3
- Each item: title, explanation, time, frequency, difficulty, category, completion, maintenance
- 7-day view + 30-day view
- Completion toggle → updates dashboard/progress

### 9. Today Dashboard
- Greeting, daily focus, top priority, today's actions checklist, routine progress ring, quick insight, weekly consistency
- Checkable tasks with micro-feedback

### 10. Progress Tracking
- Timeline (analyses, photos, milestones)
- Consistency calendar/heatmap, streaks, weekly completion
- Progress photos with guidance
- Weekly review (summary + reflection prompt + re-analyze CTA)
- No fake attractiveness score tracking

### 11. AI Coach (Basic)
- Context-aware chat (knows profile, goals, analysis, plan)
- Suggested prompts
- Safety rails: no medical diagnosis, no hardmaxxing, redirect to safer alternatives
- Free: 3 messages/day, premium unlimited
- In-app report AI content (Play Store requirement)

### 12. Look Lab (Basic)
- Explore hairstyles, beard/moustache, eyewear
- Filters by maintenance, length
- Detail: Why suits, maintenance, styling effort, what to tell barber
- Save looks
- Try-on that preserves identity (MVP can use illustration + description if no image gen provider; label clearly)
- Barber Mode: Generate barber card (shareable image)

### 13. Privacy/Settings
- Profile edit
- Privacy & Data: data stored, deletion, download
- Notifications opt-in
- Help & Safety + mental health resources
- Account deletion in-app (Apple requirement)
- Secure storage, auth, access controls

### 14. Analytics (Abstraction)
- Event abstraction layer (can plug PostHog/Mixpanel later)
- Events: app_open, onboarding_started/completed, goal_selected, photo_started/uploaded/quality_failed, analysis_started/completed, recommendation_viewed, priority_selected, plan_created, task_completed, look_lab_opened, look_saved, progress_photo_added, weekly_review_completed, ai_coach_opened, ai_question_sent, paywall_viewed, trial_started, subscription_started/cancelled

### 15. Subscriptions (Architecture, not aggressive paywall)
- StoreKit 2 + Play Billing Library 6+ ready
- Paywall component with clear pricing, renewal, cancellation
- Entitlement check
- Free tier provides real value: first analysis full results, starter plan, limited Look Lab, basic tracking, 3 Coach messages/day
- Premium: deeper personalization, advanced analysis, AI Coach unlimited, advanced Look Lab, expanded plans, additional analysis sessions
- No manipulative flows, no dark patterns

### 16. Production-Quality Navigation + Polish
- Loading, empty, error, success states everywhere
- Skeleton loaders
- Toast/snackbar
- Haptics
- Reduced motion support

## Out of Scope (Post-MVP)

- Community/social feed, comments, likes, leaderboards
- Public sharing of scores
- Marketplace / product recommendations with affiliate
- Advanced AI image generation (full try-on) — MVP uses description + illustration, clearly labeled
- 60/90 day plans (architecture ready, but locked teaser in MVP)
- Push notifications beyond weekly review + daily reminder opt-in
- Web app
- Admin dashboard (can use Supabase dashboard for MVP)
- Multi-language (English only MVP, architecture i18n-ready)

## Quality Checklist per Screen (Definition of Done)

- [ ] Looks premium? Hierarchy obvious? Spacing excellent? Typography/colors consistent? Feels like one product?
- [ ] Purpose obvious in 2 sec? Primary action obvious? Cognitive load low?
- [ ] Motivates without manipulating? Reduces anxiety? Encourages healthy progress?
- [ ] Sophisticated, trustworthy, aspirational, personalized?
- [ ] Contrast sufficient? Touch targets 44pt+? Works without color alone? Screen reader labels?
- [ ] Loading state
- [ ] Empty state with CTA
- [ ] Error state with specific fix
- [ ] Success state
- [ ] Works in light + dark mode
- [ ] Works on iOS + Android, handles safe areas, keyboard, permissions

## Technical Quality

- [ ] No API keys in client
- [ ] Provider-agnostic AI layer
- [ ] Secure upload/storage
- [ ] No lorem ipsum
- [ ] No broken buttons / fake nav / dead screens
- [ ] No inconsistent spacing/colors/typography
- [ ] No fake data presented as real
- [ ] Error handling everywhere

## MVP Milestones (from brief §42)

Phase 1: Foundation + design system
Phase 2: Auth + onboarding
Phase 3: Profile + goals
Phase 4: Photo capture/upload
Phase 5: AI analysis architecture
Phase 6: Results + Top 3
Phase 7: Impact Map
Phase 8: Personalized plan
Phase 9: Today dashboard
Phase 10: Progress tracking
Phase 11: AI Coach
Phase 12: Look Lab
Phase 13: Subscriptions
Phase 14: Analytics
Phase 15: Privacy/security
Phase 16: QA + polish
Phase 17: App Store / Play prep
