# iKPACE Website Layout Guide

## Complete Website Structure

This document describes the comprehensive website layout and all sections implemented for the iKPACE learning platform.

---

## Table of Contents
1. [Promotional Banner](#promotional-banner)
2. [Navigation](#navigation)
3. [Homepage Sections](#homepage-sections)
4. [Pricing Plans Page](#pricing-plans-page)
5. [Career Ready Page](#career-ready-page)
6. [Footer & Social Media](#footer--social-media)
7. [Mobile Responsiveness](#mobile-responsiveness)

---

## Promotional Banner

### Location
Top of every page, above navigation

### Content
- **Headline**: "Upgrade to All Access Plus today and get 12 months for just $45"
- **Savings Badge**: "Save $11 on premium programs access!"
- **CTA Button**: "UNLOCK NOW" (links to `/pricing`)
- **Quick Links**: "Current Programs" and "View More" (both link to `/courses`)

### Design
- Gradient background (yellow → secondary → primary)
- Animated sparkles icon
- Prominent white CTA button with hover effects
- Responsive layout (stacks on mobile)

### File Location
`/src/components/PromotionalBanner.jsx`

---

## Navigation

### Main Navigation Links

**Public Pages:**
- Courses
- Pricing

**Authenticated Users:**
- Dashboard
- Career Ready
- Community

**User Dropdown Menu:**
- Profile
- Certificates
- Admin Dashboard (admin only)
- Sign Out

### Design Features
- Sticky navigation (stays at top while scrolling)
- Logo with tagline "LEARN SMARTER"
- Hover effects on all links
- User avatar with dropdown
- Mobile-responsive hamburger menu

### File Location
`/src/components/Navbar.jsx`

---

## Homepage Sections

### 1. Hero Section
**Content:**
- Main headline: "Master Digital Skills, Transform Your Career"
- Subheadline highlighting AI-powered learning
- Two CTA buttons: "Start Learning Now - $7/course" and "Explore Courses"
- Stats cards: 9 courses, $7 price, 4-6 weeks duration

**Design:**
- Gradient hero background
- Large, bold typography
- Prominent CTAs
- Semi-transparent stat cards

### 2. Why Choose iKPACE Section
**Content:**
- 6 feature cards with icons:
  - AI-Powered Learning
  - Track Your Progress
  - Earn Certificates
  - Community Support
  - Practical Skills
  - Career Growth

**Design:**
- Grid layout (3 columns on desktop)
- Icon-driven design
- Hover animations (cards scale up)

### 3. Most Popular Programs Section
**Content:**
- Badge: "MOST POPULAR PROGRAMS"
- Dynamic course cards loaded from database
- Course thumbnails, titles, duration, and pricing
- "View All Courses" CTA button

**Design:**
- Featured badge at top
- 4-column grid on desktop
- Course cards with images
- Hover effects on cards

### 4. About iKPACE Section
**Content:**
- Mission statement
- 4 benefit cards:
  - Flexible Learning
  - HD Video Lessons
  - Live Support
  - Verified Certificates

**Design:**
- Icon-centered layout
- Clean, professional presentation
- Circular icon backgrounds

### 5. Community Section
**Content:**
- Headline: "Join a Community that Has Your Back"
- Description: "Experience the power of a community that walks with you throughout your career. Our supportive environments are designed for you to connect, collaborate, and build lasting relationships with peers and mentors, fostering collective growth and shared success."
- Community stats:
  - 5,000+ Active Members
  - 24/7 Community Support
  - 100+ Events Per Month
- "Join Our Community" CTA button

**Design:**
- Gradient background (secondary → primary → green)
- Large, centered layout
- Animated icon
- Prominent stats in cards
- White text on gradient background

### 6. Success Stories Section
**Content:**
- 3 testimonial cards with:
  - Student photo
  - Name and role
  - Success quote

**Design:**
- Card-based layout
- Professional photos
- Italic quotes
- 3-column grid

### 7. FAQ Section
**Content:**
- 6 common questions with detailed answers:
  - Pricing information
  - Lifetime access details
  - Beginner-friendly confirmation
  - Certificate information
  - Support options
  - Multiple course enrollment

**Design:**
- Expandable card format
- Checkmark icons
- Clear typography

### 8. Contact Section
**Content:**
- Email: info@ikpace.com
- 24/7 Live Chat option
- Community Forum option
- Globe icon

**Design:**
- Centered layout
- Card-based presentation
- Icon-driven design

### File Location
`/src/pages/Landing.jsx`

---

## Pricing Plans Page

### Page Structure
**URL**: `/pricing`

### Content

#### Header
- Main headline: "Choose Your Learning Path"
- Subheadline about unlimited access

#### Plan 1: All Access (Monthly)
**Price**: $5/month
**Features:**
- Month selector dropdown (1-12 months)
- Total calculator
- "SAVE & CONTINUE" button
- All features included:
  - Unlimited registration into tech training programmes
  - Unlimited access to Tech Hubs/community/events
  - Online and in-person infrastructure access
  - Access to vast university partner network
  - Priority support and mentorship
  - Certificate of completion for all courses

#### Plan 2: All Access Plus (Yearly)
**Price**: $45/year
**Special Offer**: "12 months for the price of 5 - SAVE $11"
**Features:**
- All features from All Access plan
- PLUS: Priority access to new courses
- PLUS: Exclusive community events
- Coupon code input field
- Highlighted as "BEST VALUE"
- Prominent "GET ALL ACCESS PLUS" button

#### What's Included Section
- 4-card grid showing benefits:
  - Career Growth
  - Community
  - Certificates
  - Flexibility

#### Footer Information
- 30-day money-back guarantee
- Upgrade anytime option
- Links to "Browse All Courses" and "Contact Support"

### Design Features
- Two-column layout on desktop
- "Popular" badge on All Access plan
- "BEST VALUE" badge on All Access Plus
- Gradient backgrounds on price cards
- Checkmark icons for all features
- Coupon code input with "Apply" button
- Total amount calculator
- Hover effects on cards

### File Location
`/src/pages/Pricing.jsx`

---

## Career Ready Page

### Page Structure
**URL**: `/career-ready`

### Content

#### Header
- Award icon
- Main headline: "Be Career Ready & Earn 250 Legacy Points!"
- Subheadline about completing professional profile

#### Main Sections

**1. CV Upload Section**
- Drag-and-drop file upload
- Accepts PDF, DOC, DOCX (max 5MB)
- Upload icon and instructions
- Success confirmation when file selected

**2. Success Story Section**
- Large textarea for user story
- Placeholder text with guidance
- Community sharing notice

**3. Rewards Display**
- 4-card grid showing what users get:
  - 250 Legacy Points
  - Career Ready Badge
  - Enhanced Visibility
  - Exclusive Perks

**4. Ambassador Program**
- Large promotional section
- Users icon (animated)
- Headline: "Become an iKPACE Ambassador"
- Benefits:
  - 100 points per referral
  - Exclusive rewards
- Feature cards with details

#### Submission Flow
- "Complete Career Ready Profile" button
- Validation (requires CV or success story)
- Loading state during upload
- Success page with:
  - Congratulations message
  - 250 points confirmation
  - Rewards display
  - "Go to Dashboard" button

### Design Features
- Two-column layout for main sections
- Gradient backgrounds for special sections
- Icon-driven design
- Progress indicators
- Success animations
- Responsive cards

### Database Integration
- Uploads CV to Supabase Storage (`cvs` bucket)
- Updates user profile with `cv_url`
- Sets `career_ready` flag to true
- Awards 250 legacy points
- Creates community post with success story

### File Location
`/src/pages/CareerReady.jsx`

---

## Footer & Social Media

### Content

#### Brand Section
- iKPACE logo and name
- Tagline: "#learn smarter"
- Mission statement

#### Quick Links
- Browse Courses
- Pricing Plans
- Career Ready
- Community

#### Support Links
- My Dashboard
- Certificates
- My Profile
- Help Center

#### Social Media Connections
**TikTok:**
- Handle: @ikpace
- Link: https://www.tiktok.com/@ikpace

**LinkedIn:**
- Handle: @ikpacelearning
- Link: https://www.linkedin.com/company/ikpacelearning

**Instagram:**
- Handle: @ikpacelearning
- Link: https://www.instagram.com/ikpacelearning

**Email:**
- Address: info@ikpace.com

#### Legal Links
- Privacy Policy
- Terms of Service
- Cookie Policy

### Design Features
- Gradient background (primary → primary-dark)
- 4-column grid layout
- Icon-based social links
- Hover effects on all links
- Circular icon backgrounds
- White text on dark background
- Copyright notice
- Responsive layout (stacks on mobile)

### File Location
`/src/components/Footer.jsx`

---

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

**Promotional Banner:**
- Stacks vertically on mobile
- CTA button full-width
- Quick links hidden on small screens

**Navigation:**
- Hamburger menu on mobile
- Collapsible menu
- Full-screen overlay on mobile

**Homepage:**
- All grids become single column
- Hero text size adjusts
- Stats cards stack vertically
- Course cards full-width

**Pricing:**
- Plans stack vertically on mobile
- Month selector full-width
- Buttons full-width

**Career Ready:**
- Two-column layout becomes single column
- Upload area full-width
- Reward cards stack

**Footer:**
- 4-column grid becomes single column
- Social links maintain horizontal layout
- All sections stack neatly

---

## User Flows

### New Visitor Flow
```
Homepage → Browse Courses → Select Course →
View Details → Enroll → Register/Login →
Choose Plan → Checkout → Dashboard
```

### Career Ready Flow
```
Dashboard → Career Ready (nav) → Upload CV →
Share Success Story → Submit →
Earn 250 Points → Badge Awarded
```

### Subscription Flow
```
Homepage/Pricing → Select Plan →
Login/Register → Checkout →
Payment Success → Dashboard
```

### Ambassador Flow
```
Career Ready Page → Become Ambassador →
Share Referral Link → Friend Enrolls →
Earn 100 Points per Referral
```

---

## Key Design Principles

### Consistency
- Color scheme throughout (primary, secondary, accent colors)
- Typography hierarchy maintained
- Icon usage consistent
- Button styles uniform

### Accessibility
- High contrast ratios
- Clear focus states
- Keyboard navigation support
- Screen reader friendly
- Alt text on all images

### Performance
- Lazy loading images
- Optimized bundle size
- Fast page loads
- Smooth animations

### User Experience
- Clear CTAs on every page
- Minimal form fields
- Helpful error messages
- Progress indicators
- Success confirmations

---

## Configuration

### Environment Variables Required
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_key
```

### Database Tables Used
- `user_profiles` - User information and career ready status
- `courses` - Course catalog
- `enrollments` - Course enrollments
- `payments` - Payment records
- `community_posts` - Success stories

### Storage Buckets
- `cvs` - CV document storage

---

## Testing Checklist

### Homepage
- [ ] Promotional banner displays correctly
- [ ] All sections load properly
- [ ] Course cards populate from database
- [ ] Community section shows stats
- [ ] All CTAs work
- [ ] Footer displays social links

### Pricing Page
- [ ] Both plans display
- [ ] Month selector works
- [ ] Total calculator updates
- [ ] Coupon code can be entered
- [ ] Buttons link correctly

### Career Ready
- [ ] CV upload works
- [ ] Success story can be submitted
- [ ] Points are awarded
- [ ] Profile updates correctly
- [ ] Success page displays

### Navigation
- [ ] All links work
- [ ] Dropdown menu functions
- [ ] Mobile menu works
- [ ] User info displays

### Footer
- [ ] All social links correct
- [ ] Email link works
- [ ] Quick links navigate properly
- [ ] Responsive on mobile

---

## Maintenance Guide

### Updating Social Media Links
Edit `/src/components/Footer.jsx`:
```javascript
// Change URLs here
href="https://www.tiktok.com/@ikpace"
href="https://www.linkedin.com/company/ikpacelearning"
href="https://www.instagram.com/ikpacelearning"
```

### Updating Pricing
Edit `/src/pages/Pricing.jsx`:
```javascript
const monthlyPrice = 5  // Change monthly price
const yearlyPrice = 45  // Change yearly price
const yearlySavings = 11  // Change savings amount
```

### Updating Community Stats
Edit `/src/pages/Landing.jsx`:
```javascript
// In Community section
<div className="text-4xl font-bold">5,000+</div>  // Update numbers
<div className="text-4xl font-bold">24/7</div>
<div className="text-4xl font-bold">100+</div>
```

### Adding New Features to Plans
Edit `/src/pages/Pricing.jsx`:
```javascript
const features = [
  {
    icon: <CheckCircle />,
    text: 'Your new feature here'
  },
  // Add more features
]
```

---

## Support

For questions or issues with the website layout:
- Email: info@ikpace.com
- Documentation: See IMPLEMENTATION_GUIDE.md
- Video Setup: See VIDEO_SETUP.md

---

**Last Updated**: February 2026
**Version**: 2.0.0
