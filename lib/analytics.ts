/**
 * Analytics abstraction — PostHog adapter ready, console in dev
 */

type Props = Record<string, any>;

interface Analytics {
  track(event: string, props?: Props): void;
  identify(userId: string, traits?: Props): void;
  screen(name: string, props?: Props): void;
  reset(): void;
}

class ConsoleAnalytics implements Analytics {
  track(event: string, props?: Props) {
    if (__DEV__) console.log(`[Analytics] ${event}`, props);
  }
  identify(userId: string, traits?: Props) {
    if (__DEV__) console.log(`[Analytics] identify ${userId}`, traits);
  }
  screen(name: string, props?: Props) {
    if (__DEV__) console.log(`[Analytics] screen ${name}`, props);
  }
  reset() {
    if (__DEV__) console.log(`[Analytics] reset`);
  }
}

// Future: PostHogAnalytics
// class PostHogAnalytics implements Analytics { ... }

export const analytics: Analytics = new ConsoleAnalytics();

export const EVENTS = {
  APP_OPEN: 'app_open',
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  GOAL_SELECTED: 'goal_selected',
  PHOTO_STARTED: 'photo_started',
  PHOTO_UPLOADED: 'photo_uploaded',
  PHOTO_QUALITY_FAILED: 'photo_quality_failed',
  ANALYSIS_STARTED: 'analysis_started',
  ANALYSIS_COMPLETED: 'analysis_completed',
  PLAN_CREATED: 'plan_created',
  TASK_COMPLETED: 'task_completed',
  LOOK_LAB_OPENED: 'look_lab_opened',
  LOOK_SAVED: 'look_saved',
  PROGRESS_PHOTO_ADDED: 'progress_photo_added',
  WEEKLY_REVIEW_COMPLETED: 'weekly_review_completed',
  AI_COACH_OPENED: 'ai_coach_opened',
  AI_QUESTION_SENT: 'ai_question_sent',
  PAYWALL_VIEWED: 'paywall_viewed',
} as const;
