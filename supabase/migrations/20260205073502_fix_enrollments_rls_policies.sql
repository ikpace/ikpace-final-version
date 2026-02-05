/*
  # Fix Enrollments RLS Policies

  1. Changes
    - Remove admin policy that references user_profiles
    - Keep only direct user access policies
  
  2. Security
    - Users can view, insert, and update their own enrollments
    - No circular dependencies with user_profiles table
*/

-- Drop admin policy that references user_profiles
DROP POLICY IF EXISTS "Admins can view all enrollments" ON enrollments;

-- Keep the safe, non-recursive policies:
-- "Users can view own enrollments" - USING (auth.uid() = user_id)
-- "Users can insert own enrollments" - WITH CHECK (auth.uid() = user_id)
-- "Users can update own enrollments" - USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)