const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('full_name').notEmpty().withMessage('Full name is required'),
  body('phone').notEmpty().withMessage('Phone number is required')
];

const loginValidation = [
  body('username').notEmpty().withMessage('Username/Student number/Email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/login', loginValidation, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// ✅ ADD THIS - Public student registration
router.post('/register', registerValidation, authController.register);

// Protected routes (user only)
router.get('/me', protect, authController.getMe);
router.put('/change-password', protect, authController.changePassword);

// Admin only routes (for creating lecturers/admins)
router.post('/admin/register', protect, authorize('admin'), registerValidation, authController.register);

module.exports = router;