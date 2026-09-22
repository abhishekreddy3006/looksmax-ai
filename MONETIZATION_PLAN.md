# MONETIZATION PLAN — Refine

## Philosophy

- Free experience must provide real value (not blurred scorecard hostage like UMAX)
- No dark patterns, no manipulative subscription flows
- Pricing validated through research, not random
- Comply with Apple Guideline 3.1.1 and Google Play Billing transparency (price, renewal, cancellation visible, reminder before trial converts)

## Market Benchmark (2026)

From competitor research:
- UMAX: $3.99/week ($200/year) — hated, but generates $500k/month per Fortune. Weekly pricing perceived as predatory.
- LooksMax LooxUP: $8.99/week, $39.99/year — weekly $8.99 complaints, yearly more palatable
- Hiface: $9.99/week + $2.99 re-analyze — steep, complaints of paywall even after subscribing
- MogMax: $20/month (~$240/year) — too high for value
- YouCam Makeup (adjacent): $10.99/month
- BeautyPlus: $8.49/month
- FaceApp Pro: $39.99/year
- QOVES: $150/year with human review — niche premium, justifies higher price with 28-day human review
- Premium wellness apps: Calm $69.99/year, Headspace $89.99/year, MyFitnessPal Premium $79.99/year

Insight: Weekly pricing ($3.99-9.99) drives short-term revenue but high churn + App Store complaints + "fleeceware" label. Yearly $30-70 is sweet spot for lifestyle/wellness. Monthly $9.99-14.99 acceptable if value clear.

## Freemium Model

### Free Tier (Real Value)

Goal: User experiences aha moment without paying.

Includes:
- Full onboarding
- 1 initial AI analysis (full results: strengths + Top 3 + Impact Map + category breakdown) — NOT blurred
- Starter 30-day plan (first 7 days fully actionable, rest preview)
- Today dashboard with daily actions (first week)
- Basic progress tracking (timeline, 1 progress photo, consistency for first week)
- Look Lab: 3 free explores, 1 saved look
- AI Coach: 3 messages/day with contextual answers
- 1 re-analysis per month
- Privacy & data controls

Why: Builds trust, shows we are not UMAX. User can get value even if never pays.

### Premium Tier (Refine+)

Price: **$9.99/month or $39.99/year (60% savings)**, with 3-day free trial for yearly. This aligns with FaceApp, BeautyPlus, and is far below QOVES but above UMAX weekly trap.

Includes:
- Unlimited analyses (fair use: up to 50/month)
- Deeper personalization (advanced analysis, skin appearance tracking, style direction)
- Full 30/60/90-day plans, adaptive based on completions
- Advanced Look Lab: unlimited explores, try-on that preserves identity (future AI), 20+ saved looks, barber cards unlimited
- AI Coach unlimited, with voice? (future)
- Advanced progress insights: consistency analytics, before/after comparisons, weekly reviews with AI summary
- Additional analysis sessions + progress photos unlimited
- Priority support

### Pricing Rationale

- $39.99/year = $3.33/month, psychologically cheap vs $3.99/week ($16/month). User perceives yearly as deal.
- $9.99/month for those who want monthly flexibility, still cheaper than UMAX weekly.
- 3-day trial for yearly only (Apple allows). Must show trial terms clearly: "3-day free, then $39.99/year, cancel anytime in Settings"
- No weekly option at launch to avoid fleeceware perception. Can test weekly later if needed, but start with monthly/yearly.

## Paywall Placement (After Value)

Never before first meaningful experience. Triggers:

1. After first analysis results: Show full results free, then card "Unlock full 30-day plan + 60/90 day + advanced Look Lab" → paywall
2. Look Lab: After 3 free explores, "You've explored 3 looks — unlock unlimited" → paywall
3. Coach: After 3 messages/day, "You've used 3 free messages — unlock unlimited coaching" → paywall with preview of next answer blurred? No, show count, not blurred answer (avoid dark pattern). Instead: "Upgrade for unlimited"
4. Progress: Advanced insights locked with teaser: "Premium insight: Your grooming consistency improved 40% — unlock full analytics"
5. Plan: 60/90 day tabs show lock icon with preview of first item, then paywall

Paywall must show (Apple/Google requirement):
- Product name, price, renewal terms, trial length, what you get (bulleted), cancellation instructions ("Cancel anytime in Settings > Subscriptions"), links to Terms & Privacy, restore purchases
- No pre-checked, no hidden trial end, no 5+ taps to cancel, send reminder notification before trial converts (Google 2025 sweep enforcement)

## Subscription Implementation

- iOS: StoreKit 2, products: `refine_premium_monthly`, `refine_premium_yearly`
- Android: Play Billing Library 6+, same product IDs
- Backend: Verify receipt via App Store Server API + Play Developer API, store in `subscriptions` table, check entitlement on each premium feature call
- Restore purchases button in paywall and settings
- Grace period: 3 days
- Billing retry: Apple/Google handles

## Trial & Cancellation

- 3-day free trial for yearly only (monthly no trial at launch to reduce abuse)
- Trial converts to paid unless cancelled 24h before end (Apple standard) — must be explicit in paywall
- Reminder notification 24h before trial ends: "Your Refine+ trial ends tomorrow — continue or cancel in Settings" (required by Google for dark pattern compliance)
- Cancellation: User can cancel in App Store / Play Store, also show instructions in-app. No need to contact support.
- Winback: After cancellation, offer "Pause" or feedback survey, not guilt.

## Metrics to Track

- Paywall view rate (per trigger)
- Trial start rate (target 5-10% of activated users)
- Trial → paid conversion (target 40%+)
- Monthly vs yearly split (target 70% yearly)
- Churn (target <10% monthly for yearly, <20% for monthly)
- ARPU, LTV
- Cancellation reasons (survey: too expensive, not enough value, achieved goal, technical)
- Free-to-paid time lag

## Pricing Validation Plan (Post-MVP)

- Beta: Interview 20 users, ask willingness to pay (Van Westendorp)
- A/B test: $39.99/year vs $49.99/year vs $29.99/year (only after baseline)
- Test monthly $9.99 vs $12.99
- Do NOT test weekly at launch (brand risk)
- Monitor App Store reviews for pricing complaints — if >10% mention price, revisit value or pricing

## No Dark Patterns Checklist

- [ ] Price visible before purchase, not after upload
- [ ] Renewal terms visible: "$39.99/year, auto-renews yearly"
- [ ] Trial terms visible: "3-day free, then $39.99/year"
- [ ] Cancellation instructions visible: "Cancel anytime in Settings > Subscriptions"
- [ ] Restore purchases button
- [ ] No pre-checked subscription
- [ ] No hidden trial end date
- [ ] Reminder before trial converts
- [ ] No 5+ taps to cancel (Apple/Google handle cancellation outside app, but we show instructions)
- [ ] No guilt-tripping language ("No, I want to stay ugly" — never)
- [ ] Free tier provides real value, not just teaser

## Future Monetization (Post-MVP)

- One-time purchases: Barber card pack, Look Lab credits (if AI generation expensive)
- Partnerships: Barber shop referral (careful, no affiliate spam)
- B2B: API for barbershops? Not MVP.
- Never: selling facial data, ads with facial data

## Legal

- Terms must state subscription terms, auto-renewal, cancellation, refund policy (Apple/Google handle refunds)
- Privacy policy must state no selling data
- For EU: show price including VAT, allow 14-day withdrawal for digital? Apple/Google handle, but mention in Terms.
