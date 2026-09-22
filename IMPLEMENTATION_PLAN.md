# IMPLEMENTATION PLAN — Refine (Concise)

## Research Summary (Done)

**Competitors:**
- UMAX: $500k/mo, polished but deceptive paywall AFTER upload, 1 scan/week even paid, inconsistent ratings → #1 complaint. Learning: show full value before paywall.
- LooksMax/LooxUP: 75k ratings, called fleeceware, random ratings (wall = 4.8), vanilla advice → need WHAT/WHY/HOW + maintenance.
- Hiface: Most accurate landmark mesh (9/10) but try-on morphs face, crashes, $9.99/week + $2.99 re-analyze → need identity-preserving try-on + barber card.
- QOVES: $150/year, 18 sections, 200 tests, human review, 28 days, clinical → too slow, not habit-forming. Opportunity: instant but thoughtful.
- MogMax/Youmax: Clones giving everyone 4.8, $7-20/mo, perceived fraud.

**Market Gap:** No one does Personalization + Actionability + Whole-appearance + Long-term tracking + Contextual Coach + Responsible approach.

**Store Policies 2026:**
- Apple: Must disclose AI data sharing with third-party providers, data deletion in-app, subscription transparency (price/renewal/cancellation), report AI content, no medical claims, demo account required.
- Google Play: July 2026 update — third-party AI = User Data processing (limited use, disclosure, consent), AI content must prevent offensive (sexual deepfakes, fraud, self-harm), in-app reporting, labeling, target API 36 by Aug 31 2026, subscription transparency + reminder before trial converts.

**Safety Risks:** Body dysmorphia, hardmaxxing (bone smashing, steroids), medical diagnosis, shame. Mitigation: safety validator, blocklist, redirect to safer alternatives + crisis resources, no 1-10 score, strengths first.

**Technical Risks:** AI provider cost/outage → compress to 1024px, cache by hash, rate limit 10/day free, fallback chain OpenAI→Gemini→Mock labeled demo. Privacy: RLS, private buckets, signed URLs, keys server-side only.

## Product Decisions (Key)

- Brand: **Refine** (premium wellness), SEO alias "looksmax" for discovery.
- No primary attractiveness score → qualitative profile + Strong/Good/Opportunity.
- Signature: **Top 3 Opportunities** + **Impact Map** (High/Med/Low).
- Color: warm off-white #FDFCFB + charcoal #1A1C1E + terracotta clay #C17C60 (confidence, vitality, skin-complementary, distinct from blue/purple AI).
- Typography: serif display (Instrument Serif) + sans UI (Inter).
- Provider-agnostic AI (Mock/OpenAI/Gemini/Anthropic), all via backend.
- Freemium with real free value: full first analysis free, $9.99/mo or $39.99/yr (no weekly fleeceware), paywall AFTER value.
- No community/leaderboards in MVP.
- Barber Mode as differentiator.
- Progress = consistency, not fake scores.

## Architecture (Ready)

- **Frontend:** Expo + TypeScript + Expo Router + Zustand + React Query + lucide icons + design tokens (light/dark) + analytics abstraction.
- **Backend:** FastAPI + Supabase (Postgres/Auth/Storage/RLS) + AI Orchestrator + Safety Validator + Recommendation Engine.
- **DB:** 15 tables (profiles, photos, analyses, observations, plans, plan_items, routines, completions, progress_entries, saved_looks, ai_conversations, messages, subscriptions, analytics_events, safety_events) — RLS, UUID, indexes.
- **AI:** System prompt "Enhance, don't obsess", structured JSON, WHAT/WHY/HOW/Effort/Timeline/Maintenance, safety blocklist.
- **Security:** Private buckets, signed URLs, JWT verification, rate limiting, no PII in logs, in-app deletion, AI disclosure + consent.

## MVP Scope (17 Phases)

1. Foundation + design system (tokens, theme, UI components, navigation)
2. Auth + onboarding (Apple/Google/Email, welcome, goals, preferences, consent, photo guidance)
3. Profile + goals
4. Photo capture/upload (camera oval guide, quality hints, compress, secure upload)
5. AI analysis architecture (FastAPI, provider interface, mock + real providers, safety)
6. Results + Top 3 (strengths, opportunities, detail sheet)
7. Impact Map (High/Med/Low visual)
8. Personalized plan (30-day, WHAT/WHY/HOW, completion)
9. Today dashboard (greeting, focus, priority, checklist, progress ring, insight, sparkline)
10. Progress tracking (timeline, heatmap, photos, weekly review)
11. AI Coach (context-aware, safety rails, 3/day free, report feature)
12. Look Lab + Barber Mode (curated library, filters, why suits, save, barber card shareable)
13. Subscriptions (StoreKit 2 + Play Billing 6+, paywall with clear pricing/renewal/cancellation, receipt verification)
14. Analytics (PostHog abstraction, events, funnels, WAT North Star)
15. Privacy/security (deletion, export, AI toggle, Data Safety accurate)
16. QA + polish (loading/empty/error/success, light/dark, a11y, performance, E2E)
17. App Store/Play prep (screenshots, preview, listings, TestFlight/Closed testing, phased release)

## Quality Bar

Every screen: premium, hierarchy obvious, spacing excellent, purpose in 2 sec, primary action obvious, motivates without manipulating, sophisticated/trustworthy, contrast AA, touch 44+, light/dark, loading/empty/error/success, no lorem ipsum, no dead buttons, no keys in client.

## Next Steps — Awaiting Approval to Build

**If approved, start Phase 1:**

```bash
npx create-expo-app@latest refine --template blank-typescript
cd refine
# Install deps: zustand, @tanstack/react-query, lucide-react-native, expo-secure-store, expo-camera, etc
# Create design/tokens.ts + theme.tsx + typography.tsx
# Build UI components: Button, Card, Chip, Tabs, ProgressRing, TextField, BottomSheet, Toast, Skeleton
# Setup Expo Router tabs: today, analysis, plan, looklab, progress, coach
# Setup lib/supabase.ts + analytics.ts
# EAS Build config
```

Then incremental phases 2-17, each with commit + push to arena branch, live preview via Expo web.

**Estimated timeline:** 4 weeks to MVP beta (if full-time), 6 weeks to store submission.

**Open question for you:** Approve Refine branding + terracotta palette + $39.99/yr pricing? Any adjustments before I start coding Phase 1?
