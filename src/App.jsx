import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChatSupport from './components/LiveChatSupport';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseViewMore from "./pages/CourseViewMore";  // For View More button (Blue/Orange - 5 courses)
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import CareerReady from "./pages/CareerReady";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import Profile from './pages/Profile';
import MyCourses from './pages/MyCourses';
import Certificates from './pages/Certificates';

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
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/course/:id/view-more" element={<Layout><CourseViewMore /></Layout>} />   {/* View More - Blue/Orange page (5 courses) */}
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/my-courses" element={<Layout><MyCourses /></Layout>} />
          <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
          <Route path="/career-ready" element={<Layout><CareerReady /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/checkout/:courseId" element={<Layout><Checkout /></Layout>} />

          {/* ========== COMMUNITY DROPDOWN ROUTES ========== */}
          <Route path="/community/forums" element={<Layout><CommunityForums /></Layout>} />
          <Route path="/community/study-groups" element={<Layout><CommunityStudyGroups /></Layout>} />
          <Route path="/community/events" element={<Layout><CommunityEvents /></Layout>} />
          <Route path="/community/alumni" element={<Layout><CommunityAlumni /></Layout>} />
          <Route path="/community/ambassador" element={<Layout><CommunityAmbassador /></Layout>} />

          {/* ========== ABOUT DROPDOWN ROUTES ========== */}
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