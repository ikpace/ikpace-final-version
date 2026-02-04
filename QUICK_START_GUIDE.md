# iKPACE Learning Platform - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create `.env` file (already exists):
```bash
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Access Application
Open browser to: `http://localhost:5173`

---

## ✅ What's New in This Release

### 1. Advanced Video Player
**Location**: `/src/components/AdvancedVideoPlayer.jsx`

**Features**:
- ✅ HTML5 video support with full controls
- ✅ Play, pause, volume, seek, fullscreen
- ✅ Playback speed control (0.5x - 2x)
- ✅ Keyboard shortcuts (Space, K, F, M, Arrows)
- ✅ Error handling and loading states
- ✅ Video completion detection
- ✅ YouTube embed support
- ✅ Responsive design

**Try it**: Visit `/learn/:courseId` after enrolling in a course

### 2. Comprehensive Quiz System
**Location**: `/src/components/QuizSystem.jsx`

**Features**:
- ✅ 4 question types: Multiple choice, Multi-select, True/False, Short answer
- ✅ Real-time feedback with explanations
- ✅ Unlimited retakes with score tracking
- ✅ Progress saved to database
- ✅ Attempt history and statistics
- ✅ Quiz triggers automatically after video completion

**Try it**: Complete a video lesson to see the quiz

### 3. Enhanced Course Player
**Location**: `/src/pages/EnhancedCoursePlayer.jsx`

**Features**:
- ✅ Integrated video + quiz experience
- ✅ Automatic quiz trigger on video completion
- ✅ Progress tracking (course and lesson level)
- ✅ Previous/Next lesson navigation
- ✅ Lesson sidebar with completion indicators
- ✅ Visual progress bars

**Try it**: Access via `/learn/:courseId`

### 4. Fixed Payment Integration
**Location**: `/src/pages/Checkout.jsx`

**Fixes**:
- ✅ Enhanced error logging for debugging
- ✅ Better course validation
- ✅ Clear error messages
- ✅ Improved Paystack integration

**Try it**: Enroll in a course and complete payment

### 5. New Database Tables
**Migration**: `create_quiz_system_tables.sql`

**Tables Added**:
- `quiz_attempts` - Stores all quiz attempts
- Updated `lesson_progress` with `quiz_score`

**Functions Added**:
- `get_quiz_statistics()` - User quiz stats
- `get_lesson_quiz_history()` - Lesson-specific attempts

---

## 🧪 Testing the New Features

### Test 1: Video Player (2 minutes)

1. **Login to platform**:
   ```
   Email: test@ikpace.com
   Password: your_password
   ```

2. **Navigate to any course**:
   - Go to Dashboard → My Courses
   - Click "Continue Learning"

3. **Test video controls**:
   - ✅ Click play button
   - ✅ Try keyboard shortcuts (Space, F, M)
   - ✅ Drag progress bar to seek
   - ✅ Adjust volume slider
   - ✅ Change playback speed (Settings icon)
   - ✅ Enter fullscreen mode

4. **Watch video to completion**:
   - Video should show "Video Completed" badge
   - Quiz prompt should appear after ~1 second

### Test 2: Quiz System (3 minutes)

1. **After video completes**:
   - Click "Start Quiz" button

2. **Answer questions**:
   - ✅ Multiple choice: Select one option
   - ✅ Multi-select: Select multiple options
   - ✅ True/False: Click True or False
   - ✅ Short answer: Type your response

3. **Submit each answer**:
   - Immediate feedback shows correct/incorrect
   - Explanation displays below
   - Click "Next Question" to continue

4. **Complete quiz**:
   - View results summary
   - See score, correct answers, time
   - Review question-by-question breakdown
   - Try "Retake Quiz" if desired

### Test 3: Payment Flow (5 minutes)

1. **Browse courses**:
   - Go to `/courses`
   - Click any course card

2. **Enroll in course**:
   - Click "Enroll Now" button
   - Review course details on enrollment page
   - Click "Proceed to Checkout"

3. **Complete payment**:
   - Verify course information displayed
   - Click "Pay Now" button
   - Paystack modal opens

4. **Test payment**:
   ```
   Test Card: 4084 0840 8408 4081
   Expiry: 12/25
   CVV: 123
   ```

5. **Verify success**:
   - Redirected to success page
   - Course appears in Dashboard
   - Can access course content immediately

### Test 4: Navigation (1 minute)

1. **Test main navigation**:
   - ✅ Click "Courses" → Should show catalog
   - ✅ Click "Pricing" → Should show plans
   - ✅ Click "Career Ready" → Should load page
   - ✅ Click "Community" → Should load page

2. **Test course navigation**:
   - ✅ Browse All Courses link
   - ✅ Course cards clickable
   - ✅ Enroll buttons work
   - ✅ Back buttons function

---

## 🐛 Troubleshooting

### Issue: Video Won't Play

**Solution**:
```javascript
// Check browser console for errors
// Common issues:
1. Wrong video URL format
2. CORS restrictions
3. Unsupported video format

// Fix:
- Use MP4 format (H.264 codec)
- Ensure video URL is accessible
- Check browser console for specific errors
```

