const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function testEmail() {
  try {
    await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_FROM}>`,
      to: 'your-test-email@gmail.com', // Change this to your email
      subject: 'Test Email',
      html: '<h1>Test</h1><p>If you receive this, email works!</p>'
    });
    console.log('✅ Test email sent');
  } catch (error) {
    console.error('❌ Email failed:', error);
  }
}

testEmail();