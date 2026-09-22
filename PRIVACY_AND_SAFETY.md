# PRIVACY & SAFETY — Refine

## Philosophy

Face photos and appearance information are **sensitive personal data**. Treat with same care as health data. Privacy is not a feature, it's foundation.

## Privacy Principles

1. **Explicit consent:** Before any photo upload or AI processing, show plain-language consent: what we collect, why, who we share with (AI provider), retention, deletion.
2. **Minimal collection:** Only data that improves personalization. No background contacts, location unless needed.
3. **Minimal retention:** Keep only as long as needed. User can delete anytime.
4. **No selling:** Never sell facial data, biometric data, or appearance data.
5. **No public by default:** All photos private. No public feed, no ranking.
6. **Secure by default:** Encrypted at rest and transit, private buckets, signed URLs.
7. **Transparency:** Privacy policy accessible in-app and App Store listing, Data Safety form accurate.

## Data Collected

- **Account:** Email, auth provider ID
- **Profile:** Age range, gender presentation, goals, maintenance tolerance, time, budget
- **Photos:** Analysis photos, progress photos
- **Analysis results:** Strengths, opportunities, impact map, plan
- **Usage:** Routine completions, progress entries, saved looks, AI conversations
- **Analytics:** Events (no face photos in analytics)
- **Subscription:** Product ID, status, period (receipt encrypted)

Not collected in MVP: precise location, contacts, health records.

## AI Processing Disclosure (App Store + Play Store compliance)

Per Apple 2026 guidelines and Google Play July 2026 update: third-party AI integrations are User Data processing, developer responsible for limited use, disclosure, consent.

We must disclose:
- What data is shared with AI provider (photo + goals + preferences)
- Which provider (OpenAI, Gemini, Anthropic) — show in privacy settings
- Purpose: appearance analysis and coaching
- User control: can opt-out of AI processing (then only mock demo available, clearly labeled)
- Data handling by provider: we will reference provider's data usage policy (e.g., OpenAI does not train on API data by default as of 2024+, but we must verify and document)

Implementation:
- In-app consent screen before first analysis: checkbox "I consent to my photo being analyzed by [Provider] for appearance coaching. My photo is not used to train AI models and is deleted from provider after processing per their policy."
- Privacy settings: toggle "Allow AI processing", show current provider
- Data Safety form: declare "Photos" → "App functionality", "Shared with third-party AI provider for analysis", "Encrypted in transit, at rest"
- Privacy policy section: AI processing details

## Storage & Security

- **Supabase Storage:** Private buckets `photos`, `progress-photos`, `barber-cards`. No public access. Signed URLs with 60s expiry for viewing, 300s for upload.
- **Encryption:** Supabase encrypts at rest (AES-256). Transit via HTTPS/TLS 1.2+.
- **Access controls:** RLS policies ensure users only access own data. Backend uses service role only server-side, never in client.
- **API keys:** All AI provider keys server-side only in env vars, never in Expo client, never in Git.
- **Auth:** Supabase Auth with Apple/Google/Email OTP. JWT verification in backend.
- **Rate limiting:** Prevent abuse, brute force.
- **Logging:** No photos, no biometric data in logs. Only IDs, provider name, latency, error codes.
- **Backups:** Supabase PITR enabled.

## Deletion & User Rights

- **Delete photo:** Settings → Privacy → Delete photo → immediate deletion from storage + DB reference, signed URL invalidated.
- **Delete all data:** Settings → Delete Account → in-app deletion (Apple requirement Guideline 5.1.1(v)). Deletes profile, photos, analyses, plans, progress, conversations, subscriptions (anonymize analytics). Must be accessible without contacting support.
- **Download data:** Settings → Download My Data → JSON export of profile, analyses, plan, progress (GDPR data portability).
- **Retention:** Default 365 days for photos, but user can set shorter in privacy_settings. After retention, auto-delete (cron job).
- **Provider deletion:** After analysis, we do not retain photo at provider (rely on provider's zero-retention for API, but we also don't send storage URL that persists; we send base64 and provider deletes after processing per policy).

## Safety & Content Moderation

### Prohibited Content (Never Generate)

