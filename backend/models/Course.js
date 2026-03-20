const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  file_path: String,
  file_type: {
    type: String,
    enum: ['outline', 'unit', 'assignment', 'test', 'exam', 'textbook', 'video', 'other']
  },
  file_size: Number,
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  is_published: { type: Boolean, default: true },
  publish_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
  course_code: {
    type: String,
    required: true
  },
  course_name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    enum: ['science', 'computers', 'automotive', 'entertainment'],
    required: true
  },
  description: String,
  lecturer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  credits: {
    type: Number,
    default: 3,
    min: 1,
    max: 10
  },
  duration: {
    type: String,
    default: '1 semester'
  },
  prerequisites: String,
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  materials: [materialSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// ========== INDEXES ==========
courseSchema.index({ course_code: 1 }, { unique: true });
courseSchema.index({ school: 1 });
courseSchema.index({ lecturer_id: 1 });
courseSchema.index({ is_active: 1 });
courseSchema.index({ course_code: 'text', course_name: 'text', description: 'text' });

// ========== STATIC METHODS ==========
courseSchema.statics.createCourse = async function(courseData) {
  const course = await this.create(courseData);
  return await course.populate('lecturer_id', 'full_name email');
};

courseSchema.statics.findAllCourses = async function(limit = 100, offset = 0, filters = {}) {
  const query = { is_active: true };
  if (filters.school) query.school = filters.school;
  if (filters.lecturer_id) query.lecturer_id = filters.lecturer_id;
  if (filters.search) query.$text = { $search: filters.search };

  const courses = await this.find(query).populate('lecturer_id', 'full_name email').sort({ course_code: 1 }).skip(offset).limit(limit);
  const total = await this.countDocuments(query);
  return { courses, total };
};

courseSchema.statics.findByCode = async function(course_code) {
  return await this.findOne({ course_code }).populate('lecturer_id', 'full_name email');
};

courseSchema.statics.findBySchool = async function(school) {
  return await this.find({ school, is_active: true }).populate('lecturer_id', 'full_name email').sort({ course_code: 1 });
};

courseSchema.statics.findCourseById = async function(id) {
  return await this.findById(id).populate('lecturer_id', 'full_name email');
};

courseSchema.statics.updateCourse = async function(id, courseData) {
  const allowedUpdates = ['course_name', 'school', 'description', 'lecturer_id', 'credits', 'duration', 'prerequisites', 'is_active'];
  const updates = {};
  allowedUpdates.forEach(field => {
    if (courseData[field] !== undefined) updates[field] = courseData[field];
  });
  if (Object.keys(updates).length === 0) return false;
  return await this.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('lecturer_id', 'full_name email');
};

courseSchema.statics.deleteCourse = async function(id) {
  const result = await this.findByIdAndUpdate(id, { is_active: false }, { new: true });
  return result !== null;
};

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;