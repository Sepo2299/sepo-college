// App.js - Updated version

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
// Change this line:
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';  // Use Header instead of Navigation
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Schools from './pages/Schools';
import Elearning from './pages/Elearning';
import Kiosk from './pages/Kiosk';
import Contact from './pages/Contact';
import Science from './pages/Schools/Science';
import Computers from './pages/Schools/Computers';
import Automotive from './pages/Schools/Automotive';
import Entertainment from './pages/Schools/Entertainment';
import AdminApplications from './pages/AdminApplications';
import ApplicationForm from './pages/ApplicationForm';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/StudentDashboard';
import AdminLogin from './pages/AdminLogin';

// Protected Route Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Use Header here instead of Navigation */}
      <Header />
      <ScrollToTop /> {/* Add this line */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/elearning" element={<Elearning />} />
          <Route path="/kiosk" element={<Kiosk />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schools/science" element={<Science />} />
          <Route path="/schools/computers" element={<Computers />} />
          <Route path="/schools/automotive" element={<Automotive />} />
          <Route path="/schools/entertainment" element={<Entertainment />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminApplications />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/student-dashboard" 
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;