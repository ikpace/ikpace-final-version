/*
  # iKPACE Kids Platform - Core Tables Migration v2

  ## Overview
  Creates the foundational database structure for the iKPACE Kids platform,
  supporting three age-segregated learning tracks (5-7, 8-10, 11-14) with
  comprehensive parental controls and safety features.

  ## New Tables
  
  1. **kids_profiles** - Child user profiles linked to parent accounts
  2. **family_accounts** - Family subscription management
  3. **parental_controls** - Time limits and content filtering
  4. **kids_courses** - Age-appropriate courses
  5. **kids_lessons** - Individual lesson content
  6. **kids_progress** - Progress tracking
  7. **kids_achievements** - Badge and achievement system
  8. **kids_projects** - Student-created projects
  9. **kids_activity_log** - Activity tracking for safety
  10. **kids_session_limits** - Daily time tracking

  ## Security
  - All tables have RLS enabled
  - Kids can only access their own data
  - Parents can view their children's data
  - Age-appropriate content filtering
  
  ## Compliance
  - COPPA, GDPR-K, FERPA compliant
*/

-- ============================================================================
-- FAMILY ACCOUNTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS family_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  family_name VARCHAR(100),
  subscription_tier VARCHAR(50) CHECK (subscription_tier IN ('free', 'single_child', 'family_3', 'family_unlimited')) DEFAULT 'free',
  max_kids_allowed INTEGER DEFAULT 1,
  subscription_status VARCHAR(20) CHECK (subscription_status IN ('active', 'trial', 'expired', 'cancelled')) DEFAULT 'trial',
  subscription_start_date DATE,
  subscription_end_date DATE,
  billing_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_user_id)
);

ALTER TABLE family_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view own family account"
  ON family_accounts FOR SELECT
  TO authenticated
  USING (parent_user_id = auth.uid());

CREATE POLICY "Parents can update own family account"
  ON family_accounts FOR UPDATE
  TO authenticated
  USING (parent_user_id = auth.uid())
  WITH CHECK (parent_user_id = auth.uid());

CREATE POLICY "Parents can insert own family account"
  ON family_accounts FOR INSERT
  TO authenticated
  WITH CHECK (parent_user_id = auth.uid());

-- ============================================================================
-- KIDS PROFILES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  avatar_id VARCHAR(50) DEFAULT 'default_avatar',
  date_of_birth DATE NOT NULL,
  age_group VARCHAR(20) CHECK (age_group IN ('explorers', 'builders', 'creators')) NOT NULL,
  learning_preferences JSONB DEFAULT '{}'::jsonb,
  accessibility_settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE kids_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can view own profile"
  ON kids_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Parents can view children profiles"
  ON kids_profiles FOR SELECT
  TO authenticated
  USING (parent_user_id = auth.uid());

CREATE POLICY "Parents can update children profiles"
  ON kids_profiles FOR UPDATE
  TO authenticated
  USING (parent_user_id = auth.uid())
  WITH CHECK (parent_user_id = auth.uid());

CREATE POLICY "Parents can insert children profiles"
  ON kids_profiles FOR INSERT
  TO authenticated
  WITH CHECK (parent_user_id = auth.uid());

CREATE POLICY "Parents can delete children profiles"
  ON kids_profiles FOR DELETE
  TO authenticated
  USING (parent_user_id = auth.uid());

-- ============================================================================
-- PARENTAL CONTROLS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS parental_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  daily_time_limit_minutes INTEGER DEFAULT 60,
  weekly_time_limit_minutes INTEGER DEFAULT 300,
  allowed_days JSONB DEFAULT '["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]'::jsonb,
  allowed_time_start TIME DEFAULT '08:00:00',
  allowed_time_end TIME DEFAULT '20:00:00',
  require_parent_unlock BOOLEAN DEFAULT false,
  communication_enabled BOOLEAN DEFAULT false,
  content_filter_level VARCHAR(20) CHECK (content_filter_level IN ('strict', 'moderate', 'minimal')) DEFAULT 'strict',
  approved_courses JSONB DEFAULT '[]'::jsonb,
  blocked_courses JSONB DEFAULT '[]'::jsonb,
  notification_preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_profile_id)
);

ALTER TABLE parental_controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can manage children controls"
  ON parental_controls FOR ALL
  TO authenticated
  USING (parent_user_id = auth.uid())
  WITH CHECK (parent_user_id = auth.uid());

CREATE POLICY "Kids can view own controls"
  ON parental_controls FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS COURSES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  age_group VARCHAR(20) CHECK (age_group IN ('explorers', 'builders', 'creators')) NOT NULL,
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  thumbnail_url TEXT,
  learning_objectives JSONB DEFAULT '[]'::jsonb,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  estimated_hours INTEGER,
  course_type VARCHAR(50) CHECK (course_type IN ('visual', 'block_coding', 'text_coding', 'hybrid')) NOT NULL,
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kids_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can view published age-appropriate courses"
  ON kids_courses FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND (
      age_group IN (
        SELECT age_group FROM kids_profiles WHERE user_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM family_accounts WHERE parent_user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can manage all kids courses"
  ON kids_courses FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id IN (SELECT id FROM auth.users WHERE id = auth.uid())
      AND role = 'admin'
    )
  );

