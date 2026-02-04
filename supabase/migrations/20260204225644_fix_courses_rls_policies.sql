/*
  # Fix RLS Policies for Courses Table

  1. Changes
    - Drop existing restrictive policies that cause errors
    - Add new permissive policies for public course viewing
    - Fix admin policy to handle missing profiles gracefully
  
  2. Security
    - Published courses are viewable by everyone (public)
    - Only admins can manage courses
    - Policies handle missing user profiles gracefully
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON courses;

-- Create new public read policy for published courses
CREATE POLICY "Public can view published courses"
  ON courses
  FOR SELECT
  TO public
  USING (is_published = true);

-- Create separate admin policies that handle missing profiles
CREATE POLICY "Admins can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );