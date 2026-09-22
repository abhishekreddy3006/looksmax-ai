# TECHNICAL ARCHITECTURE — Refine

## Overview

```
React Native (Expo + TypeScript)
    ↓ HTTPS / Supabase JS + REST
Backend: FastAPI (Python) + Supabase (Postgres, Auth, Storage)
    ↓
AI Orchestration Layer (provider-agnostic)
    ↓
Vision Provider (OpenAI / Gemini) + LLM Provider (OpenAI / Anthropic)
    ↓
Structured Analysis + Safety Validation + Recommendation Engine
    ↓
Mobile App
```

## Frontend: React Native + Expo + TypeScript

### Why Expo
- Fast iteration, OTA updates (EAS Update), native modules without ejecting
- Camera, FileSystem, SecureStore, Haptics built-in
- App Store / Play Store compliance tooling
- Supports both iOS/Android with platform-appropriate UX

### Stack
- **Expo SDK 52+** (latest stable)
- **TypeScript** strict
- **Expo Router** for file-based navigation (tabs + stack)
- **React Navigation** under Expo Router
- **State:** Zustand or Jotai for global (profile, plan, auth), React Query for server state
- **Forms:** React Hook Form + Zod validation
- **Styling:** StyleSheet + design tokens (no Tailwind for premium control), or Restyle for token enforcement
- **Storage:** expo-secure-store for tokens, AsyncStorage for prefs
- **Camera:** expo-camera + expo-image-picker + expo-image-manipulator (compress, quality check)
- **Analytics:** Abstraction layer `lib/analytics.ts` with PostHog/Mixpanel adapter
- **Payments:** expo-in-app-purchases + StoreKit 2 / Play Billing Library 6 via native modules (EAS)
- **Notifications:** expo-notifications (opt-in only)
- **Icons:** lucide-react-native

### Project Structure
```
app/                      # Expo Router
  (auth)/login, register
  (onboarding)/welcome, goals, preferences, photo-guidance
  (tabs)/today, analysis, plan, looklab, progress, coach
  settings/
  paywall/
components/
  ui/ (Button, Card, Chip, etc from design system)
  analysis/ (StrengthCard, OpportunityCard, ImpactMap)
  plan/ (PlanItem, ProgressRing)
  looklab/ (LookCard, BarberCard)
design/
  tokens.ts
  theme.tsx
  typography.tsx
lib/
  supabase.ts
  api.ts (backend client)
  analytics.ts
  safety.ts (client-side checks)
hooks/
  useAuth, useProfile, useAnalysis, etc
store/
  authStore, profileStore, planStore
types/
  analysis, plan, look, etc
```

### Key Decisions
- No API keys in client. All AI calls go through backend `/api/analyze`, `/api/coach`.
- Client-side quality check before upload: blur detection (simple variance), brightness histogram, face count via expo-face-detector (on-device) if available.
- Offline: cache last analysis + plan, queue completions.

## Backend: FastAPI (Python) + Supabase

### Why FastAPI + Supabase
- FastAPI: async, Pydantic validation, auto OpenAPI docs, Python AI ecosystem (OpenAI, Gemini SDKs)
- Supabase: Postgres + Auth + Storage + Realtime + RLS, production-ready, generous free tier, matches brief (PostgreSQL/Supabase)
- Alternative justified: Could use Node/Nest but Python better for AI orchestration + future ML.

### Backend Structure
```
backend/
  app/
    main.py (FastAPI app, CORS, middleware)
    config.py (env, provider keys server-side only)
    routers/
      auth.py (proxy or rely on Supabase Auth)
      analyze.py
      plan.py
      coach.py
      looklab.py
      progress.py
      user.py
      privacy.py
    services/
      ai_orchestrator.py
      providers/
        base.py (interface)
        mock_provider.py (heuristic, clearly labeled demo)
        openai_provider.py
        gemini_provider.py
        anthropic_provider.py (for coach)
      safety_validator.py
      recommendation_engine.py
      plan_generator.py
      storage_service.py
    models/
      analysis.py (Pydantic)
      user.py
    db/
      supabase_client.py
    middleware/
      auth_middleware.py (verify Supabase JWT)
      rate_limit.py
  requirements.txt
  Dockerfile
  .env.example
```

