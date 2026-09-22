# ANALYTICS PLAN — Refine

## North Star Metric

**Weekly Active Transformations (WAT):** A user who meaningfully analyzes, acts on, or tracks their appearance improvement during a week.

Definition: User in last 7 days does at least one of:
- Completes analysis
- Completes 3+ plan items / routine completions
- Adds progress photo
- Completes weekly review
- Saves look + generates barber card
- Has 2+ meaningful coach interactions (not just open)

Why WAT vs WAU: WAU counts open, WAT counts transformation. Aligns with product loop.

## Event Taxonomy

All events have: `user_id` (hashed if anon), `timestamp`, `platform`, `app_version`, `os_version`, `screen`, `properties`.

### App Lifecycle
- `app_open` — {source: cold/warm, time_since_last_open}
- `app_background`
- `onboarding_started` — {step: welcome}
- `onboarding_step_completed` — {step: goals, preferences, consent}
- `onboarding_completed` — {goals: [], maintenance, time, budget, duration_seconds}
- `auth_started` — {method: apple/google/email}
- `auth_completed` — {method}
- `auth_failed` — {method, reason}

### Goals & Profile
- `goal_selected` — {goal, count}
- `preferences_updated` — {maintenance, time, budget}
- `profile_updated`

### Photo & Analysis (Critical Funnel)
- `photo_guidance_viewed`
- `photo_started` — {method: camera/gallery}
- `photo_uploaded` — {size_kb, type}
- `photo_quality_failed` — {reason: blur/dark/multiple_faces/no_face}
- `photo_retaken` — {reason}
- `analysis_started` — {photo_id, provider}
- `analysis_completed` — {analysis_id, provider, is_demo, confidence, duration_seconds, strengths_count, opportunities_count}
- `analysis_failed` — {reason, provider}
- `analysis_viewed` — {analysis_id, section: strengths/opportunities/impact_map}
- `strength_viewed` — {strength_id}
- `opportunity_viewed` — {opportunity_id, is_top3}
- `priority_selected` — {opportunity_id} (if user selects focus)
- `impact_map_viewed`

### Plan & Dashboard
- `plan_created` — {plan_id, type, items_count, analysis_id}
- `plan_viewed` — {type}
- `plan_item_viewed` — {item_id, category}
- `task_completed` — {item_id, category, week, time_to_complete}
- `task_uncompleted` — {item_id}
- `today_dashboard_viewed` — {tasks_total, tasks_completed, focus}
- `routine_progress_viewed`
- `weekly_review_started`
- `weekly_review_completed` — {tasks_completed_week, consistency_percent, reflection_added}

### Look Lab
- `look_lab_opened` — {tab: explore/saved/barber}
- `look_viewed` — {look_id, category}
- `look_filtered` — {filters}
- `look_saved` — {look_id, category}
- `look_unsaved`
- `barber_card_generated` — {look_id}
- `barber_card_shared` — {method}

### Progress
- `progress_opened` — {tab: timeline/consistency/photos}
- `progress_photo_added` — {photo_id}
- `progress_photo_comparison_viewed`
- `milestone_achieved` — {milestone: 7day_streak, first_barber_visit}
- `timeline_viewed`

### AI Coach
- `ai_coach_opened` — {has_context}
- `ai_question_sent` — {question_type: focus/haircut/maintenance/why, length_chars}
- `ai_response_received` — {duration_seconds, has_card}
- `ai_response_reported` — {reason}
- `ai_suggested_prompt_clicked` — {prompt}

### Paywall & Monetization
- `paywall_viewed` — {trigger: after_analysis/look_lab_limit/coach_limit/plan_60day, placement}
- `paywall_dismissed`
- `trial_started` — {product_id}
- `subscription_started` — {product_id, provider, is_trial}
- `subscription_cancelled` — {product_id, reason}
- `subscription_restored`
- `entitlement_checked` — {is_premium}

### Privacy & Safety
- `privacy_settings_viewed`
- `photo_deleted`
- `account_deletion_started`
- `account_deletion_completed`
- `ai_content_reported` — {type}
- `safety_event_triggered` — {type} (backend only)

### System
- `error_occurred` — {screen, error_code, message}
- `notification_received` — {type}
- `notification_opened` — {type}
- `deep_link_opened` — {url}

## Funnels to Track

1. **Onboarding → Aha:**
   app_open → onboarding_started → goal_selected → photo_uploaded → analysis_completed → plan_created
   Target: 60%+ complete onboarding, 40%+ reach analysis, 30%+ reach plan

2. **Activation:**
   analysis_completed → today_dashboard_viewed → task_completed (first)
   Target: 50%+ complete first task within 24h

3. **Habit:**
   task_completed (D1) → task_completed (D3) → weekly_review_completed (D7)
   Target: 30% D7 WAT

4. **Look Lab:**
   look_lab_opened → look_viewed → look_saved → barber_card_generated
   Target: 20% of users save look

5. **Coach:**
   ai_coach_opened → ai_question_sent → ai_response_received → task_completed (from coach suggestion)

6. **Monetization:**
   analysis_completed → paywall_viewed → trial_started → subscription_started
   Target: 5-10% trial start, 40% trial→paid (benchmark)

## Cohorts & Segmentation

- By goal: grooming vs hair vs style
- By maintenance tolerance: low vs high
- By time availability
- By acquisition: organic vs TikTok vs search
- By provider: demo vs real AI
- By platform: iOS vs Android

## Implementation

`lib/analytics.ts` abstraction:

```ts
export interface Analytics {
  track(name: string, props?: Record<string,any>): void
  identify(userId: string, traits?: Record<string,any>): void
  screen(name: string, props?: Record<string,any>): void
  reset(): void
}

// Dev: console
// Prod: PostHog (self-hosted or cloud) — privacy-friendly, no cross-app tracking, no ATT needed
// Alternative: Mixpanel
```

Supabase table `analytics_events` optional for backup, but primary is PostHog.

No face photos in analytics props.

## Dashboards

- **Acquisition:** installs, onboarding completion rate
- **Activation:** analysis completion, plan creation, first task
- **Retention:** D1, D7, D30, WAT/WAU, churn
- **Engagement:** tasks per user per week, look saves, coach messages, progress photos
- **Monetization:** paywall view → trial → sub, ARPU, trial conversion, cancellation reasons
- **Quality:** photo_quality_failed rate, analysis_failed rate, safety_events

## Privacy & Compliance

- No tracking per ATT (no cross-app tracking, no IDFA)
- Allow opt-out in privacy_settings → sets allow_analytics false → analytics disabled
- Anonymize IP in PostHog
- Data retention 90 days then archive
- No PII in event props (no email, no photo)

## Validation

- Event QA: log all events in dev console, verify in PostHog debug
- Funnel QA: test critical funnel with real device
- No duplicate events
- No missing required props
```

