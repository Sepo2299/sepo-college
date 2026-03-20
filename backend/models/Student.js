const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_number: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  full_name: {
    type: String,
    required: true
  },
  date_of_birth: Date,
  id_number: String,
  nationality: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  phone: String,
  email: String,
  address: String,
  emergency_contact: String,
  enrollment_year: Number,
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'suspended'],
    default: 'active'
  },
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
studentSchema.index({ student_number: 1 }, { unique: true });
studentSchema.index({ user_id: 1 }, { unique: true, sparse: true });
studentSchema.index({ status: 1 });
studentSchema.index({ enrollment_year: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ full_name: 'text', student_number: 'text', email: 'text' });

// ========== STATIC METHODS ==========
studentSchema.statics.createStudent = async function(studentData) {
  const student = await this.create(studentData);
  return await student.populate('user_id', 'email username profile_image');
};

studentSchema.statics.findAllStudents = async function(limit = 50, offset = 0, filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.enrollment_year) query.enrollment_year = filters.enrollment_year;
  if (filters.search) query.$text = { $search: filters.search };

  const students = await this.find(query)
    .populate('user_id', 'email username profile_image')
    .sort({ created_at: -1 })
    .skip(offset)
    .limit(limit);
  const total = await this.countDocuments(query);
  return { students, total };
};

studentSchema.statics.findByStudentNumber = async function(student_number) {
  return await this.findOne({ student_number }).populate('user_id', 'email username profile_image');
};

studentSchema.statics.findByUserId = async function(user_id) {
  return await this.findOne({ user_id }).populate('user_id', 'email username profile_image');
};

studentSchema.statics.findStudentById = async function(id) {
  return await this.findById(id).populate('user_id', 'email username profile_image');
};

studentSchema.statics.updateStudent = async function(id, studentData) {
  const allowedUpdates = ['full_name', 'date_of_birth', 'id_number', 'nationality', 'gender', 'phone', 'email', 'address', 'emergency_contact', 'status'];
  const updates = {};
  allowedUpdates.forEach(field => {
    if (studentData[field] !== undefined) updates[field] = studentData[field];
  });
  if (Object.keys(updates).length === 0) return false;
  return await this.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('user_id', 'email username profile_image');
};

studentSchema.statics.deleteStudent = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;