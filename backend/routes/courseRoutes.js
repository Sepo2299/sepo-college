const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', courseController.getCourses);
router.get('/search', courseController.searchCourses);
router.get('/school/:school', courseController.getCoursesBySchool);
router.get('/:id', courseController.getCourse);
router.get('/:id/materials', courseController.getCourseMaterials);

// Protected routes
router.use(protect);

// Create/Update/Delete courses
router.post('/', authorize('admin', 'lecturer'), courseController.createCourse);
router.put('/:id', authorize('admin', 'lecturer'), courseController.updateCourse);
router.delete('/:id', authorize('admin'), courseController.deleteCourse);

// Course materials
router.post('/:id/materials', 
  authorize('admin', 'lecturer'),
  uploadSingle('course_material'),
  courseController.addCourseMaterial
);

// Course students
router.get('/:id/students', 
  authorize('admin', 'lecturer'), 
  courseController.getEnrolledStudents
);

// Course assignments
router.get('/:id/assignments', 
  authorize('student', 'lecturer', 'admin'),
  courseController.getCourseAssignments
);

// Course statistics
router.get('/:id/stats', 
  authorize('admin', 'lecturer'),
  courseController.getCourseStats
);

// Enroll in course (students)
router.post('/:id/enroll', 
  authorize('student'),
  courseController.enrollInCourse
);

module.exports = router; // MAKE SURE THIS EXISTS