const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', announcementController.getAnnouncements);
router.get('/recent', announcementController.getRecentAnnouncements);
router.get('/category/:category', announcementController.getAnnouncementsByCategory);
router.get('/search', announcementController.searchAnnouncements);
router.get('/:id', announcementController.getAnnouncement);

// Protected routes
router.use(protect);

// Admin/Lecturer only routes
router.post('/', 
  authorize('admin', 'lecturer'),
  uploadSingle('image'),
  announcementController.createAnnouncement
);

router.put('/:id', 
  authorize('admin', 'lecturer'),
  uploadSingle('image'),
  announcementController.updateAnnouncement
);

router.delete('/:id', 
  authorize('admin'),
  announcementController.deleteAnnouncement
);

router.get('/stats', 
  authorize('admin'),
  announcementController.getAnnouncementStats
);

module.exports = router; // MAKE SURE THIS EXISTS