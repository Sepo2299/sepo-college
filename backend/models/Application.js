const mongoose = require('mongoose');

// Helper function to generate application number
const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `APP${year}${month}${random}`;
};

const applicationSchema = new mongoose.Schema({
  application_number: {
    type: String,
    default: generateApplicationNumber
    // REMOVED: unique: true (moved to index below to avoid duplicate)
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  date_of_birth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  id_number: {
    type: String,
    trim: true,
    default: null
  },
  nationality: {
    type: String,
    default: 'Namibian'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null
  },
  is_quick_application: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  address: {
    type: String,
    default: null
  },
  emergency_contact: {
    type: String,
    default: null
  },
  highest_qualification: {
    type: String,
    default: null
  },
  institution: {
    type: String,
    default: null
  },
  year_completed: {
    type: Number,
    default: null
  },
  results: {
    type: String,
    default: null
  },
  intended_course: {
    type: String,
    required: [true, 'Intended course is required']
  },
  planned_year: {
    type: Number,
    required: [true, 'Planned year is required']
  },
  study_mode: {
    type: String,
    enum: ['full-time', 'part-time', 'online'],
    default: 'full-time'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  documents_path: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: null
  },
  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  reviewed_at: {
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
// Unique index (only here, NOT in schema)
applicationSchema.index({ application_number: 1 }, { unique: true });
// Regular indexes
applicationSchema.index({ status: 1 });
applicationSchema.index({ intended_course: 1 });
applicationSchema.index({ planned_year: 1 });
applicationSchema.index({ email: 1 });
applicationSchema.index({ created_at: -1 });
applicationSchema.index({ full_name: 'text', email: 'text', application_number: 'text' });

// ========== STATIC METHODS ==========

// Static method: Create new application
applicationSchema.statics.createApplication = async function(applicationData) {
  const safeValue = (val) => {
    if (val === undefined || val === '') return null;
    return val;
  };

  const application = await this.create({
    full_name: applicationData.full_name,
    date_of_birth: applicationData.date_of_birth,
    id_number: safeValue(applicationData.id_number),
    nationality: applicationData.nationality || 'Namibian',
    gender: safeValue(applicationData.gender),
    phone: applicationData.phone,
    email: applicationData.email,
    address: safeValue(applicationData.address),
    emergency_contact: safeValue(applicationData.emergency_contact),
    highest_qualification: safeValue(applicationData.highest_qualification),
    institution: safeValue(applicationData.institution),
    year_completed: safeValue(applicationData.year_completed),
    results: safeValue(applicationData.results),
    intended_course: applicationData.intended_course,
    planned_year: applicationData.planned_year,
    study_mode: applicationData.study_mode || 'full-time',
    documents_path: safeValue(applicationData.documents_path),
    status: 'pending'
  });
  
  return application;
};

// Static method: Find all with filters
applicationSchema.statics.findAllApplications = async function(limit = 50, offset = 0, filters = {}) {
  const query = {};
  
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.intended_course) {
    query.intended_course = filters.intended_course;
  }
  
  if (filters.planned_year) {
    query.planned_year = filters.planned_year;
  }
  
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  const applications = await this.find(query)
    .populate('student_id', 'student_number full_name email')
    .populate('reviewed_by', 'full_name email')
    .sort({ created_at: -1 })
    .skip(offset)
    .limit(limit);
    
  const total = await this.countDocuments(query);
  
  return { applications, total };
};

// Static method: Find by application number
applicationSchema.statics.findByApplicationNumber = async function(application_number) {
  return await this.findOne({ application_number })
    .populate('student_id', 'student_number full_name email')
    .populate('reviewed_by', 'full_name email');
};

// Static method: Find by ID
applicationSchema.statics.findApplicationById = async function(id) {
  return await this.findById(id)
    .populate('student_id', 'student_number full_name email')
    .populate('reviewed_by', 'full_name email');
};

// Static method: Update application
applicationSchema.statics.updateApplication = async function(id, applicationData) {
  const allowedUpdates = [
    'full_name', 'date_of_birth', 'id_number', 'nationality', 'gender',
    'phone', 'email', 'address', 'emergency_contact', 'highest_qualification',
    'institution', 'year_completed', 'results', 'intended_course',
    'planned_year', 'study_mode', 'documents_path', 'notes'
  ];
  
  const updates = {};
  allowedUpdates.forEach(field => {
    if (applicationData[field] !== undefined) {
      updates[field] = applicationData[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return false;
  }

  const application = await this.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  ).populate('student_id', 'student_number full_name email')
   .populate('reviewed_by', 'full_name email');
  
  return application;
};

// Static method: Update status
applicationSchema.statics.updateStatus = async function(id, status, student_id = null, reviewed_by = null, notes = null) {
  const updateData = { status };
  
  if (student_id) {
    updateData.student_id = student_id;
  }
  
  if (reviewed_by) {
    updateData.reviewed_by = reviewed_by;
    updateData.reviewed_at = new Date();
  }
  
  if (notes) {
    updateData.notes = notes;
  }

  return await this.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate('student_id', 'student_number full_name email')
   .populate('reviewed_by', 'full_name email');
};

// Static method: Delete application
applicationSchema.statics.deleteApplication = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

// Static method: Get statistics
applicationSchema.statics.getStats = async function(timeframe = 'month') {
  let dateFilter;
  const now = new Date();
  
  switch (timeframe) {
    case 'day':
      dateFilter = new Date(now.setDate(now.getDate() - 1));
      break;
    case 'week':
      dateFilter = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'month':
      dateFilter = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'year':
      dateFilter = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      dateFilter = new Date(now.setMonth(now.getMonth() - 1));
  }

  const stats = await this.aggregate([
    {
      $match: {
        created_at: { $gte: dateFilter }
      }
    },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              total_applications: { $sum: 1 },
              pending: {
                $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
              },
              reviewed: {
                $sum: { $cond: [{ $eq: ['$status', 'reviewed'] }, 1, 0] }
              },
              accepted: {
                $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] }
              },
              rejected: {
                $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
              }
            }
          }
        ],
        daily_applications: [
          {
            $group: {
              _id: {
                year: { $year: '$created_at' },
                month: { $month: '$created_at' },
                day: { $dayOfMonth: '$created_at' }
              },
              date: { $first: '$created_at' },
              count: { $sum: 1 }
            }
          },
          { $sort: { date: -1 } },
          {
            $project: {
              _id: 0,
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$date' }
              },
              count: 1
            }
          }
        ],
        course_stats: [
          {
            $group: {
              _id: '$intended_course',
              applications: { $sum: 1 }
            }
          },
          { $sort: { applications: -1 } }
        ]
      }
    }
  ]);

  return {
    ...stats[0].totals[0],
    dailyStats: stats[0].daily_applications,
    courseStats: stats[0].course_stats
  };
};

// Static method: Get trends
applicationSchema.statics.getTrends = async function() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const trends = await this.aggregate([
    {
      $match: {
        created_at: { $gte: sixMonthsAgo }
      }
    },
    {
      $group: {
        _id: {
          month: { $dateToString: { format: '%Y-%m', date: '$created_at' } },
          intended_course: '$intended_course',
          status: '$status'
        },
        applications: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: {
          month: '$_id.month',
          intended_course: '$_id.intended_course'
        },
        statuses: {
          $push: {
            status: '$_id.status',
            count: '$applications'
          }
        },
        total: { $sum: '$applications' }
      }
    },
    { $sort: { '_id.month': -1, '_id.intended_course': 1 } }
  ]);

  return trends;
};

// Static method: Get by student
applicationSchema.statics.getByStudent = async function(student_id) {
  return await this.find({ student_id })
    .populate('reviewed_by', 'full_name email')
    .sort({ created_at: -1 });
};

// Static method: Search applications
applicationSchema.statics.searchApplications = async function(query, limit = 20) {
  return await this.find({
    $text: { $search: query }
  })
    .populate('student_id', 'student_number full_name email')
    .populate('reviewed_by', 'full_name email')
    .sort({ created_at: -1 })
    .limit(limit);
};

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;