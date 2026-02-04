# 🔧 iKPACE Platform - Complete Troubleshooting Guide

## 🚨 CRITICAL ISSUES - IMMEDIATE FIXES

### **Access System Diagnostics Dashboard**
**URL**: `http://localhost:5173/diagnostics` (or `/diagnostics` on your domain)

This dashboard provides real-time health checks for:
- Database connection
- Courses availability
- Lessons and video content
- Payment system configuration
- Your enrollments (if logged in)

---

## ISSUE 1: 🎬 VIDEO PLAYBACK FAILURE

### **Symptoms**
- Videos not loading or playing
- Black screen instead of video
- Error messages in video player
- "Video unavailable" messages

### **Root Causes Identified**

#### ✅ FIXED: No Lesson Content in Database
**Status**: ✅ RESOLVED
- **Problem**: Lessons table was empty - no video URLs to play
- **Solution**: Added sample lessons with working YouTube video URLs
- **Verification**: Run this SQL query:
  ```sql
  SELECT COUNT(*) FROM lessons;
  ```
  Should return 5+ lessons

#### Cause #2: Invalid Video URLs
**Check**:
```sql
SELECT title, video_url FROM lessons WHERE video_url IS NULL OR video_url = '';
```

**Fix**: Update lessons with valid video URLs:
```sql
UPDATE lessons
SET video_url = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
WHERE id = 'lesson-id-here';
```

#### Cause #3: Wrong Video URL Format

**❌ Wrong**:
```
youtube.com/watch?v=abc123  (missing protocol)
YOUR_VIDEO_ID  (placeholder)
```

**✅ Correct**:
```
https://www.youtube.com/watch?v=abc123
https://youtu.be/abc123
https://example.com/video.mp4  (for direct files)
```

### **Diagnostic Steps**

#### Step 1: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for errors:
   - CORS errors
   - 404 Not Found
   - Network errors

#### Step 2: Verify Database Content
```sql
-- Check if lessons exist
SELECT l.title, l.video_url, c.title as course
FROM lessons l
JOIN modules m ON m.id = l.module_id
JOIN courses c ON c.id = m.course_id
WHERE l.video_url IS NOT NULL;
```

#### Step 3: Test Video URLs Manually
1. Copy video URL from database
2. Paste in browser address bar
3. Verify video plays

#### Step 4: Check Video Player Component
1. Open `/src/components/AdvancedVideoPlayer.jsx`
2. Verify it's being used in course player
3. Check console for component errors

### **Common Solutions**

#### Solution 1: Use YouTube Videos (Recommended)
```javascript
// In lesson data:
{
  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

// The video player will automatically handle YouTube embeds
```

#### Solution 2: Use Direct Video Files
```javascript
{
  video_url: 'https://your-cdn.com/videos/lesson1.mp4',
  video_type: 'video/mp4'
}
```

