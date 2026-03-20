// utils/helpers.js

/**
 * Generate a unique student number
 * Format: SEPO{year}{4-digit random}
 */
const generateStudentNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SEPO${year}${random}`;
};

/**
 * Generate a random temporary password
 * @param {number} length - Length of password (default 8)
 */
const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

/**
 * Generate a unique application number
 * Format: APP{year}{month}{4-digit random}
 */
const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `APP${year}${month}${random}`;
};

module.exports = {
  generateStudentNumber,
  generateRandomPassword,
  generateApplicationNumber
};