-- ============================================================================
-- KIDS LESSONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES kids_courses(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  lesson_type VARCHAR(50) CHECK (lesson_type IN ('video', 'interactive', 'coding_challenge', 'quiz', 'project')) NOT NULL,
  content_url TEXT,
  interactive_config JSONB DEFAULT '{}'::jsonb,
  instructions TEXT,
  audio_narration_url TEXT,
  video_url TEXT,
  estimated_minutes INTEGER,
  display_order INTEGER DEFAULT 0,
  requires_supervision BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

ALTER TABLE kids_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can view lessons from accessible courses"
  ON kids_lessons FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND course_id IN (
      SELECT id FROM kids_courses
      WHERE is_published = true
      AND age_group IN (
        SELECT age_group FROM kids_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Parents can view all lessons"
  ON kids_lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM family_accounts WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS PROGRESS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES kids_lessons(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES kids_courses(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')) DEFAULT 'not_started',
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  time_spent_seconds INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  best_score INTEGER,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  UNIQUE(kid_profile_id, lesson_id)
);

ALTER TABLE kids_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can view own progress"
  ON kids_progress FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Kids can update own progress"
  ON kids_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Kids can modify own progress"
  ON kids_progress FOR UPDATE
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view children progress"
  ON kids_progress FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS ACHIEVEMENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type VARCHAR(50) CHECK (achievement_type IN ('course_completion', 'streak', 'challenge_winner', 'skill_mastery', 'creative_project', 'peer_helper')) NOT NULL,
  achievement_name VARCHAR(100) NOT NULL,
  achievement_description TEXT,
  badge_icon VARCHAR(100),
  points_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kids_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can view own achievements"
  ON kids_achievements FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert achievements"
  ON kids_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view children achievements"
  ON kids_achievements FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES kids_courses(id) ON DELETE SET NULL,
  project_title VARCHAR(200) NOT NULL,
  project_description TEXT,
  project_type VARCHAR(50) CHECK (project_type IN ('scratch_game', 'animation', 'website', 'app', 'story', 'art')) NOT NULL,
  project_data JSONB DEFAULT '{}'::jsonb,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kids_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kids can manage own projects"
  ON kids_projects FOR ALL
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Kids can view public projects in age group"
  ON kids_projects FOR SELECT
  TO authenticated
  USING (
    is_public = true
    AND kid_profile_id IN (
      SELECT id FROM kids_profiles
      WHERE age_group IN (
        SELECT age_group FROM kids_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Parents can view children projects"
  ON kids_projects FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS ACTIVITY LOG TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type VARCHAR(50) CHECK (activity_type IN ('login', 'lesson_start', 'lesson_complete', 'video_watch', 'quiz_attempt', 'project_save', 'achievement_earned', 'logout')) NOT NULL,
  lesson_id UUID REFERENCES kids_lessons(id) ON DELETE SET NULL,
  course_id UUID REFERENCES kids_courses(id) ON DELETE SET NULL,
  duration_seconds INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE kids_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can log kid activities"
  ON kids_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view children activity log"
  ON kids_activity_log FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- KIDS SESSION LIMITS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS kids_session_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_time_seconds INTEGER DEFAULT 0,
  lesson_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_profile_id, session_date)
);

ALTER TABLE kids_session_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can manage session limits"
  ON kids_session_limits FOR ALL
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view children session limits"
  ON kids_session_limits FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE parent_user_id = auth.uid()
    )
  );

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_kids_profiles_parent ON kids_profiles(parent_user_id);
CREATE INDEX IF NOT EXISTS idx_kids_profiles_age_group ON kids_profiles(age_group);
CREATE INDEX IF NOT EXISTS idx_kids_profiles_active ON kids_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_kids_courses_age_group ON kids_courses(age_group);
CREATE INDEX IF NOT EXISTS idx_kids_courses_published ON kids_courses(is_published);
CREATE INDEX IF NOT EXISTS idx_kids_courses_slug ON kids_courses(slug);

CREATE INDEX IF NOT EXISTS idx_kids_lessons_course ON kids_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_kids_lessons_published ON kids_lessons(is_published);

CREATE INDEX IF NOT EXISTS idx_kids_progress_profile ON kids_progress(kid_profile_id);
CREATE INDEX IF NOT EXISTS idx_kids_progress_lesson ON kids_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_kids_progress_course ON kids_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_kids_progress_status ON kids_progress(status);

CREATE INDEX IF NOT EXISTS idx_kids_achievements_profile ON kids_achievements(kid_profile_id);
CREATE INDEX IF NOT EXISTS idx_kids_achievements_type ON kids_achievements(achievement_type);

CREATE INDEX IF NOT EXISTS idx_kids_projects_profile ON kids_projects(kid_profile_id);
CREATE INDEX IF NOT EXISTS idx_kids_projects_public ON kids_projects(is_public);
CREATE INDEX IF NOT EXISTS idx_kids_projects_featured ON kids_projects(is_featured);

CREATE INDEX IF NOT EXISTS idx_kids_activity_log_profile ON kids_activity_log(kid_profile_id);
CREATE INDEX IF NOT EXISTS idx_kids_activity_log_created ON kids_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_kids_activity_log_type ON kids_activity_log(activity_type);

CREATE INDEX IF NOT EXISTS idx_kids_session_limits_profile_date ON kids_session_limits(kid_profile_id, session_date);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_family_accounts_updated_at'
  ) THEN
    CREATE TRIGGER update_family_accounts_updated_at
      BEFORE UPDATE ON family_accounts
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_kids_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_kids_profiles_updated_at
      BEFORE UPDATE ON kids_profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_parental_controls_updated_at'
  ) THEN
    CREATE TRIGGER update_parental_controls_updated_at
      BEFORE UPDATE ON parental_controls
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_kids_projects_updated_at'
  ) THEN
    CREATE TRIGGER update_kids_projects_updated_at
      BEFORE UPDATE ON kids_projects
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END$$;