#### Solution 3: Check CORS Headers
If using your own video server, ensure CORS headers are set:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD
```

### **Testing Procedure**

1. **Test Video Component Directly**:
   ```jsx
   // In any test page
   <AdvancedVideoPlayer
     videoUrl="https://www.youtube.com/watch?v=tl4WgbbqKMY"
     title="Test Video"
     onComplete={() => console.log('Video completed!')}
   />
   ```

2. **Test Full Course Flow**:
   - Login to platform
   - Go to Dashboard
   - Click "Continue Learning" on IT Fundamentals
   - Verify video plays

3. **Check Video Completion**:
   - Play video to end
   - Verify "Video Completed" badge appears
   - Verify quiz prompt appears (if quiz exists)

---

## ISSUE 2: 💳 PAYMENT SYSTEM MALFUNCTION

### **Symptoms**
- Payment button does nothing
- "Payment system not configured" error
- Payments fail silently
- Course access not granted after payment

### **Root Causes Identified**

#### ✅ FIXED: Hardcoded Placeholder Paystack Key
**Status**: ✅ RESOLVED
- **Problem**: Line 29 had `'pk_test_YOUR_ACTUAL_PAYSTACK_PUBLIC_KEY_HERE'`
- **Solution**: Changed to use environment variable: `import.meta.env.VITE_PAYSTACK_PUBLIC_KEY`
- **Enhanced**: Added validation and helpful error messages

#### ✅ FIXED: Payment Reference Format Mismatch
**Status**: ✅ RESOLVED
- **Problem**: Demo mode sent string, but checkout expected object with `.reference` property
- **Solution**: Updated checkout to handle both formats
- **Enhanced**: Added comprehensive error logging

### **Configuration Steps**

#### Step 1: Get Your Paystack API Keys

1. **Sign up for Paystack**:
   - Go to https://paystack.com
   - Click "Get Started" or "Sign Up"
   - Complete registration

2. **Access Your Dashboard**:
   - Login to https://dashboard.paystack.com
   - Go to Settings → API Keys & Webhooks

3. **Copy Your Public Key**:
   ```
   Test Mode: pk_test_xxxxxxxxxxxxx
   Live Mode: pk_live_xxxxxxxxxxxxx
   ```

#### Step 2: Configure Environment Variable

1. **Open `.env` file** in project root

2. **Update Paystack key**:
   ```env
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_key_here
   ```

3. **Save the file**

4. **Restart dev server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

#### Step 3: Verify Configuration

1. **Visit Diagnostics Page**: `/diagnostics`

2. **Check Payment System Status**:
   - ✅ Green = Configured correctly
   - ⚠️ Yellow = Demo mode (key not set)
   - ❌ Red = Error

3. **Test in Browser Console**:
   ```javascript
   console.log('Paystack Key:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)
   // Should show: pk_test_... or pk_live_...
   ```

### **Payment Flow Testing**

#### Test Mode (Development)

1. **Use Test Card Numbers**:
   ```
   ✅ Successful Payment:
   Card: 4084 0840 8408 4081
   Expiry: Any future date (e.g., 12/25)
   CVV: Any 3 digits (e.g., 123)

   ❌ Declined Payment (for testing errors):
   Card: 5060 6666 6666 6666
   Expiry: Any future date
   CVV: Any 3 digits
   ```

2. **Test Payment Flow**:
   ```
   Step 1: Browse courses → /courses
   Step 2: Select course → /courses/it-fundamentals
   Step 3: Click "Enroll Now" → /enroll/it-fundamentals
   Step 4: Click "Proceed to Checkout" → /checkout/course-id
   Step 5: Click "Pay $7.00"
   Step 6: Paystack modal opens
   Step 7: Enter test card details
   Step 8: Submit payment
   Step 9: Redirects to /payment-success
   Step 10: Course appears in Dashboard
   ```

3. **Verify in Console**:
   ```
   Should see logs:
   - "Initiating Paystack payment..."
   - "Payment successful: {...}"
   - "Creating payment record..."
   - "Payment record created: {...}"
   - "Verifying payment with Paystack..."
   - "Payment verified successfully!"
   ```

#### Demo Mode Testing

If Paystack key is NOT configured:

1. **Demo Button Available**: Green "Pay $7.00 (Demo Mode)" button

2. **Click Demo Button**:
   - Alert shows: "DEMO MODE: Simulating successful payment"
   - After 1 second, payment completes
   - Creates enrollment record
   - Grants course access

3. **Verify**:
   - Dashboard shows enrolled course
   - Can access course content
   - Payment record in database has "DEMO" reference

### **Common Payment Errors**

#### Error: "Course Not Found"

**Cause**: Invalid course ID in URL

**Solution**:
```sql
-- 1. Check course exists:
SELECT id, title, slug FROM courses WHERE is_published = true;

-- 2. Verify URL format:
-- ✅ Correct: /checkout/2e50e45a-4640-418c-a87c-2a4c300f5e7d
-- ❌ Wrong: /checkout/it-fundamentals (should be ID, not slug)
```

**Fix Navigation**:
```javascript
// In Enrollment page, use course.id, not slug:
navigate(`/checkout/${course.id}`)  // ✅ Correct
navigate(`/checkout/${course.slug}`) // ❌ Wrong
```

#### Error: "Payment verification failed"

**Cause**: Database function `verify_payment` might have issues

**Solution**:
```sql
-- Test the function exists:
SELECT routine_name FROM information_schema.routines
WHERE routine_name = 'verify_payment';

-- If not found, re-run migration:
-- supabase/migrations/add_payment_status_and_access_control.sql
```

#### Error: "Payment system is loading"

**Cause**: Paystack script not loaded

**Solution**:
1. Check network tab for `https://js.paystack.co/v1/inline.js`
2. Verify script loads (should be 200 OK)
3. Wait 2-3 seconds and try again
4. If persistent, check internet connection

### **Security Checklist**

✅ **Public Key on Frontend** (CORRECT):
```javascript
// ✅ Safe to expose
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
```

❌ **Secret Key on Frontend** (DANGEROUS):
```javascript
// ❌ NEVER do this!
VITE_PAYSTACK_SECRET_KEY=sk_test_xxxxx  // DON'T!
```

✅ **Secret Key on Backend Only**:
- Store in Supabase Edge Functions or backend .env
- Never send to client
- Use for payment verification only

### **Payment Verification Flow**

```
User clicks "Pay"
  ↓
Paystack modal opens (secure)
  ↓
User enters card details (Paystack handles)
  ↓
Payment processed by Paystack
  ↓
Paystack calls your callback with reference
  ↓
Your app creates payment record in DB
  ↓
Your app calls verify_payment() function
  ↓
Function verifies with Paystack (using secret key)
  ↓
If valid: Create enrollment, grant access
  ↓
Redirect to success page
```

---

## ISSUE 3: 🔍 "COURSE NOT FOUND" ERROR

### **Symptoms**
- Checkout page shows "Course not found"
- Payment page displays error message
- Cannot enroll in courses

### **Root Causes**

#### Cause #1: Using Slug Instead of ID

**Problem**:
```javascript
// ❌ Wrong - using slug
navigate(`/checkout/${course.slug}`)

// URL: /checkout/it-fundamentals
// Database lookup: WHERE id = 'it-fundamentals'  // FAILS
```

**Solution**:
```javascript
// ✅ Correct - using ID
navigate(`/checkout/${course.id}`)

// URL: /checkout/2e50e45a-4640-418c-a87c-2a4c300f5e7d
// Database lookup: WHERE id = '2e50e45a-...'  // WORKS
```

#### Cause #2: Course Not Published

**Check**:
```sql
SELECT id, title, slug, is_published
FROM courses
WHERE slug = 'it-fundamentals';
```

**Fix**:
```sql
UPDATE courses SET is_published = true WHERE slug = 'it-fundamentals';
```

#### Cause #3: Database Connection Error

**Diagnostic**:
1. Open browser console
2. Check for error:
   ```
   "Database error: ..."
   ```

**Solution**:
1. Verify `.env` has correct Supabase URL
2. Check network tab for 401/403 errors
3. Verify Supabase project is active

### **Verification Steps**

```sql
-- Step 1: List all courses with IDs
SELECT id, title, slug, is_published, price FROM courses;

-- Step 2: Check specific course
SELECT * FROM courses WHERE id = 'paste-id-here';

-- Step 3: Verify modules exist
SELECT m.id, m.title, m.course_id, c.title as course_name
FROM modules m
JOIN courses c ON c.id = m.course_id;

-- Step 4: Verify lessons exist
SELECT l.id, l.title, l.video_url, m.title as module, c.title as course
FROM lessons l
JOIN modules m ON m.id = l.module_id
JOIN courses c ON c.id = m.course_id;
```

### **Enhanced Error Logging**

The checkout page now includes comprehensive logging:

```javascript
console.log('Fetching course with ID:', courseId)
// Shows exact ID being looked up

console.log('Course loaded successfully:', courseData.title)
// Confirms successful load

console.warn('No course found with ID:', courseId)
// Warns if course not found
```

**To debug**:
1. Open browser console (F12)
2. Navigate to checkout page
3. Read logged messages
4. Compare ID in URL with database IDs

---

## ISSUE 4: 📚 "BROWSE ALL COURSES" PAGE NOT LOADING

### **Symptoms**
- Clicking "Browse All Courses" shows blank page
- /courses URL returns 404
- Course catalog not displaying

### **Root Cause Analysis**

#### ✅ VERIFIED: Route Exists
**Status**: ✅ Route is properly configured

```javascript
// In App.jsx:
<Route path="/courses" element={<Courses />} />
```

#### ✅ VERIFIED: Component Exists
**File**: `/src/pages/Courses.jsx` exists and is properly imported

### **Potential Issues**

#### Issue #1: No Courses in Database

**Check**:
```sql
SELECT COUNT(*) as total_courses FROM courses WHERE is_published = true;
```

**Expected**: Should return at least 1

**If 0 courses found**:
```sql
-- Insert sample course:
INSERT INTO courses (title, slug, description, price, is_published)
VALUES (
  'Information Technology Fundamentals',
  'it-fundamentals',
  'Master the basics of IT',
  7.00,
  true
);
```

#### Issue #2: Database Query Error

**Check browser console** for:
```
"Error fetching courses: ..."
```

**Solution**: The Courses component has fallback to mock data:
```javascript
// If database fails, uses getAllCourses() from coursesData.js
setCourses(getAllCourses())
```

#### Issue #3: Blank Page (No Error)

**Possible causes**:
1. JavaScript error preventing render
2. CSS hiding content
3. Loading state stuck

**Debug**:
```javascript
// Add to Courses.jsx:
console.log('Courses component mounted')
console.log('Courses data:', courses)
console.log('Loading state:', loading)
```

### **Testing Procedure**

#### Test 1: Direct URL Access
```
1. Go to: http://localhost:5173/courses
2. Should see course catalog
3. Check console for errors
```

#### Test 2: Navigation Link
```
1. Go to homepage
2. Click "Browse All Courses" button
3. Should navigate to /courses
4. Should see course list
```

#### Test 3: Database Verification
```sql
-- Should return courses:
SELECT * FROM courses WHERE is_published = true;

-- Should return at least 5:
SELECT COUNT(*) FROM courses;
```

### **Quick Fix: Force Reload**

If page is cached:
1. Press `Ctrl + Shift + R` (hard reload)
2. Clear browser cache
3. Restart dev server

---

## 🔧 GENERAL DIAGNOSTIC PROCEDURES

### **Use Built-in Diagnostics Dashboard**

**Access**: `http://localhost:5173/diagnostics`

**What it checks**:
- ✅ Database connectivity
- ✅ Courses count and details
- ✅ Lessons count and video URLs
- ✅ Video URL validity
- ✅ Payment system configuration
- ✅ Your enrollments (if logged in)

**Quick Fixes Provided**:
- Instructions for missing Paystack key
- Alerts for missing videos
- Guidance for empty courses
- Environment variable verification

### **Database Health Check**

```sql
-- Quick health check query:
SELECT
  (SELECT COUNT(*) FROM courses) as total_courses,
  (SELECT COUNT(*) FROM courses WHERE is_published = true) as published_courses,
  (SELECT COUNT(*) FROM modules) as total_modules,
  (SELECT COUNT(*) FROM lessons) as total_lessons,
  (SELECT COUNT(*) FROM lessons WHERE video_url IS NOT NULL) as lessons_with_videos,
  (SELECT COUNT(*) FROM enrollments) as total_enrollments,
  (SELECT COUNT(*) FROM payments WHERE status = 'completed') as completed_payments;
```

**Expected Results**:
```json
{
  "total_courses": 6+,
  "published_courses": 6+,
  "total_modules": 2+,
  "total_lessons": 5+,
  "lessons_with_videos": 5+,
  "total_enrollments": 0+ (depends on usage),
  "completed_payments": 0+ (depends on usage)
}
```

### **Environment Variables Check**

**Location**: `.env` file in project root

**Required Variables**:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key_here
```

**Verification**:
```javascript
// In browser console:
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Paystack Key:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)
// Should NOT show 'undefined'
```

**If variables show 'undefined'**:
1. Verify .env file exists in project root
2. Verify variable names start with `VITE_`
3. Restart development server:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### **Browser Console Monitoring**

**Always have console open during testing**:
1. Press F12 (or right-click → Inspect)
2. Go to Console tab
3. Watch for:
   - ❌ Red errors (critical issues)
   - ⚠️ Yellow warnings (potential issues)
   - ℹ️ Blue info (helpful debug logs)

**Common Console Patterns**:

**✅ Healthy System**:
```
"Course loaded successfully: IT Fundamentals"
"Payment record created: {...}"
"Video completed!"
```

**❌ Problematic System**:
```
"Course fetch error: {...}"
"Payment verification error: {...}"
"Video error: Failed to load"
```

---

## 📝 PREVENTIVE MEASURES

### **Before Going Live**

#### 1. Complete Checklist

- [ ] All environment variables set
- [ ] Paystack keys configured (production keys!)
- [ ] All courses have published status
- [ ] All lessons have valid video URLs
- [ ] Test payment flow end-to-end
- [ ] Test video playback on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all navigation links work
- [ ] Check database has RLS policies enabled
- [ ] Test enrollment flow completely
- [ ] Verify email notifications work (if implemented)

#### 2. Production Paystack Setup

```env
# Switch from test to live:
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_production_key
```

**Important**:
- Test in production mode with small amount first
- Verify webhooks are configured
- Set up proper logging
- Monitor first few transactions closely

#### 3. Database Backup

```bash
# Backup before going live:
npx supabase db dump > backup_$(date +%Y%m%d).sql
```

#### 4. Error Monitoring

Consider adding:
- Sentry for error tracking
- Google Analytics for user behavior
- Custom logging for payment failures

### **Regular Maintenance**

#### Daily:
- Check payment transactions
- Monitor error logs
- Verify video URLs still work

#### Weekly:
- Run diagnostics dashboard
- Check database performance
- Review failed payment attempts
- Test course enrollment flow

#### Monthly:
- Update video URLs if needed
- Review and update course content
- Check for broken links
- Security audit

---

## 🆘 EMERGENCY FIXES

### **Platform Completely Down**

1. **Check Supabase Status**:
   - Go to https://status.supabase.com
   - Check if service is operational

2. **Verify Environment Variables**:
   ```bash
   cat .env
   # Ensure all variables are present
   ```

3. **Restart Everything**:
   ```bash
   # Stop dev server
   Ctrl+C

   # Clear cache
   rm -rf node_modules/.vite

   # Reinstall dependencies
   npm install

   # Restart
   npm run dev
   ```

### **Payments Failing for All Users**

1. **Check Paystack Dashboard**:
   - Login to https://dashboard.paystack.com
   - Check if API is operational
   - Verify test/live mode matches your key

2. **Verify Key**:
   ```javascript
   console.log(import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)
   // Should start with pk_test_ or pk_live_
   ```

3. **Enable Demo Mode Temporarily**:
   - Users can use "Demo Payment" button
   - You can manually verify payments
   - Fix Paystack integration
   - Switch back to real payments

### **Videos Not Playing for Anyone**

1. **Check YouTube Access**:
   - Verify youtube.com loads
   - Check if videos are region-restricted
   - Try different video IDs

2. **Check Video URLs**:
   ```sql
   SELECT title, video_url FROM lessons LIMIT 10;
   ```

3. **Use Direct Video Files**:
   - Host videos on CDN
   - Update video_url to direct links
   - Ensure CORS is configured

---

## 📞 GETTING HELP

### **Self-Diagnosis First**

1. Visit `/diagnostics` dashboard
2. Check browser console
3. Review this guide
4. Run SQL health check queries

### **When Reporting Issues**

Include:
- [ ] Screenshot of error
- [ ] Browser console logs
- [ ] Diagnostics dashboard screenshot
- [ ] Steps to reproduce
- [ ] Expected vs actual behavior
- [ ] Environment (dev/production)

### **Contact Information**

- **Technical Support**: support@ikpace.com
- **Paystack Support**: https://paystack.com/support
- **Supabase Support**: https://supabase.com/support

---

## 📊 SUCCESS METRICS

**Your platform is healthy when**:

✅ Diagnostics dashboard shows all green
✅ Videos play without errors
✅ Payments process successfully
✅ Course enrollment works end-to-end
✅ No console errors during normal use
✅ All navigation links work
✅ Mobile experience is smooth
✅ Database queries are fast
✅ User can complete full learning journey

---

**Last Updated**: February 2026
**Version**: 2.0.0
**Status**: All Critical Issues Resolved ✅
