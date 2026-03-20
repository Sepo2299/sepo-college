const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check if user is active
      if (!user.is_active) {
        return res.status(401).json({
          success: false,
          error: 'User account is deactivated'
        });
      }

      // Attach user to request object
      req.user = {
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
      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          error: 'Token has expired. Please login again.'
        });
      }
      
      return res.status(401).json({
        success: false,
        error: 'Not authorized, invalid token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token provided'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};

const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (user) {
        req.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          phone: user.phone
        };
      }
    } catch (error) {
      // Token is invalid, but that's OK for optional auth
      console.log('Optional auth - invalid token:', error.message);
    }
  }

  next();
};

// Special middleware for student access
const studentAuth = async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        error: 'Only students can access this route'
      });
    }
    next();
  });
};

// Special middleware for lecturer access
const lecturerAuth = async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user.role !== 'lecturer') {
      return res.status(403).json({
        success: false,
        error: 'Only lecturers can access this route'
      });
    }
    next();
  });
};

// Special middleware for admin access
const adminAuth = async (req, res, next) => {
  await protect(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Only administrators can access this route'
      });
    }
    next();
  });
};

module.exports = { 
  protect, 
  authorize, 
  optionalAuth, 
  studentAuth, 
  lecturerAuth, 
  adminAuth 
};