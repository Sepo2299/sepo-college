const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  file_path: String,
  submission_date: {
    type: Date,
    default: Date.now
  },
  marks: {
    type: Number,
    default: null
  },
  feedback: String,
  graded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  graded_at: Date,
  status: {
    type: String,
    enum: ['submitted', 'late', 'graded', 'missing'],
    default: 'submitted'
  }
});

const assignmentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  file_path: String,
  due_date: Date,
  total_marks: Number,
  is_published: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  submissions: [submissionSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

assignmentSchema.index({ course_id: 1 });
assignmentSchema.index({ due_date: 1 });
assignmentSchema.index({ is_published: 1 });

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;