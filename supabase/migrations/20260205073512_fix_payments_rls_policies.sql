/*
  # Fix Payments RLS Policies

  1. Changes
    - Remove admin policy that references user_profiles
    - Keep only direct user access policies
  
  2. Security
    - Users can view and insert their own payments
    - No circular dependencies with user_profiles table
*/

-- Drop admin policy that references user_profiles
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;

-- Keep the safe, non-recursive policies:
-- "Users can view own payments" - USING (auth.uid() = user_id)
-- "Users can insert own payments" - WITH CHECK (auth.uid() = user_id)