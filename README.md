# iKPACE - Next-Generation Digital Learning Platform

iKPACE is a modern, AI-powered learning platform designed to help beginners master practical digital skills. Built with React, Tailwind CSS, and Supabase, it offers an intuitive learning experience with advanced progress tracking, community features, and secure payment integration.

## Features

### Core Features
- **User Authentication**: Secure email/password authentication with role-based access control
- **Student Dashboard**: Personalized dashboard with learning stats, progress tracking, and AI recommendations
- **Course Catalog**: 9 beginner-friendly courses covering IT, Data Analysis, Cybersecurity, and more
- **Course Player**: Interactive lesson player with video support, progress tracking, and AI assistant
- **Payment Integration**: Secure Paystack payment processing for course enrollments
- **Progress Tracking**: Advanced tracking with learning streaks, time spent, and skill level progression
- **Certificate System**: Automated certificate generation upon course completion
- **Community Forum**: Discussion boards for learners to connect and share knowledge
- **Admin Dashboard**: Comprehensive management interface for users, courses, and analytics

### Advanced Features
- **AI-Powered Learning**: Personalized recommendations and adaptive learning paths
- **Gamification**: Learning streaks, achievements, and skill level progression
- **Real-time Notifications**: In-app notifications for course updates and achievements
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional UI**: Clean, modern interface with carefully chosen color scheme

## Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment**: Paystack API
- **Icons**: Lucide React
- **Routing**: React Router v6

## Color Palette

- **Primary**: Deep Blue (#1A3D7C) - Trust and authority
- **Secondary**: Vibrant Orange (#FF7A00) - Action and engagement
- **Accent Green**: #00C853 - Success messages
- **Accent Yellow**: #FFD600 - Highlights
- **Neutrals**: Dark Gray (#333333), Light Gray (#F5F5F5), White (#FFFFFF)

## Project Structure

```
ikpace/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── PaystackPayment.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── CoursePlayer.jsx
│   │   ├── Community.jsx
│   │   ├── Profile.jsx
│   │   ├── Certificates.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account (for database)
- Paystack account (for payments)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Setup

The platform requires the following Supabase tables:
- user_profiles
- courses
- modules
- lessons
- enrollments
- payments
- lesson_progress
- learning_sessions
- quizzes
- quiz_questions
- quiz_attempts
- certificates
- ai_interactions
- learning_recommendations
- community_posts
- community_comments
- notifications

All tables include Row Level Security (RLS) policies for data protection.

## Payment Integration

To enable real payments:
1. Create a Paystack account at https://paystack.com
2. Get your Paystack public key
3. Update the public key in `src/components/PaystackPayment.jsx`

## Course Content

The platform includes 9 beginner-friendly courses:
1. Information Technology Fundamentals (4 weeks)
2. Data Analysis with Excel & Python (6 weeks)
3. Cybersecurity Fundamentals (6 weeks)
4. Virtual Assistant (4 weeks)
5. Content Creation (4 weeks)
6. Graphic Design (6 weeks)
7. AI Animation (4 weeks)
8. Freelancing Success (4 weeks)
9. Digital Entrepreneurship (4 weeks)

All courses are priced at $7 per month.

## Features Roadmap

### Completed
- User authentication and authorization
- Course catalog and enrollment
- Payment processing
- Course player with progress tracking
- Learning streaks and gamification
- Community forum
- Certificate generation
- Admin dashboard
- AI recommendations interface

### Future Enhancements
- Mobile app
- Live mentorship sessions
- Job board integration
- Advanced AI features (practice question generation, explanations)
- Email notification system
- Quiz auto-grading system
- Video upload for instructors
- Advanced analytics

## Security

- All sensitive operations require authentication
- Row Level Security (RLS) enabled on all database tables
- Secure password hashing via Supabase Auth
- Payment processing handled securely through Paystack
- No sensitive keys exposed in frontend code

## Contributing

This is a production learning platform. For feature requests or bug reports, please contact the development team.

## License

Proprietary - All rights reserved by iKPACE

## Contact

Email: info@ikapce.com
Website: https://ikpace.com

---

Built with passion for empowering learners worldwide.