### API Endpoints (MVP)
```
POST /api/analyze (multipart: photo, metadata) → analysis_id, status
GET  /api/analyze/:id → structured analysis
POST /api/plan/generate (analysis_id) → plan
GET  /api/plan/current → plan
POST /api/plan/item/:id/complete → completion
GET  /api/progress/timeline → entries
POST /api/progress/photo → upload
POST /api/coach/message → streaming or JSON response
GET  /api/looks → list looks
POST /api/looks/:id/save → save
POST /api/looks/barber-card → generate card data
GET  /api/user/profile → profile
PUT  /api/user/profile → update
DELETE /api/user/data → delete all (privacy)
POST /api/privacy/delete-photo/:id
```

### Auth
- Supabase Auth (Apple, Google, Email OTP)
- Backend verifies JWT via Supabase JWKS
- RLS policies enforce user isolation
- No custom auth unless needed

### Storage
- Supabase Storage buckets: `photos`, `progress-photos`, `barber-cards`
- Private buckets, signed URLs with short expiry
- Encryption at rest (Supabase default)
- Retention: original photos deleted after analysis? Option: keep until user deletes, but minimal retention policy documented. MVP: keep encrypted, allow user deletion anytime.

### Deployment
- Backend: Fly.io or Render or Railway (Docker)
- Supabase Cloud (hosted)
- Frontend: EAS Build + EAS Update
- Env: `OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` — server-side only, never in Expo.

## Database: Supabase Postgres

See DATABASE_SCHEMA.md for full schema. Key points:
- RLS enabled on all tables
- UUID PKs
- Timestamps: created_at, updated_at
- Soft delete for photos? Or hard delete on request (privacy)
- Indexes on user_id, created_at

## AI Layer

See AI_ARCHITECTURE.md

## Security & Privacy

See PRIVACY_AND_SAFETY.md

- API keys server-side only
- Rate limiting: 10 analyses/day free, 50/day premium (prevent abuse)
- Input validation: image type, size max 10MB, virus scan via Supabase?
- Output safety: no medical diagnosis, no hardmaxxing promotion
- Logging: no face photos in logs, only IDs
- CORS: only app origins + localhost dev
- Helmet headers, HTTPS only

## Analytics Abstraction

`lib/analytics.ts`:
```ts
interface Analytics {
  track(event: string, props?: object)
  identify(userId: string, traits?: object)
  screen(name: string, props?: object)
}
```
Adapters: console (dev), PostHog (prod), Mixpanel optional. Events listed in ANALYTICS_PLAN.md.

## Payments

- iOS: StoreKit 2 via `expo-in-app-purchases` or `react-native-iap`, products: monthly, yearly
- Android: Play Billing Library 6+
- Entitlement stored in `subscriptions` table, verified via backend receipt validation (App Store Server API, Play Developer API)
- Paywall shows price, renewal, cancellation per Apple/Google guidelines
- No external payment for digital goods (comply 3.1.1)

## Performance

- Image compression client-side: max 1080p, JPEG 0.8
- Analysis: async job, return ID immediately, poll or websocket for result (MVP poll every 2s)
- Caching: React Query 5 min stale time for profile/plan
- Bundle size: keep < 30MB, lazy load Look Lab images

## Testing

- Unit: Jest for utils, recommendation engine
- Component: React Native Testing Library
- E2E: Maestro or Detox for critical flows (onboarding, photo, analysis, plan)
- Backend: pytest + httpx

## CI/CD

- GitHub Actions: lint, typecheck, test, EAS Build preview on PR
- EAS Build for iOS/Android
- Supabase migrations via CLI

## Risks & Mitigations

- AI provider outage → fallback to mock provider labeled demo + queue retry
- Photo upload failure → retry with exponential backoff, show specific error
- App Store rejection for AI content → implement reporting, labeling, disclaimers (see LAUNCH_PLAN)
- Privacy concerns → explicit consent, deletion, minimal retention, data safety form accurate
- Cost: vision API expensive → compress images, cache, rate limit, mock for dev
