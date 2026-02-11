import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import Payment from "./pages/Payment";
import PaymentTest from "./pages/PaymentTest";
import SimplePaymentSuccess from "./pages/SimplePaymentSuccess";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import ConfirmEnrollment from "./pages/ConfirmEnrollment";
import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";
import PromotionalBanner from "./components/PromotionalBanner";

function Layout({ children, showNavbar = true }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <PromotionalBanner />}
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "pt-16" : ""}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth Routes - No Navbar */}
          <Route path="/login" element={
            <Layout showNavbar={false}>
              <Login />
            </Layout>
          } />
          <Route path="/register" element={
            <Layout showNavbar={false}>
              <Register />
            </Layout>
          } />

          {/* Public Routes with Navbar */}
          <Route path="/course/:id" element={
            <Layout>
              <CourseDetail />
            </Layout>
          } />
          <Route path="/courses" element={
            <Layout>
              <Courses />
            </Layout>
          } />
          <Route path="/pricing" element={
            <Layout>
              <Pricing />
            </Layout>
          } />
          
          {/* User Routes (may require login) */}
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/career-ready" element={
            <Layout>
              <CareerReady />
            </Layout>
          } />
          <Route path="/community" element={
            <Layout>
              <Community />
            </Layout>
          } />

          
                    {/* Enrollment Confirmation */}

                    <Route path="/confirm-enrollment/:id" element={

                      <Layout>

                        <ConfirmEnrollment />

                      </Layout>

                    } />

          

          {/* Checkout & Payment */}
          <Route path="/checkout/:courseId" element={
            <Layout>
              <Checkout />
            </Layout>
          } />
          <Route path="/payment-success" element={
            <Layout>
              <SimplePaymentSuccess />
            </Layout>
          } />
          <Route path="/enrollment-success" element={
            <Layout>
              <EnrollmentSuccess />
            </Layout>
          } />

          {/* Admin Route - No Navbar */}
          <Route path="/admin" element={
            <Layout showNavbar={false}>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </Layout>
          } />

          {/* Homepage */}
          <Route path="/" element={
            <Layout>
              <Landing />
            </Layout>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;






