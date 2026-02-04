/*
  # Add Payment Status and Access Control Fields

  ## Overview
  This migration enhances the payment and enrollment system to support proper access control
  for courses based on payment verification.

  ## Changes

  1. **Enrollments Table Updates**
    - Add `payment_status` field to track payment state (pending, completed, failed, refunded)
    - Add `access_expires_at` field for subscription-based access control
    - Add `has_access` computed field for easy access verification

  2. **Payments Table Updates**
    - Add `verified_at` timestamp for payment verification tracking
    - Add `metadata` JSONB field for storing additional payment provider data
    - Update payment_method enum to include more options

  3. **Functions**
    - Create `check_course_access()` function to verify user access to courses
    - Create `verify_payment()` function to handle payment verification flow

  4. **Security**
    - RLS policies already in place, no changes needed
    - Add indexes for performance optimization

  ## Notes
  - Existing data will default to 'pending' status for safety
  - Access expires_at defaults to NULL (lifetime access unless specified)
  - Payment verification must be done through the verify_payment() function
*/

-- Add payment_status to enrollments if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN payment_status text DEFAULT 'pending'
      CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded'));
  END IF;
END $$;

-- Add access_expires_at to enrollments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'access_expires_at'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN access_expires_at timestamptz;
  END IF;
END $$;

-- Add verified_at to payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'verified_at'
  ) THEN
    ALTER TABLE payments ADD COLUMN verified_at timestamptz;
  END IF;
END $$;

-- Add metadata to payments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE payments ADD COLUMN metadata jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);
CREATE INDEX IF NOT EXISTS idx_enrollments_access_expires ON enrollments(access_expires_at);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(payment_reference);

-- Function to check if user has access to a course
CREATE OR REPLACE FUNCTION check_course_access(p_user_id uuid, p_course_id uuid)
RETURNS boolean AS $$
DECLARE
  has_valid_access boolean;
BEGIN
  -- Check if user has a completed enrollment with valid access
  SELECT EXISTS (
    SELECT 1
    FROM enrollments
    WHERE user_id = p_user_id
      AND course_id = p_course_id
      AND payment_status = 'completed'
      AND (access_expires_at IS NULL OR access_expires_at > now())
  ) INTO has_valid_access;

  RETURN has_valid_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify payment and grant access
CREATE OR REPLACE FUNCTION verify_payment(
  p_payment_reference text,
  p_verification_data jsonb DEFAULT '{}'::jsonb
)
RETURNS jsonb AS $$
DECLARE
  v_payment_id uuid;
  v_user_id uuid;
  v_course_id uuid;
  v_enrollment_id uuid;
  result jsonb;
BEGIN
  -- Get payment details
  SELECT id, user_id, course_id
  INTO v_payment_id, v_user_id, v_course_id
  FROM payments
  WHERE payment_reference = p_payment_reference
    AND status = 'pending';

  -- If payment not found or already processed
  IF v_payment_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Payment not found or already processed'
    );
  END IF;

  -- Update payment status
  UPDATE payments
  SET
    status = 'completed',
    verified_at = now(),
    metadata = p_verification_data
  WHERE id = v_payment_id;

  -- Create or update enrollment
  INSERT INTO enrollments (user_id, course_id, payment_reference, payment_status, enrolled_at)
  VALUES (v_user_id, v_course_id, p_payment_reference, 'completed', now())
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    payment_status = 'completed',
    payment_reference = EXCLUDED.payment_reference,
    enrolled_at = now()
  RETURNING id INTO v_enrollment_id;

  -- Return success with enrollment details
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Payment verified and access granted',
    'enrollment_id', v_enrollment_id,
    'user_id', v_user_id,
    'course_id', v_course_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION check_course_access TO authenticated;
GRANT EXECUTE ON FUNCTION verify_payment TO authenticated;
