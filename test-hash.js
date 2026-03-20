const bcrypt = require('bcryptjs');

async function generateNewHash() {
  const password = 'admin123';
  
  // Generate a brand new hash
  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(password, salt);
  
  console.log('Password:', password);
  console.log('New Hash:', newHash);
  
  // Verify it works
  const isValid = await bcrypt.compare(password, newHash);
  console.log('Verification:', isValid ? '✅ WORKS' : '❌ FAILED');
  
  // Test with your original hash for comparison
  const oldHash = '$2a$10$N9qo8uLOickgx2ZMRZoMye.MW/.aM6c8pJpBf6Q3Jz8LpQY7lB4vW';
  const oldValid = await bcrypt.compare(password, oldHash);
  console.log('\nOriginal hash test:', oldValid ? '✅ WORKS' : '❌ FAILED');
}

generateNewHash();