### Issue: Quiz Not Showing

**Solution**:
```javascript
// Ensure quiz data exists
console.log('Quiz Data:', quizData)

// Verify video completion trigger
// Check browser console for "Video completed!" message
```

### Issue: Payment "Course Not Found"

**Solution**:
```javascript
// Check course ID in URL
console.log('Course ID:', courseId)

// Verify course exists in database
SELECT * FROM courses WHERE id = 'course-id';

// Ensure course is published
UPDATE courses SET is_published = true WHERE id = 'course-id';
```

### Issue: Database Connection Error

**Solution**:
```bash
# Verify environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Test connection
npm run dev
# Check browser console for connection errors
```

---

## 📊 Database Queries for Testing

### Check Quiz Attempts
```sql
SELECT * FROM quiz_attempts WHERE user_id = 'your-user-id';
```

### View User Progress
```sql
SELECT lp.*, l.title, c.title as course_title
FROM lesson_progress lp
JOIN lessons l ON l.id = lp.lesson_id
JOIN modules m ON m.id = l.module_id
JOIN courses c ON c.id = m.course_id
WHERE lp.user_id = 'your-user-id';
```

### Get Quiz Statistics
```sql
SELECT * FROM get_quiz_statistics('your-user-id');
```

### Check Payment Status
```sql
SELECT * FROM payments WHERE user_id = 'your-user-id';
```

### View Enrollments
```sql
SELECT e.*, c.title
FROM enrollments e
JOIN courses c ON c.id = e.course_id
WHERE e.user_id = 'your-user-id';
```

---

## 🎯 Key Files Modified/Created

### New Files Created:
```
✅ /src/components/AdvancedVideoPlayer.jsx
✅ /src/components/QuizSystem.jsx
✅ /src/pages/EnhancedCoursePlayer.jsx
✅ /supabase/migrations/create_quiz_system_tables.sql
✅ /LEARNING_PLATFORM_GUIDE.md
✅ /QUICK_START_GUIDE.md
```

### Modified Files:
```
✅ /src/App.jsx - Added EnhancedCoursePlayer route
✅ /src/pages/Checkout.jsx - Enhanced error handling
```

---

## 📚 Documentation

### Complete Guides Available:

1. **LEARNING_PLATFORM_GUIDE.md** (NEW - 800+ lines)
   - Video player documentation
   - Quiz system guide
   - Payment integration
   - Troubleshooting
   - API documentation
   - Testing guide

2. **IMPLEMENTATION_GUIDE.md** (500+ lines)
   - Technical architecture
   - Database schema
   - Security implementation

3. **VIDEO_SETUP.md** (Quick reference)
   - YouTube video configuration

4. **WEBSITE_LAYOUT_GUIDE.md** (400+ lines)
   - Website structure
   - All sections documented

5. **QUICK_START_GUIDE.md** (NEW - This file)
   - Quick setup instructions
   - Testing procedures

---

## 🚀 Deployment Checklist

### Pre-Deployment:
- [x] All features implemented
- [x] Build completes successfully
- [x] Environment variables configured
- [ ] Test on staging environment
- [ ] Test payment flow with real card
- [ ] Verify video playback on production URLs
- [ ] Test on mobile devices

### Production Environment:
```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist folder
# (to Vercel, Netlify, or your hosting platform)
```

### Post-Deployment:
- [ ] Test complete user flow
- [ ] Verify payment integration
- [ ] Check all videos play
- [ ] Test quizzes work
- [ ] Monitor error logs
- [ ] Check database performance

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ Videos play smoothly with all controls working
✅ Quizzes automatically appear after video completion
✅ Quiz answers save to database
✅ Payment flow completes without "Course Not Found" error
✅ Enrolled courses appear in Dashboard
✅ Course content is accessible immediately after payment
✅ All navigation links work correctly
✅ Progress tracking updates in real-time

---

## 💡 Tips for Best Experience

### For Students:
- Use keyboard shortcuts for video control
- Take quizzes immediately after videos
- Review explanations for missed questions
- Track your progress in Dashboard

### For Administrators:
- Monitor quiz completion rates
- Review payment transaction logs
- Check video playback analytics
- Analyze quiz question performance

### For Developers:
- Check browser console for errors
- Use React DevTools for debugging
- Monitor Supabase logs
- Test on multiple browsers

---

## 📞 Support

### Need Help?
- **Documentation**: See LEARNING_PLATFORM_GUIDE.md
- **Technical Issues**: support@ikpace.com
- **Payment Questions**: Check Paystack Dashboard
- **Database Issues**: Check Supabase Dashboard

### Useful Links:
- Supabase Dashboard: https://supabase.com/dashboard
- Paystack Dashboard: https://dashboard.paystack.com
- GitHub Repository: (your repo URL)

---

**Happy Learning! 🎓**

Last Updated: February 2026
Version: 2.0.0
