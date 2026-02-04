/*
  # Create Enrollments and Progress Tracking Tables

  1. New Tables
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `course_id` (uuid, foreign key to courses)
      - `enrolled_at` (timestamptz)
      - `is_completed` (boolean, default false)
      - `completion_date` (timestamptz, nullable)
      - `progress_percentage` (integer, default 0)
      - `payment_reference` (text, nullable)

    - `lesson_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `lesson_id` (uuid, foreign key)
      - `is_completed` (boolean, default false)
      - `completed_at` (timestamptz, nullable)
      - `time_spent_minutes` (integer, default 0)

  2. Security
    - Enable RLS on all tables
    - Users can only view/update their own enrollments and progress
    - Admins can view all enrollments
*/

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  is_completed boolean DEFAULT false,
  completion_date timestamptz,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  payment_reference text,
  UNIQUE(user_id, course_id)
);

-- Create lesson_progress table
CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  time_spent_minutes integer DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

-- Enable Row Level Security
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Enrollments policies
CREATE POLICY "Users can view own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lesson progress policies
CREATE POLICY "Users can view own lesson progress"
  ON lesson_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON lesson_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to update enrollment progress when lesson is completed
CREATE OR REPLACE FUNCTION update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
  total_lessons integer;
  completed_lessons integer;
  new_progress integer;
  course_id_var uuid;
BEGIN
  -- Get the course_id for this lesson
  SELECT m.course_id INTO course_id_var
  FROM lessons l
  JOIN modules m ON m.id = l.module_id
  WHERE l.id = NEW.lesson_id;

  -- Count total lessons in the course
  SELECT COUNT(*) INTO total_lessons
  FROM lessons l
  JOIN modules m ON m.id = l.module_id
  WHERE m.course_id = course_id_var;

  -- Count completed lessons for this user in this course
  SELECT COUNT(*) INTO completed_lessons
  FROM lesson_progress lp
  JOIN lessons l ON l.id = lp.lesson_id
  JOIN modules m ON m.id = l.module_id
  WHERE m.course_id = course_id_var
    AND lp.user_id = NEW.user_id
    AND lp.is_completed = true;

  -- Calculate progress percentage
  IF total_lessons > 0 THEN
    new_progress := ROUND((completed_lessons::numeric / total_lessons::numeric) * 100);
  ELSE
    new_progress := 0;
  END IF;

  -- Update enrollment progress
  UPDATE enrollments
  SET 
    progress_percentage = new_progress,
    is_completed = (new_progress = 100),
    completion_date = CASE WHEN new_progress = 100 THEN now() ELSE completion_date END
  WHERE user_id = NEW.user_id AND course_id = course_id_var;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update enrollment progress
CREATE TRIGGER trigger_update_enrollment_progress
  AFTER INSERT OR UPDATE ON lesson_progress
  FOR EACH ROW
  WHEN (NEW.is_completed = true)
  EXECUTE FUNCTION update_enrollment_progress();
