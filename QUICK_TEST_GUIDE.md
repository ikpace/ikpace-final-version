# ⚡ Quick Test Guide - Bug Fixes Verification

## 🎯 5-Minute Test Plan

### Test 1: Video Playback (2 minutes)

```
✅ STEPS:
1. Open browser → Navigate to http://localhost:5173 (or your domain)
2. Login to platform
3. Go to Dashboard
4. Click "Continue Learning" on any course (or enroll first)
5. Video should play IMMEDIATELY

✅ SUCCESS CRITERIA:
- ✅ No "Video Coming Soon" message
- ✅ YouTube video loads and plays
- ✅ Play/pause button works
- ✅ Volume control works
- ✅ Seek bar works
- ✅ Fullscreen works

❌ IF FAILS:
- Press F12 → Check Console tab for errors
- Send screenshot of error to support
```

### Test 2: Enrollment Flow (3 minutes)

```
✅ STEPS:
1. Open browser console (F12 → Console tab)
2. Navigate to http://localhost:5173/courses
3. Click on "Information Technology Fundamentals" course
4. Click "Enroll Now" button
5. Should navigate to enrollment page (NOT "Course Not Found")
6. Click "Proceed to Checkout"
7. Should navigate to checkout page with course details

✅ SUCCESS CRITERIA:
- ✅ Course detail page loads
- ✅ Enrollment page loads (shows course info)
- ✅ Checkout page loads (shows payment form)
- ✅ No "Course Not Found" errors
- ✅ Console shows clear logs at each step

❌ IF FAILS:
- Check console logs (F12)
- Copy all console messages
- Report with:
  * Course name
  * Which step failed
  * Console error messages
```

---

## 🔍 Console Logs You Should See

### During Enrollment Flow:

**When loading enrollment page**:
```
✅ "Enrollment page - Fetching course with slug: it-fundamentals"
✅ "Enrollment page - Course found: Information Technology Fundamentals ID: 2e50e45a..."
```

**When clicking "Proceed to Checkout"**:
```
✅ "Enrollment page - handleEnroll called"
✅ "Enrollment page - Redirecting to checkout with course ID: 2e50e45a..."
```

**When checkout page loads**:
```
✅ "Fetching course with ID: 2e50e45a..."
✅ "Course loaded successfully: Information Technology Fundamentals"
```

---

## 🚀 Quick Diagnostic Commands

### Check Database Content:

**Open browser console on any page**, then run:

```javascript
// Check if courses exist
fetch('/api/courses').then(r => r.json()).then(console.log)

// Or navigate to /diagnostics page for visual dashboard
```

### Check Video URLs:

**In Supabase Dashboard** → SQL Editor:

```sql
-- Verify videos exist
SELECT
  l.title,
  l.video_url,
  c.title as course_name
FROM lessons l
JOIN modules m ON m.id = l.module_id
JOIN courses c ON c.id = m.course_id
WHERE l.video_url IS NOT NULL
LIMIT 10;
```

**Expected**: Should return 5+ lessons with YouTube URLs

### Check Course Slugs:

```sql
-- Verify courses have valid slugs
SELECT id, title, slug, is_published
FROM courses
WHERE is_published = true;
```

**Expected**: All courses should have non-null slugs

---

## 📊 System Health Check

### Visit: `/diagnostics` Page

**What You'll See**:

```
✅ Database Connection: Healthy
   Database connection successful

✅ Courses: Healthy
   Found 9 courses (9 published)

✅ Lessons & Content: Healthy
   Found 5 lessons (5 with videos)

✅ Video URLs: Healthy
   5 valid video URLs found

⚠️ Payment System: Warning (if Paystack not configured)
   Paystack key not configured (Demo mode active)
```

**All Green?** → System is healthy ✅

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Video Coming Soon" Still Showing

**Quick Fix**:
```bash
# 1. Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# 2. Clear browser cache
# 3. Restart dev server
npm run dev
```

### Issue: "Course Not Found" on Enrollment

**Quick Check**:
1. Open browser console (F12)
2. Look for log: `"No course found with slug: xxx"`
3. Verify course slug in URL matches database

**Quick Fix**:
```sql
-- Check course exists
SELECT * FROM courses WHERE slug = 'it-fundamentals';

-- If not found, check what slugs exist
SELECT slug FROM courses WHERE is_published = true;
```

### Issue: Payment Not Working

