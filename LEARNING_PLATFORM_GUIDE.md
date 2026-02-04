# iKPACE Interactive Learning Platform - Complete Guide

## Overview
This document provides comprehensive documentation for the interactive learning platform with advanced video players, quiz systems, and payment integration.

---

## Table of Contents
1. [Video Player System](#video-player-system)
2. [Quiz System](#quiz-system)
3. [Payment Integration](#payment-integration)
4. [Navigation Fixes](#navigation-fixes)
5. [Course Player Integration](#course-player-integration)
6. [Database Schema](#database-schema)
7. [Troubleshooting Guide](#troubleshooting-guide)
8. [Accessibility Features](#accessibility-features)
9. [Testing Guide](#testing-guide)
10. [API Documentation](#api-documentation)

---

## Video Player System

### Component: AdvancedVideoPlayer

**Location**: `/src/components/AdvancedVideoPlayer.jsx`

### Features Implemented

#### ✅ HTML5 Video Support
- Native HTML5 video element with full browser support
- Supports multiple video formats: MP4, WebM, Ogg
- Automatic format detection and fallback
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

#### ✅ Complete Video Controls
```javascript
// Available controls:
- Play/Pause button (Space, K keys)
- Volume slider with mute toggle (M key)
- Progress bar with click-to-seek
- Fullscreen mode (F key)
- Playback speed selector (0.5x - 2x)
- Keyboard navigation support
```

#### ✅ Advanced Features
- **Preloading**: Configurable metadata preloading
- **Loading States**: Spinner during buffering
- **Error Handling**: User-friendly error messages with retry
- **Progress Tracking**: Real-time progress callbacks
- **Completion Detection**: Triggers quiz when video ends
- **Responsive Design**: Adapts to mobile and desktop

### Usage Example

```javascript
import AdvancedVideoPlayer from '../components/AdvancedVideoPlayer'

<AdvancedVideoPlayer
  videoUrl="https://example.com/video.mp4"
  videoType="video/mp4"
  title="Lesson 1: Introduction"
  onComplete={() => console.log('Video completed')}
  onProgress={(progress) => console.log('Progress:', progress)}
  className="mb-6"
/>

// For YouTube videos:
<AdvancedVideoPlayer
  youtubeId="dQw4w9WgXcQ"
  title="YouTube Video"
  onComplete={() => console.log('Video completed')}
/>
```

### Video Player Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| videoUrl | string | No* | Direct URL to video file |
| videoType | string | No | MIME type (default: 'video/mp4') |
| youtubeId | string | No* | YouTube video ID for embedded videos |
| title | string | No | Video title for accessibility |
| onComplete | function | No | Callback when video finishes |
| onProgress | function | No | Callback with progress updates |
| className | string | No | Additional CSS classes |

*Either videoUrl or youtubeId must be provided

### Keyboard Shortcuts

```
Space / K      - Play/Pause
F              - Fullscreen
M              - Mute/Unmute
Arrow Left     - Rewind 5 seconds
Arrow Right    - Forward 5 seconds
Arrow Up       - Increase volume
Arrow Down     - Decrease volume
```

### Error Handling

The video player handles these error scenarios:

1. **Video Load Failure**
   - Shows error message with retry button
   - Logs error details to console
   - Provides user-friendly feedback

2. **Network Issues**
   - Displays loading spinner during buffering
   - Auto-retries on connection recovery

3. **Unsupported Format**
   - Fallback message displayed
   - Suggests browser compatibility

### Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Latest | ✅ Fully Supported |

---

## Quiz System

### Component: QuizSystem

**Location**: `/src/components/QuizSystem.jsx`

### Features Implemented

#### ✅ Question Types

**1. Multiple Choice (Single Select)**
```javascript
{
  type: 'multiple-choice',
  question: 'What is the capital of France?',
  options: ['London', 'Berlin', 'Paris', 'Madrid'],
  correctAnswer: 'Paris',
  explanation: 'Paris is the capital and largest city of France.'
}
```

**2. Multiple Select**
```javascript
{
  type: 'multi-select',
  question: 'Select all programming languages:',
  options: ['Python', 'HTML', 'JavaScript', 'CSS'],
  correctAnswers: ['Python', 'JavaScript'],
  explanation: 'HTML and CSS are markup languages, not programming languages.'
}
```

**3. True/False**
```javascript
{
  type: 'true-false',
  question: 'JavaScript is a compiled language.',
  correctAnswer: 'False',
  explanation: 'JavaScript is an interpreted language, not compiled.'
}
```

**4. Short Answer**
```javascript
{
  type: 'short-answer',
  question: 'What does HTML stand for?',
  correctAnswer: 'HyperText Markup Language',
  keywords: ['hypertext', 'markup', 'language'],
  exactMatch: false,
  explanation: 'HTML stands for HyperText Markup Language.'
}
```

#### ✅ Real-Time Feedback

- Immediate visual feedback (green for correct, red for incorrect)
- Checkmarks and X icons for clarity
- Explanations shown after submission
- Progress bar showing current question position

#### ✅ Progress Tracking

Database storage includes:
- User ID and Lesson ID
- Score (0-100%)
- Pass/Fail status
- Time spent in seconds
- Complete answer history (JSON)
- Attempt number
- Timestamp

#### ✅ Quiz Results Summary

Shows comprehensive results:
- Overall score percentage
- Number of correct answers
- Attempt number
- Improvement from previous attempts
- Question-by-question review
- Explanations for missed questions
- Best score tracking

#### ✅ Unlimited Retakes

- Users can retake quizzes unlimited times
- All attempts are saved to database
- Score history maintained
- Improvement tracking across attempts

### Usage Example

```javascript
import QuizSystem from '../components/QuizSystem'

const questions = [
  {
    type: 'multiple-choice',
    question: 'What is React?',
    options: ['A database', 'A JavaScript library', 'A CSS framework', 'A language'],
    correctAnswer: 'A JavaScript library',
    explanation: 'React is a JavaScript library for building user interfaces.'
  },
  // More questions...
]

<QuizSystem
  lessonId="lesson-123"
  questions={questions}
  passingScore={70}
  onComplete={(score) => console.log('Quiz passed with score:', score)}
  allowRetake={true}
/>
```

### Quiz Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| lessonId | string | Yes | Unique lesson identifier |
| questions | array | Yes | Array of question objects |
| passingScore | number | No | Minimum score to pass (default: 70) |
| onComplete | function | No | Callback when quiz is passed |
| allowRetake | boolean | No | Allow retaking quiz (default: true) |

---

## Payment Integration

### Paystack Integration

**Files**:
- `/src/pages/Checkout.jsx`
- `/src/components/PaystackPayment.jsx`

### How It Works

#### 1. Payment Flow

```
User Enrollment
   ↓
Login/Register
   ↓
Course Checkout Page (/checkout/:courseId)
   ↓
Course Validation (Fetch from Database)
   ↓
Paystack Payment Modal
   ↓
Payment Processing
   ↓
Payment Verification (Database Function)
   ↓
Enrollment Creation
   ↓
Payment Success Page
   ↓
Dashboard Access Granted
```

#### 2. Error Handling

The checkout system handles:

**Course Not Found Error**:
```javascript
// Enhanced error logging
console.log('Fetching course with ID:', courseId)

if (!courseData) {
  console.warn('No course found with ID:', courseId)
  setError('Course not found. Please check the course ID or browse our catalog.')
  return
}
```

**Payment Processing Errors**:
- Database insertion failures
- Payment verification timeouts
- Network connectivity issues
- Invalid payment references

#### 3. Payment Verification

**Database Function**: `verify_payment()`

```sql
CREATE FUNCTION verify_payment(
  p_payment_reference text,
  p_verification_data jsonb
) RETURNS jsonb
```

**What it does**:
1. Validates payment reference exists
2. Updates payment status to 'completed'
3. Creates/updates enrollment record
4. Sets payment_status to 'completed'
5. Returns success status with enrollment details

### Testing Payment Integration

#### Test Mode Setup

1. **Environment Variables**:
```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
```

2. **Test Cards**:
```
Success:
  Card: 4084 0840 8408 4081
  Expiry: Any future date
  CVV: Any 3 digits

Declined:
  Card: 5060 6666 6666 6666
  Expiry: Any future date
  CVV: Any 3 digits
```

#### Production Setup

1. **Get Production Key**:
   - Login to Paystack Dashboard
   - Navigate to Settings → API Keys & Webhooks
   - Copy Live Public Key

2. **Update Environment**:
```bash
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key_here
```

3. **Verify Domain**:
   - Add your domain to Paystack Dashboard
   - Configure webhook URL for payment callbacks

---

## Navigation Fixes

### Browse All Courses

**Route**: `/courses`
**File**: `/src/pages/Courses.jsx`

### How It Works

1. **Fetches from Database**:
```javascript
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('is_published', true)
  .order('created_at', { ascending: false })
```

2. **Fallback to Mock Data**:
If database is empty, loads from `coursesData.js`

3. **Filter Functionality**:
```javascript
const filteredCourses = courses.filter(course => {
  if (filter === 'all') return true
  return course.level === filter
})
```

### Navigation Links

All navigation links properly configured:
- ✅ Homepage → `/courses` (Browse All Courses)
- ✅ Course Card → `/courses/:slug` (Course Details)
- ✅ Enroll Button → `/enroll/:slug` (Enrollment Page)
- ✅ Checkout → `/checkout/:courseId` (Payment)
- ✅ Success → `/payment-success` (Confirmation)
- ✅ Dashboard → `/dashboard` (Student Dashboard)
- ✅ Learn → `/learn/:courseId` (Course Player)

---

## Course Player Integration

### Component: EnhancedCoursePlayer

**Location**: `/src/pages/EnhancedCoursePlayer.jsx`

### Features

#### ✅ Video + Quiz Integration

```javascript
// Video completion triggers quiz
const handleVideoComplete = () => {
  setVideoCompleted(true)
  if (quizData && quizData.length > 0) {
    setTimeout(() => {
      setShowQuiz(true)
    }, 1000)
  }
}

// Quiz completion marks lesson complete
const handleQuizComplete = async (score) => {
  await markLessonComplete()
  const nextLesson = getNextLesson()
  if (nextLesson) {
    loadLesson(nextLesson)
  }
}
```

#### ✅ Progress Tracking

- Course-level progress (percentage complete)
- Lesson-level completion status
- Quiz scores stored per lesson
- Visual indicators (checkmarks, progress bar)

#### ✅ Lesson Navigation

- Previous/Next lesson buttons
- Sidebar with all course content
- Click any lesson to jump directly
- Visual indication of current lesson

#### ✅ Content Types Supported

1. **Video Lessons**: HTML5 or YouTube
2. **Text Lessons**: Rich HTML content
3. **Quiz Lessons**: Automatic after video
4. **Mixed Content**: Video + Text + Quiz

---

## Database Schema

### New Tables Created

#### quiz_attempts

```sql
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES user_profiles(id),
  lesson_id uuid REFERENCES lessons(id),
  score integer CHECK (score >= 0 AND score <= 100),
  passed boolean DEFAULT false,
  time_spent_seconds integer DEFAULT 0,
  answers jsonb DEFAULT '{}'::jsonb,
  attempt_number integer DEFAULT 1,
  attempted_at timestamptz DEFAULT now()
);
```

#### Fields Updated

**lesson_progress** table:
- Added `quiz_score` (integer)

**user_profiles** table (from previous migration):
- `cv_url` (text)
- `career_ready` (boolean)
- `legacy_points` (integer)

### Database Functions

#### get_quiz_statistics

```sql
SELECT * FROM get_quiz_statistics('user-uuid');

-- Returns:
{
  "total_attempts": 15,
  "total_passed": 12,
  "average_score": 85.5,
  "best_score": 95,
  "total_time_minutes": 120,
  "unique_lessons": 8
}
```

#### get_lesson_quiz_history

```sql
SELECT * FROM get_lesson_quiz_history('user-uuid', 'lesson-uuid');

-- Returns array of all attempts:
[
  {
    "attempt_number": 1,
    "score": 60,
    "passed": false,
    "time_spent_seconds": 180,
    "attempted_at": "2026-02-04T10:30:00Z"
  },
  {
    "attempt_number": 2,
    "score": 85,
    "passed": true,
    "time_spent_seconds": 150,
    "attempted_at": "2026-02-04T11:00:00Z"
  }
]
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: Videos Not Playing

**Symptoms**: Video player shows error or black screen

**Possible Causes & Solutions**:

1. **Incorrect Video URL**
   ```javascript
   // ❌ Wrong
   videoUrl="youtube.com/watch?v=abc123"

   // ✅ Correct - Direct file
   videoUrl="https://example.com/video.mp4"

   // ✅ Correct - YouTube
   youtubeId="abc123"
   ```

2. **CORS Issues**
   - Ensure video server allows cross-origin requests
   - Check browser console for CORS errors
   - Add proper CORS headers to video server

3. **Unsupported Format**
   - Convert video to MP4 (H.264 codec)
   - Provide multiple format options

**Debug Steps**:
```javascript
// Add console logging
console.log('Video URL:', videoUrl)
console.log('Video Type:', videoType)

// Check browser console for errors
// Look for: ERR_CONNECTION_REFUSED, CORS, 404
```

#### Issue 2: Payment "Course Not Found" Error

**Symptoms**: Checkout page shows "Course not found" message

**Solutions**:

1. **Verify Course ID**
   ```javascript
   // Check URL parameter
   console.log('Course ID from URL:', courseId)

   // Check database
   SELECT * FROM courses WHERE id = 'course-id-here';
   ```

2. **Check Database Connection**
   ```javascript
   // Test Supabase connection
   const { data, error } = await supabase.from('courses').select('count')
   console.log('Connection test:', data, error)
   ```

3. **Verify Course is Published**
   ```javascript
   // Course must have is_published = true
   UPDATE courses SET is_published = true WHERE id = 'course-id';
   ```

#### Issue 3: Quizzes Not Showing

**Symptoms**: Video completes but quiz doesn't appear

**Solutions**:

1. **Check Quiz Data**
   ```javascript
   console.log('Quiz Data:', quizData)
   console.log('Quiz Length:', quizData?.length)
   ```

2. **Verify Quiz Questions Format**
   ```javascript
   // Must be valid JSON array
   const questions = [
     {
       type: 'multiple-choice',
       question: 'Your question?',
       options: ['A', 'B', 'C'],
       correctAnswer: 'A'
     }
   ]
   ```

3. **Check Video Completion Trigger**
   ```javascript
   // Ensure onComplete callback is called
   <AdvancedVideoPlayer
     onComplete={() => {
       console.log('Video completed!')
       setShowQuiz(true)
     }}
   />
   ```

#### Issue 4: Navigation Broken

**Symptoms**: "Browse All Courses" leads to 404 or broken page

**Solutions**:

1. **Verify Route Configuration**
   ```javascript
   // Check App.jsx routes
   <Route path="/courses" element={<Courses />} />
   ```

2. **Check Link Paths**
   ```javascript
   // ❌ Wrong
   <Link to="courses">

   // ✅ Correct
   <Link to="/courses">
   ```

3. **Verify Page Exists**
   - Check `/src/pages/Courses.jsx` exists
   - Check file is properly imported in App.jsx

---

## Accessibility Features

### Implemented WCAG 2.1 AA Standards

#### ✅ Keyboard Navigation

```javascript
// Video player keyboard shortcuts
Space / K      - Play/Pause
F              - Fullscreen
M              - Mute/Unmute
Arrows         - Seek/Volume control
```

#### ✅ ARIA Labels

```javascript
// Example implementations
<div role="region" aria-label="Video player">
  <button aria-label="Play video">
    <Play />
  </button>
  <div role="slider" aria-valuemin="0" aria-valuemax={duration}>
    {/* Progress bar */}
  </div>
</div>
```

#### ✅ Screen Reader Support

- All interactive elements properly labeled
- Form inputs have associated labels
- Error messages announced
- Progress updates communicated

#### ✅ Color Contrast

- Primary text: 4.5:1 contrast ratio minimum
- Interactive elements: 3:1 contrast ratio
- Error messages: High contrast red
- Success messages: High contrast green

#### ✅ Focus Indicators

```css
/* Visible focus states */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

#### ✅ Touch-Friendly Controls

- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Touch gestures for mobile video controls
- Responsive button sizing

---

## Testing Guide

### Manual Testing Checklist

#### Video Player Testing

- [ ] Video loads and plays correctly
- [ ] All controls function (play, pause, volume, seek, fullscreen)
- [ ] Keyboard shortcuts work
- [ ] Progress bar updates in real-time
- [ ] Video completes and triggers quiz
- [ ] Error handling displays properly
- [ ] Loading states show correctly
- [ ] Works on mobile devices
- [ ] Works in all browsers (Chrome, Firefox, Safari, Edge)

#### Quiz System Testing

- [ ] All question types render correctly
- [ ] Answers can be selected
- [ ] Submit button enabled after selection
- [ ] Immediate feedback shows correct/incorrect
- [ ] Explanations display properly
- [ ] Quiz can be completed
- [ ] Results summary shows accurate data
- [ ] Retake functionality works
- [ ] Progress saves to database
- [ ] Attempt history loads correctly

#### Payment Integration Testing

- [ ] Checkout page loads with valid course ID
- [ ] Course information displays correctly
- [ ] Paystack modal opens on payment button click
- [ ] Test card payment processes successfully
- [ ] Payment verification completes
- [ ] Enrollment record created
- [ ] Success page displays
- [ ] Dashboard shows enrolled course
- [ ] Course access granted immediately

#### Navigation Testing

- [ ] All menu links work
- [ ] Course catalog page loads
- [ ] Course detail pages load
- [ ] Enrollment flow works end-to-end
- [ ] Back buttons function properly
- [ ] Breadcrumbs navigate correctly
- [ ] Mobile menu works
- [ ] Deep links work (direct URL access)

### Automated Testing (Recommended)

```javascript
// Example test cases

describe('Video Player', () => {
  test('plays video when play button clicked', () => {
    // Test implementation
  })

  test('triggers quiz on completion', () => {
    // Test implementation
  })
})

describe('Quiz System', () => {
  test('validates multiple choice answers', () => {
    // Test implementation
  })

  test('saves attempt to database', () => {
    // Test implementation
  })
})

describe('Payment Flow', () => {
  test('validates course exists before payment', () => {
    // Test implementation
  })

  test('creates enrollment after successful payment', () => {
    // Test implementation
  })
})
```

---

## API Documentation

### Supabase Functions

#### verify_payment

**Purpose**: Atomically verify payment and create enrollment

**Usage**:
```javascript
const { data, error } = await supabase.rpc('verify_payment', {
  p_payment_reference: 'pay_ref_123',
  p_verification_data: { /* Paystack response */ }
})
```

**Returns**:
```json
{
  "success": true,
  "message": "Payment verified and access granted",
  "enrollment_id": "uuid",
  "user_id": "uuid",
  "course_id": "uuid"
}
```

#### get_quiz_statistics

**Purpose**: Get user's overall quiz performance

**Usage**:
```javascript
const { data, error } = await supabase.rpc('get_quiz_statistics', {
  p_user_id: 'user-uuid'
})
```

**Returns**:
```json
{
  "total_attempts": 15,
  "total_passed": 12,
  "average_score": 85.5,
  "best_score": 95,
  "total_time_minutes": 120,
  "unique_lessons": 8
}
```

#### get_lesson_quiz_history

**Purpose**: Get all quiz attempts for a specific lesson

**Usage**:
```javascript
const { data, error } = await supabase.rpc('get_lesson_quiz_history', {
  p_user_id: 'user-uuid',
  p_lesson_id: 'lesson-uuid'
})
```

**Returns**: Array of attempts with scores and timestamps

---

## Deployment Steps

### 1. Environment Configuration

```bash
# Required environment variables
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### 2. Database Migration

```bash
# Migrations already applied:
- create_user_profiles_table.sql
- create_courses_and_content_tables.sql
- create_enrollments_and_progress_tables.sql
- create_certificates_and_community_tables.sql
- add_payment_status_and_access_control.sql
- add_career_ready_fields.sql
- create_quiz_system_tables.sql (NEW)
```

### 3. Build and Deploy

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy dist folder to hosting platform
# Vercel, Netlify, or your preferred host
```

### 4. Post-Deployment Verification

- [ ] Test video playback on production
- [ ] Verify Paystack integration works
- [ ] Check all navigation links
- [ ] Test quiz system end-to-end
- [ ] Verify database connections
- [ ] Test on multiple devices/browsers

---

## Support & Maintenance

### Regular Maintenance Tasks

**Daily**:
- Monitor error logs
- Check payment transactions
- Review quiz attempt success rates

**Weekly**:
- Database performance review
- Video playback analytics
- User feedback analysis

**Monthly**:
- Security audit
- Update dependencies
- Performance optimization

### Getting Help

For issues or questions:
- Email: support@ikpace.com
- Documentation: See this guide + IMPLEMENTATION_GUIDE.md
- Video Setup: See VIDEO_SETUP.md
- Website Layout: See WEBSITE_LAYOUT_GUIDE.md

---

## Version History

**v2.0.0** - February 2026
- ✅ Advanced HTML5 video player
- ✅ Comprehensive quiz system
- ✅ Payment integration fixes
- ✅ Navigation improvements
- ✅ Accessibility enhancements

**v1.0.0** - January 2026
- Initial release with basic features

---

**Last Updated**: February 2026
**Maintained by**: iKPACE Development Team
