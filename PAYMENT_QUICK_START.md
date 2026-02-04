# Paystack Payment - Quick Start Guide

**Status**: ✅ Ready for Testing | **Time to Setup**: 5 minutes

---

## 🚀 3-Step Setup

### Step 1: Get Your Keys (2 minutes)

1. Go to https://dashboard.paystack.com
2. Sign up/Login
3. Navigate to **Settings** → **API Keys**
4. Copy both keys:
   - **Public Key**: `pk_test_xxxxxxxxxxxxx`
   - **Secret Key**: `sk_test_xxxxxxxxxxxxx`

### Step 2: Configure Environment (1 minute)

Open `.env` file and replace:

```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
PAYSTACK_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

With your actual keys:

```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### Step 3: Restart Server (1 minute)

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 💳 Test Payment (1 minute)

1. **Navigate to any course** → Click "Enroll Now"
2. **Click "Pay $7.00"**
3. **Enter test card**:
   ```
   Card: 4084 0840 8408 4081
   CVV: 408
   PIN: 0000
   OTP: 123456
   ```
4. **Payment processes** → Auto-enrolled!
5. **Check dashboard** → Course unlocked ✅

---

## ✅ What to Expect

### During Payment
- Paystack popup opens
- Enter test card details
- Payment processes
- "Verifying Payment..." message
- Auto-redirect to success page

### After Payment
- Course appears in "My Courses"
- Full access to course content
- Transaction in database
- Payment visible in Paystack dashboard

---

## 🔍 Verify It Worked

### 1. Paystack Dashboard
Visit: https://dashboard.paystack.com/transactions (Test Mode)
- Transaction should appear
- Status: Success
- Amount: $7.00

### 2. Your Dashboard
Go to: http://localhost:5173/dashboard
- Course should be listed
- Can access course content

### 3. Database (Optional)
```sql
SELECT * FROM transactions ORDER BY created_at DESC LIMIT 1;
SELECT * FROM enrollments WHERE payment_status = 'completed' ORDER BY enrolled_at DESC LIMIT 1;
```

---

## 🚨 Quick Troubleshooting

### "Payment system not configured"
**Fix**: Check `VITE_PAYSTACK_PUBLIC_KEY` in `.env`, restart server

### "Payment verification failed"
**Fix**: Check `PAYSTACK_SECRET_KEY` in `.env`

### Payment succeeds but no enrollment
**Fix**: Check browser console and Supabase Edge Function logs

---

## 📚 Full Documentation

- **Setup Guide**: `PAYSTACK_SETUP_GUIDE.md` (detailed)
- **Implementation Summary**: `PAYMENT_IMPLEMENTATION_SUMMARY.md` (technical)
- **This Quick Start**: For fast setup

---

## 🎯 Test Card Reminder

```
Card Number: 4084 0840 8408 4081
CVV: 408
PIN: 0000
OTP: 123456
Expiry: Any future date (e.g., 12/25)
```

This is a **Paystack test card** - no real money is charged!

---

## ✨ Features Implemented

✅ Secure backend verification
✅ Automatic enrollment
✅ Duplicate payment prevention
✅ Comprehensive error handling
✅ Professional UI/UX
✅ Test mode support

---

## 🎉 Ready to Test!

1. Add your keys to `.env`
2. Restart: `npm run dev`
3. Make a test payment
4. Enjoy your working payment system!

---

**Need Help?** See `PAYSTACK_SETUP_GUIDE.md` for detailed instructions.

**Questions?** Check the troubleshooting section above.

---

**Implementation Date**: February 4, 2026
**Status**: ✅ Production Ready (Test Mode)
**Version**: 1.0
