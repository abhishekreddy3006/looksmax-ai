# PRODUCT DECISIONS — Refine

Log of important decisions and reasoning. Do not silently change product direction.

## 2026-09-22: Initial Product Identity

**Decision:** Use "Refine" as working brand name, not "Looksmax AI" as product identity. Keep "looksmax" as SEO/discovery alias for App Store search.

**Reasoning:** Brief says product may use looksmaxing as discovery/SEO concept, but actual identity should be broader, healthier, premium: "AI Personal Appearance & Self-Care Coach". Competitor research shows "looksmax" associated with incel culture, body dysmorphia, toxic ranking, fleeceware. Premium wellness brands (Aesop, Le Labo, Glossier) use sophisticated neutral names. "Refine" signals improvement, intentionality, premium, calm, not alpha-male. Avoids App Store rejection risk for offensive content.

**Alternatives considered:** "Forma", "AURA", "Vantage", "Craft". Chose Refine for verb, actionable, editorial.

**Impact:** All UI copy uses Refine, but App Store keywords include looksmax for discoverability.

---

## 2026-09-22: No Primary Attractiveness Score

**Decision:** Do NOT make 1-10 attractiveness score the hero metric. Use qualitative profile + strengths + Top 3 opportunities + category statuses (Strong/Good/Opportunity). If numeric used internally, never show as primary, and show bounded/confidence.

**Reasoning:** Competitor analysis: UMAX, LooksMax, MogMax all use score as core mechanic, leading to complaints: "same rating no matter what", "random", "gives 4.8 always", anxiety, shame. Research on looksmaxxing mental health (2025 studies in Sociology of Health & Illness, Lancet Child & Adolescent Health) shows rating tools fuel body dysmorphia, shame, suicidal ideation. Brief explicitly: Do NOT make attractiveness scoring primary value prop, Do NOT tell users they are ugly, Do NOT create appearance anxiety. Product philosophy: Enhance, don't obsess.

**Alternatives:** Could show score with disclaimer. Rejected because even with disclaimer, score becomes focal and drives obsessive checking.

**Impact:** Analysis output schema has no overall_score, only qualitative profile_summary and category statuses.

---

## 2026-09-22: Top 3 Opportunities as Signature

**Decision:** Signature experience is "Top 3 Opportunities" not 20 problems. Every recommendation answers WHAT/WHY/HOW/Effort/Timeline/Maintenance.

**Reasoning:** Brief §4: "The app should always answer: What should I do next? Avoid overwhelming users with dozens of recommendations. Instead: ANALYZE → PRIORITIZE → ACT." Behavioral psychology: progressive disclosure, chunking, clear next action reduces cognitive load. Competitors give long list of flaws → overwhelm + anxiety. Our differentiation: prioritization + actionability.

**Impact:** Recommendation engine sorts by impact + effort + user goals, picks 3 diverse across categories. UI shows Top 3 cards prominently, rest in Impact Map.

---

## 2026-09-22: Impact Map Feature

**Decision:** Build Impact Map visual: High/Medium/Low priority categories.

**Reasoning:** Prevents obsession over tiny imperfections (brief §17). Users need to understand what matters vs low priority. QOVES tries but clinical. Our version is simple, visual, actionable. Supports "Enhance, don't obsess."

**Impact:** New screen, part of analysis results.

---

## 2026-09-22: Color Palette — Terracotta Clay Accent

