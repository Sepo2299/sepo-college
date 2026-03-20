// middleware/studentMiddleware.js

const { Student, Application } = require('../models');

// Check if student is approved before allowing registration
const checkStudentApproved = async (req, res, next) => {
  try {
    // Get user ID from auth middleware
    const userId = req.user.id;

    // Check if student exists and is approved
    const student = await Student.findOne({ user_id: userId });
    
    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Student record not found.'
      });
    }

    // Get the student's application status
    const application = await Application.findOne({ 
      student_id: student._id,
      status: 'accepted' 
    }).sort({ created_at: -1 });

    if (!application) {
      return res.status(403).json({
        success: false,
        error: 'Your application has not been approved yet. Please wait for admin approval before registering.'
      });
    }

    // Add student info to request
    req.student = {
      id: student._id,
      student_number: student.student_number,
      full_name: student.full_name,
      email: student.email,
      phone: student.phone,
      status: student.status,
      application_status: application.status,
      application_id: application._id
    };
    
    next();
  } catch (error) {
    console.error('Check student approval error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

module.exports = { checkStudentApproved };