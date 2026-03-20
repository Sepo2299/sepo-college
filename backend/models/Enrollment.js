const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrollment_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['enrolled', 'completed', 'dropped', 'failed'],
    default: 'enrolled'
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', null],
    default: null
  },
  completed_date: {
    type: Date,
    default: null
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
enrollmentSchema.index({ student_id: 1, course_id: 1 }, { unique: true });
enrollmentSchema.index({ student_id: 1 });
enrollmentSchema.index({ course_id: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ enrollment_date: -1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;