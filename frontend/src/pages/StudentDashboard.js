import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI, handleApiError } from '../utils/api';
import Loading from '../components/Loading';
import LoadingOverlay from '../components/Loading';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardResponse, assignmentsResponse, gradesResponse] = await Promise.all([
        studentAPI.getDashboard(),
        studentAPI.getAssignments('me'),
        studentAPI.getStats('me')
      ]);

      setDashboardData(dashboardResponse.data);
      setAssignments(assignmentsResponse.data || []);
      setGrades(gradesResponse.data?.recent_grades || []);
    } catch (error) {
      const errorData = handleApiError(error);
      console.error('Failed to fetch dashboard data:', errorData.message);
      // For demo purposes, create sample data
      setDashboardData({
        student: {
          full_name: 'Jane Smith',
          student_number: 'SEPO20269881',
          status: 'active',
          email: 'jane.smith@example.com',
          phone: '0811234567'
        },
        dashboard: {
          total_courses: 3,
          pending_assignments: 2,
          completed_assignments: 4,
          average_grade: 82
        },
        courses: [
          {
            id: 1,
            code: 'CSC101',
            name: 'Introduction to Computer Technology',
            instructor: 'Dr. John Smith',
            credits: 3,
            semester: 'Fall 2024',
            progress: 65,
            materials: [
              { type: 'outline', name: 'Course Outline', date: '2024-01-15' },
              { type: 'unit', name: 'Unit 1: Computer Basics', date: '2024-01-20' },
              { type: 'assignment', name: 'Assignment 1', due_date: '2024-02-10', submitted: true },
              { type: 'test', name: 'Quiz 1', date: '2024-02-05', score: 85 },
              { type: 'textbook', name: 'Digital Textbook', date: '2024-01-10' },
            ]
          },
          {
            id: 2,
            code: 'SCI101',
            name: 'Biology Fundamentals',
            instructor: 'Prof. Sarah Johnson',
            credits: 4,
            semester: 'Fall 2024',
            progress: 40,
            materials: [
              { type: 'outline', name: 'Course Outline', date: '2024-01-15' },
              { type: 'unit', name: 'Unit 1: Cell Biology', date: '2024-01-22' },
              { type: 'assignment', name: 'Lab Report 1', due_date: '2024-02-15', submitted: false },
              { type: 'video', name: 'Cell Structure Lecture', date: '2024-01-25' },
            ]
          }
        ],
        upcoming_assignments: [
          {
            id: 1,
            title: 'Programming Assignment 1',
            course_code: 'CSC101',
            course_name: 'Introduction to Computer Technology',
            due_date: '2024-02-15',
            submitted: true,
            score: 85,
            max_score: 100
          },
          {
            id: 2,
            title: 'Lab Report 1',
            course_code: 'SCI101',
            course_name: 'Biology Fundamentals',
            due_date: '2024-02-20',
            submitted: false,
            score: null,
            max_score: 100
          }
        ],
        recent_grades: [
          {
            assignment_title: 'Quiz 1 - Computer Basics',
            course_name: 'Introduction to Computer Technology',
            score: 90,
            max_score: 100,
            graded_at: '2024-02-10'
          },
          {
            assignment_title: 'Midterm Exam',
            course_name: 'Biology Fundamentals',
            score: 78,
            max_score: 100,
            graded_at: '2024-02-05'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/elearning');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Dashboard Unavailable
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Unable to load your dashboard. Please try again later.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {dashboardData.student.full_name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {dashboardData.student.status}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.dashboard.total_courses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Assignments</p>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.dashboard.pending_assignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Assignments</p>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.dashboard.completed_assignments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Grade</p>
                <p className="text-lg font-semibold text-gray-900">{dashboardData.dashboard.average_grade}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {course.code}
                            </span>
                            <span className="text-sm text-gray-500">{course.semester}</span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mt-1">{course.name}</h3>
                          <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                          <p className="text-sm text-gray-600">Credits: {course.credits}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{course.progress}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div className={`h-2 rounded-full ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Course Materials */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Materials</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {course.materials.slice(0, 4).map((material, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                              <span className="text-gray-400">•</span>
                              <span>{material.name}</span>
                              <span className="text-gray-400">•</span>
                              <span>{formatDate(material.date)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.upcoming_assignments.map((assignment) => {
                    const daysUntilDue = getDaysUntilDue(assignment.due_date);
                    const isOverdue = daysUntilDue < 0;
                    const isDueSoon = daysUntilDue <= 3 && daysUntilDue > 0;

                    return (
                      <div key={assignment.id} className={`border border-gray-200 rounded-lg p-4 ${
                        assignment.submitted ? 'bg-green-50' : isOverdue ? 'bg-red-50' : isDueSoon ? 'bg-yellow-50' : ''
                      }`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                            <p className="text-sm text-gray-600">{assignment.course_name}</p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <span>Due: {formatDate(assignment.due_date)}</span>
                              {isOverdue && <span className="text-red-600 font-medium">Overdue</span>}
                              {isDueSoon && <span className="text-yellow-600 font-medium">Due Soon</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            {assignment.submitted ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Submitted
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Pending
                              </span>
                            )}
                            {assignment.score && (
                              <div className="mt-1 text-sm font-medium text-gray-900">
                                Score: {assignment.score}/{assignment.max_score}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Info */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student Number</label>
                  <p className="mt-1 text-sm text-gray-900">{dashboardData.student.student_number}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{dashboardData.student.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{dashboardData.student.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{dashboardData.student.status}</p>
                </div>
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Grades</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {grades.map((grade, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{grade.assignment_title}</div>
                        <div className="text-sm text-gray-600">{grade.course_name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{grade.score}/{grade.max_score}</div>
                        <div className="text-sm text-gray-500">{formatDate(grade.graded_at)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">View All Courses</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Submit Assignment</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">View Grades</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;