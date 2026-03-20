const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/', applicationController.createApplication);
router.get('/check/:application_number', applicationController.checkApplicationStatus);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', applicationController.getApplications);
router.get('/search', applicationController.searchApplications);
router.get('/stats', applicationController.getApplicationStats);
router.get('/trends', applicationController.getApplicationTrends);
router.get('/:id', applicationController.getApplication);
router.patch('/:id/status', applicationController.updateApplicationStatus);
router.put('/:id/status', applicationController.updateApplicationStatus);

// Get application by student ID
router.get('/student/:studentId', applicationController.getApplicationByStudentId);

module.exports = router;