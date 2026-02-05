/*
  # Fix Infinite Recursion in User Profiles RLS

  1. Problem
    - Admin policies were checking user_profiles table from within user_profiles policies
    - This created infinite recursion: to check if user can SELECT, policy tries to SELECT from same table
  
  2. Solution
    - Remove recursive admin policies
    - Keep only direct auth.uid() checks which don't cause recursion
    - Users can view and update their own profiles
  
  3. Security
    - Users can only access their own profile data
    - No circular dependencies in policies
*/

-- Drop recursive admin policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;

-- Keep the safe, non-recursive policies
-- These are already in place:
-- "Users can view own profile" - USING (auth.uid() = id)
-- "Users can update own profile" - USING (auth.uid() = id) WITH CHECK (auth.uid() = id)
-- "Users can insert own profile" - WITH CHECK (auth.uid() = id)