const { Student, User, Course, Enrollment, Application } = require('../models');
const mongoose = require('mongoose');

// @desc    Get current logged-in student's details
// @route   GET /api/students/me
// @access  Private (Student only)
exports.getCurrentStudent = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await Student.findOne({ user_id: userId })
      .populate('user_id', 'email username role profile_image last_login');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    // Get their latest application with intended course
    const application = await Application.findOne({ student_id: student._id })
      .sort({ created_at: -1 })
      .limit(1);

    const studentData = student.toObject();
    studentData.application = application || null;

    if (application) {
      console.log('✅ Application found for student:', application);
    } else {
      console.log('⚠️ No application found for student ID:', student._id);
    }

    res.json({
      success: true,
      student: studentData
    });

  } catch (error) {
    console.error('Get current student error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student dashboard
// @route   GET /api/students/dashboard
// @access  Private (Student)
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get student
    const student = await Student.findOne({ user_id: userId });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const studentId = student._id;

    // Get enrolled courses
    const enrollments = await Enrollment.find({ student_id: studentId })
      .populate({
        path: 'course_id',
        populate: { path: 'lecturer_id', select: 'full_name' }
      });

    const courses = enrollments.map(e => ({
      ...e.course_id.toObject(),
      enrollment_status: e.status,
      grade: e.grade,
      enrollment_date: e.enrollment_date
    }));

    // Get recent assignments
    // Note: You'll need to implement this based on your assignment model
    const assignments = [];

    // Get application status
    const application = await Application.findOne({ student_id: studentId })
      .sort({ created_at: -1 })
      .limit(1);

    // Get stats
    const stats = await Student.getStats(studentId);

    res.json({
      success: true,
      data: {
        profile: student,
        courses,
        assignments,
        application,
        stats
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student's courses (for student view)
// @route   GET /api/students/courses/me
// @access  Private (Student)
exports.getStudentCourses = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.id });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const studentId = student._id;

    console.log('📚 Fetching courses for student ID:', studentId);

    const enrollments = await Enrollment.find({ student_id: studentId })
      .populate({
        path: 'course_id',
        populate: { path: 'lecturer_id', select: 'full_name' }
      })
      .sort({ enrollment_date: -1 });

    const courses = enrollments.map(e => ({
      id: e.course_id._id,
      course_code: e.course_id.course_code,
      course_name: e.course_id.course_name,
      credits: e.course_id.credits,
      description: e.course_id.description,
      school: e.course_id.school,
      enrollment_status: e.status,
      grade: e.grade,
      enrollment_date: e.enrollment_date,
      formatted_date: e.enrollment_date ? e.enrollment_date.toISOString().split('T')[0] : null,
      lecturer_name: e.course_id.lecturer_id?.full_name || null
    }));

    console.log(`✅ Found ${courses.length} courses for student`);

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('❌ Get student courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student's profile
// @route   GET /api/students/me/profile
// @access  Private (Student)
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await Student.findOne({ user_id: userId })
      .populate('user_id', 'email username profile_image last_login');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get my assignments
// @route   GET /api/students/me/assignments
// @access  Private (Student)
exports.getMyAssignments = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.id });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const assignments = await Student.getAssignments(student._id);

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Get my assignments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get current student's assignments
// @route   GET /api/students/me/assignments
// @access  Private (Student)
exports.getMyAssignments = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const assignments = await Student.getAssignments(student._id);

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Get my assignments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get current student's stats
// @route   GET /api/students/me/stats
// @access  Private (Student)
exports.getMyStats = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const stats = await Student.getStats(student._id);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get my stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// controllers/studentController.js

// @desc    Get current student's enrolled courses
// @route   GET /api/students/courses/me
// @access  Private (Student)
exports.getMyCourses = async (req, res) => {
  try {
    // Get student from logged-in user
    const student = await Student.findOne({ user_id: req.user.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const studentId = student._id;

    console.log('📚 Fetching courses for student ID:', studentId);

    // Find all enrollments for this student
    const enrollments = await Enrollment.find({ student_id: studentId })
      .populate({
        path: 'course_id',
        populate: { path: 'lecturer_id', select: 'full_name email' }
      })
      .sort({ enrollment_date: -1 });

    // Format the response
    const courses = enrollments.map(enrollment => ({
      id: enrollment.course_id._id,
      course_code: enrollment.course_id.course_code,
      course_name: enrollment.course_id.course_name,
      credits: enrollment.course_id.credits,
      description: enrollment.course_id.description,
      school: enrollment.course_id.school,
      enrollment_status: enrollment.status,
      grade: enrollment.grade,
      enrollment_date: enrollment.enrollment_date,
      lecturer_name: enrollment.course_id.lecturer_id?.full_name || 'TBA',
      formatted_date: enrollment.enrollment_date ? 
        new Date(enrollment.enrollment_date).toLocaleDateString() : null
    }));

    console.log(`✅ Found ${courses.length} courses for student`);

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('❌ Get my courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Student self-enroll in course
// @route   POST /api/students/me/enroll
// @access  Private (Student)
exports.selfEnrollInCourse = async (req, res) => {
  try {
    // Get the student from the logged-in user
    const student = await Student.findOne({ user_id: req.user.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const { course_id } = req.body;

    console.log('📝 Student self-enrolling:', { 
      studentId: student._id, 
      courseId: course_id 
    });

    if (!course_id) {
      return res.status(400).json({
        success: false,
        error: 'Course ID is required'
      });
    }

    // Check if course exists
    const course = await Course.findById(course_id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ 
      student_id: student._id, 
      course_id: course_id 
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        error: 'Already enrolled in this course'
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student_id: student._id,
      course_id: course_id,
      enrollment_date: new Date(),
      status: 'enrolled'
    });

    console.log('✅ Student self-enrolled successfully:', enrollment._id);

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment
    });

  } catch (error) {
    console.error('❌ Self-enroll error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error during enrollment'
    });
  }
};

// @desc    Get my stats
// @route   GET /api/students/me/stats
// @access  Private (Student)
exports.getMyStats = async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.user.id });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student record not found'
      });
    }

    const stats = await Student.getStats(student._id);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get my stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// ========== ADMIN ROUTES ==========

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin/Lecturer)
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.enrollment_year) filters.enrollment_year = parseInt(req.query.enrollment_year);
    if (req.query.search) filters.search = req.query.search;

    const { students, total } = await Student.findAllStudents(limit, offset, filters);

    res.json({
      success: true,
      count: students.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const updatedStudent = await Student.updateStudent(req.params.id, req.body);

    if (!updatedStudent) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
exports.deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const student = await Student.findById(req.params.id).session(session);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const userId = student.user_id;

    // Delete student
    await Student.deleteStudent(req.params.id);

    // Also delete user account
    if (userId) {
      await User.findByIdAndDelete(userId).session(session);
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  } finally {
    session.endSession();
  }
};

// @desc    Search students
// @route   GET /api/students/search
// @access  Private (Admin/Lecturer)
exports.searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters'
      });
    }

    const students = await Student.searchStudents(query);

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Search students error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student's courses (admin view)
// @route   GET /api/students/:id/courses
// @access  Private (Admin/Lecturer)
exports.getStudentCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const courses = await Student.getCourses(req.params.id);

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Get student courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student's assignments (admin view)
// @route   GET /api/students/:id/assignments
// @access  Private (Admin/Lecturer)
exports.getStudentAssignments = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const assignments = await Student.getAssignments(req.params.id);

    res.json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error('Get student assignments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get student statistics (admin view)
// @route   GET /api/students/:id/stats
// @access  Private (Admin/Lecturer)
exports.getStudentStats = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const stats = await Student.getStats(req.params.id);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Enroll student in course
// @route   POST /api/students/:id/enroll
// @access  Private (Admin/Lecturer)
exports.enrollInCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { course_id } = req.body;

    console.log('📝 Enrolling student:', { studentId: id, courseId: course_id });

    if (!course_id) {
      return res.status(400).json({
        success: false,
        error: 'Course ID is required'
      });
    }

    // Check if student exists
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Check if course exists
    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Enroll student
    const enrollment = await Student.enrollInCourse(id, course_id);

    console.log('✅ Student enrolled successfully, enrollment ID:', enrollment._id);

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment_id: enrollment._id
    });

  } catch (error) {
    console.error('❌ Enroll student error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error during enrollment'
    });
  }
};