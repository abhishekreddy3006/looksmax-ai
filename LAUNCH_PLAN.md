# LAUNCH PLAN — Refine

## Pre-Launch Checklist

### Product Readiness (MVP_SCOPE.md DoD)
- [ ] All MVP screens have loading/empty/error/success states
- [ ] No lorem ipsum, no dead buttons, no fake nav
- [ ] Light + dark mode works
- [ ] iOS + Android tested on physical devices
- [ ] Accessibility: contrast AA, touch targets 44+, screen reader labels, reduced motion
- [ ] Performance: bundle <30MB, image compression, analysis <5s mock, <15s real
- [ ] Offline: cached last analysis + plan, queue completions

### Technical
- [ ] Backend deployed (Fly.io/Render), env vars set, no keys in Git
- [ ] Supabase prod project, RLS enabled, migrations applied, storage buckets private
- [ ] EAS Build profiles: dev, preview, production
- [ ] EAS Update configured
- [ ] Analytics abstraction working (PostHog)
- [ ] Sentry for crash reporting (optional but recommended)
- [ ] Rate limiting, auth middleware, safety validator active
- [ ] Receipt validation for subscriptions (App Store Server API, Play Developer API) tested in sandbox

### Privacy & Safety
- [ ] Privacy policy URL live (e.g., https://refine.app/privacy)
- [ ] Terms of Service URL live
- [ ] Data Safety form (Play) accurate: photos shared with AI provider, encrypted, deletion available
- [ ] App Privacy labels (App Store) accurate
- [ ] In-app privacy settings: data deletion, download data, AI processing toggle, report AI content
- [ ] Account deletion in-app (Apple 5.1.1(v) requirement)
- [ ] AI disclosure + consent screen before first analysis
- [ ] Safety validator + safety_events logging + crisis resources in help
- [ ] No API keys in client (verify via bundle scan)

### App Store Review Guidelines (2026)

#### Apple (Common Rejection Reasons)
- **2.1 Performance:** No crashes, no placeholder, complete features, no lorem ipsum. Provide demo account in App Review Information.
- **4.2 Minimum Functionality:** Not just website wrapper, must have native functionality (camera, offline, etc) — we do.
- **5.1.1 Privacy:** Privacy policy accessible in-app and listing, data deletion in-app, ATT if tracking (we don't track cross-app, so no ATT needed, but declare in App Privacy). Must disclose AI data sharing with third-party AI services (new 2026 focus).
- **3.1.1 IAP:** Digital goods/subscriptions must use IAP, no external payment. Must show full pricing, renewal, cancellation before purchase.
- **4.0 Design:** No spam, no copycat (we are not UMAX clone, premium brand).
- **AI-Generated Content (2026 update):** Must include report feature for inappropriate AI content, ensure rights to training data, clearly state content is AI-generated. We have report + disclaimer.
- **Health:** If we claim medical, need regulatory proof. We don't diagnose, we have disclaimer: "Not medical advice".
- **Metadata:** Screenshots show latest version, no keyword repetition, accurate description.

**App Review Information to Provide:**
- App purpose: "Premium personal appearance and self-care coach"
- Test account: email + password, with pre-populated analysis
- Steps: login → today dashboard → analysis → plan → look lab → coach
- Permissions: camera, photo library — explain why (analysis, progress)
- Subscription: sandbox test account, steps to trigger paywall (after analysis)
- Support URL, privacy URL
- Demo video if needed (30 sec core flow)

#### Google Play (2026)

- **Target API level 36 by Aug 31 2026** (Android 16) — set targetSdk 36
- **User Data policy covers third-party AI integrations** (July 15 2026 update): Must disclose in Data Safety + Privacy policy + in-app consent that photos shared with AI provider, limited use, disclosure, consent. Developer responsible.
- **AI-Generated Content Policy:** Must prevent generation of offensive content (sexual deepfakes, fraud, election misinfo, self-harm). Must have in-app reporting/flagging for AI content. Must label AI-generated content. We have safety validator + reporting + labeling.
- **UGC Moderation:** If app has UGC (we have AI content), need reporting, blocking, filtering, published contact.
- **Subscription transparency:** Show price, trial length, renewal terms on paywall, cancellation accessible from within app (instructions), reminder before trial converts (we send notification 24h before).
- **Data Safety form:** Must match APK actual behavior (automated scans). Declare photos, sharing, encryption, deletion.
- **Permissions:** Camera, photo library — justify in listing.
- **Content rating:** IARC questionnaire, 13+ or 17+ (we choose 17+ to be safe)
- **No dynamic code loading, no permission escalation**

### Store Listings

#### App Store
- **Name:** Refine — AI Appearance Coach (30 chars max, keyword: Appearance Coach)
- **Subtitle:** Know what suits you. (30 chars)
- **Description:** Premium personal appearance and self-care coach. Understand your current appearance, identify realistic improvements, prioritize highest-impact areas, build daily routines, experiment with hairstyles, track progress. Not a face rating app. Enhance, don't obsess. Features: AI analysis, strengths, Top 3 opportunities, Impact Map, 30-day plan, Today dashboard, Look Lab, Barber Mode, AI Coach, progress tracking. Privacy-first.
- **Keywords:** appearance,grooming,hairstyle,skincare,style,selfcare,looksmax,refine (100 chars max, no repetition)
- **Screenshots:** iPhone 6.5" and 5.5", iPad 12.9" — show: welcome, analysis results (strengths + top3), impact map, today dashboard, look lab, barber card, progress timeline. Must show latest UI, no placeholder, no iPhone frame if possible (Apple prefers no frame or accurate frame)
- **Preview video:** 15-30 sec, no hands holding device, show core flow
- **Support URL:** https://refine.app/support
- **Privacy URL:** https://refine.app/privacy
- **Age rating:** 17+ (mild sexual content? No, but appearance advice + user-generated photos → 17+ safe)
- **In-App Purchases:** Refine+ Monthly $9.99, Refine+ Yearly $39.99 — descriptions: "Unlock unlimited analyses, advanced Look Lab, unlimited AI Coach, full plans"
- **App Privacy:** Photos (linked, app functionality), User Content (linked), Identifiers (linked), Usage Data (not linked), Diagnostics (not linked) — purpose: app functionality, analytics. No tracking.
- **Categories:** Lifestyle, Health & Fitness

#### Play Store
- **Name:** Refine — AI Appearance Coach
- **Short description:** Premium appearance & self-care coach. Know what suits you.
- **Full description:** Similar to App Store, with bullet points, mention privacy-first, no medical advice, AI-generated insights.
- **Graphics:** Icon 512x512, feature graphic 1024x500, screenshots phone + tablet (min 2, max 8)
- **Categorization:** Lifestyle
- **Content rating:** IARC 17+
- **Data Safety:** Declare photos collected, shared with AI provider for app functionality, encrypted in transit/at rest, user can request deletion, no location/contacts
- **Privacy policy URL**
- **Contact details:** Email, phone, address (required for Play)
- **Target audience:** 18+

### Beta

- **TestFlight (iOS):** Internal (team) + External (up to 10k). Provide beta feedback via TestFlight + in-app shake to report bug.
- **Play Internal Testing + Closed Testing:** Up to 100 testers, then open testing.
- **Duration:** 2 weeks beta, fix crashes, collect qualitative feedback on aha moment, paywall timing, pricing perception
- **Metrics:** Onboarding completion, analysis success rate, first task completion, WAT, crash-free rate >99.5%

### Launch Phases

**Phase 1: Soft Launch (Week 1-2)**
- Release to 1 country (e.g., US or Canada), 1% rollout (phased release on iOS, staged rollout on Play 10%)
- Monitor crashes (Sentry, Xcode Organizer), ANRs, reviews, analytics funnels
- No press, only organic + TestFlight users
- Daily check: crash rate, analysis failure rate, subscription sandbox issues

**Phase 2: Phased Release (Week 3)**
- iOS phased release 1% → 25% → 50% → 100% over 7 days, pause if crash spike
- Play staged rollout 20% → 50% → 100%
- Monitor reviews, respond within 24h
- Fix critical bugs via EAS Update (if JS only) or new binary

**Phase 3: Public Launch (Week 4)**
- Full rollout, Product Hunt, Twitter, Reddit (r/malegrooming, r/beauty, but not spammy), TikTok demo (responsible messaging, not "rate your face")
- Press kit: screenshots, description, founder story (enhance don't obsess), privacy-first angle
- Influencer: micro grooming/style creators, not looksmaxxing toxic

**Phase 4: Post-Launch (Week 5-8)**
- Weekly reviews: funnel, retention, monetization, safety_events
- Iterate: onboarding copy, paywall timing, Look Lab content
- Plan next features based on data

### Monitoring First 72 Hours

- Xcode Organizer crashes, Play Console crashes/ANRs
- App Store Analytics: impressions → product page views → installs → retention
- PostHog: funnel drop-offs
- Reviews: respond fast, tag pricing/bug/privacy
- Backend: provider error rate, latency, cost per analysis
- Support: email, in-app report

### Rollback Plan

- If crash rate >1%: pause phased release, fix via EAS Update or new build, resume
- If analysis failure >10%: fallback to mock provider labeled demo + queue retry, investigate provider
- If subscription verification fails: disable premium checks temporarily (allow free premium) to avoid blocking users, fix verification
- If privacy complaint: immediate investigation, delete data if requested, update Data Safety

### Legal

- Terms, Privacy, Support pages live before submission
- D-U-N-S for organization account (Apple $99/year)
- Play Console $25 one-time
- No trademark infringement (Refine is generic, check USPTO)
