const { User, Student } = require('../models');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// @desc    Login user (with student number OR email)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { username, password, userType, email } = req.body;
    
    // Handle both field names (username or email)
    const loginIdentifier = username || email;
    
    console.log('🔐 Login attempt:', { 
      loginIdentifier: loginIdentifier || 'not provided', 
      userType: userType || 'not specified' 
    });

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email/username and password'
      });
    }

    if (!userType) {
      return res.status(400).json({
        success: false,
        error: 'Please specify user type (student, lecturer, or admin)'
      });
    }

    let user;
    let studentData = null;

    // Handle different user types
    if (userType === 'student') {
      // Try to find student by student number first
      const student = await Student.findOne({ student_number: loginIdentifier });
      
      if (student) {
        // Found by student number, get user
        user = await User.findById(student.user_id).select('+password');
        if (user) {
          studentData = {
            student_id: student._id,
            student_number: student.student_number,
            enrollment_year: student.enrollment_year,
            status: student.status
          };
        }
      } else {
        // Try by email
        user = await User.findOne({ 
          email: loginIdentifier, 
          role: 'student' 
        }).select('+password');
        
        if (user) {
          // Get student data
          const student = await Student.findOne({ user_id: user._id });
          if (student) {
            studentData = {
              student_id: student._id,
              student_number: student.student_number,
              enrollment_year: student.enrollment_year,
              status: student.status
            };
          }
        }
      }
    } 
    else if (userType === 'lecturer') {
      user = await User.findOne({ 
        $or: [{ email: loginIdentifier }, { username: loginIdentifier }],
        role: 'lecturer'
      }).select('+password');
    } 
    else if (userType === 'admin') {
      console.log('🔍 Searching for admin with:', loginIdentifier);
      
      user = await User.findOne({ 
        $or: [{ email: loginIdentifier }, { username: loginIdentifier }],
        role: 'admin'
      }).select('+password');

      if (!user) {
        console.log('❌ Admin not found with identifier:', loginIdentifier);
        
        // Debug: Check if any admins exist
        const allAdmins = await User.find({ role: 'admin' }).select('username email');
        console.log('📋 Existing admins in database:', allAdmins);
        
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      console.log('✅ Admin found:', { id: user._id, email: user.email, role: user.role });
    } 
    else {
      return res.status(400).json({
        success: false,
        error: 'Invalid user type'
      });
    }

    if (!user) {
      console.log('❌ User not found with identifier:', loginIdentifier);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated. Please contact administrator.'
      });
    }

    // Verify password
    console.log('🔑 Verifying password for user:', user.email);
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log('❌ Password invalid for user:', user.email);
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    console.log('✅ Password valid for user:', user.email);

    // Generate token
    const token = user.generateToken();

    // Update last login
    await User.updateLastLogin(user._id);

    // Prepare response data
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      phone: user.phone,
      is_active: user.is_active,
      created_at: user.created_at,
      last_login: user.last_login
    };

    // Add student data if applicable
    if (userType === 'student' && studentData) {
      userResponse.student_number = studentData.student_number;
      userResponse.student_id = studentData.student_id;
    }

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse,
      student: studentData
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during authentication'
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    let user;

    if (req.user.role === 'student') {
      const student = await Student.findOne({ user_id: req.user.id });
      user = await User.findById(req.user.id).lean();
      
      if (student) {
        user.student_number = student.student_number;
        user.student_id = student._id;
        user.enrollment_year = student.enrollment_year;
        user.student_status = student.status;
      }
    } else {
      user = await User.findById(req.user.id).lean();
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Remove password from response
    delete user.password;

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide current and new password'
      });
    }

    // Get user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// backend/controllers/authController.js

// @desc    Register user (public - for students)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { username, email, password, full_name, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email or username'
      });
    }

    // Create user (default role is 'student')
    const user = await User.create({
      username,
      email,
      password, // Will be hashed by pre-save hook
      role: 'student', // ✅ Force role to student
      full_name,
      phone,
      is_active: true
    });

    // ✅ IMPORTANT: Also create a student record
    await Student.create({
      user_id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      student_number: `SEPO${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`,
      enrollment_year: new Date().getFullYear(),
      status: 'active'
    });

    // Generate token
    const token = user.generateToken();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate key error. User may already exist.'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token to user
    user.reset_token = resetToken;
    user.reset_token_expiry = resetTokenExpiry;
    await user.save();

    // Send email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request - Sepo College',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Password Reset Request</h2>
          <p>Dear ${user.full_name},</p>
          <p>You requested a password reset for your Sepo College account.</p>
          <p>Click the link below to reset your password:</p>
          <p>
            <a href="${resetUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 16px 0;
            ">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <br>
          <p>Best regards,<br>Sepo College Team</p>
        </div>
      `
    };

    // In development, log the reset link
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Password reset link:', resetUrl);
      console.log('📧 Reset token:', resetToken);
      
      return res.json({
        success: true,
        message: 'Password reset link generated (check console in development mode)',
        resetUrl: resetUrl // Only for development
      });
    }

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Password reset email sent. Please check your inbox.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      error: 'Error sending reset email'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Please provide token and new password'
      });
    }

    // Find user by reset token
    const user = await User.findOne({ 
      reset_token: token,
      reset_token_expiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = newPassword;
    user.reset_token = null;
    user.reset_token_expiry = null;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};