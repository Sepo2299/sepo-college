const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['general', 'academic', 'registration', 'event', 'alert'],
    default: 'general'
  },
  image_path: String,
  is_published: {
    type: Boolean,
    default: true
  },
  published_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publish_date: {
    type: Date,
    default: Date.now
  },
  expiry_date: Date,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// ========== INDEXES ==========
announcementSchema.index({ category: 1 });
announcementSchema.index({ is_published: 1 });
announcementSchema.index({ publish_date: -1 });
announcementSchema.index({ expiry_date: 1 });
announcementSchema.index({ title: 'text', content: 'text' });

// ========== STATIC METHODS ==========
announcementSchema.statics.createAnnouncement = async function(announcementData) {
  const announcement = await this.create({
    title: announcementData.title,
    content: announcementData.content,
    category: announcementData.category || 'general',
    image_path: announcementData.image_path || null,
    published_by: announcementData.published_by,
    publish_date: announcementData.publish_date || new Date(),
    expiry_date: announcementData.expiry_date || null
  });
  return await announcement.populate('published_by', 'full_name email');
};

announcementSchema.statics.findAllAnnouncements = async function(limit = 20, offset = 0, filters = {}) {
  const query = {
    is_published: true,
    $or: [{ expiry_date: null }, { expiry_date: { $gte: new Date() } }]
  };
  if (filters.category) query.category = filters.category;
  if (filters.search) query.$text = { $search: filters.search };

  const announcements = await this.find(query).populate('published_by', 'full_name email').sort({ publish_date: -1 }).skip(offset).limit(limit);
  const total = await this.countDocuments(query);
  return { announcements, total };
};

announcementSchema.statics.findAnnouncementById = async function(id) {
  return await this.findById(id).populate('published_by', 'full_name email');
};

announcementSchema.statics.updateAnnouncement = async function(id, announcementData) {
  const allowedUpdates = ['title', 'content', 'category', 'image_path', 'is_published', 'publish_date', 'expiry_date'];
  const updates = {};
  allowedUpdates.forEach(field => {
    if (announcementData[field] !== undefined) updates[field] = announcementData[field];
  });
  if (Object.keys(updates).length === 0) return false;
  return await this.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('published_by', 'full_name email');
};

announcementSchema.statics.deleteAnnouncement = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

announcementSchema.statics.getRecent = async function(limit = 5) {
  return await this.find({
    is_published: true,
    $or: [{ expiry_date: null }, { expiry_date: { $gte: new Date() } }]
  }).populate('published_by', 'full_name email').sort({ publish_date: -1 }).limit(limit);
};

announcementSchema.statics.getByCategory = async function(category, limit = 10) {
  return await this.find({
    category,
    is_published: true,
    $or: [{ expiry_date: null }, { expiry_date: { $gte: new Date() } }]
  }).populate('published_by', 'full_name email').sort({ publish_date: -1 }).limit(limit);
};

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;