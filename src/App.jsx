import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // ✅ FIXED: Added .jsx extension
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChatSupport from './components/LiveChatSupport';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ ADDED
import ResetPassword from "./pages/ResetPassword";   // ✅ ADDED
import Courses from "./pages/Courses";
import CourseEnroll from "./pages/CourseEnroll";      // For Enroll Now button (Purple - 15+ courses)
import CourseViewMore from "./pages/CourseViewMore";  // For View More button (Blue/Orange - 5 courses)
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import CareerReady from "./pages/CareerReady";
import Community from "./pages/Community";
// Remove duplicate AdminDashboard import - keep only one
// import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard"; // ✅ ADDED: Teacher Dashboard
import Checkout from "./pages/Checkout";
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import Certificates from './pages/Certificates';
import PaymentSuccess from './pages/PaymentSuccess';  // Payment success page after checkout
import CourseCurriculum from './pages/CourseCurriculum'; // Course curriculum page
import About from './pages/About'; // ✅ ADDED: Main About page
import Programs from './pages/Programs'; // ✅ ADDED: Programs page
import WomenInTech from './pages/WomenInTech'; // ✅ ADDED: Women in Tech main page
import TeacherAccess from './pages/TeacherAccess';
// Keep this single import
import AdminDashboard from './pages/AdminDashboard'

// ========== LEARNING PAGE IMPORT ==========
import CoursePlayer from './pages/CoursePlayer';  // Import the course player/learning page
// import EnhancedCoursePlayer from './pages/EnhancedCoursePlayer'; // Alternative if you prefer the enhanced version

// ========== NEW IMPORT FOR TOPIC VIEW ==========
import TopicView from './pages/TopicView'; // Add this import for individual topic viewing

// ========== NEW IMPORT FOR DIRECT TEACHER ACCESS ==========
import DirectTeacher from './pages/DirectTeacher'; // Direct teacher login page

// ========== NEW IMPORT FOR COMPLETE TEACHER DASHBOARD ==========
import CompleteTeacherDashboard from './pages/CompleteTeacherDashboard';

// ========== NEW IMPORT FOR ADMIN CHAT DASHBOARD ==========
import AdminChatDashboard from './pages/AdminChatDashboard';

// ========== NEW IMPORTS FOR NAVBAR DROPDOWN PAGES ==========
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

// Layout component to wrap all pages with Navbar and Footer
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <LiveChatSupport />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />     {/* ✅ ADDED */}
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />       {/* ✅ ADDED */}
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/programs" element={<Layout><Programs /></Layout>} />                 {/* ✅ Programs page */}
          <Route path="/women-tech" element={<Layout><WomenInTech /></Layout>} />            {/* ✅ Women in Tech main page */}
          <Route path="/course/:id" element={<Layout><CourseEnroll /></Layout>} />                {/* Enroll Now - Purple page (15+ courses) */}
          <Route path="/course/:id/view-more" element={<Layout><CourseViewMore /></Layout>} />   {/* View More - Blue/Orange page (5 courses) */}
          
          {/* ========== LEARNING & CURRICULUM ROUTES ========== */}
          <Route path="/learn/:courseId" element={<Layout><CoursePlayer /></Layout>} />           {/* Learning page after enrollment */}
          <Route path="/course-curriculum/:slug" element={<Layout><CourseCurriculum /></Layout>} />  {/* Course curriculum page */}
          
          {/* ========== TOPIC VIEW ROUTES ========== */}
          <Route path="/learn/:courseId/topic/:topicId" element={<Layout><TopicView /></Layout>} />  {/* Individual topic page (preferred path) */}
          <Route path="/topic/:courseId/:topicId" element={<Layout><TopicView /></Layout>} />        {/* Alternative shorter path */}
          
          {/* Alternative if you prefer enhanced version: */}
          {/* <Route path="/learn/:courseId" element={<Layout><EnhancedCoursePlayer /></Layout>} /> */}
          
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/teacher" element={<Layout><TeacherDashboard /></Layout>} />             {/* ✅ ADDED: Teacher Dashboard */}
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/my-courses" element={<Layout><MyCourses /></Layout>} />
          <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
          <Route path="/career-ready" element={<Layout><CareerReady /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          
          {/* ========== ADMIN ROUTES - FIXED AND ADDED ========== */}
          {/* Admin Dashboard - Main route */}
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          {/* Catch all admin sub-routes */}
          <Route path="/admin/*" element={<Layout><AdminDashboard /></Layout>} />
          {/* Admin Chat Dashboard */}
          <Route path="/admin/chats" element={<Layout><AdminChatDashboard /></Layout>} />  {/* Admin chat management */}
          
          {/* ========== DIRECT TEACHER ACCESS ROUTES ========== */}
          <Route path="/direct-teacher" element={<DirectTeacher />} />  {/* No Layout wrapper - bypasses navbar */}
          <Route path="/teacher-access" element={<TeacherAccess />} />
          
          {/* ========== NEW COMPLETE TEACHER DASHBOARD ROUTE ========== */}
          <Route path="/complete-teacher" element={<CompleteTeacherDashboard />} />  {/* Full featured teacher dashboard */}
          
          {/* ========== PAYMENT ROUTES ========== */}
          <Route path="/checkout/:courseId" element={<Layout><Checkout /></Layout>} />
          <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />         {/* Payment success page after checkout */}

          {/* ========== COMMUNITY DROPDOWN ROUTES ========== */}
          <Route path="/community/forums" element={<Layout><CommunityForums /></Layout>} />
          <Route path="/community/study-groups" element={<Layout><CommunityStudyGroups /></Layout>} />
          <Route path="/community/events" element={<Layout><CommunityEvents /></Layout>} />
          <Route path="/community/alumni" element={<Layout><CommunityAlumni /></Layout>} />
          <Route path="/community/ambassador" element={<Layout><CommunityAmbassador /></Layout>} />

          {/* ========== ABOUT DROPDOWN ROUTES ========== */}
          <Route path="/about" element={<Layout><About /></Layout>} />                             {/* ✅ Main About page */}
          <Route path="/about/mission" element={<Layout><AboutMission /></Layout>} />
          <Route path="/about/team" element={<Layout><AboutTeam /></Layout>} />
          <Route path="/about/success-stories" element={<Layout><AboutSuccessStories /></Layout>} />
          <Route path="/about/careers" element={<Layout><AboutCareers /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* ========== WOMEN & TECH DROPDOWN ROUTES ========== */}
          <Route path="/course/women-tech-scholarship" element={<Layout><WomenTechScholarship /></Layout>} />
          <Route path="/course/return-to-work" element={<Layout><ReturnToWork /></Layout>} />
          <Route path="/course/tech-leadership" element={<Layout><TechLeadership /></Layout>} />
          <Route path="/course/coding-beginners" element={<Layout><CodingBeginners /></Layout>} />
          <Route path="/course/tech-entrepreneurship" element={<Layout><WomenEntrepreneurs /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;