const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User, Student, Application } = require('../models');

// Helper functions
const generateStudentNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SEPO${year}${random}`;
};

const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: { rejectUnauthorized: false }
});

// ==================== CREATE APPLICATION (UNIFIED) ====================
exports.createApplication = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log('🔍 =========== APPLICATION SUBMISSION START ===========');
    console.log('📥 Request body:', JSON.stringify(req.body, null, 2));

    const {
      full_name,
      date_of_birth,
      id_number,
      nationality = 'Namibian',
      gender,
      phone,
      email,
      address,
      emergency_contact,
      highest_qualification,
      institution,
      year_completed,
      results,
      intended_course,
      planned_year,
      study_mode = 'full-time'
    } = req.body;

    // --- Required fields validation ---
    if (!full_name || !date_of_birth || !phone || !email || !intended_course) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Full Name, Date of Birth, Phone, Email, and Course are required'
      });
    }

    // Phone number validation
    const phoneRegex = /^(\+?264|0)?\d{9}$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format. Use Namibia format: 0812345678 or +264812345678'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format'
      });
    }

    console.log('✅ Validation passed');

    // --- Check for existing user ---
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      console.log('❌ Email already registered:', email);
      return res.status(409).json({
        success: false,
        error: 'Email already registered. Please login or use a different email.'
      });
    }
    console.log('✅ Email not registered');

    // --- Check for pending application ---
    const existingApp = await Application.findOne({ 
      email, 
      status: 'pending' 
    }).session(session);
    
    if (existingApp) {
      console.log('❌ Pending application exists for:', email);
      return res.status(400).json({
        success: false,
        error: 'You already have a pending application. Please wait for it to be processed.'
      });
    }
    console.log('✅ No pending application');

    // --- Generate credentials ---
    const student_number = generateStudentNumber();
    const password = generateRandomPassword();
    const username = `student_${student_number.toLowerCase()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('🔑 Generated credentials:', { 
      student_number, 
      username,
      password: '[HIDDEN]' 
    });

    // --- 1. Create user ---
    console.log('👤 Creating user...');
    const user = await User.create([{
      username,
      email,
      password: hashedPassword,
      role: 'student',
      full_name,
      phone: cleanPhone,
      is_active: true
    }], { session });

    console.log('✅ User created with ID:', user[0]._id);

    // --- 2. Create student ---
    console.log('👨‍🎓 Creating student...');
    const student = await Student.create([{
      user_id: user[0]._id,
      student_number,
      full_name,
      date_of_birth: new Date(date_of_birth),
      id_number: id_number || null,
      nationality,
      gender: gender || null,
      phone: cleanPhone,
      email,
      address: address || null,
      emergency_contact: emergency_contact || null,
      enrollment_year: planned_year,
      status: 'active'
    }], { session });

    console.log('✅ Student created with ID:', student[0]._id);

    // --- 3. Create application ---
    console.log('📝 Creating application...');
    const application = await Application.create([{
      student_id: student[0]._id,
      full_name,
      date_of_birth: new Date(date_of_birth),
      id_number: id_number || null,
      nationality,
      gender: gender || null,
      phone: cleanPhone,
      email,
      address: address || null,
      emergency_contact: emergency_contact || null,
      highest_qualification: highest_qualification || null,
      institution: institution || null,
      year_completed: year_completed || null,
      results: results || null,
      intended_course,
      planned_year,
      study_mode,
      is_quick_application: false,
      status: 'pending'
    }], { session });

    const applicationId = application[0]._id;
    console.log('✅ Application created with ID:', applicationId);

    // --- Commit transaction ---
    await session.commitTransaction();
    console.log('✅ Transaction committed successfully');

    // --- Send welcome email with credentials ---
    try {
      console.log('📧 Attempting to send email to:', email);
      
      const mailOptions = {
        from: `"Sepo College" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Your Sepo College Application & Login Credentials',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to Sepo College!</h2>
            <p>Dear ${full_name},</p>
            <p>Your application has been received. Below are your login credentials:</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Student Number:</strong> ${student_number}</p>
              <p><strong>Temporary Password:</strong> ${password}</p>
              <p><strong>Application Number:</strong> ${application[0].application_number}</p>
            </div>
            
            <p>You can login at: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/elearning</p>
            
            <p><strong>Important:</strong> Change your password after first login.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully');
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
    }

    // --- Return success response ---
    console.log('✅ Sending success response');
    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Check your email for login credentials.',
      student_number,
      password,
      application_number: application[0].application_number,
      full_name,
      email,
      intended_course,
      status: 'pending'
    });

  } catch (error) {
    console.error('❌ ERROR IN CREATE APPLICATION:');
    console.error('   Error name:', error.name);
    console.error('   Error message:', error.message);
    console.error('   Error stack:', error.stack);
    
    // Rollback transaction
    await session.abortTransaction();
    console.log('🔄 Transaction rolled back');
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: `Duplicate entry: ${field} already exists.`
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Server error while processing application',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
    
  } finally {
    session.endSession();
    console.log('=========== APPLICATION SUBMISSION END ===========\n');
  }
};

// ==================== GET ALL APPLICATIONS ====================
exports.getApplications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.intended_course) filters.intended_course = req.query.intended_course;
    if (req.query.planned_year) filters.planned_year = parseInt(req.query.planned_year);
    if (req.query.search) filters.search = req.query.search;

    const { applications, total } = await Application.findAllApplications(limit, offset, filters);

    res.json({
      success: true,
      count: applications.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: applications
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== GET SINGLE APPLICATION ====================
exports.getApplication = async (req, res) => {
  try {
    let application;

    if (req.user && req.user.role === 'admin') {
      // Admin can get by ID
      application = await Application.findApplicationById(req.params.id);
    } else {
      // Public access needs application number
      application = await Application.findByApplicationNumber(req.params.id);
    }

    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== CHECK APPLICATION STATUS (PUBLIC) ====================
exports.checkApplicationStatus = async (req, res) => {
  try {
    const { application_number } = req.params;

    const application = await Application.findOne({ application_number })
      .select('application_number status full_name intended_course created_at reviewed_at');

    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Check application status error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== UPDATE APPLICATION STATUS ====================
exports.updateApplicationStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be "accepted" or "rejected"'
      });
    }

    // Get application with student info
    const application = await Application.findById(id)
      .populate('student_id')
      .session(session);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }

    // Update application status
    const updated = await Application.updateStatus(
      id, 
      status, 
      null, 
      req.user.id, 
      notes
    );

    // If accepted, update student status to 'active'
    if (status === 'accepted' && application.student_id) {
      await Student.findByIdAndUpdate(
        application.student_id._id,
        { status: 'active' },
        { session }
      );

      // Send approval email
      try {
        const mailOptions = {
          from: `"Sepo College" <${process.env.EMAIL_FROM}>`,
          to: application.email,
          subject: '✅ Your Application has been Approved!',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h1 { color: white; margin: 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .btn { display: inline-block; background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Application Approved!</h1>
              </div>
              <div class="content">
                <h2>Dear ${application.full_name},</h2>
                <p>Congratulations! Your application to Sepo College has been <strong>approved</strong>.</p>
                <p>You can now proceed with course registration in the Student Kiosk.</p>
                <p><strong>Your Student Number:</strong> ${application.student_id?.student_number}</p>
                ${notes ? `<p><strong>Admin Notes:</strong> ${notes}</p>` : ''}
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/kiosk?tab=registration" class="btn">
                  Go to Course Registration
                </a>
                <p style="margin-top: 30px;">Best regards,<br>Sepo College Admissions</p>
              </div>
            </body>
            </html>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log('✅ Approval email sent to:', application.email);
      } catch (emailError) {
        console.error('❌ Approval email failed:', emailError);
      }
    } else if (status === 'rejected') {
      // Send rejection email
      try {
        const mailOptions = {
          from: `"Sepo College" <${process.env.EMAIL_FROM}>`,
          to: application.email,
          subject: '📋 Application Status Update',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .header h1 { color: white; margin: 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Application Update</h1>
              </div>
              <div class="content">
                <h2>Dear ${application.full_name},</h2>
                <p>We regret to inform you that your application has been <strong>rejected</strong>.</p>
                ${notes ? `<p><strong>Reason:</strong> ${notes}</p>` : ''}
                <p>For more information, please contact the admissions office at <a href="mailto:admissions@sepocollege.com.na">admissions@sepocollege.com.na</a></p>
                <p style="margin-top: 30px;">Best regards,<br>Sepo College Admissions</p>
              </div>
            </body>
            </html>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log('✅ Rejection email sent to:', application.email);
      } catch (emailError) {
        console.error('❌ Rejection email failed:', emailError);
      }
    }

    await session.commitTransaction();

    res.json({
      success: true,
      message: `Application ${status} successfully`
    });

  } catch (error) {
    console.error('Update status error:', error);
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  } finally {
    session.endSession();
  }
};

// ==================== GET APPLICATION STATISTICS (ADMIN) ====================
exports.getApplicationStats = async (req, res) => {
  try {
    const { timeframe } = req.query;
    const stats = await Application.getStats(timeframe);

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Get application stats error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== GET APPLICATION TRENDS (ADMIN) ====================
exports.getApplicationTrends = async (req, res) => {
  try {
    const trends = await Application.getTrends();

    res.json({ success: true, data: trends });
  } catch (error) {
    console.error('Get application trends error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== SEARCH APPLICATIONS (ADMIN) ====================
exports.searchApplications = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Search query must be at least 2 characters'
      });
    }

    const applications = await Application.searchApplications(query);

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error('Search applications error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// ==================== GET APPLICATION BY STUDENT ID ====================
exports.getApplicationByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const applications = await Application.find({ student_id: studentId })
      .sort({ created_at: -1 })
      .limit(1);

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No application found'
      });
    }

    res.json({
      success: true,
      application: applications[0]
    });
  } catch (error) {
    console.error('Get application by student error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};