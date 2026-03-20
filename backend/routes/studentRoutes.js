// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes protected
router.use(protect);

// ========== STUDENT SELF-SERVICE ROUTES ==========
// Get current logged-in student's details (for Kiosk)
router.get('/me', authorize('student'), studentController.getCurrentStudent);


// ✅ ADD THIS - Student self-enrollment
router.post('/me/enroll', authorize('student'), studentController.selfEnrollInCourse);
// Get current student's dashboard (for e-Learning)
router.get('/dashboard', authorize('student'), studentController.getDashboard);

router.get('/courses/me', authorize('student'), studentController.getMyCourses);
// Get current student's courses (for e-Learning)
router.get('/courses/me', authorize('student'), studentController.getStudentCourses);

// Get current student's profile
router.get('/me/profile', authorize('student'), studentController.getMyProfile);

// Get current student's assignments
router.get('/me/assignments', authorize('student'), studentController.getMyAssignments);

// Get current student's stats
router.get('/me/stats', authorize('student'), studentController.getMyStats);

// ========== ADMIN/MANAGEMENT ROUTES ==========
// Get all students (admin/lecturer only)
router.get('/', authorize('admin', 'lecturer'), studentController.getStudents);

// Search students (admin/lecturer only)
router.get('/search', authorize('admin', 'lecturer'), studentController.searchStudents);

// Get single student by ID
router.get('/:id', authorize('admin', 'lecturer'), studentController.getStudent);

// Update student (admin only)
router.put('/:id', authorize('admin'), studentController.updateStudent);

// Delete student (admin only)
router.delete('/:id', authorize('admin'), studentController.deleteStudent);

// Get student's courses (admin view)
router.get('/:id/courses', authorize('admin', 'lecturer'), studentController.getStudentCourses);

// Get student's assignments (admin view)
router.get('/:id/assignments', authorize('admin', 'lecturer'), studentController.getStudentAssignments);

// Get student statistics (admin view)
router.get('/:id/stats', authorize('admin', 'lecturer'), studentController.getStudentStats);

// Enroll student in course (admin/lecturer)
router.post('/:id/enroll', authorize('admin', 'lecturer'), studentController.enrollInCourse);

module.exports = router; // THIS IS CRITICAL - make sure this line exists