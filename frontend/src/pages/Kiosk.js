// pages/Kiosk.js

import React, { useState, useEffect } from 'react';
import { 
  FaFileAlt, 
  FaClipboardCheck, 
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowRight,
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaCreditCard,
  FaSpinner,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTie
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Kiosk = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'registration' ? 'registration' : 'application';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  
  // Course filtering state
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  
  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      idNumber: '',
      nationality: 'Namibian'
    },
    contactInfo: {
      phone: '',
      email: '',
      address: '',
      emergencyContact: ''
    },
    education: {
      highestQualification: '',
      institution: '',
      yearCompleted: '',
      results: ''
    },
    program: {
      intendedCourse: '',
      plannedYear: '2024',
      studyMode: 'full-time'
    }
  });

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    courses: [],
    paymentMethod: '',
    termsAccepted: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map intended course to school
  const getSchoolFromIntendedCourse = (intendedCourse) => {
    const schoolMap = {
      'science': 'science',
      'computers': 'computers',
      'automotive': 'automotive',
      'entertainment': 'entertainment'
    };
    return schoolMap[intendedCourse] || null;
  };

  // Fetch courses based on intended course
  const fetchCoursesBySchool = async (intendedCourse) => {
    setLoadingCourses(true);
    try {
      const school = getSchoolFromIntendedCourse(intendedCourse);
      if (!school) {
        console.error('Unknown intended course:', intendedCourse);
        setAvailableCourses([]);
        return;
      }
      
      console.log(`📚 Fetching courses for school: ${school}`);
      const response = await axios.get(`http://localhost:5000/api/courses/school/${school}`);
      
      if (response.data.success) {
        // MongoDB uses _id, so map to id for frontend consistency
        const coursesWithId = response.data.data.map(course => ({
          ...course,
          id: course._id  // Add id field for frontend compatibility
        }));
        setAvailableCourses(coursesWithId);
        console.log(`✅ Loaded ${coursesWithId.length} courses for ${school}`);
      } else {
        setAvailableCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load available courses');
      setAvailableCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  // Check authentication and student status
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      setLoadingError(null);
      
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      console.log('🔍 Kiosk - Auth Check:', { hasToken: !!token, hasUser: !!userStr });
      
      if (!token || !userStr) {
        console.log('❌ Not authenticated');
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(userStr);
        console.log('👤 User data:', userData);
        setIsAuthenticated(true);
        setUser(userData);

        // If student, fetch their details including application
        if (userData.role === 'student') {
          console.log('📡 Fetching student data...');
          
          // Set auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('http://localhost:5000/api/students/me');
          
          console.log('📥 Student response:', response.data);
          
          if (response.data.success) {
            const studentData = response.data.student;
            setStudent(studentData);
            
            // Check if student has application
            if (studentData.application) {
              console.log('✅ Application found:', studentData.application);
              setApplicationStatus(studentData.application);
            } else {
              console.log('⚠️ No application found for student');
              setApplicationStatus(null);
            }
          } else {
            console.log('❌ Failed to fetch student data');
            setLoadingError('Failed to load student data');
          }
        }
      } catch (error) {
        console.error('❌ Auth check error:', error.response?.data || error.message);
        setLoadingError(error.response?.data?.error || 'Authentication error');
        
        // If unauthorized, clear storage
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Fetch courses when application is approved
  useEffect(() => {
    if (applicationStatus?.status === 'accepted' && applicationStatus?.intended_course) {
      fetchCoursesBySchool(applicationStatus.intended_course);
    }
  }, [applicationStatus]);

  const handleApplicationInputChange = (section, field, value) => {
    setApplicationForm({
      ...applicationForm,
      [section]: {
        ...applicationForm[section],
        [field]: value
      }
    });
  };

  const handleCourseSelection = (courseId) => {
    setRegistrationForm({
      ...registrationForm,
      courses: registrationForm.courses.includes(courseId)
        ? registrationForm.courses.filter(id => id !== courseId)
        : [...registrationForm.courses, courseId]
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!applicationForm.personalInfo.fullName || 
          !applicationForm.personalInfo.dateOfBirth ||
          !applicationForm.contactInfo.phone || 
          !applicationForm.contactInfo.email || 
          !applicationForm.program.intendedCourse) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const applicationData = {
        full_name: applicationForm.personalInfo.fullName,
        date_of_birth: applicationForm.personalInfo.dateOfBirth,
        id_number: applicationForm.personalInfo.idNumber,
        nationality: applicationForm.personalInfo.nationality,
        gender: applicationForm.personalInfo.gender,
        phone: applicationForm.contactInfo.phone,
        email: applicationForm.contactInfo.email,
        address: applicationForm.contactInfo.address,
        emergency_contact: applicationForm.contactInfo.emergencyContact,
        highest_qualification: applicationForm.education.highestQualification,
        institution: applicationForm.education.institution,
        year_completed: applicationForm.education.yearCompleted,
        results: applicationForm.education.results,
        intended_course: applicationForm.program.intendedCourse,
        planned_year: applicationForm.program.plannedYear,
        study_mode: applicationForm.program.studyMode
      };

      console.log('📤 Submitting application:', applicationData);

      const response = await axios.post('http://localhost:5000/api/applications', applicationData);
      
      console.log('📥 Application response:', response.data);
      
      if (response.data.success) {
        toast.success(
          <div>
            <h3 className="font-bold mb-2">Application Submitted!</h3>
            <p>Student Number: {response.data.student_number}</p>
            <p className="text-xs mt-2">Check your email for login credentials</p>
          </div>,
          { duration: 10000 }
        );
        
        // Reset form
        setApplicationForm({
          personalInfo: { fullName: '', dateOfBirth: '', gender: '', idNumber: '', nationality: 'Namibian' },
          contactInfo: { phone: '', email: '', address: '', emergencyContact: '' },
          education: { highestQualification: '', institution: '', yearCompleted: '', results: '' },
          program: { intendedCourse: '', plannedYear: '2024', studyMode: 'full-time' }
        });
      }
    } catch (error) {
      console.error('❌ Application error:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Application failed');
    } finally {
      setIsSubmitting(false);
    }
  };

const handleSubmitRegistration = async (e) => {
  e.preventDefault();
  
  if (registrationForm.courses.length === 0) {
    toast.error('Please select at least one course');
    return;
  }
  
  if (!registrationForm.paymentMethod) {
    toast.error('Please select a payment method');
    return;
  }
  
  if (!registrationForm.termsAccepted) {
    toast.error('Please accept the terms and conditions');
    return;
  }

  setIsSubmitting(true);

  try {
    const token = localStorage.getItem('token');
    
    // ✅ Use the new self-enrollment endpoint (no student ID needed)
    const enrollmentPromises = registrationForm.courses.map(courseId => 
      axios.post(
        `http://localhost:5000/api/students/me/enroll`,  // Changed to /me/enroll
        { course_id: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );

    const results = await Promise.all(enrollmentPromises);
    
    // Check if all enrollments were successful
    const allSuccessful = results.every(r => r.data.success);
    
    if (allSuccessful) {
      toast.success(
        <div>
          <h3 className="font-bold mb-2">Registration Successful!</h3>
          <p>You have been enrolled in {registrationForm.courses.length} course(s).</p>
          <p className="text-xs mt-2">You can now access your courses in e-Learning.</p>
        </div>,
        { duration: 5000 }
      );
      
      // Reset registration form
      setRegistrationForm({
        courses: [],
        paymentMethod: '',
        termsAccepted: false
      });
      
      // Optional: Redirect to e-Learning after short delay
      setTimeout(() => {
        window.location.href = '/elearning';
      }, 3000);
    } else {
      toast.error('Some courses could not be enrolled. Please try again.');
    }
  } catch (error) {
    console.error('❌ Registration error:', error.response?.data || error.message);
    toast.error(error.response?.data?.error || 'Registration failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  // Render application status badge
  const renderStatusBadge = () => {
    if (!applicationStatus) {
      return (
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-600">
          <FaClock className="mr-2" />
          No Application
        </div>
      );
    }
    
    const statusConfig = {
      pending: { icon: <FaClock />, color: 'bg-yellow-100 text-yellow-800', text: 'Pending Review' },
      accepted: { icon: <FaCheckCircle />, color: 'bg-green-100 text-green-800', text: 'Approved' },
      rejected: { icon: <FaTimesCircle />, color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    
    const config = statusConfig[applicationStatus.status] || statusConfig.pending;
    
    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full ${config.color}`}>
        <span className="mr-2">{config.icon}</span>
        {config.text}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Kiosk</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isAuthenticated && user?.role === 'student' 
              ? 'Welcome back! Manage your application and course registrations'
              : 'Apply for admission or register for courses'}
          </p>
        </div>

        {/* Status Cards for Authenticated Students */}
        {isAuthenticated && user?.role === 'student' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Your Application Status</h2>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserGraduate className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student Number</p>
                    <p className="text-xl font-bold text-gray-900">{student?.student_number || 'N/A'}</p>
                  </div>
                </div>
                
                {renderStatusBadge()}
              </div>
              
              {/* Application Details */}
              {applicationStatus && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Application Number</p>
                      <p className="font-medium text-gray-900">{applicationStatus.application_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Intended Course</p>
                      <p className="font-medium text-gray-900 capitalize">{applicationStatus.intended_course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted On</p>
                      <p className="font-medium text-gray-900">
                        {new Date(applicationStatus.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('application')}
              className={`flex-1 py-4 px-6 font-medium text-lg flex items-center justify-center transition-colors
                ${activeTab === 'application' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
            >
              <FaFileAlt className="mr-3" />
              NEW APPLICATION
              <span className="ml-2 text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Step 1</span>
            </button>
            
            <button
              onClick={() => {
                if (isAuthenticated && applicationStatus?.status === 'accepted') {
                  setActiveTab('registration');
                }
              }}
              disabled={!isAuthenticated || applicationStatus?.status !== 'accepted'}
              className={`flex-1 py-4 px-6 font-medium text-lg flex items-center justify-center transition-colors
                ${activeTab === 'registration' 
                  ? 'border-b-2 border-green-600 text-green-600' 
                  : applicationStatus?.status === 'accepted'
                    ? 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'}`}
            >
              <FaClipboardCheck className="mr-3" />
              COURSE REGISTRATION
              <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">Step 2</span>
            </button>
          </div>
        </div>

        {/* Application Tab */}
        {activeTab === 'application' && (
          <div className="max-w-4xl mx-auto">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-blue-800 mb-3">📝 New Student Application</h3>
              <p className="text-blue-700 mb-2">
                Complete this form to apply for admission. After submission:
              </p>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>You'll receive your student number and login credentials via email</li>
                <li>Your application will be reviewed by admin (usually 2-3 working days)</li>
                <li>Once approved, you can register for courses in the "Course Registration" tab</li>
              </ul>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmitApplication} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaUserGraduate className="mr-3 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={applicationForm.personalInfo.fullName}
                        onChange={(e) => handleApplicationInputChange('personalInfo', 'fullName', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={applicationForm.personalInfo.dateOfBirth}
                        onChange={(e) => handleApplicationInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Gender</label>
                      <select
                        value={applicationForm.personalInfo.gender}
                        onChange={(e) => handleApplicationInputChange('personalInfo', 'gender', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        ID/Passport Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={applicationForm.personalInfo.idNumber}
                        onChange={(e) => handleApplicationInputChange('personalInfo', 'idNumber', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nationality</label>
                      <input
                        type="text"
                        value={applicationForm.personalInfo.nationality}
                        onChange={(e) => handleApplicationInputChange('personalInfo', 'nationality', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaEnvelope className="mr-3 text-green-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={applicationForm.contactInfo.phone}
                        onChange={(e) => handleApplicationInputChange('contactInfo', 'phone', e.target.value)}
                        className="input-field"
                        placeholder="0812345678"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={applicationForm.contactInfo.email}
                        onChange={(e) => handleApplicationInputChange('contactInfo', 'email', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Physical Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={applicationForm.contactInfo.address}
                        onChange={(e) => handleApplicationInputChange('contactInfo', 'address', e.target.value)}
                        className="input-field"
                        rows="3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
                      <input
                        type="tel"
                        value={applicationForm.contactInfo.emergencyContact}
                        onChange={(e) => handleApplicationInputChange('contactInfo', 'emergencyContact', e.target.value)}
                        className="input-field"
                        placeholder="Emergency phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Educational Background */}
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaGraduationCap className="mr-3 text-purple-600" />
                    Educational Background
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Highest Qualification <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={applicationForm.education.highestQualification}
                        onChange={(e) => handleApplicationInputChange('education', 'highestQualification', e.target.value)}
                        className="input-field"
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="grade12">Grade 12 Certificate</option>
                        <option value="diploma">Diploma</option>
                        <option value="degree">Degree</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Institution <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={applicationForm.education.institution}
                        onChange={(e) => handleApplicationInputChange('education', 'institution', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Year Completed <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1990"
                        max="2024"
                        value={applicationForm.education.yearCompleted}
                        onChange={(e) => handleApplicationInputChange('education', 'yearCompleted', e.target.value)}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Results/Average <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={applicationForm.education.results}
                        onChange={(e) => handleApplicationInputChange('education', 'results', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 25 points, 65%"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaCalendarAlt className="mr-3 text-red-600" />
                    Program Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Intended Course <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={applicationForm.program.intendedCourse}
                        onChange={(e) => handleApplicationInputChange('program', 'intendedCourse', e.target.value)}
                        className="input-field"
                        required
                      >
                        <option value="">Select Course</option>
                        <option value="science">Natural Sciences</option>
                        <option value="computers">Computer Technology</option>
                        <option value="automotive">Automotive Engineering</option>
                        <option value="entertainment">Entertainment Arts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Planned Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={applicationForm.program.plannedYear}
                        onChange={(e) => handleApplicationInputChange('program', 'plannedYear', e.target.value)}
                        className="input-field"
                        required
                      >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Study Mode <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={applicationForm.program.studyMode}
                        onChange={(e) => handleApplicationInputChange('program', 'studyMode', e.target.value)}
                        className="input-field"
                        required
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-3" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaFileAlt className="mr-3" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Registration Tab */}
        {activeTab === 'registration' && (
          <div className="max-w-4xl mx-auto">
            {/* Access Control */}
            {!isAuthenticated ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                <FaLock className="text-4xl text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">Login Required</h3>
                <p className="text-yellow-700 mb-6">
                  You need to be logged in to register for courses.
                </p>
                <Link
                  to="/elearning"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  <FaSignInAlt className="mr-2" />
                  Go to Login
                </Link>
              </div>
            ) : !applicationStatus ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
                <FaClock className="text-4xl text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-orange-800 mb-4">No Application Found</h3>
                <p className="text-orange-700 mb-6">
                  You need to submit an application before you can register for courses.
                </p>
                <button
                  onClick={() => setActiveTab('application')}
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  <FaArrowRight className="mr-2" />
                  Go to Application
                </button>
              </div>
            ) : applicationStatus.status === 'pending' ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                <FaClock className="text-4xl text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">Application Pending</h3>
                <p className="text-yellow-700 mb-4">
                  Your application is currently under review. You'll be able to register once it's approved.
                </p>
                <p className="text-yellow-600 font-medium">
                  Application Number: {applicationStatus.application_number}
                </p>
              </div>
            ) : applicationStatus.status === 'rejected' ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <FaTimesCircle className="text-4xl text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-800 mb-4">Application Rejected</h3>
                <p className="text-red-700 mb-4">
                  Your application has been rejected. Please contact the admissions office for more information.
                </p>
                {applicationStatus.notes && (
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <p className="font-medium text-gray-700">Reason:</p>
                    <p className="text-gray-600">{applicationStatus.notes}</p>
                  </div>
                )}
              </div>
            ) : applicationStatus.status === 'accepted' ? (
              /* Registration Form for Approved Students */
              <div className="space-y-8">
                {/* Success Banner */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-500 text-3xl mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Application Approved!</h3>
                      <p className="text-green-700">
                        You can now register for your courses. Select your courses below.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <form onSubmit={handleSubmitRegistration}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <FaBook className="mr-3 text-green-600" />
                      Course Registration
                    </h3>

                    {loadingCourses ? (
                      <div className="text-center py-8">
                        <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto mb-3" />
                        <p className="text-gray-600">Loading your available courses...</p>
                      </div>
                    ) : availableCourses.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FaBook className="text-4xl text-gray-400 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-gray-900 mb-2">No Courses Available</h4>
                        <p className="text-gray-600">
                          There are no courses available for your program yet. Please contact the administration.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          {availableCourses.map((course) => (
                            <div
                              key={course.id}
                              className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                                registrationForm.courses.includes(course.id)
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleCourseSelection(course.id)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-900">{course.course_code}</span>
                                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  {course.credits} credits
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2">{course.course_name}</h4>
                              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={registrationForm.courses.includes(course.id)}
                                  onChange={() => {}}
                                  className="w-4 h-4 text-green-600 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Select this course</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Selected Courses Summary */}
                        {registrationForm.courses.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h4 className="font-bold text-gray-900 mb-3">Selected Courses:</h4>
                            <div className="space-y-2">
                              {registrationForm.courses.map(id => {
                                const course = availableCourses.find(c => c.id === id);
                                return course ? (
                                  <div key={id} className="flex justify-between text-sm">
                                    <span>{course.course_code} - {course.course_name}</span>
                                    <span className="font-medium">{course.credits} credits</span>
                                  </div>
                                ) : null;
                              })}
                            </div>
                            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                              <span>Total Credits:</span>
                              <span>
                                {registrationForm.courses.reduce((total, id) => {
                                  const course = availableCourses.find(c => c.id === id);
                                  return total + (course?.credits || 0);
                                }, 0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Payment Method */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <FaCreditCard className="mr-2 text-blue-600" />
                        Payment Method
                      </h4>
                      <div className="space-y-3">
                        {['Bank Transfer', 'Credit/Debit Card', 'Sponsorship'].map((method) => (
                          <label key={method} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="payment"
                              value={method.toLowerCase().replace(' ', '-')}
                              checked={registrationForm.paymentMethod === method.toLowerCase().replace(' ', '-')}
                              onChange={(e) => setRegistrationForm({...registrationForm, paymentMethod: e.target.value})}
                              className="mr-3"
                            />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          checked={registrationForm.termsAccepted}
                          onChange={(e) => setRegistrationForm({...registrationForm, termsAccepted: e.target.checked})}
                          className="mt-1 mr-3"
                        />
                        <span className="text-gray-700">
                          I confirm that the information provided is accurate and I agree to the 
                          <a href="#" className="text-blue-600 hover:underline mx-1">Terms and Conditions</a>
                          and 
                          <a href="#" className="text-blue-600 hover:underline mx-1">Registration Policies</a>
                          of Sepo College.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || availableCourses.length === 0}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-3" />
                          Processing Registration...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Fallback for any other status */
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Application Status Unknown</h3>
                <p className="text-gray-600 mb-4">
                  Your application status is: {applicationStatus.status}
                </p>
                <p className="text-gray-600">
                  Please contact the admissions office for assistance.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">📌 Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Application</h4>
                <p className="text-sm text-gray-600">Submit your application and receive login credentials immediately</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Admin Review</h4>
                <p className="text-sm text-gray-600">Wait for admin approval (usually 2-3 working days)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Registration</h4>
                <p className="text-sm text-gray-600">Once approved, register for your courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kiosk;