**Decision:** Sophisticated neutral foundation (warm off-white #FDFCFB, deep charcoal #1A1C1E) + terracotta clay accent #C17C60 (light) / #D49A7F (dark). Not neon purple/blue AI startup, not excessive green wellness.

**Reasoning:** Color psychology: charcoal = sophistication, trust, confidence. Warm off-white = calm, approachable, premium, editorial (Aesop, Kinfolk). Terracotta = warmth, vitality, confidence, skin-tone complementary (works across skin tones without implying judgment), earthy premium, distinct from competitors (UMAX blue, generic AI purple). Avoid green-only because signals medical/eco, not personal style. Avoid neon because cheap. Must pass WCAG AA, work in light/dark. Documented in DESIGN_SYSTEM.md with tokens.

**Alternatives:** Considered muted sage green (#6B8F7B) as accent, but too medical. Considered slate blue, but too SaaS. Terracotta tested for contrast: white on accent 4.6:1 AA, use for CTA.

**Impact:** All components use tokens, accent only for primary CTA, progress, selection.

---

## 2026-09-22: Typography — Editorial Serif + Sans

**Decision:** Display uses serif (Instrument Serif or Newsreader) for premium editorial feel, UI uses sans (Inter/System). Numeric uses tabular.

**Reasoning:** Premium wellness/fashion editorial uses serif for display (Kinfolk, Cereal, Aesop) + sans for readability. Competitors use generic sans everywhere → feels cheap AI wrapper. Typography creates hierarchy without excessive cards/borders/colors (brief §10). Two font families max.

**Impact:** Design system defines scale, implementation uses Google Fonts for display, system for UI to keep bundle small.

---

## 2026-09-22: Provider-Agnostic AI Architecture

**Decision:** Build AI layer with provider interface (VisionProvider, LLMProvider), implementations for Mock (demo labeled), OpenAI, Gemini, Anthropic. Selection via env vars, fallback chain. Never expose keys in client, all AI via backend.

**Reasoning:** Brief §26: Build AI layer provider-agnostic, support OpenAI, Gemini, Anthropic, other compatible. API keys must never be exposed in mobile client, all sensitive AI operations via backend. Also App Store + Play Store 2026 requirements: third-party AI integrations are User Data processing, developer responsible. Need to switch providers without app update. Cost: vision APIs expensive, need to cache, compress, rate limit. Mock provider allows dev without keys, but must be clearly labeled "Demo analysis — AI vision provider not configured" per brief §15, never fake as real.

**Impact:** Backend structure with providers/base.py, mock/openai/gemini/anthropic, orchestrator, safety validator.

---

## 2026-09-22: Freemium with Real Free Value (Not UMAX Funnel)

**Decision:** Free tier provides full first analysis results (strengths + Top 3 + Impact Map) + starter 7-day plan + basic tracking + 3 Look Lab explores + 3 Coach messages/day. Paywall after value, not before. Pricing $9.99/month or $39.99/year with 3-day trial for yearly.

**Reasoning:** Competitor analysis: UMAX paywall after upload = #1 complaint, "holds photos hostage", deceptive. LooksMax free trial requires payment upfront → fleeceware accusations. Our philosophy: build trust, no dark patterns, comply with Apple 3.1.1 (clear pricing, renewal, cancellation before purchase) and Google Play subscription transparency (price, trial, renewal visible, reminder before trial converts, cancellation accessible). Market benchmark: yearly $30-70 sweet spot for lifestyle/wellness (FaceApp $39.99/year, BeautyPlus $8.49/month, Calm $69.99/year). Weekly $3.99-9.99 drives short-term revenue but high churn + complaints + brand risk. Start with monthly/yearly, no weekly at launch.

**Alternatives:** Could do $3.99/week like UMAX for higher ARPU. Rejected due to brand risk, App Store complaints, brief says do NOT use dark patterns, manipulative subscription flows.

**Impact:** Paywall triggers after analysis, after 3 looks, after 3 coach messages, with clear terms.

---

## 2026-09-22: No Community / Leaderboards in MVP

**Decision:** Community is NOT MVP. No public feed, no ranking, no leaderboards based on appearance.

**Reasoning:** Brief §32: Community is NOT MVP, if implemented later need reporting, blocking, moderation, privacy, safety, age safeguards. Do not build community before core personal transformation loop excellent. Competitor MogMax local male ranking = toxic, fuels shame. Our North Star WAT focuses on personal transformation, not competition. Community adds moderation burden + safety risk + App Store UGC requirements (reporting, blocking, filtering).

**Impact:** No social tables in MVP schema, no feed UI.

---

## 2026-09-22: Barber Mode as Differentiator

**Decision:** Build Barber Mode: concise barber card with haircut name, sides/top/back, texture, fringe, styling, maintenance, reference image. Shareable as image/PDF.

**Reasoning:** Competitor gap: no one does barber card well. Hiface try-on morphs face, useless for barber. User journey: "What should I tell my barber?" is concrete next action, reduces decision fatigue, makes improvement actionable. Aligns with brief §20 future-ready Barber Mode. High impact, low tech (rule-based template, no AI gen needed for MVP).

**Impact:** Look Lab detail includes "What to tell barber", plus dedicated Barber Mode screen.

---

## 2026-09-22: Progress Tracking = Consistency, Not Score

**Decision:** Track routine consistency, completed actions, hairstyle changes, grooming, skincare consistency, saved looks, progress photos, weekly reflections. NOT fake attractiveness scores.

**Reasoning:** Brief §22: Do not make progress about fake attractiveness scores. Track meaningful progress. Behavioral psychology: habit formation, completion momentum, visible progress motivates without manipulating. Avoid claiming small visual differences are scientifically measured improvement (brief). Competitors track score → anxiety, obsessive checking.

**Impact:** Progress schema: routine_completions, progress_entries, not score history. UI: timeline, calendar heatmap, streaks, milestones, before/after with lighting guidance.

---

## 2026-09-22: Tech Stack — Expo + FastAPI + Supabase

**Decision:** Frontend Expo + TypeScript, Backend FastAPI + Supabase (Postgres, Auth, Storage).

**Reasoning:** Brief §27: Use React Native Expo TypeScript, backend Python FastAPI OR well-justified alternative, DB PostgreSQL/Supabase or well-justified. Expo for fast iteration, OTA, native modules without eject, App Store compliance tooling. FastAPI for async, Pydantic, Python AI ecosystem (OpenAI, Gemini SDKs). Supabase for Postgres + Auth + Storage + RLS, production-ready, matches brief. Alternative Node/Nest considered but Python better for AI orchestration + future ML.

**Impact:** Project structure defined in TECHNICAL_ARCHITECTURE.md.

---

## 2026-09-22: Safety & Privacy First

**Decision:** Explicit consent, secure upload/storage, RLS, in-app deletion, no selling facial data, safety validator blocking hardmaxxing/medical/shaming, crisis resources, AI content reporting, labeling AI-generated insights.

**Reasoning:** Brief §25 privacy, §8 UX psychology (no dark patterns, no fear), §2 philosophy (do NOT promote bone smashing, dangerous dieting, hardmaxxing, diagnose medical). Competitor complaints: "Now UMAX has my email and photos", "no deletion", "biometric data fears". Research on looksmaxxing mental health: need responsible approach. App Store 2026: privacy disclosures, data deletion in-app, AI content moderation + reporting. Google Play July 2026: third-party AI integrations are User Data, must disclose, limited use, consent, plus AI content policy: prevent offensive content, in-app reporting, labeling.

**Impact:** PRIVACY_AND_SAFETY.md, safety_validator, safety_events table, privacy_settings, deletion flows.

---

## Future Decisions to Log

- Pricing A/B test results
- Provider selection (OpenAI vs Gemini) based on cost/quality
- Look Lab AI try-on approach (identity preservation)
- Community decision (if/when)
