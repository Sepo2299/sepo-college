const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'lecturer', 'admin'],
    default: 'student'
  },
  full_name: String,
  department: String,
  phone: String,
  profile_image: String,
  is_active: {
    type: Boolean,
    default: true
  },
  last_login: Date,
  reset_token: String,
  reset_token_expiry: Date,
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
userSchema.index({ role: 1 });
userSchema.index({ is_active: 1 });

// ========== PRE-SAVE HOOK - ONLY PLACE WHERE HASHING HAPPENS ==========
userSchema.pre('save', async function() {
  // Only hash if password is modified AND it's not already hashed
  if (this.isModified('password') && !this.password.startsWith('$2a$')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// ========== INSTANCE METHODS ==========
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// ========== STATIC METHODS ==========
userSchema.statics.createUser = async function(userData) {
  const { username, email, password, role = 'student', full_name, department, phone } = userData;

  // Check if user already exists
  const existingUser = await this.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    if (existingUser.email === email) throw new Error('Email already exists');
    if (existingUser.username === username) throw new Error('Username already exists');
  }

  // DO NOT hash here! Let pre-save handle it
  const user = await this.create({ 
    username, 
    email, 
    password,  // ← Plain password, will be hashed by pre-save
    role, 
    full_name, 
    department, 
    phone 
  });
  
  return await this.findById(user._id).select('-password');
};

userSchema.statics.findByEmail = async function(email) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.findByUsername = async function(username) {
  return await this.findOne({ username });
};

userSchema.statics.findUserById = async function(id) {
  return await this.findById(id).select('-password');
};

userSchema.statics.updateUser = async function(id, userData) {
  const allowedUpdates = ['full_name', 'department', 'phone', 'profile_image', 'is_active'];
  const updates = {};
  allowedUpdates.forEach(field => {
    if (userData[field] !== undefined) updates[field] = userData[field];
  });
  if (Object.keys(updates).length === 0) return false;
  return await this.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');
};

userSchema.statics.updatePassword = async function(id, newPassword) {
  const user = await this.findById(id).select('+password');
  if (!user) return false;
  user.password = newPassword;  // ← Plain password, pre-save will hash it
  await user.save();
  return true;
};

userSchema.statics.deleteUser = async function(id) {
  const result = await this.findByIdAndDelete(id);
  return result !== null;
};

userSchema.statics.updateLastLogin = async function(id) {
  return await this.findByIdAndUpdate(id, { last_login: new Date() }, { new: true });
};

userSchema.statics.findAllUsers = async function(limit = 50, offset = 0, role = null) {
  const query = role ? { role } : {};
  const users = await this.find(query).select('-password').sort({ created_at: -1 }).skip(offset).limit(limit);
  const total = await this.countDocuments(query);
  return { users, total };
};

userSchema.statics.searchUsers = async function(query, limit = 20) {
  return await this.find({
    $or: [
      { full_name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } },
      { username: { $regex: query, $options: 'i' } }
    ]
  }).select('-password').limit(limit);
};

const User = mongoose.model('User', userSchema);
module.exports = User;