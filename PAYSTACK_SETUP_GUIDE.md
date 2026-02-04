# Paystack Payment Integration - Setup Guide

**Status**: ✅ Implemented and Ready for Testing
**Mode**: TEST MODE (Safe for Development)
**Last Updated**: February 4, 2026

---

## 🎉 What's Been Implemented

A complete, secure Paystack payment system has been implemented with:

✅ **Secure Backend Verification** - Edge Function deployed
✅ **Frontend Payment Flow** - PaystackPayment component updated
✅ **Database Transactions Table** - Track all payments
✅ **Enrollment Automation** - Auto-enroll after verification
✅ **Error Handling** - Comprehensive error messages
✅ **Test Mode** - Safe testing environment

---

## 🔑 Step 1: Get Your Paystack Test Keys

### Create Paystack Account

1. Go to [https://paystack.com](https://paystack.com)
2. Click "Get Started" and create an account
3. Verify your email address
4. Log in to your dashboard

### Get Your Test Keys

1. Navigate to **Settings** → **API Keys & Webhooks**
2. You'll see two types of keys:

```
PUBLIC KEY (Safe to expose):
pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

SECRET KEY (NEVER expose):
sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Copy both keys (you'll need them in the next step)

---

## ⚙️ Step 2: Configure Environment Variables

### Update Your .env File

Open `/tmp/cc-agent/63362434/project/.env` and replace the placeholders:

```bash
# Supabase Configuration (Already Configured)
VITE_SUPABASE_URL=https://muznkrxdhciqrnsffhwe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Paystack Payment Configuration (TEST MODE)
# Frontend uses PUBLIC key (safe to expose)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_ACTUAL_KEY_HERE

# Backend uses SECRET key (NEVER expose to frontend)
PAYSTACK_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
```

**Replace**:
- `pk_test_YOUR_ACTUAL_KEY_HERE` with your actual Paystack PUBLIC test key
- `sk_test_YOUR_ACTUAL_SECRET_KEY_HERE` with your actual Paystack SECRET test key

### Configure Supabase Edge Function Secret

The secret key needs to be configured in Supabase for the Edge Function:

**IMPORTANT**: The deployment message says secrets are automatically configured. However, if payments fail with "PAYSTACK_SECRET_KEY not configured", you'll need to set it manually:

```bash
# From your project directory (if you have Supabase CLI installed):
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
```

**Note**: If you don't have the Supabase CLI, you can set the secret via the Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Edge Functions → Settings
4. Add secret: `PAYSTACK_SECRET_KEY` = `sk_test_...`

---

## 🔄 Step 3: Restart Development Server

After updating environment variables, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

---

## 💳 Step 4: Test the Payment Flow

### Use Paystack Test Card

Paystack provides test cards for testing payments WITHOUT real money:

**Test Card Details**:
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: Any future date (e.g., 12/25)
PIN: 0000
OTP: 123456
```

### Testing Steps

1. **Start the dev server**: `npm run dev`

2. **Log in to your iKPACE account**

3. **Browse to a course**: Go to `/courses`

4. **Click "Enroll Now"** on any course

5. **You'll be redirected to Checkout page** at `/checkout/:courseId`

6. **Click "Pay $7.00"** button

7. **Paystack popup will appear**:
   - Enter test card: `4084 0840 8408 4081`
   - CVV: `408`
   - Expiry: Any future date
   - Click Continue

8. **Enter PIN**: `0000`

9. **Enter OTP**: `123456`

10. **Payment processing**:
    - Paystack processes payment
    - Frontend sends reference to backend
    - Backend verifies with Paystack API
    - Transaction saved to database
    - Enrollment created automatically
    - You're redirected to success page

11. **Verify enrollment**:
    - Go to `/dashboard`
    - Course should appear in "My Courses"
    - You should have full access

---

## 🔍 Step 5: Verify Payment in Paystack Dashboard

1. Go to [Paystack Dashboard](https://dashboard.paystack.com)
2. Navigate to **Transactions** (Test Mode)
3. You should see your test payment listed
4. Status should be "Success"
5. Amount should be $7.00 (or 700 in cents)

---

## 🗄️ Step 6: Verify Database Records

Check that all database records were created correctly:

### Check Transactions Table

```sql
SELECT * FROM transactions
ORDER BY created_at DESC
LIMIT 10;
```

You should see:
- `reference`: IKPACE_xxxxx
- `status`: success
- `amount`: 7.00
- `verified_at`: timestamp
- `paystack_response`: JSON with payment details

### Check Enrollments Table

```sql
SELECT * FROM enrollments
WHERE payment_status = 'completed'
ORDER BY enrolled_at DESC
LIMIT 10;
```

You should see:
- `payment_status`: completed
- `transaction_id`: UUID (linked to transactions table)
- `access_expires_at`: 1 year from now

---

## ✅ Payment Flow Explained

Here's exactly what happens when a user pays:

### Step 1: Frontend - Initialize Payment
```javascript
// User clicks "Pay $7.00"
// PaystackPayment component opens Paystack popup
// User enters test card details
// Paystack processes payment
```

### Step 2: Frontend - Payment Callback
```javascript
// Paystack returns reference: IKPACE_123456789_1234567890
// Component immediately calls backend verification
```

### Step 3: Backend - Verify Payment
```javascript
// Edge Function receives: { reference, courseId, amount, email }
// Makes GET request to Paystack API:
// GET https://api.paystack.co/transaction/verify/{reference}
// Authorization: Bearer sk_test_xxxxx
```

### Step 4: Backend - Validate Response
```javascript
// Checks:
// ✅ Payment status === "success"
// ✅ Amount matches course price ($7.00)
// ✅ Email matches logged-in user
// ✅ No duplicate payment (same reference)
```

### Step 5: Backend - Create Records
```javascript
// If all checks pass:
// 1. Insert into transactions table
// 2. Create enrollment (or update existing)
// 3. Set payment_status = 'completed'
// 4. Set access_expires_at = NOW() + 365 days
```

### Step 6: Frontend - Success
```javascript
// Backend returns success
// Frontend navigates to /payment-success
// User sees success message
// Course unlocked in dashboard
```

---

## 🚨 Security Features

### What We Prevent

✅ **Fake Enrollments**: No enrollment without backend verification
✅ **Amount Tampering**: Backend validates amount matches course price
✅ **Duplicate Payments**: Reference checked for uniqueness
✅ **Email Mismatch**: Verifies email matches authenticated user
✅ **Failed Payments**: Only successful payments create enrollments

### How Secrets Are Protected

✅ **Frontend**: Only uses PUBLIC key (pk_test_...)
✅ **Backend**: Uses SECRET key (sk_test_...) in Edge Function
✅ **.env File**: In .gitignore (never committed to git)
✅ **Supabase**: Secret stored securely in Edge Function environment

---

## 🐛 Troubleshooting

### Issue: "Payment system not configured"

**Solution**:
- Check that `VITE_PAYSTACK_PUBLIC_KEY` is set in `.env`
- Restart dev server after changing `.env`
- Key should start with `pk_test_`

### Issue: "Payment verification failed"

**Solution**:
- Check that `PAYSTACK_SECRET_KEY` is configured in Supabase Edge Functions
- Key should start with `sk_test_`
- Check browser console and Edge Function logs for details

### Issue: "Amount mismatch"

**Solution**:
- Ensure you're testing with a course that costs $7.00
- Amount is converted to kobo (cents) automatically: $7.00 = 700

### Issue: "Email mismatch"

**Solution**:
- Ensure you're logged in
- Check that your profile email matches
- Try logging out and back in

### Issue: "Payment already processed"

**Solution**:
- This is actually GOOD - it means duplicate prevention is working!
- The payment already went through
- Check your dashboard - you should already be enrolled

### Issue: Payment succeeds but no enrollment

**Solution**:
1. Check Edge Function logs in Supabase Dashboard
2. Check browser console for errors
3. Verify transaction was created: `SELECT * FROM transactions ORDER BY created_at DESC LIMIT 1`
4. Check if enrollment exists: `SELECT * FROM enrollments WHERE user_id = 'your-user-id' AND course_id = 'course-id'`

---

## 📊 Testing Checklist

Before considering payment complete, test all these scenarios:

### Happy Path
- [ ] User can initiate payment
- [ ] Paystack popup opens
- [ ] Test card payment succeeds
- [ ] Backend verification completes
- [ ] Transaction saved to database
- [ ] Enrollment created automatically
- [ ] User redirected to success page
- [ ] Course appears in dashboard
- [ ] Course content is accessible

### Error Handling
- [ ] Payment cancelled - shows error message
- [ ] Invalid card - shows Paystack error
- [ ] Network error - shows appropriate message
- [ ] Duplicate payment - shows "already processed"
- [ ] Amount mismatch - rejected by backend

### Security
- [ ] Cannot enroll without payment
- [ ] Cannot fake payment reference
- [ ] Cannot bypass verification
- [ ] Secret key not exposed in frontend
- [ ] Failed payments don't create enrollments

---

## 🎯 Success Criteria

Payment is considered FULLY WORKING when:

✅ Test payment succeeds in Paystack dashboard
✅ Backend verification passes
✅ Transaction appears in database
✅ Enrollment created automatically
✅ Course unlocks in user dashboard
✅ User can access course content
✅ Payment visible in Paystack dashboard
✅ All security checks pass

---

## 🚀 Moving to Production

**IMPORTANT**: Currently in TEST MODE. To go live:

### 1. Get Live Keys

In Paystack Dashboard:
- Switch to "Live Mode"
- Get live keys: `pk_live_...` and `sk_live_...`
- Complete business verification

### 2. Update Environment Variables

```bash
# Production .env
VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

### 3. Test Thoroughly

- Test with real (small) amounts first
- Verify all flows work correctly
- Monitor transactions closely

### 4. Update UI

Remove test mode banner:
- Update PaystackPayment.jsx
- Remove "Test Mode Active" message
- Remove test card instructions

---

## 📞 Support

### Paystack Support

- Documentation: https://paystack.com/docs
- Support: support@paystack.com
- Status: https://status.paystack.com

### Debugging

Check these logs when issues occur:

1. **Browser Console**: Right-click → Inspect → Console
2. **Supabase Logs**: Dashboard → Edge Functions → Logs
3. **Paystack Dashboard**: Transactions → Click transaction → View logs

---

## 📝 API Reference

### Frontend API

**Initialize Payment**:
```javascript
<PaystackPayment
  email={userEmail}
  amount={coursePrice * 100} // Convert to kobo/cents
  courseName={courseName}
  courseId={courseId}
  onSuccess={handleSuccess}
  onClose={handleClose}
/>
```

### Backend API

**Verify Payment Endpoint**:
```
POST {SUPABASE_URL}/functions/v1/verify-payment
Authorization: Bearer {user_access_token}
Content-Type: application/json

{
  "reference": "IKPACE_123456789_1234567890",
  "courseId": "uuid",
  "amount": 7.00,
  "email": "user@example.com"
}
```

**Success Response**:
```json
{
  "success": true,
  "message": "Payment verified and enrollment created",
  "data": {
    "transactionId": "uuid",
    "enrollmentId": "uuid",
    "courseName": "Course Title",
    "amount": 7.00,
    "reference": "IKPACE_123456789_1234567890"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🎓 Database Schema

### Transactions Table

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  reference VARCHAR(255) UNIQUE,
  amount NUMERIC(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20), -- pending, success, failed, refunded
  payment_provider VARCHAR(50) DEFAULT 'paystack',
  customer_email VARCHAR(255),
  paystack_response JSONB,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Enrollments Table (Updated)

```sql
ALTER TABLE enrollments
ADD COLUMN transaction_id UUID REFERENCES transactions(id);
```

---

## ✨ Features Implemented

### Payment Processing
✅ Paystack popup integration
✅ Card and mobile money support
✅ Amount conversion (dollars to kobo)
✅ Reference generation
✅ Payment metadata

### Security
✅ Backend verification required
✅ Secret key in Edge Function only
✅ Amount validation
✅ Email validation
✅ Duplicate payment prevention
✅ RLS policies on transactions

### User Experience
✅ Loading states during verification
✅ Clear error messages
✅ Success confirmation
✅ Auto-redirect after success
✅ Test card instructions

### Database
✅ Transaction tracking
✅ Enrollment automation
✅ Payment history
✅ Audit trail

### Testing
✅ Test mode enabled
✅ Test card support
✅ Safe testing environment
✅ Paystack dashboard integration

---

## 🎉 You're All Set!

Your Paystack payment system is fully implemented and ready for testing.

**Next Steps**:
1. Add your Paystack test keys to `.env`
2. Restart the dev server
3. Test a payment with the test card
4. Verify enrollment in dashboard
5. Check Paystack dashboard for transaction

**Questions?** Review the troubleshooting section above.

---

**Status**: ✅ Implementation Complete
**Last Updated**: February 4, 2026
**Version**: 1.0
