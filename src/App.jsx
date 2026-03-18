// App.jsx (fixed version)
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChatSupport from './components/LiveChatSupport';

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Courses from "./pages/Courses";
import CourseEnroll from "./pages/CourseEnroll";
import CourseViewMore from "./pages/CourseViewMore";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import CareerReady from "./pages/CareerReady";
import Community from "./pages/Community";
import TeacherDashboard from "./pages/TeacherDashboard";
import Checkout from "./pages/Checkout";
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import Certificates from './pages/Certificates';
import PaymentSuccess from './pages/PaymentSuccess';
import CourseCurriculum from './pages/CourseCurriculum';
import About from './pages/About';
import Programs from './pages/Programs';
import WomenInTech from './pages/WomenInTech';
import TeacherAccess from './pages/TeacherAccess';
import AdminDashboard from './pages/AdminDashboard';
import CoursePlayer from './pages/CoursePlayer';
import TopicView from './pages/TopicView';
import DirectTeacher from './pages/DirectTeacher';
import CompleteTeacherDashboard from './pages/CompleteTeacherDashboard';
import AdminChatDashboard from './pages/AdminChatDashboard';
import CheckTables from './pages/CheckTables';
import Enrollment from "./pages/Enrollment";
import DemoCourseDetail from "./pages/DemoCourseDetail";
import LessonAdmin from './pages/LessonAdmin';

// **Test Course Player Page**
import TestCoursePlayer from './pages/TestCoursePlayer';

// **NEW: Course Lesson Manager**
import CourseLessonManager from './pages/CourseLessonManager';

// Community Pages
import CommunityForums from './pages/CommunityForums';
import CommunityStudyGroups from './pages/CommunityStudyGroups';
import CommunityEvents from './pages/CommunityEvents';
import CommunityAlumni from './pages/CommunityAlumni';
import CommunityAmbassador from './pages/CommunityAmbassador';

// About Pages
import AboutMission from './pages/AboutMission';
import AboutTeam from './pages/AboutTeam';
import AboutSuccessStories from './pages/AboutSuccessStories';
import AboutCareers from './pages/AboutCareers';
import Contact from './pages/Contact';

// Women & Tech Pages
import WomenTechScholarship from './pages/WomenTechScholarship';
import ReturnToWork from './pages/ReturnToWork';
import TechLeadership from './pages/TechLeadership';
import CodingBeginners from './pages/CodingBeginners';
import WomenEntrepreneurs from './pages/WomenEntrepreneurs';

function Layout({ children, showNavbar = true }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-1" : ""}>{children}</main>
      {showNavbar && <Footer />}
      <LiveChatSupport />
    </div>
  );
}

function App() {
  const DEFAULT_TEST_COURSE_ID = "3dfbeb9d-7145-402a-a23c-f5c3b01129e5"; // default course ID for test player

  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Auth routes (no navbar) */}
          <Route path="/login" element={<Layout showNavbar={false}><Login /></Layout>} />
          <Route path="/register" element={<Layout showNavbar={false}><Register /></Layout>} />
          <Route path="/forgot-password" element={<Layout showNavbar={false}><ForgotPassword /></Layout>} />
          <Route path="/reset-password" element={<Layout showNavbar={false}><ResetPassword /></Layout>} />

          {/* Public routes */}
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/programs" element={<Layout><Programs /></Layout>} />
          <Route path="/programs/:slug" element={<Layout><CourseEnroll /></Layout>} />
          
          {/* ADDED: Pricing route */}
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          
          <Route path="/women-tech" element={<Layout><WomenInTech /></Layout>} />
          <Route path="/women-tech/scholarship" element={<Layout><WomenTechScholarship /></Layout>} />
          <Route path="/women-tech/return-to-work" element={<Layout><ReturnToWork /></Layout>} />
          <Route path="/women-tech/leadership" element={<Layout><TechLeadership /></Layout>} />
          <Route path="/women-tech/coding" element={<Layout><CodingBeginners /></Layout>} />
          <Route path="/women-tech/entrepreneurs" element={<Layout><WomenEntrepreneurs /></Layout>} />
          <Route path="/course/:id" element={<Layout><CourseEnroll /></Layout>} />
          <Route path="/course/:id/view-more" element={<Layout><CourseViewMore /></Layout>} />
          <Route path="/course-curriculum/:slug" element={<Layout><CourseCurriculum /></Layout>} />
          <Route path="/learn/:courseId" element={<Layout><CoursePlayer /></Layout>} />
          <Route path="/learn/:courseId/topic/:topicId" element={<Layout><TopicView /></Layout>} />
          <Route path="/course-detail/:id" element={<Layout><DemoCourseDetail /></Layout>} />

          {/* Lesson Admin */}
          <Route path="/lesson-admin" element={<Layout showNavbar={false}><LessonAdmin /></Layout>} />

          {/* COURSE LESSON MANAGER - NEW ROUTE */}
          <Route path="/course-lesson-manager" element={<Layout showNavbar={true}><CourseLessonManager /></Layout>} />

          {/* Test Course Player */}
          {/* Redirect /test-course-player to default course */}
          <Route path="/test-course-player" element={<Navigate to={`/test-course-player/${DEFAULT_TEST_COURSE_ID}`} />} />
          <Route path="/test-course-player/:courseId" element={<Layout><TestCoursePlayer /></Layout>} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/my-courses" element={<Layout><MyCourses /></Layout>} />
          <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
          <Route path="/career-ready" element={<Layout><CareerReady /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />

          {/* Teacher routes */}
          <Route path="/teacher" element={<Layout><TeacherDashboard /></Layout>} />
          <Route path="/direct-teacher" element={<Layout><DirectTeacher /></Layout>} />
          <Route path="/teacher-access" element={<Layout><TeacherAccess /></Layout>} />
          <Route path="/complete-teacher" element={<Layout><CompleteTeacherDashboard /></Layout>} />

          {/* Payment & Enrollment */}
          <Route path="/checkout/:courseId" element={<Layout><Checkout /></Layout>} />
          <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
          <Route path="/enrollment-success" element={<Layout><Enrollment /></Layout>} />
          <Route path="/confirm-enrollment/:id" element={<Layout><Enrollment /></Layout>} />

          {/* Admin routes */}
          <Route path="/admin" element={<Layout showNavbar={false}><AdminDashboard /></Layout>} />
          <Route path="/admin/chats" element={<Layout showNavbar={false}><AdminChatDashboard /></Layout>} />

          {/* Community routes */}
          <Route path="/community/forums" element={<Layout><CommunityForums /></Layout>} />
          <Route path="/community/study-groups" element={<Layout><CommunityStudyGroups /></Layout>} />
          <Route path="/community/events" element={<Layout><CommunityEvents /></Layout>} />
          <Route path="/community/alumni" element={<Layout><CommunityAlumni /></Layout>} />
          <Route path="/community/ambassador" element={<Layout><CommunityAmbassador /></Layout>} />

          {/* About routes */}
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/about/mission" element={<Layout><AboutMission /></Layout>} />
          <Route path="/about/team" element={<Layout><AboutTeam /></Layout>} />
          <Route path="/about/success-stories" element={<Layout><AboutSuccessStories /></Layout>} />
          <Route path="/about/careers" element={<Layout><AboutCareers /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Check Tables */}
          <Route path="/check-tables" element={<Layout><CheckTables /></Layout>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;