**Quick Check**:
1. Visit `/diagnostics`
2. Check "Payment System" status
3. If yellow warning, add Paystack key to `.env`

**Quick Fix**:
```env
# Add to .env file:
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key_here

# Restart server:
npm run dev
```

---

## ✅ Success Indicators

### Everything Works When:

**Videos**:
- ✅ Videos load within 2-3 seconds
- ✅ YouTube embed displays correctly
- ✅ No error messages
- ✅ All 5 test videos play

**Enrollment**:
- ✅ Clicking "Enroll Now" navigates correctly
- ✅ Course information displays
- ✅ "Proceed to Checkout" works
- ✅ Payment page loads

**Console**:
- ✅ All logs show expected messages
- ✅ No red error messages
- ✅ No JavaScript errors

---

## 📞 Reporting Issues

### Include This Information:

1. **What You Were Doing**:
   - Exact steps you followed
   - Which button you clicked
   - Which page you were on

2. **What Happened**:
   - Error message displayed
   - Console error messages (F12 → Console)
   - Screenshot of the issue

3. **Browser Information**:
   - Browser name and version
   - Operating system
   - Device type (desktop/mobile)

4. **Console Logs**:
   ```
   Press F12 → Console tab
   Copy all messages (Ctrl+A, Ctrl+C)
   Paste into support email
   ```

---

## 🎓 Test Scenarios

### Scenario 1: New Student Enrollment

```
1. Register new account
2. Browse courses
3. Select "IT Fundamentals"
4. Click "Enroll Now"
5. Click "Proceed to Checkout"
6. Complete payment (use demo mode or test card)
7. Verify course appears in Dashboard
8. Click "Continue Learning"
9. Verify video plays

Expected: Smooth flow, video plays at the end
```

### Scenario 2: Existing Student

```
1. Login as existing enrolled student
2. Go to Dashboard
3. Click "Continue Learning"
4. Verify video player loads
5. Play video
6. Verify controls work
7. Watch to completion
8. Verify quiz appears (if exists)

Expected: Video plays without "Coming Soon" message
```

### Scenario 3: Multiple Courses

```
1. Enroll in 3 different courses
2. Test video playback in each course
3. Verify all videos play
4. Verify progress tracking works

Expected: All videos work regardless of course
```

---

## 📈 Performance Benchmarks

### Expected Performance:

**Video Load Time**:
- ✅ YouTube embed: 1-3 seconds
- ✅ First play: Immediate
- ✅ Buffering: Minimal

**Page Load Time**:
- ✅ Courses page: < 1 second
- ✅ Course detail: < 1 second
- ✅ Enrollment page: < 1 second
- ✅ Checkout page: < 2 seconds

**Database Queries**:
- ✅ Course lookup: < 100ms
- ✅ Enrollment check: < 100ms
- ✅ Lesson load: < 200ms

---

## 🔧 Development Testing

### For Developers:

**Run Build**:
```bash
npm run build
# Should complete in < 10 seconds
# Should show no errors
```

**Run Diagnostics**:
```bash
# Start dev server
npm run dev

# Navigate to /diagnostics
# Verify all systems green/yellow
```

**Check Console**:
```javascript
// In browser console, check for:
console.log calls showing:
- "Course found: ..."
- "Redirecting to checkout..."
- "Video completed!"
```

---

## ⏱️ Testing Timeline

**Complete Test**: 10 minutes

- Video Playback: 2 minutes
- Enrollment Flow: 3 minutes
- Payment Flow: 3 minutes
- Diagnostics Check: 2 minutes

**Quick Test**: 5 minutes

- Video Playback: 2 minutes
- Enrollment Flow: 3 minutes

**Smoke Test**: 2 minutes

- Load one video: 1 minute
- Click through enrollment: 1 minute

---

## 📋 Test Completion Checklist

**Before Marking as COMPLETE**:

- [ ] 5 videos tested and playing
- [ ] Enrollment flow tested (3+ courses)
- [ ] Checkout page loads correctly
- [ ] Console logs appear as expected
- [ ] No JavaScript errors in console
- [ ] `/diagnostics` page shows all green
- [ ] Mobile tested (if applicable)
- [ ] Different browsers tested (if applicable)
- [ ] Build completes successfully
- [ ] Documentation reviewed

---

**Quick Reference Card**
**Version**: 1.0
**Last Updated**: February 4, 2026
**Status**: Ready for Testing ✅
