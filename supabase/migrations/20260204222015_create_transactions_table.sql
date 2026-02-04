/*
  # Create Transactions Table for Payment Tracking

  ## Overview
  Creates a comprehensive transactions table to track all payment operations
  through Paystack, ensuring secure payment verification and preventing
  fraudulent enrollments.

  ## New Table
  
  **transactions**
  - Stores all payment attempts and completions
  - Links payments to users and courses
  - Tracks Paystack references for verification
  - Prevents duplicate payments
  - Audit trail for all financial operations

  ## Security
  - RLS enabled
  - Users can only view their own transactions
  - Admins can view all transactions
  - Payment verification required before enrollment

  ## Compliance
  - Financial data tracking
  - Audit trail maintenance
  - PCI DSS considerations (Paystack handles card data)
*/

-- ============================================================================
-- TRANSACTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  reference VARCHAR(255) UNIQUE NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) CHECK (status IN ('pending', 'success', 'failed', 'refunded')) DEFAULT 'pending',
  payment_provider VARCHAR(50) DEFAULT 'paystack',
  payment_method VARCHAR(50),
  customer_email VARCHAR(255) NOT NULL,
  paystack_response JSONB DEFAULT '{}'::jsonb,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_course_id ON transactions(course_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- System can insert transactions
CREATE POLICY "System can insert transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- System can update transaction status
CREATE POLICY "System can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- TRIGGER FOR UPDATED_AT
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_transactions_updated_at'
  ) THEN
    CREATE TRIGGER update_transactions_updated_at
      BEFORE UPDATE ON transactions
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END$$;

-- ============================================================================
-- ADD PAYMENT REFERENCE TO ENROLLMENTS
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'transaction_id'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN transaction_id UUID REFERENCES transactions(id);
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_enrollments_transaction_id ON enrollments(transaction_id);

-- ============================================================================
-- FUNCTION TO CHECK DUPLICATE PAYMENTS
-- ============================================================================

CREATE OR REPLACE FUNCTION check_duplicate_payment(
  p_reference VARCHAR(255)
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM transactions
    WHERE reference = p_reference
    AND status = 'success'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- FUNCTION TO CREATE ENROLLMENT AFTER PAYMENT
-- ============================================================================

CREATE OR REPLACE FUNCTION create_enrollment_after_payment(
  p_user_id UUID,
  p_course_id UUID,
  p_transaction_id UUID
)
RETURNS UUID AS $$
DECLARE
  v_enrollment_id UUID;
BEGIN
  -- Check if enrollment already exists
  SELECT id INTO v_enrollment_id
  FROM enrollments
  WHERE user_id = p_user_id AND course_id = p_course_id;

  IF v_enrollment_id IS NOT NULL THEN
    -- Update existing enrollment
    UPDATE enrollments
    SET 
      payment_status = 'completed',
      transaction_id = p_transaction_id,
      access_expires_at = NOW() + INTERVAL '365 days'
    WHERE id = v_enrollment_id;
  ELSE
    -- Create new enrollment
    INSERT INTO enrollments (
      user_id,
      course_id,
      payment_status,
      transaction_id,
      access_expires_at
    ) VALUES (
      p_user_id,
      p_course_id,
      'completed',
      p_transaction_id,
      NOW() + INTERVAL '365 days'
    )
    RETURNING id INTO v_enrollment_id;
  END IF;

  RETURN v_enrollment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
