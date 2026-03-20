// test-password.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const testPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get the user
    const User = require('./models/User');
    const user = await User.findOne({ email: 'slibangosi@gmail.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found');
      process.exit();
    }
    
    console.log('User found:', user.email);
    console.log('Stored password hash:', user.password);
    console.log('Stored password length:', user.password?.length);
    
    // Test the password you're trying to use
    const testPassword = 'your-password-here'; // Replace with actual password
    const isValid = await bcrypt.compare(testPassword, user.password);
    console.log('Password match test:', isValid);
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit();
  }
};

testPassword();