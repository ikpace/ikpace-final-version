/*
  # Add Career Ready Profile Fields

  ## Overview
  This migration adds support for the Career Ready feature, allowing users to upload
  their CV and track their career readiness status.

  ## Changes

  1. **user_profiles Table Updates**
    - Add `cv_url` field for storing CV document URL
    - Add `career_ready` field to track completion status
    - Add `legacy_points` field for rewards system

  2. **Security**
    - Users can update their own career_ready status
    - RLS policies already in place for user_profiles

  ## Notes
  - CVs will be stored in Supabase Storage (bucket: 'cvs')
  - Legacy points start at 0 and increase with achievements
  - Career ready status unlocks exclusive features
*/

-- Add cv_url to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'cv_url'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN cv_url text;
  END IF;
END $$;

-- Add career_ready to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'career_ready'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN career_ready boolean DEFAULT false;
  END IF;
END $$;

-- Add legacy_points to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'legacy_points'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN legacy_points integer DEFAULT 0;
  END IF;
END $$;

-- Create index for career_ready users
CREATE INDEX IF NOT EXISTS idx_user_profiles_career_ready ON user_profiles(career_ready);

-- Function to award legacy points
CREATE OR REPLACE FUNCTION award_legacy_points(
  p_user_id uuid,
  p_points integer,
  p_reason text DEFAULT 'Achievement'
)
RETURNS jsonb AS $$
DECLARE
  new_total integer;
BEGIN
  -- Update user's legacy points
  UPDATE user_profiles
  SET legacy_points = COALESCE(legacy_points, 0) + p_points
  WHERE id = p_user_id
  RETURNING legacy_points INTO new_total;

  -- Return success with new total
  RETURN jsonb_build_object(
    'success', true,
    'points_awarded', p_points,
    'new_total', new_total,
    'reason', p_reason
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION award_legacy_points TO authenticated;
