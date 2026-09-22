# DATABASE SCHEMA — Refine

## Overview
Supabase Postgres with RLS. All tables have `id UUID PK DEFAULT gen_random_uuid()`, `created_at TIMESTAMPTZ DEFAULT NOW()`, `updated_at TIMESTAMPTZ`.

## Tables

### users (extends auth.users)
Supabase auth.users is source. Additional profile in `profiles`.

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  age_range TEXT CHECK (age_range IN ('18-20','21-24','25-29','30-34','35+','prefer_not')),
  gender_presentation TEXT, -- inclusive, free text or enum: 'masculine','feminine','non_binary','prefer_not','custom'
  goals TEXT[] DEFAULT '{}', -- max 3: grooming, hair, facial_hair, skin, style, smile, posture, confidence, routine
  maintenance_tolerance TEXT CHECK (maintenance_tolerance IN ('low','medium','high')),
  time_availability TEXT CHECK (time_availability IN ('5','10','15+')),
  budget TEXT CHECK (budget IN ('$','$$','$$$')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### privacy_settings
```sql
CREATE TABLE privacy_settings (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  allow_ai_processing BOOLEAN DEFAULT TRUE, -- explicit consent for sending photo to AI provider
  data_retention_days INT DEFAULT 365,
  allow_analytics BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### photos
```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, -- supabase storage path
  type TEXT CHECK (type IN ('analysis','progress')),
  quality_score FLOAT, -- 0-1 from client/server check
  metadata JSONB, -- lighting, distance, etc
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_photos_user_id ON photos(user_id);
```

### photo_sessions
Groups photos for one analysis (usually 1 photo MVP, future 2: front + side)
```sql
CREATE TABLE photo_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  photo_ids UUID[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### analyses
```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  photo_session_id UUID REFERENCES photo_sessions(id) ON DELETE SET NULL,
  provider TEXT NOT NULL, -- 'mock','openai','gemini'
  is_demo BOOLEAN DEFAULT FALSE,
  profile_summary TEXT NOT NULL,
  confidence TEXT CHECK (confidence IN ('low','medium','high')),
  impact_map JSONB NOT NULL, -- {high:[], medium:[], low:[]}
  raw_output JSONB, -- full structured output for debugging, no PII beyond analysis
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
```

### analysis_observations
Strengths + opportunities normalized
```sql
CREATE TABLE analysis_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('strength','opportunity')),
  category TEXT CHECK (category IN ('face_presentation','hair','facial_hair','skin_appearance','grooming','smile','style','posture')),
  title TEXT NOT NULL,
  evidence TEXT,
  what TEXT, -- for opportunity
  why TEXT,
  how TEXT,
  effort TEXT CHECK (effort IN ('low','medium','high')),
  timeline TEXT,
  maintenance TEXT CHECK (maintenance IN ('low','medium','high')),
  impact TEXT CHECK (impact IN ('high','medium','low')),
  is_top3 BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_observations_analysis_id ON analysis_observations(analysis_id);
```

### recommendations
Link observations to plan? Could be same as observations, but separate for future product recs
```sql
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  observation_id UUID REFERENCES analysis_observations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### plans
```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  analysis_id UUID REFERENCES analyses(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('7day','30day','60day','90day')) DEFAULT '30day',
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_plans_user_id ON plans(user_id);
```

### plan_items
```sql
CREATE TABLE plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  observation_id UUID REFERENCES analysis_observations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  explanation TEXT,
  estimated_time TEXT, -- "5 min"
  frequency TEXT, -- "daily", "weekly"
  difficulty TEXT CHECK (difficulty IN ('low','medium','high')),
  category TEXT,
  week INT, -- 1-4 for 30day
  sort_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_plan_items_plan_id ON plan_items(plan_id);
```

### routines + completions
```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_item_id UUID REFERENCES plan_items(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE routine_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES routines(id) ON DELETE CASCADE,
  plan_item_id UUID REFERENCES plan_items(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE
);
CREATE INDEX idx_completions_user_date ON routine_completions(user_id, date);
```

### progress_entries
```sql
CREATE TABLE progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('photo','reflection','milestone','analysis')),
  photo_id UUID REFERENCES photos(id) ON DELETE SET NULL,
  analysis_id UUID REFERENCES analyses(id) ON DELETE SET NULL,
  note TEXT,
  metadata JSONB, -- e.g., milestone type
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_progress_user_id ON progress_entries(user_id);
```

### saved_looks
```sql
CREATE TABLE saved_looks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  look_id TEXT NOT NULL, -- reference to curated library
  category TEXT CHECK (category IN ('hair','beard','moustache','eyewear','style')),
  custom_notes TEXT,
  barber_card JSONB, -- generated card
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_saved_looks_user_id ON saved_looks(user_id);
```

### ai_conversations + ai_messages
```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  metadata JSONB, -- cards, etc
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_messages_conversation_id ON ai_messages(conversation_id);
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  provider TEXT CHECK (provider IN ('app_store','play_store','stripe')),
  product_id TEXT NOT NULL,
  status TEXT CHECK (status IN ('active','expired','cancelled','trial')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  is_trial BOOLEAN DEFAULT FALSE,
  receipt_data TEXT, -- encrypted
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### analytics_events (optional, if not using external only)
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  properties JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
```

### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('daily_reminder','weekly_review','reanalysis')),
  title TEXT,
  body TEXT,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### safety_events
```sql
CREATE TABLE safety_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('blocked_hardmaxxing','blocked_medical','blocked_shaming','ai_content_report')),
  input TEXT,
  output TEXT,
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## RLS Policies (Supabase)

Enable RLS on all tables. Example:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Similar for all user_id tables:
CREATE POLICY "Users own data" ON analyses FOR ALL USING (auth.uid() = user_id);
```

Service role bypasses RLS for backend.

## Migrations

Use Supabase CLI: `supabase migration new <name>`, `supabase db push`.

## Indexes & Performance

- All user_id indexed
- created_at DESC for timeline queries
- GIN index on JSONB where needed (impact_map)

## Data Retention

- photos: keep until user deletes or retention days exceeded (privacy_settings)
- analyses: keep, but raw_output may be pruned after 90 days to save space
- analytics_events: 90 days then archive
- safety_events: 1 year

## Privacy Considerations

- No face embeddings stored unless needed (and encrypted if stored)
- Storage buckets private, signed URLs
- No PII in logs
- Deletion cascade: deleting profile deletes all related data (or anonymizes analytics)
```

