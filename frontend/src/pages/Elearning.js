// pages/Elearning.js

import React, { useState, useEffect } from 'react';
import { 
  FaUserGraduate, 
  FaChalkboardTeacher,
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaUserTie,
  FaRocket,
  FaStar,
  FaUsers,
  FaGlobe,
  FaLaptopCode,
  FaMobile,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaPlayCircle,
  FaFilePdf,
  FaFileVideo,
  FaFileAudio,
  FaFileImage,
  FaFileArchive,
  FaFileCode,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Elearning = () => {
  const [userRole, setUserRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedMaterial, setExpandedMaterial] = useState(null);
  
  const navigate = useNavigate();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerContainerSlow = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const bounceIn = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setIsAuthenticated(true);
        setUser(userData);
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // If student, fetch their courses
        if (userData.role === 'student') {
          fetchStudentCourses();
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch student courses
  // In Elearning.js, update the fetchStudentCourses function

// Fetch student courses
const fetchStudentCourses = async () => {
  setLoadingCourses(true);
  try {
    // ✅ Use the new endpoint
    const response = await axios.get('http://localhost:5000/api/students/courses/me');
    
    console.log('📚 Fetched courses:', response.data);
    
    if (response.data.success) {
      setEnrolledCourses(response.data.data || []);
    }
  } catch (error) {
    console.error('Error fetching courses:', error.response?.data || error.message);
    toast.error('Failed to load your courses');
  } finally {
    setLoadingCourses(false);
  }
};

  // Fetch course materials for a specific course
  const fetchCourseMaterials = async (courseId, course) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/materials`);
      
      if (response.data.success) {
        setCourseMaterials(response.data.data);
        setSelectedCourse(course);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to load course materials');
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-400" />;
    if (fileType.includes('video') || fileType.includes('mp4')) return <FaFileVideo className="text-blue-400" />;
    if (fileType.includes('audio') || fileType.includes('mp3')) return <FaFileAudio className="text-green-400" />;
    if (fileType.includes('image')) return <FaFileImage className="text-purple-400" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <FaFileArchive className="text-yellow-400" />;
    if (fileType.includes('code') || fileType.includes('js') || fileType.includes('html')) return <FaFileCode className="text-indigo-400" />;
    if (fileType.includes('word') || fileType.includes('doc')) return <FaFileWord className="text-blue-500" />;
    if (fileType.includes('excel') || fileType.includes('xls')) return <FaFileExcel className="text-green-600" />;
    if (fileType.includes('powerpoint') || fileType.includes('ppt')) return <FaFilePowerpoint className="text-orange-500" />;
    return <FaFileAlt className="text-gray-400" />;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
        userType: userRole
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        // Save token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setIsAuthenticated(true);
        setUser(response.data.user);
        
        toast.success(`Welcome back, ${response.data.user.full_name || response.data.user.email}!`);
        
        // If student, fetch their courses
        if (response.data.user.role === 'student') {
          await fetchStudentCourses();
        }
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    setEnrolledCourses([]);
    setCourseMaterials([]);
    setSelectedCourse(null);
    toast.success('Logged out successfully');
  };

  // Render dashboard for authenticated users
  const renderDashboard = () => {
    if (!user) return null;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div 
          variants={fadeInUp}
          className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          {/* Floating icons */}
          <div className="absolute inset-0 overflow-hidden">
            <FaRocket className="absolute top-5 right-20 text-white/10 text-6xl animate-float-slow" />
            <FaBook className="absolute bottom-5 left-20 text-white/10 text-5xl animate-float" />
            <FaLaptopCode className="absolute top-10 left-1/4 text-white/10 text-7xl animate-float-delayed" />
          </div>

          <div className="relative z-10">
            <motion.div 
              variants={bounceIn}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {user.role === 'student' && <FaUserGraduate className="text-3xl text-white" />}
                {user.role === 'lecturer' && <FaChalkboardTeacher className="text-3xl text-white" />}
                {user.role === 'admin' && <FaUserTie className="text-3xl text-white" />}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Welcome, {user.full_name || user.email}!
                </h2>
                <p className="text-white/80">
                  {user.role === 'student' && 'Access your courses, assignments, and learning materials'}
                  {user.role === 'lecturer' && 'Manage your courses and student submissions'}
                  {user.role === 'admin' && 'Oversee the e-Learning platform'}
                </p>
              </div>
            </motion.div>
            
            <motion.button
              variants={fadeInUp}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition border border-white/30"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Student Dashboard */}
        {user.role === 'student' && (
          <>
            {/* Enrolled Courses */}
            <motion.div 
              variants={fadeInScale}
              className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <FaBook className="mr-3 text-blue-400" />
                My Enrolled Courses
              </h3>

              {loadingCourses ? (
                <div className="text-center py-12">
                  <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-300">Loading your courses...</p>
                </div>
              ) : enrolledCourses.length === 0 ? (
                <motion.div 
                  variants={zoomIn}
                  className="text-center py-16 backdrop-blur-sm bg-gray-800/20 rounded-xl border border-gray-700/50"
                >
                  <FaBook className="text-5xl text-gray-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">No Courses Yet</h4>
                  <p className="text-gray-400 mb-6">
                    You haven't registered for any courses yet.
                  </p>
                  <Link
                    to="/kiosk?tab=registration"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all group"
                  >
                    Go to Course Registration
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      variants={rotateIn}
                      whileHover={{ y: -5 }}
                      className="group relative"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      
                      <div className="relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500">
                        {/* Header with gradient */}
                        <div className="p-5 bg-gradient-to-r from-blue-600/50 to-purple-600/50 border-b border-gray-700/50">
                          <div className="flex justify-between items-start mb-2">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                              {course.course_code}
                            </span>
                            <span className="text-sm text-gray-300">{course.credits} credits</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-1">{course.course_name}</h4>
                          <p className="text-gray-300 text-sm line-clamp-2">{course.description}</p>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                          <div className="flex items-center text-sm text-gray-400 mb-4">
                            <FaCalendarAlt className="mr-2 text-blue-400" />
                            Enrolled: {new Date(course.enrollment_date).toLocaleDateString()}
                          </div>
                          
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => fetchCourseMaterials(course.id, course)}
                              className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition text-sm font-medium border border-blue-500/30"
                            >
                              <FaFileAlt className="inline mr-1" />
                              Materials
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition text-sm font-medium border border-green-500/30"
                            >
                              <FaPlayCircle className="inline mr-1" />
                              Assignments
                            </motion.button>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Course Materials */}
            <AnimatePresence>
              {selectedCourse && courseMaterials.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold flex items-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      <FaFileAlt className="mr-3 text-purple-400" />
                      {selectedCourse.course_name} - Materials
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCourse(null)}
                      className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition border border-red-500/30"
                    >
                      Close
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    className="space-y-3"
                  >
                    {courseMaterials.map((material, index) => (
                      <motion.div
                        key={material.id}
                        variants={slideInLeft}
                        className="group relative"
                      >
                        <div className="relative backdrop-blur-sm bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className="text-2xl"
                              >
                                {getFileIcon(material.file_type)}
                              </motion.div>
                              <div className="flex-1">
                                <h4 className="font-bold text-white mb-1">{material.title}</h4>
                                <p className="text-sm text-gray-400 mb-2">{material.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FaClock className="text-purple-400" />
                                    Uploaded: {new Date(material.created_at).toLocaleDateString()}
                                  </span>
                                  {material.file_size && (
                                    <span>{material.file_size}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <motion.a
                              href={material.file_url}
                              download
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition border border-purple-500/30 flex items-center gap-2"
                            >
                              <FaDownload />
                              <span className="hidden sm:inline">Download</span>
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Lecturer Dashboard */}
        {user.role === 'lecturer' && (
          <motion.div 
            variants={fadeInScale}
            className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center"
          >
            <FaChalkboardTeacher className="text-6xl text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Lecturer Dashboard</h3>
            <p className="text-gray-400">Lecturer features coming soon...</p>
          </motion.div>
        )}

        {/* Admin Dashboard */}
        {user.role === 'admin' && (
          <motion.div 
            variants={fadeInScale}
            className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              <FaUserTie className="mr-3 text-yellow-400" />
              Admin Overview
            </h3>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={rotateIn} whileHover={{ y: -5 }} className="group relative">
                <Link to="/admin" className="block relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <FaUserGraduate className="text-3xl text-blue-400 mb-3" />
                  <h4 className="font-bold text-white mb-1">Manage Applications</h4>
                  <p className="text-gray-400 text-sm">Review and process student applications</p>
                </Link>
              </motion.div>
              
              <motion.div variants={rotateIn} whileHover={{ y: -5 }} className="group relative">
                <div className="relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <FaBook className="text-3xl text-green-400 mb-3" />
                  <h4 className="font-bold text-white mb-1">Manage Courses</h4>
                  <p className="text-gray-400 text-sm">Create and update courses</p>
                </div>
              </motion.div>
              
              <motion.div variants={rotateIn} whileHover={{ y: -5 }} className="group relative">
                <div className="relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <FaUsers className="text-3xl text-purple-400 mb-3" />
                  <h4 className="font-bold text-white mb-1">User Management</h4>
                  <p className="text-gray-400 text-sm">Manage students and lecturers</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, -100]
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <FaLaptopCode className="absolute top-20 left-[10%] text-8xl animate-float-slow" />
          <FaMobile className="absolute bottom-20 right-[15%] text-7xl animate-float" />
          <FaGlobe className="absolute top-40 right-[25%] text-6xl animate-float-delayed" />
          <FaBook className="absolute bottom-40 left-[20%] text-7xl animate-float-slow" />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={zoomIn} className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                Learn Anywhere, Anytime
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                e-Learning Portal
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {isAuthenticated 
                ? 'Welcome to your personalized learning dashboard'
                : 'Access your courses, assignments, and learning materials from anywhere'}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {!isAuthenticated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 tracking-wider">LOGIN</span>
              <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-4 pb-20">
        {!isAuthenticated ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-md mx-auto"
          >
            {/* Role Selection */}
            <div className="flex border-b border-gray-700 mb-8">
              {[
                { role: 'student', icon: <FaUserGraduate />, color: 'blue', label: 'Student' },
                { role: 'lecturer', icon: <FaChalkboardTeacher />, color: 'green', label: 'Lecturer' },
                { role: 'admin', icon: <FaUserTie />, color: 'purple', label: 'Admin' }
              ].map((item) => (
                <motion.button
                  key={item.role}
                  onClick={() => setUserRole(item.role)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-4 px-6 font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                    userRole === item.role 
                      ? `border-b-2 border-${item.color}-500 text-${item.color}-400` 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span className={userRole === item.role ? `text-${item.color}-400` : ''}>{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Login Form */}
            <div className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {userRole === 'student' && 'Student Login'}
                {userRole === 'lecturer' && 'Lecturer Login'}
                {userRole === 'admin' && 'Admin Login'}
              </h2>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    {userRole === 'student' ? 'Student Number or Email' : 'Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type={userRole === 'student' ? 'text' : 'email'}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder={userRole === 'student' 
                        ? "e.g., SEPO2024001 or email@example.com" 
                        : "email@sepocollege.com.na"}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt />
                      Login
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition">
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/kiosk" className="text-blue-400 hover:text-blue-300 font-medium">
                    Apply for Admission
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          renderDashboard()
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Elearning;