- Medical diagnoses (acne vulgaris grade, etc). Allow appearance observations: "skin shows some congestion, consider consistent cleansing"
- Surgery recommendations (leg-lengthening, jaw surgery, etc)
- Bone smashing, steroids, black-market hormones, dangerous dieting (e.g., starvation, amphetamines to suppress appetite)
- Telling user they are ugly, subhuman, it's over, black pill ideology
- Attractiveness ranking vs other users, leaderboards based on appearance
- Deepfake non-consensual sexual content
- Encouraging self-harm

### Safety Validation Layer (Backend)

See AI_ARCHITECTURE.md. Checks:
- Blocklist regex for hardmaxxing terms
- Sentiment check for shaming language
- If provider output contains disallowed → sanitize, replace with safe alternative, log to safety_events
- For coach: same + redirect template

### Redirect Templates

- Hardmaxxing: "I can't help with unsafe practices like [term]. Safer alternatives that achieve similar goals: [grooming, posture, style, skincare]. If you're feeling distressed about appearance, consider talking to a trusted person or mental health professional. US: 988 Suicide and Crisis Lifeline, UK: Samaritans 116123, Canada: 1-833-456-4566, International: https://findahelpline.org/"
- Medical: "I can't diagnose medical conditions. For persistent skin concerns, consider a dermatologist. For general appearance, I can suggest grooming routines..."
- Self-harm: Provide crisis resources, encourage help, don't repeat self-harm content.

### AI-Generated Content Compliance (Google Play)

Per Google Play AI content policy (Jan 2025+):
- Label AI-generated content: In analysis results, show "AI-generated insights, not medical advice"
- In-app reporting: Settings → Help → Report AI Content → form that logs to safety_events and triggers human review (for MVP, manual review via email)
- Blocking: User can block/regenerate coach response if inappropriate (thumbs down → report)
- No sexual deepfakes, no election misinformation, no self-harm encouragement (enforced via safety validator)

### Age & Vulnerability

- Age rating: 13+ or 17+? Since appearance advice, no sexual content, but include "Unrestricted Web Access" if coach can browse? No browsing. Set 13+ with parental guidance, or 17+ if we want to avoid under-13. MVP: 17+ to be safe, with disclaimer.
- No kids category.
- If user indicates age <18, adjust tone: more supportive, avoid any sexualized language, encourage talking to trusted adult for distress.
- Mental health: In onboarding and settings, include resources and note that app is not a substitute for professional mental health support.

## App Store Privacy Requirements

- **App Privacy labels:** Declare data collected: Photos, User Content, Identifiers, Usage Data, Diagnostics. Purpose: App Functionality, Analytics. Linked to user? Photos yes, but not used for tracking. No tracking per ATT.
- **Privacy Policy URL:** Required, accessible in-app and listing.
- **Data Deletion Mechanism:** In-app, not just website (2026 requirement).
- **ATT:** If we use tracking (we don't for MVP), need ATT prompt. We use analytics abstraction with PostHog self-hosted or anonymized, no cross-app tracking, so no ATT needed. If we add Facebook SDK later, need ATT.

## Google Play Data Safety

- Declare: Photos collected, shared with AI provider, encrypted in transit, at rest, user can request deletion.
- Declare: No location, no contacts.
- Must match APK actual behavior (automated scans check).
- Provide privacy policy URL in listing and app settings.

## Security Checklist

- [ ] API keys server-side only
- [ ] RLS enabled on all tables
- [ ] Private storage buckets, signed URLs
- [ ] JWT verification
- [ ] Rate limiting
- [ ] Input validation (image type, size, PII)
- [ ] No PII in logs
- [ ] HTTPS only, HSTS
- [ ] Dependencies scanned (npm audit, pip audit)
- [ ] Secrets not in Git (use .env.example)
- [ ] Account deletion in-app
- [ ] Data export
- [ ] AI disclosure + consent
- [ ] Report AI content feature
- [ ] Safety validator + safety_events logging
- [ ] Crisis resources in help

## Incident Response

- If breach: notify users within 72h, revoke keys, rotate secrets, audit logs, inform Supabase.
- If provider data leak: switch provider, notify users, document.
- Safety event spike: alert, review prompts, tighten blocklist.

## Legal

- Terms of Service: clarify app provides appearance coaching, not medical advice, no guarantee of attractiveness improvement, use at own risk, not for under-13.
- Disclaimer in analysis: "These insights are AI-generated for self-care guidance, not medical advice. Results vary, not scientifically precise."
- GDPR/CCPA compliance: data portability, deletion, opt-out.
