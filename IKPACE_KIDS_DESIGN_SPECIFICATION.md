# iKPACE Kids – Coding & Early Tech Growth Platform
## Comprehensive Design Specification v1.0

**Document Version**: 1.0
**Last Updated**: February 4, 2026
**Status**: Design Specification - Ready for Development
**Classification**: Technical Blueprint & Implementation Guide

---

## Executive Summary

iKPACE Kids is a comprehensive children's coding and technology learning platform designed for ages 5-14, featuring three distinct age-appropriate learning tracks. This specification provides complete technical, design, and implementation guidance for integrating this new section into the existing iKPACE platform while simultaneously resolving current platform issues.

**Project Scope**:
- Age-segregated learning tracks (5-7, 8-10, 11-14)
- Visual, block-based, and text-based programming environments
- Parental controls and child safety systems
- Full integration with existing iKPACE infrastructure
- Resolution of existing platform issues (video playback, enrollment, payments)

**Timeline**: 16-week phased rollout
**Budget Considerations**: Detailed in Section J
**Compliance**: COPPA, GDPR-K, FERPA compliant

---

## Table of Contents

1. [Platform Architecture & Integration](#section-a)
2. [Age-Specific Learning Tracks](#section-b)
3. [UI/UX Design Requirements](#section-c)
4. [Technical Implementation](#section-d)
5. [Platform Issue Resolution](#section-e)
6. [Safety & Parental Controls](#section-f)
7. [Content Management System](#section-g)
8. [Assessment & Progress Tracking](#section-h)
9. [Success Metrics & Analytics](#section-i)
10. [Budget & Resource Planning](#section-j)
11. [Implementation Roadmap](#section-k)
12. [Testing & Quality Assurance](#section-l)

---

<a name="section-a"></a>
## SECTION A: PLATFORM ARCHITECTURE & INTEGRATION

### A.1 URL Structure & Routing Strategy

**Primary Access Points**:

```
Option 1 (Subdomain - RECOMMENDED):
├── kids.ikpace.com (Main kids portal)
├── kids.ikpace.com/explorers (Ages 5-7)
├── kids.ikpace.com/builders (Ages 8-10)
└── kids.ikpace.com/creators (Ages 11-14)

Option 2 (Path-based):
├── ikpace.com/kids (Main kids portal)
├── ikpace.com/kids/explorers (Ages 5-7)
├── ikpace.com/kids/builders (Ages 8-10)
└── ikpace.com/kids/creators (Ages 11-14)

Parent Portal:
├── ikpace.com/parents/dashboard
├── ikpace.com/parents/settings
└── ikpace.com/parents/reports
```

**Recommendation**: Use subdomain approach (kids.ikpace.com) for:
- Clear content segregation
- Separate SSL certificates
- Independent deployment cycles
- Better CDN optimization
- Psychological safety (kids know they're in safe zone)

### A.2 Technical Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Main Platform (React)  │  Kids Platform (React + Custom)   │
│  - Adult courses        │  - Age-specific UI                │
│  - Business content     │  - Visual programming             │
│  - Career services      │  - Game-based learning            │
└────────────┬────────────┴────────────┬────────────────────────┘
             │                         │
             └──────────┬──────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    API GATEWAY LAYER                         │
│  - Authentication routing                                    │
│  - Age verification middleware                               │
│  - Parental consent checks                                   │
│  - Content filtering                                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                   BACKEND SERVICES                           │
├──────────────────────────────────────────────────────────────┤
│  Auth Service    │  Content Service  │  Progress Service    │
│  - User mgmt     │  - Course data    │  - Tracking          │
│  - Parental      │  - Video stream   │  - Achievements      │
│    controls      │  - Interactive    │  - Reports           │
│                  │    content        │                      │
├──────────────────┴───────────────────┴──────────────────────┤
│  Payment Service │  Communication   │  Safety Service       │
│  - Subscriptions │  - Moderation    │  - Content filter    │
│  - Family plans  │  - Notifications │  - Compliance        │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│              SUPABASE DATABASE LAYER                         │
├──────────────────────────────────────────────────────────────┤
│  Existing Tables        │  New Kids Tables                   │
│  - users                │  - kids_profiles                   │
│  - courses              │  - kids_courses                    │
│  - enrollments          │  - kids_progress                   │
│  - progress             │  - kids_achievements               │
│                         │  - parental_controls               │
│                         │  - family_accounts                 │
└─────────────────────────────────────────────────────────────┘
```

### A.3 Database Schema Design

**New Tables Required**:

#### 1. `kids_profiles`
```sql
CREATE TABLE kids_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  parent_user_id UUID REFERENCES auth.users(id) NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  avatar_id VARCHAR(50),
  date_of_birth DATE NOT NULL,
  age_group VARCHAR(20) CHECK (age_group IN ('explorers', 'builders', 'creators')),
  learning_preferences JSONB DEFAULT '{}',
  accessibility_settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);
```

#### 2. `kids_courses`
```sql
CREATE TABLE kids_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  age_group VARCHAR(20) CHECK (age_group IN ('explorers', 'builders', 'creators')),
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  thumbnail_url TEXT,
  learning_objectives JSONB DEFAULT '[]',
  prerequisites JSONB DEFAULT '[]',
  estimated_hours INTEGER,
  course_type VARCHAR(50) CHECK (course_type IN ('visual', 'block_coding', 'text_coding', 'hybrid')),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `kids_lessons`
```sql
CREATE TABLE kids_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES kids_courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  lesson_type VARCHAR(50) CHECK (lesson_type IN ('video', 'interactive', 'coding_challenge', 'quiz', 'project')),
  content_url TEXT,
  interactive_config JSONB DEFAULT '{}',
  instructions TEXT,
  audio_narration_url TEXT,
  video_url TEXT,
  estimated_minutes INTEGER,
  display_order INTEGER,
  requires_supervision BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. `kids_progress`
```sql
CREATE TABLE kids_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES kids_lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES kids_courses(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  completion_percentage INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  best_score INTEGER,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  UNIQUE(kid_profile_id, lesson_id)
);
```

#### 5. `kids_achievements`
```sql
CREATE TABLE kids_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  achievement_type VARCHAR(50) CHECK (achievement_type IN ('course_completion', 'streak', 'challenge_winner', 'skill_mastery', 'creative_project', 'peer_helper')),
  achievement_name VARCHAR(100) NOT NULL,
  achievement_description TEXT,
  badge_icon VARCHAR(100),
  points_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  earned_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 6. `parental_controls`
```sql
CREATE TABLE parental_controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_time_limit_minutes INTEGER DEFAULT 60,
  weekly_time_limit_minutes INTEGER DEFAULT 300,
  allowed_days JSONB DEFAULT '["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]',
  allowed_time_start TIME DEFAULT '08:00:00',
  allowed_time_end TIME DEFAULT '20:00:00',
  require_parent_unlock BOOLEAN DEFAULT false,
  communication_enabled BOOLEAN DEFAULT false,
  content_filter_level VARCHAR(20) CHECK (content_filter_level IN ('strict', 'moderate', 'minimal')) DEFAULT 'strict',
  approved_courses JSONB DEFAULT '[]',
  blocked_courses JSONB DEFAULT '[]',
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_profile_id)
);
```

#### 7. `family_accounts`
```sql
CREATE TABLE family_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  family_name VARCHAR(100),
  subscription_tier VARCHAR(50) CHECK (subscription_tier IN ('free', 'single_child', 'family_3', 'family_unlimited')),
  max_kids_allowed INTEGER DEFAULT 1,
  subscription_status VARCHAR(20) CHECK (subscription_status IN ('active', 'trial', 'expired', 'cancelled')),
  subscription_start_date DATE,
  subscription_end_date DATE,
  billing_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_user_id)
);
```

#### 8. `kids_projects`
```sql
CREATE TABLE kids_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES kids_courses(id),
  project_title VARCHAR(200) NOT NULL,
  project_description TEXT,
  project_type VARCHAR(50) CHECK (project_type IN ('scratch_game', 'animation', 'website', 'app', 'story', 'art')),
  project_data JSONB DEFAULT '{}',
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 9. `kids_activity_log`
```sql
CREATE TABLE kids_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) CHECK (activity_type IN ('login', 'lesson_start', 'lesson_complete', 'video_watch', 'quiz_attempt', 'project_save', 'achievement_earned', 'logout')),
  lesson_id UUID REFERENCES kids_lessons(id) ON DELETE SET NULL,
  course_id UUID REFERENCES kids_courses(id) ON DELETE SET NULL,
  duration_seconds INTEGER,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 10. `kids_session_limits`
```sql
CREATE TABLE kids_session_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kid_profile_id UUID REFERENCES kids_profiles(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  total_time_seconds INTEGER DEFAULT 0,
  lesson_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(kid_profile_id, session_date)
);
```

### A.4 Integration with Existing Platform

**Authentication Flow**:

```javascript
// New authentication middleware for kids section
const kidsAuthMiddleware = async (req, res, next) => {
  // 1. Check if user is authenticated
  const { user } = await supabase.auth.getUser()

  if (!user) {
    return res.redirect('/login')
  }

  // 2. Check if accessing kids section
  if (req.path.startsWith('/kids')) {
    // 3. Determine if user is parent or child
    const { data: kidProfile } = await supabase
      .from('kids_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (kidProfile) {
      // This is a child account
      req.accountType = 'child'
      req.kidProfile = kidProfile

      // 4. Check parental controls
      const canAccess = await checkParentalControls(kidProfile.id)
      if (!canAccess) {
        return res.render('access_restricted')
      }

      // 5. Check time limits
      const withinLimits = await checkTimeLimits(kidProfile.id)
      if (!withinLimits) {
        return res.render('time_limit_reached')
      }
    } else {
      // This is a parent account
      req.accountType = 'parent'

      // Check if they have family account
      const { data: familyAccount } = await supabase
        .from('family_accounts')
        .select('*')
        .eq('parent_user_id', user.id)
        .maybeSingle()

      req.familyAccount = familyAccount
    }
  }

  next()
}
```

**Shared Components**:

- Navbar (adapted for kids with larger buttons, friendly language)
- Footer (simplified for kids section)
- Authentication system (extended with parental consent)
- Payment gateway (family plans, child licenses)
- Progress tracking (enhanced with gamification)
- Video player (same AdvancedVideoPlayer with child-safe controls)

**Isolated Components**:

- Kids-specific UI library (buttons, cards, animations)
- Visual programming editor (Blockly integration)
- Interactive coding challenges
- Achievement badge system
- Avatar customization
- Parental dashboard

### A.5 Content Segregation Strategy

**Strict Content Boundaries**:

```javascript
// Content filtering rules
const CONTENT_FILTERS = {
  kids: {
    allowedTables: [
      'kids_profiles',
      'kids_courses',
      'kids_lessons',
      'kids_progress',
      'kids_achievements',
      'kids_projects'
    ],
    blockedTables: [
      'courses', // Adult courses
      'enrollments', // Adult enrollments
      'community_posts', // Adult community
      'career_applications' // Adult career content
    ]
  },
  adults: {
    allowedTables: [
      'courses',
      'enrollments',
      'progress',
      'community_posts',
      'career_applications'
    ],
    blockedTables: [
      'kids_courses', // Kids content
      'kids_profiles', // Kids profiles (except for parents)
      'kids_progress' // Kids progress (except for parents)
    ]
  }
}
```

**Row Level Security (RLS) Policies**:

```sql
-- Kids can only see their own data
CREATE POLICY "Kids can view own profile"
  ON kids_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Parents can see their children's data
CREATE POLICY "Parents can view children profiles"
  ON kids_profiles FOR SELECT
  TO authenticated
  USING (
    parent_user_id = auth.uid()
  );

-- Kids can only access age-appropriate courses
CREATE POLICY "Kids can view age-appropriate courses"
  ON kids_courses FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND age_group IN (
      SELECT age_group FROM kids_profiles
      WHERE user_id = auth.uid()
    )
  );

-- Kids cannot see other kids' projects (unless public)
CREATE POLICY "Kids can view own and public projects"
  ON kids_projects FOR SELECT
  TO authenticated
  USING (
    kid_profile_id IN (
      SELECT id FROM kids_profiles WHERE user_id = auth.uid()
    )
    OR is_public = true
  );
```

### A.6 System Requirements

**Browser Compatibility**:
- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

**Performance Targets**:
- Page load time: < 2 seconds
- Interactive time: < 3 seconds
- Video buffer time: < 1 second
- API response time: < 200ms
- 99.9% uptime

**Accessibility Standards**:
- WCAG 2.1 Level AA compliance
- Screen reader support
- Keyboard navigation
- High contrast mode
- Adjustable text sizes
- Closed captions on all videos
- Audio descriptions available

---

<a name="section-b"></a>
## SECTION B: AGE-SPECIFIC LEARNING TRACK SPECIFICATIONS

### B.1 Ages 5-7 (Little Explorers) - Visual Learning Track

**Learning Philosophy**:
Complete visual immersion with zero reading requirements. All interactions through images, sounds, and drag-and-drop mechanics.

**Course Structure**:

```
Little Explorers Learning Path:
├── Module 1: Computer Friends (4 weeks)
│   ├── Lesson 1.1: Meet Your Computer
│   ├── Lesson 1.2: Mouse and Keyboard Fun
│   ├── Lesson 1.3: Clicking and Dragging
│   └── Lesson 1.4: My First Game
│
├── Module 2: Pattern Power (4 weeks)
│   ├── Lesson 2.1: Finding Patterns
│   ├── Lesson 2.2: Making Patterns
│   ├── Lesson 2.3: Pattern Puzzles
│   └── Lesson 2.4: Create Your Pattern
│
├── Module 3: Sequence Stories (4 weeks)
│   ├── Lesson 3.1: First, Then, Last
│   ├── Lesson 3.2: Story Order
│   ├── Lesson 3.3: Robot Commands
│   └── Lesson 3.4: Make Robot Move
│
└── Module 4: Shape Logic (4 weeks)
    ├── Lesson 4.1: Shapes Everywhere
    ├── Lesson 4.2: Building with Shapes
    ├── Lesson 4.3: Shape Sorting
    └── Lesson 4.4: My Shape Creation
```

**Interaction Design Specifications**:

1. **Visual Elements**:
   - All buttons: Minimum 80px × 80px
   - Touch targets: 88px spacing between elements
   - Icons: 64px × 64px for primary actions
   - Color-coded zones (blue = safe, green = go, yellow = try again, red = help)

2. **Audio System**:
   - Friendly narrator voice for all instructions
   - Sound effects for correct actions (chime, applause)
   - Gentle correction sounds for errors (boing, not harsh)
   - Background music (soft, non-distracting, toggleable)
   - Multiple language support

3. **Drag-and-Drop Mechanics**:
   ```javascript
   const DragDropConfig = {
     snapToGrid: true,
     gridSize: 100, // Large grid for easier placement
     feedbackType: 'visual_and_audio',
     magneticSnap: true, // Helps with precision
     hoverHighlight: true,
     draggedItemScale: 1.2, // Makes item slightly larger
     dropZoneIndicator: 'glowing_border',
     errorShake: true // Gentle shake if wrong placement
   }
   ```

4. **Reward System**:
   - Animated star collection after each lesson
   - Character unlocks (cartoon animals, robots)
   - Virtual stickers for achievements
   - "You're Amazing!" celebration screens
   - Parent notification of milestones

**Sample Lesson Structure (Lesson 1.1: Meet Your Computer)**:

```javascript
const Lesson_MeetYourComputer = {
  lessonId: 'explorers-1.1',
  title: 'Meet Your Computer',
  audioNarration: {
    intro: '/audio/explorers/1-1-intro.mp3', // "Hi! Let's meet the computer!"
    step1: '/audio/explorers/1-1-step1.mp3', // "This is the screen..."
    step2: '/audio/explorers/1-1-step2.mp3', // "This is the mouse..."
    completion: '/audio/explorers/1-1-done.mp3' // "Great job! You did it!"
  },
  activities: [
    {
      type: 'point_and_click',
      instruction_audio: '/audio/explorers/1-1-activity1.mp3',
      visual_cue: 'animated_arrow',
      targets: [
        { element: 'screen', label_audio: '/audio/screen.mp3' },
        { element: 'keyboard', label_audio: '/audio/keyboard.mp3' },
        { element: 'mouse', label_audio: '/audio/mouse.mp3' }
      ],
      reward: 'star_collection'
    },
    {
      type: 'drag_to_match',
      instruction_audio: '/audio/explorers/1-1-activity2.mp3',
      items: [
        { id: 'mouse_img', matchWith: 'mouse_outline' },
        { id: 'keyboard_img', matchWith: 'keyboard_outline' }
      ],
      reward: 'character_unlock'
    },
    {
      type: 'mini_game',
      name: 'Click the Stars',
      instruction_audio: '/audio/explorers/1-1-game.mp3',
      mechanics: 'click_appearing_objects',
      duration_seconds: 30,
      target_clicks: 10,
      reward: 'badge_earned'
    }
  ],
  estimatedMinutes: 10,
  requiresSupervision: false
}
```

**Visual Programming Introduction**:

At the end of the track, introduce basic sequencing with visual blocks:

```
[Move Forward] → [Turn Right] → [Move Forward]

Represented as connected image cards:
🚶 → ➡️ → 🚶
```

**Assessment Strategy**:
- No traditional tests or quizzes
- Assessment through gameplay
- Completion = understanding
- Progress measured by:
  - Task completion rate
  - Time to complete
  - Number of attempts
  - Pattern of errors

### B.2 Ages 8-10 (Code Builders) - Block Programming Track

**Learning Philosophy**:
Transition to block-based coding using Scratch/Blockly-style interfaces. Introduction to computational thinking through game creation and animation.

**Course Structure**:

```
Code Builders Learning Path:
├── Module 1: Block Coding Basics (6 weeks)
│   ├── Lesson 1.1: Understanding Blocks
│   ├── Lesson 1.2: Sequencing Commands
│   ├── Lesson 1.3: Loops (Repeat Forever)
│   ├── Lesson 1.4: Conditions (If/Then)
│   ├── Lesson 1.5: Variables (Storing Information)
│   └── Lesson 1.6: My First Program
│
├── Module 2: Animation Creation (6 weeks)
│   ├── Lesson 2.1: Moving Sprites
│   ├── Lesson 2.2: Changing Costumes
│   ├── Lesson 2.3: Adding Sounds
│   ├── Lesson 2.4: Timing and Delays
│   ├── Lesson 2.5: Interactive Animations
│   └── Lesson 2.6: My Animated Story
│
├── Module 3: Game Logic (8 weeks)
│   ├── Lesson 3.1: Game Rules
│   ├── Lesson 3.2: Scoring Systems
│   ├── Lesson 3.3: Player Controls
│   ├── Lesson 3.4: Collision Detection
│   ├── Lesson 3.5: Game Levels
│   ├── Lesson 3.6: Win and Lose Conditions
│   ├── Lesson 3.7: Polish and Sound Effects
│   └── Lesson 3.8: My Complete Game
│
└── Module 4: Creative Projects (6 weeks)
    ├── Lesson 4.1: Interactive Story
    ├── Lesson 4.2: Music Maker
    ├── Lesson 4.3: Quiz Game
    ├── Lesson 4.4: Art Generator
    ├── Lesson 4.5: Calculator
    └── Lesson 4.6: Your Big Idea
```

**Block Programming Environment**:

```javascript
// Blockly Configuration
const BlocklyConfig = {
  toolbox: {
    categories: [
      {
        name: 'Motion',
        color: '#4C97FF',
        blocks: [
          'move_forward',
          'turn_right',
          'turn_left',
          'go_to_position',
          'glide_to_position'
        ]
      },
      {
        name: 'Looks',
        color: '#9966FF',
        blocks: [
          'say',
          'think',
          'show',
          'hide',
          'change_costume',
          'change_size'
        ]
      },
      {
        name: 'Sound',
        color: '#CF63CF',
        blocks: [
          'play_sound',
          'stop_all_sounds',
          'change_volume',
          'record_sound'
        ]
      },
      {
        name: 'Events',
        color: '#FFD500',
        blocks: [
          'when_flag_clicked',
          'when_key_pressed',
          'when_sprite_clicked',
          'when_backdrop_changes'
        ]
      },
      {
        name: 'Control',
        color: '#FFAB19',
        blocks: [
          'wait',
          'repeat',
          'forever',
          'if_then',
          'if_then_else',
          'stop'
        ]
      },
      {
        name: 'Variables',
        color: '#FF6680',
        blocks: [
          'set_variable',
          'change_variable',
          'show_variable',
          'hide_variable'
        ]
      }
    ]
  },
  workspace: {
    grid: true,
    zoom: true,
    trashcan: true,
    sounds: true,
    media: '/blockly/media/'
  },
  constraints: {
    maxBlocks: 50, // Prevent overly complex programs
    allowComments: true,
    readOnly: false
  }
}
```

**Sample Project: "Catch the Falling Stars" Game**:

```javascript
const CatchStarsProject = {
  projectId: 'builders-game-1',
  title: 'Catch the Falling Stars',
  description: 'Create a game where you move a basket to catch falling stars',
  learningObjectives: [
    'Use keyboard controls',
    'Implement scoring system',
    'Use random positioning',
    'Detect collisions',
    'Create game loop'
  ],
  starterCode: {
    sprites: [
      {
        name: 'Basket',
        costume: '/sprites/basket.png',
        initialPosition: { x: 0, y: -150 },
        scripts: [
          // Students will add these blocks:
          // When [flag] clicked
          // Forever
          //   If [left arrow] pressed
          //     Change x by -10
          //   If [right arrow] pressed
          //     Change x by 10
        ]
      },
      {
        name: 'Star',
        costume: '/sprites/star.png',
        initialPosition: { x: 'random', y: 180 },
        scripts: [
          // Students will add these blocks:
          // When [flag] clicked
          // Forever
          //   Change y by -5
          //   If [touching Basket]
          //     Change [score] by 1
          //     Go to x: [random -200 to 200] y: 180
          //   If [y position] < -180
          //     Go to x: [random -200 to 200] y: 180
        ]
      }
    ],
    variables: [
      { name: 'score', initialValue: 0, visible: true }
    ]
  },
  hints: [
    {
      step: 1,
      title: 'Moving the Basket',
      text: 'Use keyboard controls to move left and right',
      videoUrl: '/hints/basket-movement.mp4'
    },
    {
      step: 2,
      title: 'Falling Stars',
      text: 'Make stars fall from the top',
      videoUrl: '/hints/falling-stars.mp4'
    },
    {
      step: 3,
      title: 'Catching',
      text: 'Detect when star touches basket',
      videoUrl: '/hints/collision.mp4'
    }
  ],
  estimatedMinutes: 45,
  difficulty: 'intermediate'
}
```

**Showcase System**:

Students can publish completed projects to showcase gallery:

```javascript
const ProjectShowcase = {
  visibility: 'age_group_only', // Only visible to same age group
  features: [
    'view_count',
    'like_button', // No comments to prevent communication
    'remix_button', // Can copy and modify
    'featured_projects', // Curated by teachers
    'my_projects_portfolio'
  ],
  moderation: {
    autoApproval: false, // All projects reviewed before public
    reviewCriteria: [
      'appropriate_content',
      'follows_community_guidelines',
      'demonstrates_learning',
      'is_complete'
    ]
  }
}
```

**Assessment Strategy**:
- Project-based assessment
- Rubrics for each project:
  - Functionality (40%)
  - Creativity (30%)
  - Code organization (20%)
  - Extra features (10%)
- Automated testing for core functionality
- Peer feedback (moderated)

### B.3 Ages 11-14 (Tech Creators) - Text-Based Programming Track

**Learning Philosophy**:
Introduction to real programming languages (HTML, CSS, JavaScript) through project-based learning. Focus on creating real websites and applications.

**Course Structure**:

```
Tech Creators Learning Path:
├── Module 1: Web Development Foundations (8 weeks)
│   ├── Lesson 1.1: What is HTML?
│   ├── Lesson 1.2: Page Structure (Head, Body)
│   ├── Lesson 1.3: Text Elements (Headings, Paragraphs)
│   ├── Lesson 1.4: Links and Images
│   ├── Lesson 1.5: Lists and Tables
│   ├── Lesson 1.6: Forms and Inputs
│   ├── Lesson 1.7: Semantic HTML
│   └── Lesson 1.8: My First Website
│
├── Module 2: Styling with CSS (8 weeks)
│   ├── Lesson 2.1: What is CSS?
│   ├── Lesson 2.2: Colors and Backgrounds
│   ├── Lesson 2.3: Fonts and Text
│   ├── Lesson 2.4: Box Model (Margin, Padding, Border)
│   ├── Lesson 2.5: Layout (Flexbox)
│   ├── Lesson 2.6: Responsive Design
│   ├── Lesson 2.7: Animations and Transitions
│   └── Lesson 2.8: Beautiful Portfolio Site
│
├── Module 3: JavaScript Basics (10 weeks)
│   ├── Lesson 3.1: What is JavaScript?
│   ├── Lesson 3.2: Variables and Data Types
│   ├── Lesson 3.3: Math and Operators
│   ├── Lesson 3.4: Conditions (If/Else)
│   ├── Lesson 3.5: Loops (For, While)
│   ├── Lesson 3.6: Functions
│   ├── Lesson 3.7: Arrays
│   ├── Lesson 3.8: Objects
│   ├── Lesson 3.9: DOM Manipulation
│   └── Lesson 3.10: Interactive Calculator
│
└── Module 4: Real-World Projects (10 weeks)
    ├── Lesson 4.1: Todo List App
    ├── Lesson 4.2: Weather Dashboard
    ├── Lesson 4.3: Quiz Game
    ├── Lesson 4.4: Drawing App
    ├── Lesson 4.5: Music Player
    ├── Lesson 4.6: Chat Application
    ├── Lesson 4.7: E-commerce Product Page
    ├── Lesson 4.8: Blog Platform
    ├── Lesson 4.9: Portfolio Website
    └── Lesson 4.10: Your Dream Project
```

**Code Editor Specifications**:

```javascript
const CodeEditorConfig = {
  editor: 'CodeMirror', // Or Monaco Editor
  features: {
    syntaxHighlighting: true,
    autoComplete: true,
    errorHighlighting: true,
    lineNumbers: true,
    codeFormatting: true,
    livePreview: true,
    darkMode: true,
    fontSize: 'adjustable' // 14px default, 12-20px range
  },
  layout: {
    type: 'split_screen',
    panels: {
      left: {
        tabs: ['HTML', 'CSS', 'JavaScript'],
        size: '50%'
      },
      right: {
        component: 'LivePreview',
        refreshMode: 'auto', // Or manual with button
        size: '50%'
      }
    }
  },
  assistance: {
    hintSystem: true,
    documentationLinks: true,
    errorExplanations: true,
    codeSnippets: true,
    videoTutorials: true
  },
  safeguards: {
    infiniteLoopDetection: true,
    memoryLimitMB: 50,
    executionTimeoutMS: 5000,
    blockedAPIs: ['eval', 'XMLHttpRequest', 'fetch'], // For security
    allowedAPIs: ['console.log', 'Math', 'Date', 'localStorage']
  }
}
```

**Sample Lesson: Building a Todo List App**:

```javascript
const TodoListLesson = {
  lessonId: 'creators-4.1',
  title: 'Build a Todo List App',
  description: 'Create a fully functional todo list with add, delete, and complete features',
  estimatedMinutes: 90,

  learningObjectives: [
    'Manipulate DOM elements',
    'Handle user input',
    'Use arrays to store data',
    'Implement CRUD operations',
    'Style with CSS'
  ],

  starterCode: {
    html: `<!DOCTYPE html>
<html>
<head>
  <title>My Todo List</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>My Todo List</h1>
    <!-- Add your HTML here -->
  </div>
  <script src="script.js"></script>
</body>
</html>`,

    css: `/* Add your styles here */
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  /* Your container styles */
}`,

    javascript: `// Your JavaScript code here
// Hint: Start with variables to store the input and list elements`
  },

  challenges: [
    {
      level: 'basic',
      description: 'Add todos to the list',
      tests: [
        'Can add new todo item',
        'Input clears after adding',
        'Todo appears in list'
      ]
    },
    {
      level: 'intermediate',
      description: 'Mark todos as complete',
      tests: [
        'Can click todo to mark complete',
        'Complete todos have line-through style',
        'Complete status persists'
      ]
    },
    {
      level: 'advanced',
      description: 'Delete todos',
      tests: [
        'Delete button appears on each todo',
        'Can remove todos from list',
        'Todo count updates correctly'
      ]
    },
    {
      level: 'expert',
      description: 'Save todos to localStorage',
      tests: [
        'Todos persist after page reload',
        'localStorage updates on changes',
        'Can clear all todos'
      ]
    }
  ],

  solutionAvailable: true,
  solutionUnlocksAfter: 'all_attempts_exhausted', // or '30_minutes'

  hints: [
    {
      unlock: 'immediate',
      text: 'Start by selecting the input element using document.querySelector()',
      codeSnippet: `const input = document.querySelector('#todo-input');`
    },
    {
      unlock: 'after_5_minutes',
      text: 'Use addEventListener to detect when Enter key is pressed',
      codeSnippet: `input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // Add your code here
  }
});`
    },
    {
      unlock: 'after_10_minutes',
      text: 'Create a new list item element and append it to the list',
      codeSnippet: `const li = document.createElement('li');
li.textContent = input.value;
todoList.appendChild(li);`
    }
  ]
}
```

**Peer Collaboration System**:

```javascript
const CollaborationFeatures = {
  pairProgramming: {
    enabled: true,
    maxPairSize: 2,
    sessionDuration: 60, // minutes
    features: [
      'shared_cursor',
      'voice_chat', // Moderated, recordable
      'text_chat', // Filtered for safety
      'screen_share', // Optional
      'code_history' // Can revert changes
    ],
    supervision: {
      required: false,
      parentalApproval: true,
      sessionRecording: true, // For safety
      moderationAI: true // Flags inappropriate content
    }
  },

  codeReview: {
    enabled: true,
    reviewerAge: 'same_or_higher',
    features: [
      'inline_comments',
      'suggestion_mode',
      'approval_system',
      'learning_badges' // For helpful reviewers
    ],
    moderation: {
      autoFilter: true,
      manualReview: true, // All feedback reviewed
      reportSystem: true
    }
  },

  competitions: {
    enabled: true,
    types: [
      {
        name: 'Weekly Challenge',
        description: 'Complete coding challenge in 1 week',
        prizes: ['badges', 'featured_project', 'certificate']
      },
      {
        name: 'Hackathon Junior',
        description: '4-hour coding sprint',
        teamSize: '1-3',
        prizes: ['trophies', 'special_badge', 'mentor_session']
      }
    ],
    ageGroups: 'separated', // 11-12 compete separately from 13-14
    judging: 'automated_and_manual'
  }
}
```

**Assessment Strategy**:
- Automated tests for functionality
- Code quality metrics:
  - Readability (20%)
  - Efficiency (15%)
  - Best practices (15%)
  - Functionality (30%)
  - Creativity (20%)
- Portfolio of projects
- Final capstone project
- Peer code reviews (moderated)

---

<a name="section-c"></a>
## SECTION C: UI/UX DESIGN REQUIREMENTS

### C.1 Color Psychology & Design Schemes

**Age Group 5-7 (Little Explorers) Color Palette**:

```css
:root {
  /* Primary Colors - Bright and Cheerful */
  --primary-blue: #4C9AFF;      /* Sky blue - friendly, safe */
  --primary-green: #57D9A3;     /* Mint green - success, growth */
  --primary-yellow: #FFD93D;    /* Sunny yellow - happiness, energy */
  --primary-red: #FF6B6B;       /* Coral red - excitement (not harsh) */
  --primary-purple: #A78BFA;    /* Lavender purple - creativity */

  /* Background Colors */
  --bg-primary: #FFF9E6;        /* Warm cream - easy on eyes */
  --bg-secondary: #E8F4FD;      /* Light blue - calm */
  --bg-success: #D4F4DD;        /* Light green - achievement */

  /* Text Colors */
  --text-primary: #2D3748;      /* Dark gray (not black) */
  --text-secondary: #4A5568;    /* Medium gray */

  /* Interactive Elements */
  --button-hover: #3182CE;      /* Darker blue on hover */
  --button-shadow: rgba(76, 154, 255, 0.3);

  /* Gamification */
  --star-gold: #FFD700;
  --badge-silver: #C0C0C0;
  --trophy-bronze: #CD7F32;
}
```

**Age Group 8-10 (Code Builders) Color Palette**:

```css
:root {
  /* Primary Colors - Vibrant and Energetic */
  --primary-blue: #3B82F6;      /* Royal blue - focus, learning */
  --primary-green: #10B981;     /* Emerald green - achievement */
  --primary-orange: #F59E0B;    /* Amber orange - creativity */
  --primary-purple: #8B5CF6;    /* Violet - imagination */

  /* Background Colors */
  --bg-primary: #FFFFFF;        /* Clean white */
  --bg-secondary: #F3F4F6;      /* Light gray */
  --bg-dark: #1F2937;           /* Dark mode option */

  /* Coding Theme */
  --code-bg: #2D3748;           /* Dark gray for code */
  --code-text: #E2E8F0;         /* Light text */
  --code-keyword: #F472B6;      /* Pink for keywords */
  --code-string: #34D399;       /* Green for strings */
  --code-number: #60A5FA;       /* Blue for numbers */

  /* Interactive Elements */
  --button-primary: #3B82F6;
  --button-secondary: #10B981;
  --button-danger: #EF4444;
}
```

**Age Group 11-14 (Tech Creators) Color Palette**:

```css
:root {
  /* Primary Colors - Professional yet Youthful */
  --primary-blue: #2563EB;      /* Deep blue - technology */
  --primary-teal: #0D9488;      /* Teal - innovation */
  --primary-indigo: #6366F1;    /* Indigo - creativity */

  /* Background Colors */
  --bg-light: #FFFFFF;
  --bg-gray: #F9FAFB;
  --bg-dark: #111827;           /* Dark mode */

  /* Professional Coding Theme */
  --editor-bg: #1E293B;         /* VS Code-like dark */
  --editor-line-number: #64748B;
  --editor-selection: #334155;

  /* Syntax Highlighting (Dark Theme) */
  --syntax-keyword: #C792EA;    /* Purple */
  --syntax-string: #C3E88D;     /* Green */
  --syntax-function: #82AAFF;   /* Blue */
  --syntax-variable: #EEFFFF;   /* White */
  --syntax-comment: #697098;    /* Gray */

  /* UI Elements */
  --border-color: #E5E7EB;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### C.2 Typography & Readability

**Font Selections**:

```css
/* Ages 5-7: Large, friendly, rounded fonts */
.explorers-text {
  font-family: 'Nunito', 'Comic Sans MS', 'Chalkboard', cursive;
  font-size: 24px; /* Larger for easier reading */
  line-height: 1.6;
  font-weight: 700; /* Bold for visibility */
  letter-spacing: 0.5px;
}

/* Ages 8-10: Balanced, clear fonts */
.builders-text {
  font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 500; /* Medium weight */
  letter-spacing: 0.3px;
}

/* Ages 11-14: Professional, clean fonts */
.creators-text {
  font-family: 'Inter', 'Roboto', 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400; /* Regular weight */
  letter-spacing: 0.15px;
}

/* Code Font (All Ages) */
.code-font {
  font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  font-variant-ligatures: common-ligatures; /* For coding ligatures */
}

/* Dyslexia-Friendly Font (Optional) */
.dyslexia-friendly {
  font-family: 'OpenDyslexic', 'Lexend', sans-serif;
  font-size: 18px;
  line-height: 1.8;
  font-weight: 500;
  letter-spacing: 0.5px;
}
```

**Typography Hierarchy**:

```css
/* Ages 5-7 */
.explorers-heading-1 { font-size: 48px; font-weight: 800; }
.explorers-heading-2 { font-size: 36px; font-weight: 700; }
.explorers-heading-3 { font-size: 28px; font-weight: 700; }
.explorers-body { font-size: 24px; font-weight: 600; }

/* Ages 8-10 */
.builders-heading-1 { font-size: 36px; font-weight: 700; }
.builders-heading-2 { font-size: 28px; font-weight: 600; }
.builders-heading-3 { font-size: 22px; font-weight: 600; }
.builders-body { font-size: 18px; font-weight: 400; }

/* Ages 11-14 */
.creators-heading-1 { font-size: 32px; font-weight: 700; }
.creators-heading-2 { font-size: 24px; font-weight: 600; }
.creators-heading-3 { font-size: 20px; font-weight: 600; }
.creators-body { font-size: 16px; font-weight: 400; }
```

### C.3 Button Design & Touch Targets

**Ages 5-7 Button Specifications**:

```css
.explorer-button {
  /* Size */
  min-width: 120px;
  min-height: 80px;
  padding: 20px 30px;

  /* Spacing */
  margin: 15px;

  /* Visual */
  background: linear-gradient(135deg, #4C9AFF 0%, #57D9A3 100%);
  border: 4px solid #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(76, 154, 255, 0.4);

  /* Typography */
  font-size: 24px;
  font-weight: 800;
  color: #FFFFFF;
  text-transform: uppercase;

  /* Animation */
  transition: all 0.3s ease;
  cursor: pointer;
}

.explorer-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(76, 154, 255, 0.6);
}

.explorer-button:active {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(76, 154, 255, 0.5);
}

/* Icon Button (for minimal text) */
.explorer-icon-button {
  min-width: 88px;
  min-height: 88px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.explorer-icon-button img {
  width: 48px;
  height: 48px;
}
```

**Ages 8-10 Button Specifications**:

```css
.builder-button {
  /* Size */
  min-width: 100px;
  min-height: 60px;
  padding: 15px 25px;

  /* Spacing */
  margin: 10px;

  /* Visual */
  background: #3B82F6;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  /* Typography */
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;

  /* Animation */
  transition: all 0.2s ease;
}

.builder-button:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.builder-button:active {
  transform: translateY(0);
}

/* Secondary Button */
.builder-button-secondary {
  background: transparent;
  border: 2px solid #3B82F6;
  color: #3B82F6;
}

.builder-button-secondary:hover {
  background: #EFF6FF;
}
```

**Ages 11-14 Button Specifications**:

```css
.creator-button {
  /* Size */
  min-width: 80px;
  min-height: 44px; /* Standard touch target */
  padding: 12px 20px;

  /* Spacing */
  margin: 8px;

  /* Visual */
  background: #2563EB;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);

  /* Typography */
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;

  /* Animation */
  transition: all 0.15s ease;
}

.creator-button:hover {
  background: #1D4ED8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.creator-button:focus {
  outline: 3px solid #93C5FD;
  outline-offset: 2px;
}

/* Ghost Button */
.creator-button-ghost {
  background: transparent;
  border: 1px solid #D1D5DB;
  color: #374151;
}

.creator-button-ghost:hover {
  background: #F9FAFB;
}
```

### C.4 Animation & Feedback Systems

**Loading Animations**:

```css
/* Age 5-7: Bouncing character */
@keyframes bounce-character {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.explorer-loading {
  animation: bounce-character 1s ease-in-out infinite;
}

/* Age 8-10: Spinning blocks */
@keyframes spin-blocks {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.builder-loading {
  animation: spin-blocks 1.5s linear infinite;
}

/* Age 11-14: Professional loader */
@keyframes fade-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.creator-loading {
  animation: fade-pulse 1.5s ease-in-out infinite;
}
```

**Success Animations**:

```css
/* Celebration animation for correct answers */
@keyframes celebrate {
  0% { transform: scale(1); }
  25% { transform: scale(1.2) rotate(-10deg); }
  50% { transform: scale(1.2) rotate(10deg); }
  75% { transform: scale(1.2) rotate(-10deg); }
  100% { transform: scale(1); }
}

.success-animation {
  animation: celebrate 0.6s ease-in-out;
}

/* Star collection animation */
@keyframes collect-star {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

.star-collect {
  animation: collect-star 0.8s ease-out;
}
```

**Error Feedback**:

```css
/* Gentle shake for wrong answers */
@keyframes gentle-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-shake {
  animation: gentle-shake 0.4s ease-in-out;
  border: 3px solid #FCA5A5;
}

/* Age 5-7: Sad face appears */
.explorer-error::after {
  content: '🤔';
  font-size: 48px;
  animation: fadeIn 0.3s ease-in;
}

/* Age 8-10: Error message with icon */
.builder-error {
  background-color: #FEF2F2;
  border-left: 4px solid #EF4444;
  padding: 12px;
  border-radius: 8px;
}

/* Age 11-14: Console-style error */
.creator-error {
  font-family: monospace;
  background-color: #FEE2E2;
  color: #991B1B;
  padding: 10px;
  border-radius: 6px;
  border-left: 3px solid #DC2626;
}
```

### C.5 Progress Visualization

**Age 5-7 Progress System**:

```javascript
const ExplorerProgressUI = {
  type: 'star_path',
  visualization: `
    🌟────🌟────🌟────🌟────🏆
    ^     ^     ^     ^
    Done  Done  Now  Next
  `,
  elements: {
    completedStars: {
      icon: '⭐',
      size: '64px',
      animation: 'sparkle'
    },
    currentStar: {
      icon: '🌟',
      size: '80px',
      animation: 'pulse'
    },
    futureStar: {
      icon: '⚪',
      size: '48px',
      animation: 'none'
    },
    trophy: {
      icon: '🏆',
      size: '96px',
      unlockAnimation: 'celebration'
    }
  },
  audioFeedback: {
    starComplete: '/audio/star-earned.mp3',
    levelComplete: '/audio/level-complete.mp3',
    trophyUnlock: '/audio/trophy-unlock.mp3'
  }
}
```

**Age 8-10 Progress System**:

```javascript
const BuilderProgressUI = {
  type: 'xp_bar_with_levels',
  levelSystem: {
    currentLevel: 1,
    maxLevel: 50,
    xpForCurrentLevel: 0,
    xpForNextLevel: 100,
    levelUpRewards: [
      { level: 5, reward: 'new_sprite_pack' },
      { level: 10, reward: 'new_sound_pack' },
      { level: 15, reward: 'advanced_blocks' },
      { level: 20, reward: 'multiplayer_access' }
    ]
  },
  visualization: `
    Level 5 🔷
    ████████████░░░░░░░░ 60%
    450 / 750 XP

    Next: New Sprite Pack at Level 6
  `,
  xpSources: {
    lessonComplete: 50,
    quizPerfect: 25,
    projectPublish: 100,
    dailyStreak: 20,
    peerHelp: 30
  }
}
```

**Age 11-14 Progress System**:

```javascript
const CreatorProgressUI = {
  type: 'skill_tree',
  skills: [
    {
      category: 'HTML',
      skills: [
        { name: 'Basic Structure', status: 'mastered', xp: 100 },
        { name: 'Forms', status: 'in_progress', xp: 60 },
        { name: 'Semantic HTML', status: 'locked', xp: 0 }
      ]
    },
    {
      category: 'CSS',
      skills: [
        { name: 'Selectors', status: 'mastered', xp: 100 },
        { name: 'Flexbox', status: 'in_progress', xp: 75 },
        { name: 'Grid', status: 'locked', xp: 0 }
      ]
    },
    {
      category: 'JavaScript',
      skills: [
        { name: 'Variables', status: 'mastered', xp: 100 },
        { name: 'Functions', status: 'in_progress', xp: 40 },
        { name: 'Arrays', status: 'locked', xp: 0 }
      ]
    }
  ],
  visualization: `
    HTML ──┬── Basic Structure ✅
           ├── Forms ⏳ (60%)
           └── Semantic HTML 🔒

    CSS ───┬── Selectors ✅
           ├── Flexbox ⏳ (75%)
           └── Grid 🔒

    JS ────┬── Variables ✅
           ├── Functions ⏳ (40%)
           └── Arrays 🔒
  `,
  portfolio: {
    projectsCompleted: 12,
    linesOfCodeWritten: 3456,
    badgesEarned: 8,
    skillsUnlocked: 15
  }
}
```

### C.6 Accessibility Features

**Required Accessibility Features**:

```javascript
const AccessibilityConfig = {
  visualAccessibility: {
    highContrast: {
      enabled: true,
      ratio: '7:1', // WCAG AAA standard
      themes: ['light_high_contrast', 'dark_high_contrast']
    },
    fontSize: {
      adjustable: true,
      min: 12,
      default: 16,
      max: 24,
      step: 2
    },
    colorBlindness: {
      modes: [
        'protanopia', // Red-green
        'deuteranopia', // Red-green
        'tritanopia', // Blue-yellow
        'monochromacy' // Complete
      ],
      colorPaletteAdjustments: true
    },
    reducedMotion: {
      respectSystemPreference: true,
      disableAnimations: true,
      alternativeIndicators: true
    }
  },

  audioAccessibility: {
    closedCaptions: {
      required: true,
      languages: ['en', 'es', 'fr'],
      customizable: {
        fontSize: true,
        backgroundColor: true,
        textColor: true,
        position: true
      }
    },
    audioDescriptions: {
      available: true,
      autoPlay: false,
      voiceOptions: ['male', 'female', 'child']
    },
    transcripts: {
      available: true,
      downloadable: true,
      searchable: true
    }
  },

  motorAccessibility: {
    keyboardNavigation: {
      fullSupport: true,
      focusIndicators: 'high_visibility',
      skipLinks: true,
      shortcuts: {
        nextLesson: 'n',
        previousLesson: 'p',
        playPause: 'space',
        submitAnswer: 'enter'
      }
    },
    mouseAlternatives: {
      headTracking: false, // Future consideration
      eyeTracking: false, // Future consideration
      voiceCommands: true
    },
    clickTargets: {
      minimumSize: '44px x 44px',
      spacing: '8px minimum'
    }
  },

  cognitiveAccessibility: {
    simplifiedLanguage: {
      available: true,
      readingLevel: 'age_appropriate',
      definitionsAvailable: true
    },
    timeControls: {
      pauseableContent: true,
      noAutoTimeout: true,
      extendedTime: {
        quizzes: '2x',
        challenges: '1.5x'
      }
    },
    focusMode: {
      enabled: true,
      features: [
        'hide_distractions',
        'single_task_display',
        'progressive_disclosure',
        'break_reminders'
      ]
    }
  },

  screenReaderSupport: {
    ARIALabels: 'complete',
    semanticHTML: true,
    navigationLandmarks: true,
    announcements: {
      pageChanges: true,
      formErrors: true,
      successMessages: true,
      progressUpdates: true
    }
  }
}
```

---

*[Document continues in next part due to length...]*

---

## Document Status

**Sections Completed**: A (Architecture), B (Learning Tracks), C (UI/UX Design)
**Remaining Sections**: D through L

**Next Sections Preview**:
- Section D: Technical Implementation Roadmap
- Section E: Platform Issue Resolution
- Section F: Safety & Parental Controls
- Section G: Content Management System
- Section H: Assessment & Progress Tracking
- Section I: Success Metrics & Analytics
- Section J: Budget & Resource Planning
- Section K: Implementation Roadmap
- Section L: Testing & Quality Assurance

This document is actively being developed. Please refer to the version number and last updated date at the top.

---

**Document Classification**: Technical Specification
**Target Audience**: Development Team, Product Managers, Stakeholders
**Document Owner**: iKPACE Technical Team
**Review Cycle**: Quarterly updates during development

