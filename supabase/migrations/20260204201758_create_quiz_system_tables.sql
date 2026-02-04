/*
  # Create Quiz System Tables

  ## Overview
  This migration creates comprehensive tables for the quiz system, including
  quiz attempts, scores, and progress tracking.

  ## Changes

  1. **New Tables**
    - `quiz_attempts` - Stores all quiz attempt data
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `lesson_id` (uuid, foreign key to lessons)
      - `score` (integer, 0-100)
      - `passed` (boolean)
      - `time_spent_seconds` (integer)
      - `answers` (jsonb, stores all answers)
      - `attempt_number` (integer)
      - `attempted_at` (timestamptz)

  2. **Updates to existing tables**
    - Add `quiz_score` to lesson_progress table

  3. **Security**
    - Enable RLS on quiz_attempts
    - Users can only view/create their own attempts
    - Admins can view all attempts

  ## Notes
  - Supports unlimited quiz retakes
  - Tracks complete answer history
  - Calculates time spent on each attempt
  - Stores progress for analytics
*/

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  passed boolean DEFAULT false,
  time_spent_seconds integer DEFAULT 0,
  answers jsonb DEFAULT '{}'::jsonb,
  attempt_number integer DEFAULT 1,
  attempted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add quiz_score to lesson_progress if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lesson_progress' AND column_name = 'quiz_score'
  ) THEN
    ALTER TABLE lesson_progress ADD COLUMN quiz_score integer CHECK (quiz_score >= 0 AND quiz_score <= 100);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_lesson_id ON quiz_attempts(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_lesson ON quiz_attempts(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_attempted_at ON quiz_attempts(attempted_at DESC);

-- Enable Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_attempts

-- Users can view their own attempts
CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own attempts
CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all attempts
CREATE POLICY "Admins can view all quiz attempts"
  ON quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to get user's quiz statistics
CREATE OR REPLACE FUNCTION get_quiz_statistics(p_user_id uuid)
RETURNS jsonb AS $$
DECLARE
  stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_attempts', COUNT(*),
    'total_passed', COUNT(*) FILTER (WHERE passed = true),
    'average_score', COALESCE(AVG(score), 0),
    'best_score', COALESCE(MAX(score), 0),
    'total_time_minutes', COALESCE(SUM(time_spent_seconds) / 60, 0),
    'unique_lessons', COUNT(DISTINCT lesson_id)
  )
  INTO stats
  FROM quiz_attempts
  WHERE user_id = p_user_id;

  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get lesson quiz history
CREATE OR REPLACE FUNCTION get_lesson_quiz_history(
  p_user_id uuid,
  p_lesson_id uuid
)
RETURNS jsonb AS $$
DECLARE
  history jsonb;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'attempt_number', attempt_number,
      'score', score,
      'passed', passed,
      'time_spent_seconds', time_spent_seconds,
      'attempted_at', attempted_at
    )
    ORDER BY attempt_number
  )
  INTO history
  FROM quiz_attempts
  WHERE user_id = p_user_id AND lesson_id = p_lesson_id;

  RETURN COALESCE(history, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_quiz_statistics TO authenticated;
GRANT EXECUTE ON FUNCTION get_lesson_quiz_history TO authenticated;
