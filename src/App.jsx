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
import CourseDetail from "./pages/CourseDetail";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import CareerReady from "./pages/CareerReady";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import Profile from './pages/Profile';

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
          <Route path="/" element={<Layout><Landing /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/course/:id" element={<Layout><CourseDetail /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/career-ready" element={<Layout><CareerReady /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/checkout/:courseId" element={<Layout><Checkout /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;