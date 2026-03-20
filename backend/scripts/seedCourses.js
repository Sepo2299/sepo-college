// backend/scripts/seedCourses.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the correct path
dotenv.config({ path: '../.env' });

// If that doesn't work, try absolute path
// dotenv.config({ path: require('path').join(__dirname, '../.env') });

console.log('🔍 Checking environment variables...');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables!');
  console.error('Please make sure your .env file exists and has MONGODB_URI set.');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Course = require('../models/Course');
  
  // First, clear existing courses (optional - comment out if you want to keep existing)
  // await Course.deleteMany({});
  // console.log('🗑️  Cleared existing courses\n');
  
  // ========== SCIENCE SCHOOL COURSES ==========
  const scienceCourses = [
    {
      course_code: 'SCI101',
      course_name: 'Biology Fundamentals',
      school: 'science',
      description: 'Introduction to biological concepts, cell structure, and basic life processes',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Grade 12 Biology (minimum 60%)',
      highlights: ['Lab Work', 'Field Trips', 'Research Project']
    },
    {
      course_code: 'SCI102',
      course_name: 'Chemistry & Laboratory Techniques',
      school: 'science',
      description: 'Fundamental principles of chemistry with hands-on laboratory experience',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Chemistry and Mathematics',
      highlights: ['Analytical Chemistry', 'Organic Synthesis', 'Instrumentation']
    },
    {
      course_code: 'SCI103',
      course_name: 'Physics Principles',
      school: 'science',
      description: 'Core concepts in mechanics, energy, and motion',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Grade 12 Physics and Mathematics',
      highlights: ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism']
    },
    {
      course_code: 'SCI104',
      course_name: 'Environmental Science',
      school: 'science',
      description: 'Study of ecosystems, environmental challenges, and conservation',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Science and Geography',
      highlights: ['Ecology', 'Climate Change', 'Sustainability']
    },
    {
      course_code: 'SCI201',
      course_name: 'Science Laboratory Technology',
      school: 'science',
      description: 'Advanced laboratory techniques and research methodologies',
      credits: 6,
      duration: '3 Years',
      level: 'Advanced Diploma',
      prerequisites: 'Certificate or Diploma in Science',
      highlights: ['Microbiology', 'Analytical Methods', 'Quality Control']
    },
    {
      course_code: 'SCI301',
      course_name: 'Astrophysics & Space Science',
      school: 'science',
      description: 'Study of celestial phenomena and space exploration',
      credits: 6,
      duration: '3 Years',
      level: 'Degree',
      prerequisites: 'Diploma in Physics or Mathematics',
      highlights: ['Observational Astronomy', 'Cosmology', 'Space Technology']
    },
    {
      course_code: 'SCI302',
      course_name: 'Neuroscience & Cognitive Science',
      school: 'science',
      description: 'Exploration of brain function and cognitive processes',
      credits: 6,
      duration: '3 Years',
      level: 'Degree',
      prerequisites: 'Diploma in Biology or Psychology',
      highlights: ['Brain Imaging', 'Cognitive Psychology', 'Neurological Disorders']
    },
    {
      course_code: 'SCI303',
      course_name: 'Biotechnology & Genetic Engineering',
      school: 'science',
      description: 'Application of biological systems in technology',
      credits: 8,
      duration: '4 Years',
      level: 'Degree',
      prerequisites: 'Diploma in Biology or Chemistry',
      highlights: ['CRISPR Technology', 'Protein Engineering', 'Bioinformatics']
    }
  ];
  
  // ========== COMPUTERS SCHOOL COURSES ==========
  const computersCourses = [
    {
      course_code: 'CSC101',
      course_name: 'Introduction to ICT',
      school: 'computers',
      description: 'Fundamentals of information technology, hardware, software, and basic networking concepts',
      credits: 2,
      duration: '6 Months',
      level: 'Certificate',
      prerequisites: 'Basic computer literacy',
      highlights: ['Hardware Basics', 'Operating Systems', 'Office Applications']
    },
    {
      course_code: 'CSC201',
      course_name: 'Software Development',
      school: 'computers',
      description: 'Comprehensive programming skills including OOP, data structures, and algorithm design',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Mathematics, Basic programming knowledge',
      highlights: ['Java/Python', 'Web Development', 'Database Integration']
    },
    {
      course_code: 'CSC202',
      course_name: 'Network Administration',
      school: 'computers',
      description: 'Design, implement, and manage computer networks and infrastructure',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Mathematics, Basic networking knowledge',
      highlights: ['Cisco CCNA', 'Network Security', 'TCP/IP']
    },
    {
      course_code: 'CSC203',
      course_name: 'Database Management',
      school: 'computers',
      description: 'Design and manage relational databases, SQL, and data modeling',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Basic computer literacy',
      highlights: ['SQL', 'Oracle', 'MongoDB']
    },
    {
      course_code: 'CSC301',
      course_name: 'Web & Mobile Development',
      school: 'computers',
      description: 'Build responsive web applications and native mobile apps for iOS and Android',
      credits: 6,
      duration: '3 Years',
      level: 'Advanced Diploma',
      prerequisites: 'Diploma in Software Development or equivalent',
      highlights: ['React/Flutter', 'REST APIs', 'Cloud Integration']
    },
    {
      course_code: 'CSC204',
      course_name: 'Cybersecurity Fundamentals',
      school: 'computers',
      description: 'Learn to protect systems, networks, and data from cyber threats',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Basic networking knowledge',
      highlights: ['Ethical Hacking', 'Cryptography', 'Security Audits']
    },
    {
      course_code: 'CSC205',
      course_name: 'Cloud Computing',
      school: 'computers',
      description: 'Deploy and manage applications on major cloud platforms',
      credits: 2,
      duration: '6 Months',
      level: 'Certificate',
      prerequisites: 'Basic programming and networking knowledge',
      highlights: ['AWS/Azure', 'DevOps', 'Containerization']
    },
    {
      course_code: 'CSC306',
      course_name: 'Data Science & Analytics',
      school: 'computers',
      description: 'Analyze complex data sets and derive actionable insights',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Diploma in Software Development or Mathematics',
      highlights: ['Python/R', 'Machine Learning', 'Data Visualization']
    }
  ];
  
  // ========== AUTOMOTIVE SCHOOL COURSES ==========
  const automotiveCourses = [
    {
      course_code: 'AUT101',
      course_name: 'Basic Driving Skills',
      school: 'automotive',
      description: 'Master fundamental driving techniques and road safety practices',
      credits: 2,
      duration: '3 Months',
      level: 'Certificate',
      prerequisites: 'Valid Learner\'s License, Age 18+',
      highlights: ['Defensive Driving', 'Road Rules', 'Vehicle Control']
    },
    {
      course_code: 'AUT102',
      course_name: 'Vehicle Maintenance',
      school: 'automotive',
      description: 'Learn essential vehicle maintenance and repair procedures',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Basic mechanical interest',
      highlights: ['Oil Changes', 'Brake Service', 'Tire Rotation']
    },
    {
      course_code: 'AUT201',
      course_name: 'Automotive Engineering',
      school: 'automotive',
      description: 'Comprehensive study of vehicle systems and engineering principles',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Certificate in Vehicle Maintenance or equivalent',
      highlights: ['Engine Mechanics', 'Transmission', 'Electrical Systems']
    },
    {
      course_code: 'AUT103',
      course_name: 'Advanced Driving Techniques',
      school: 'automotive',
      description: 'Professional driving skills for challenging conditions',
      credits: 2,
      duration: '6 Months',
      level: 'Certificate',
      prerequisites: 'Valid Driver\'s License, Basic Driving Certificate',
      highlights: ['Skid Control', 'Night Driving', 'Off-road Techniques']
    },
    {
      course_code: 'AUT202',
      course_name: 'Transport Management',
      school: 'automotive',
      description: 'Manage fleet operations and transport logistics',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Diploma in Business or relevant experience',
      highlights: ['Fleet Management', 'Logistics', 'Route Planning']
    },
    {
      course_code: 'AUT104',
      course_name: 'Heavy Vehicle Operation',
      school: 'automotive',
      description: 'Specialized training for trucks and heavy vehicles',
      credits: 2,
      duration: '6 Months',
      level: 'Certificate',
      prerequisites: 'Valid Code B License, Medical Fitness',
      highlights: ['Code C License', 'Vehicle Inspection', 'Cargo Safety']
    },
    {
      course_code: 'AUT105',
      course_name: 'Automotive Electronics',
      school: 'automotive',
      description: 'Diagnose and repair modern vehicle electronic systems',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Basic electrical knowledge',
      highlights: ['ECU Diagnostics', 'Sensors', 'Wiring Systems']
    },
    {
      course_code: 'AUT106',
      course_name: 'Electric Vehicle Technology',
      school: 'automotive',
      description: 'Specialized training for electric and hybrid vehicle maintenance',
      credits: 3,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Automotive Electronics Certificate or equivalent',
      highlights: ['High-Voltage Safety', 'Battery Systems', 'Electric Motors']
    }
  ];
  
  // ========== ENTERTAINMENT SCHOOL COURSES ==========
  const entertainmentCourses = [
    {
      course_code: 'ENT101',
      course_name: 'Media Production',
      school: 'entertainment',
      description: 'Introduction to media production techniques and equipment',
      credits: 2,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Grade 12 Certificate, Basic computer literacy',
      highlights: ['Studio Production', 'Field Recording', 'Post-Production']
    },
    {
      course_code: 'ENT102',
      course_name: 'Graphic Design',
      school: 'entertainment',
      description: 'Master visual communication and digital design principles',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Certificate, Creative portfolio',
      highlights: ['Branding Projects', 'Digital Illustration', 'Portfolio Development']
    },
    {
      course_code: 'ENT103',
      course_name: 'Performing Arts',
      school: 'entertainment',
      description: 'Develop your craft in acting, voice, and stage performance',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Certificate, Audition required',
      highlights: ['Live Performances', 'Scene Study', 'Character Development']
    },
    {
      course_code: 'ENT104',
      course_name: 'Digital Marketing',
      school: 'entertainment',
      description: 'Master social media, content marketing, and digital strategy',
      credits: 2,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Grade 12 Certificate, Basic computer literacy',
      highlights: ['Campaign Management', 'Analytics', 'Content Strategy']
    },
    {
      course_code: 'ENT201',
      course_name: 'Entertainment Management',
      school: 'entertainment',
      description: 'Lead and manage creative projects and entertainment ventures',
      credits: 6,
      duration: '3 Years',
      level: 'Advanced Diploma',
      prerequisites: 'Diploma in related field or industry experience',
      highlights: ['Event Planning', 'Artist Relations', 'Production Management']
    },
    {
      course_code: 'ENT202',
      course_name: 'Music Production',
      school: 'entertainment',
      description: 'Create and produce music in professional studio environments',
      credits: 2,
      duration: '1 Year',
      level: 'Certificate',
      prerequisites: 'Grade 12 Certificate, Musical aptitude',
      highlights: ['Studio Recording', 'Mixing & Mastering', 'Electronic Production']
    },
    {
      course_code: 'ENT203',
      course_name: 'Film & TV Production',
      school: 'entertainment',
      description: 'Create compelling visual stories for screen',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Certificate, Creative portfolio',
      highlights: ['Short Films', 'Documentaries', 'Studio Production']
    },
    {
      course_code: 'ENT204',
      course_name: 'Photography & Digital Imaging',
      school: 'entertainment',
      description: 'Master the art and technique of professional photography',
      credits: 4,
      duration: '2 Years',
      level: 'Diploma',
      prerequisites: 'Grade 12 Certificate, Basic photography experience',
      highlights: ['Studio Photography', 'Location Shoots', 'Digital Post-Production']
    }
  ];
  
  // Combine all courses
  const allCourses = [
    ...scienceCourses,
    ...computersCourses,
    ...automotiveCourses,
    ...entertainmentCourses
  ];
  
  console.log('📚 Adding courses to database...\n');
  
  let created = 0;
  let skipped = 0;
  
  for (const course of allCourses) {
    const existing = await Course.findOne({ course_code: course.course_code });
    if (!existing) {
      await Course.create(course);
      console.log(`✅ Created: ${course.course_code} - ${course.course_name} (${course.school})`);
      created++;
    } else {
      console.log(`⏭️  Skipped (exists): ${course.course_code} - ${course.course_name}`);
      skipped++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🎉 COURSE SEEDING COMPLETE!');
  console.log('='.repeat(50));
  console.log(`📊 Created: ${created} new courses`);
  console.log(`⏭️  Skipped: ${skipped} existing courses`);
  console.log(`📚 Total courses in database: ${await Course.countDocuments()}`);
  console.log('\n📋 Courses by school:');
  
  const schools = ['science', 'computers', 'automotive', 'entertainment'];
  for (const school of schools) {
    const count = await Course.countDocuments({ school });
    console.log(`   ${school.toUpperCase()}: ${count} courses`);
  }
  
  process.exit();
}).catch(err => {
  console.error('❌ Error:', err);
  process.exit();
});