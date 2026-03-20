// pages/Schools/Computers.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLaptopCode,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUniversity,
  FaCode,
  FaServer,
  FaCloud,
  FaShieldAlt,
  FaDatabase,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaRocket,
  FaMicrochip,
  FaNetworkWired,
  FaRobot,
  FaMobile,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Computers = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const school = {
    id: 'computers',
    name: 'School of Computers',
    shortDescription: 'Shaping tomorrow\'s technology leaders through innovation and practical skills',
    description: 'The School of Computers offers cutting-edge IT education with a focus on practical skills in software development, networking, and information systems. Our programs are designed to meet industry demands and prepare students for successful careers in technology.',
    icon: <FaLaptopCode className="text-4xl" />,
    color: 'green',
    gradient: 'from-green-500 to-cyan-500',
    stats: {
      students: '650+',
      faculty: '42+',
      programs: '15',
      labs: '8',
      placements: '92%',
      certifications: '12+'
    },
    courses: [
      { 
        name: 'Introduction to ICT', 
        code: 'CSC101',
        duration: '6 Months', 
        level: 'Certificate',
        credits: 2,
        icon: <FaMicrochip />,
        color: 'green',
        description: 'Fundamentals of information technology, hardware, software, and basic networking concepts',
        fullDescription: 'This introductory course provides a solid foundation in information technology. Students learn about computer hardware components, operating systems, software applications, and basic networking concepts. Hands-on labs help students build and troubleshoot computer systems, preparing them for entry-level IT roles.',
        learningOutcomes: [
          'Identify computer hardware components and their functions',
          'Install and configure operating systems',
          'Troubleshoot common hardware and software issues',
          'Understand basic networking concepts',
          'Use productivity software effectively'
        ],
        prerequisites: 'Basic computer literacy',
        careerPaths: ['IT Support Technician', 'Help Desk Analyst', 'Computer Technician'],
        highlights: ['Hardware Basics', 'Operating Systems', 'Office Applications']
      },
      { 
        name: 'Software Development', 
        code: 'CSC201',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 4,
        icon: <FaCode />,
        color: 'green',
        description: 'Comprehensive programming skills including OOP, data structures, and algorithm design',
        fullDescription: 'This comprehensive program develops strong programming fundamentals and software development skills. Students master object-oriented programming, data structures, algorithms, and software design patterns. Through project-based learning, they build real-world applications while learning industry best practices.',
        learningOutcomes: [
          'Apply object-oriented programming principles',
          'Implement data structures and algorithms',
          'Develop desktop and web applications',
          'Use version control systems (Git)',
          'Follow software development methodologies'
        ],
        prerequisites: 'Grade 12 Mathematics, Basic programming knowledge',
        careerPaths: ['Junior Developer', 'Software Engineer', 'Application Developer'],
        highlights: ['Java/Python', 'Web Development', 'Database Integration']
      },
      { 
        name: 'Network Administration', 
        code: 'CSC202',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 4,
        icon: <FaNetworkWired />,
        color: 'green',
        description: 'Design, implement, and manage computer networks and infrastructure',
        fullDescription: 'This diploma program prepares students for careers in network administration. Topics include network design, router and switch configuration, network protocols, and troubleshooting. Students gain hands-on experience with Cisco equipment and prepare for CCNA certification.',
        learningOutcomes: [
          'Design and implement local area networks',
          'Configure routers and switches',
          'Implement network security measures',
          'Troubleshoot network issues',
          'Monitor network performance'
        ],
        prerequisites: 'Grade 12 Mathematics, Basic networking knowledge',
        careerPaths: ['Network Administrator', 'Network Technician', 'Systems Administrator'],
        highlights: ['Cisco CCNA', 'Network Security', 'TCP/IP']
      },
      { 
        name: 'Database Management', 
        code: 'CSC203',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 3,
        icon: <FaDatabase />,
        color: 'green',
        description: 'Design and manage relational databases, SQL, and data modeling',
        fullDescription: 'This certificate program focuses on database design, implementation, and management. Students learn SQL, data modeling, normalization, and database administration. Practical exercises include creating and querying databases, optimizing performance, and ensuring data integrity.',
        learningOutcomes: [
          'Design normalized database schemas',
          'Write complex SQL queries',
          'Implement database security',
          'Optimize database performance',
          'Perform backup and recovery'
        ],
        prerequisites: 'Basic computer literacy',
        careerPaths: ['Database Administrator', 'SQL Developer', 'Data Analyst'],
        highlights: ['SQL', 'Oracle', 'MongoDB']
      },
      { 
        name: 'Web & Mobile Development', 
        code: 'CSC301',
        duration: '3 Years', 
        level: 'Advanced Diploma',
        credits: 6,
        icon: <FaMobile />,
        color: 'green',
        description: 'Build responsive web applications and native mobile apps for iOS and Android',
        fullDescription: 'This advanced program covers full-stack web development and mobile app creation. Students master front-end frameworks, back-end APIs, and cross-platform mobile development. Through portfolio projects, they build complete applications deployed to cloud platforms.',
        learningOutcomes: [
          'Develop responsive web applications',
          'Build RESTful APIs and microservices',
          'Create cross-platform mobile apps',
          'Integrate cloud services',
          'Implement authentication and security'
        ],
        prerequisites: 'Diploma in Software Development or equivalent',
        careerPaths: ['Full-Stack Developer', 'Mobile Developer', 'Web Developer'],
        highlights: ['React/Flutter', 'REST APIs', 'Cloud Integration']
      },
      { 
        name: 'Cybersecurity Fundamentals', 
        code: 'CSC204',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 3,
        icon: <FaShieldAlt />,
        color: 'green',
        description: 'Learn to protect systems, networks, and data from cyber threats',
        fullDescription: 'This certificate introduces students to cybersecurity principles and practices. Topics include threat analysis, security policies, cryptography, and ethical hacking. Labs provide hands-on experience with security tools and techniques for protecting information assets.',
        learningOutcomes: [
          'Identify common cyber threats and vulnerabilities',
          'Implement security controls and best practices',
          'Understand cryptographic principles',
          'Conduct basic security assessments',
          'Respond to security incidents'
        ],
        prerequisites: 'Basic networking knowledge',
        careerPaths: ['Security Analyst', 'Security Specialist', 'IT Auditor'],
        highlights: ['Ethical Hacking', 'Cryptography', 'Security Audits']
      },
      { 
        name: 'Cloud Computing', 
        code: 'CSC205',
        duration: '6 Months', 
        level: 'Certificate',
        credits: 2,
        icon: <FaCloud />,
        color: 'green',
        description: 'Deploy and manage applications on major cloud platforms',
        fullDescription: 'This hands-on course covers cloud computing concepts and platforms. Students learn to deploy applications, manage cloud resources, and implement DevOps practices. Working with AWS and Azure, they gain practical skills for modern cloud-based infrastructure.',
        learningOutcomes: [
          'Deploy applications to cloud platforms',
          'Manage cloud compute and storage resources',
          'Implement Infrastructure as Code',
          'Set up CI/CD pipelines',
          'Monitor cloud applications'
        ],
        prerequisites: 'Basic programming and networking knowledge',
        careerPaths: ['Cloud Engineer', 'DevOps Specialist', 'Cloud Administrator'],
        highlights: ['AWS/Azure', 'DevOps', 'Containerization']
      },
      {
        name: 'Data Science & Analytics',
        code: 'CSC306',
        duration: '2 Years',
        level: 'Diploma',
        credits: 4,
        icon: <FaDatabase />,
        color: 'green',
        description: 'Analyze complex data sets and derive actionable insights',
        fullDescription: 'This program covers data analysis, statistical methods, and machine learning basics. Students work with Python, R, and data visualization tools to extract insights from data. Real-world projects involve cleaning, analyzing, and presenting data findings.',
        learningOutcomes: [
          'Clean and prepare data for analysis',
          'Apply statistical methods to data',
          'Create data visualizations',
          'Build predictive models',
          'Communicate data insights effectively'
        ],
        prerequisites: 'Diploma in Software Development or Mathematics',
        careerPaths: ['Data Analyst', 'Data Scientist', 'Business Intelligence Analyst'],
        highlights: ['Python/R', 'Machine Learning', 'Data Visualization']
      }
    ],
    facilities: [
      { name: 'Advanced Computer Labs', icon: <FaLaptopCode />, color: 'green', capacity: '40 stations', equipment: 'High-end Workstations, Dual Monitors, SSD Drives' },
      { name: 'Network Simulation Lab', icon: <FaNetworkWired />, color: 'green', capacity: '30 students', equipment: 'Cisco Routers, Switches, Firewalls' },
      { name: 'Software Development Center', icon: <FaCode />, color: 'green', capacity: '50 students', equipment: 'Development Tools, IDEs, Version Control' },
      { name: 'Cybersecurity Lab', icon: <FaShieldAlt />, color: 'green', capacity: '25 students', equipment: 'Security Tools, Kali Linux, SIEM' },
      { name: 'Robotics & IoT Lab', icon: <FaRobot />, color: 'green', capacity: '20 students', equipment: 'Arduino, Raspberry Pi, Sensors' },
      { name: 'Cloud Computing Lab', icon: <FaCloud />, color: 'green', capacity: '30 students', equipment: 'AWS, Azure, Docker, Kubernetes' },
      { name: 'AI & Machine Learning Lab', icon: <FaMicrochip />, color: 'green', capacity: '25 students', equipment: 'GPU Workstations, TensorFlow, PyTorch' },
      { name: 'IT Resource Library', icon: <FaBook />, color: 'green', capacity: '100 students', equipment: 'Technical Books, Journals, Online Resources' }
    ],
    requirements: 'Grade 12 Certificate, Basic Computer Knowledge, Mathematics recommended (25+ points in 5 subjects)',
    email: 'computers@sepocollege.com.na',
    phone: '+264 61 123 4568',
    location: 'Technology Complex, Main Campus',
    departmentHead: 'Prof. Michael Nangula, PhD',
    researchAreas: [
      { name: 'Artificial Intelligence', icon: <FaRobot />, color: 'green', projects: 8, description: 'Machine learning, neural networks, and intelligent systems' },
      { name: 'Cybersecurity', icon: <FaShieldAlt />, color: 'green', projects: 7, description: 'Threat detection, cryptography, and security frameworks' },
      { name: 'Cloud Computing', icon: <FaCloud />, color: 'green', projects: 6, description: 'Distributed systems, serverless computing, and cloud security' },
      { name: 'IoT & Embedded Systems', icon: <FaMicrochip />, color: 'green', projects: 5, description: 'Smart devices, sensors, and edge computing' },
      { name: 'Data Science', icon: <FaDatabase />, color: 'green', projects: 9, description: 'Big data analytics, visualization, and predictive modeling' }
    ],
    certifications: [
      { name: 'CompTIA A+', provider: 'CompTIA', level: 'Entry' },
      { name: 'Cisco CCNA', provider: 'Cisco', level: 'Professional' },
      { name: 'AWS Certified', provider: 'Amazon', level: 'Professional' },
      { name: 'Microsoft Azure', provider: 'Microsoft', level: 'Professional' },
      { name: 'CEH', provider: 'EC-Council', level: 'Advanced' }
    ],
    achievements: [
      { year: '2024', title: 'Best IT Education Provider', icon: <FaAward />, description: 'Namibia Technology Awards' },
      { year: '2023', title: 'Cybersecurity Challenge Winners', icon: <FaRocket />, description: 'Southern African Cyber Games' },
      { year: '2022', title: 'Innovation in Tech Education', icon: <FaStar />, description: 'African EdTech Summit' }
    ],
    testimonials: [
      { name: 'Maria Tuyeni', role: 'Software Engineer at Microsoft', quote: 'The practical skills I gained at the School of Computers prepared me perfectly for the tech industry. The hands-on projects and industry connections were invaluable.', rating: 5 },
      { name: 'Thomas Kambonde', role: 'Network Security Analyst', quote: 'Excellent facilities and experienced lecturers who really care about student success. The CCNA certification preparation was top-notch.', rating: 5 },
      { name: 'Elena Nangula', role: 'Cloud Architect at Amazon', quote: 'The cloud computing program gave me the skills I needed to excel in my career. The labs and real-world projects made all the difference.', rating: 5 }
    ]
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Certificate': return 'from-green-500 to-cyan-500';
      case 'Diploma': return 'from-green-600 to-cyan-600';
      case 'Advanced Diploma': return 'from-green-700 to-cyan-700';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Certificate': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Diploma': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Advanced Diploma': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const toggleCourse = (index) => {
    setExpandedCourse(expandedCourse === index ? null : index);
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const bounceIn = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerContainerSlow = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-cyan-950 text-white">
      {/* Hero Section with Image */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative h-[50vh] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/AI.jpg" 
            alt="Computers School" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/40 via-green-900/40 to-cyan-950/90"></div>
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <motion.div 
              variants={slideInLeft}
              className="flex items-center gap-2 text-sm text-green-300/80 mb-4 backdrop-blur-sm bg-green-950/30 px-4 py-2 rounded-full w-fit border border-green-500/30"
            >
              <Link to="/" className="hover:text-green-300 transition">Home</Link>
              <span>/</span>
              <Link to="/schools" className="hover:text-green-300 transition">Schools</Link>
              <span>/</span>
              <span className="text-white">Computers</span>
            </motion.div>

            {/* Title with Glow Effect */}
            <motion.h1 
              variants={bounceIn}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {school.name}
              </span>
            </motion.h1>

            {/* Animated Tagline */}
            <motion.div 
              variants={slideInRight}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
              <p className="text-xl text-green-200/80 font-light tracking-wide">
                {school.shortDescription}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-6"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaUsers className="text-green-400" />
                <span className="text-gray-300">{school.stats.students} Students</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-cyan-400" />
                <span className="text-gray-300">{school.stats.faculty} Faculty</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaCode className="text-green-400" />
                <span className="text-gray-300">{school.stats.programs} Programs</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-4 right-8 z-30 hidden md:block"
        >
          <div className="flex items-center gap-2 text-xs text-green-300/50">
            <span>SCROLL</span>
            <div className="w-6 h-10 border border-green-500/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-green-400/50 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Tabs - Futuristic Design */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-green-500/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-4">
            {['courses', 'facilities', 'research', 'achievements'].map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden group ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Background Glow */}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 opacity-20 blur-xl"
                  />
                )}
                
                {/* Border Gradient */}
                <div className={`absolute inset-0 border border-green-500/30 rounded-lg ${
                  activeTab === tab ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {/* Shine Effect */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                
                <span className="relative capitalize">{tab}</span>
                
                {/* Active Indicator */}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-cyan-500"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Courses Tab - List View with Expandable Details */}
        {activeTab === 'courses' && (
          <motion.div
            key="courses"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={zoomIn} className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                Technology Programs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Choose from our comprehensive range of IT programs designed to launch your tech career.
              </p>
            </motion.div>

            {/* Course List */}
            <motion.div variants={staggerContainer} className="max-w-4xl mx-auto space-y-4">
              {school.courses.map((course, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="relative group"
                >
                  {/* Background Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(course.level)} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                    whileHover={{ opacity: 0.1 }}
                  />
                  
                  {/* Main Card */}
                  <motion.div 
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300"
                  >
                    {/* Course Header - Always Visible */}
                    <motion.div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleCourse(index)}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-6">
                        {/* Icon with Glow */}
                        <motion.div 
                          className="relative"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(course.level)} rounded-xl blur-xl opacity-50`}></div>
                          <div className={`relative w-16 h-16 bg-gradient-to-br ${getLevelColor(course.level)} rounded-xl flex items-center justify-center text-white text-3xl`}>
                            {course.icon}
                          </div>
                        </motion.div>

                        {/* Course Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{course.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelBadgeColor(course.level)}`}>
                              {course.level}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{course.code}</p>
                          <p className="text-gray-300">{course.description}</p>
                          
                          {/* Quick Info */}
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1 text-green-400">
                              <FaCalendarAlt size={12} />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1 text-cyan-400">
                              <FaBook size={12} />
                              {course.credits} Credits
                            </span>
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <motion.div 
                          className="text-green-400"
                          animate={{ rotate: expandedCourse === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {expandedCourse === index ? <FaChevronUp /> : <FaChevronDown />}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Expanded Details - Shows when clicked */}
                    <AnimatePresence>
                      {expandedCourse === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-green-500/20 bg-gray-900/50 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-8">
                              {/* Left Column */}
                              <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6"
                              >
                                {/* Full Description */}
                                <div>
                                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Program Overview</h4>
                                  <p className="text-gray-300 leading-relaxed">{course.fullDescription}</p>
                                </div>

                                {/* Learning Outcomes */}
                                <div>
                                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Learning Outcomes</h4>
                                  <ul className="space-y-2">
                                    {course.learningOutcomes.map((outcome, i) => (
                                      <motion.li 
                                        key={i}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (i * 0.05) }}
                                        className="flex items-start gap-2 text-gray-300"
                                      >
                                        <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" size={14} />
                                        <span>{outcome}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>

                              {/* Right Column */}
                              <motion.div 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                              >
                                {/* Prerequisites */}
                                <div>
                                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Prerequisites</h4>
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                  >
                                    <p className="text-gray-300">{course.prerequisites}</p>
                                  </motion.div>
                                </div>

                                {/* Career Paths */}
                                <div>
                                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Career Opportunities</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.careerPaths.map((career, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gray-800/80 border border-green-500/20 rounded-full text-sm text-gray-300"
                                      >
                                        {career}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3">Program Highlights</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.highlights.map((highlight, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-full text-sm text-green-300"
                                      >
                                        {highlight}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                {/* Apply Button */}
                                <motion.div 
                                  className="pt-4"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Link
                                    to="/kiosk"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg font-semibold hover:from-green-600 hover:to-cyan-600 transition-all group"
                                  >
                                    Apply for this Program
                                    <motion.span
                                      animate={{ x: [0, 5, 0] }}
                                      transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                      <FaArrowRight />
                                    </motion.span>
                                  </Link>
                                </motion.div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Facilities Tab - Futuristic Cards */}
        {activeTab === 'facilities' && (
          <motion.div
            key="facilities"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={zoomIn} className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                Advanced Facilities
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                State-of-the-art labs and technology centers equipped with industry-standard hardware and software
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {school.facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  variants={rotateIn}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  variants={cardHover}
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon Container */}
                  <motion.div 
                    className="relative mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    <div className={`relative w-14 h-14 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl`}>
                      {facility.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2">{facility.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-400">
                      <FaUsers className="text-green-400" size={12} />
                      <span>{facility.capacity}</span>
                    </p>
                    <p className="text-gray-300 text-xs">{facility.equipment}</p>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <span className="text-xs text-gray-400">Active</span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-cyan-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Research Areas Tab */}
        {activeTab === 'research' && (
          <motion.div
            key="research"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainerSlow}
            className="space-y-12"
          >
            <motion.div variants={fadeInScale} className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                Research & Innovation
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Pushing boundaries in technology through cutting-edge research and development
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {school.researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={slideInLeft}
                  whileHover={{ y: -5 }}
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 197, 94, 0.2) 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>

                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl`}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {area.icon}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{area.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{area.description}</p>
                      
                      {/* Projects Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active Projects</span>
                          <span className="text-green-400">{area.projects}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(area.projects / 10) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex gap-2">
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30"
                        >
                          Research
                        </motion.span>
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs border border-cyan-500/30"
                        >
                          Active
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <motion.div 
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rotate-45 translate-x-20 -translate-y-20`}
                      animate={{ rotate: [45, 50, 45] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications Section */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Industry Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {school.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    variants={zoomIn}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center hover:border-green-500/30 transition-all duration-300"
                  >
                    <FaAward className="text-3xl text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-sm">{cert.name}</h4>
                    <p className="text-xs text-gray-400">{cert.provider}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                      {cert.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div variants={flipIn} className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                Our Achievements
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Recognition and accolades from around the tech world
              </p>
            </motion.div>

            {/* Achievement Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {school.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={zoomIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-500 overflow-hidden text-center"
                >
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-yellow-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto">
                      {achievement.icon}
                    </div>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="inline-block px-4 py-2 bg-gray-800/80 border border-yellow-500/30 rounded-full text-sm font-medium text-yellow-300 mb-4"
                  >
                    {achievement.year}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>

                  {/* Shine Effect */}
                  <motion.div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonials */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16"
            >
              <motion.h3 
                variants={slideInLeft}
                className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
              >
                What Our Students Say
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {school.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-500"
                  >
                    {/* Rating */}
                    <motion.div 
                      className="flex gap-1 text-yellow-400 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                        >
                          <FaStar />
                        </motion.div>
                      ))}
                    </motion.div>

                    <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>

                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      >
                        {testimonial.name.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="font-bold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Futuristic Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-20 mt-16 overflow-hidden"
      >
        {/* Background with Parallax */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-cyan-900"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
            }}></div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
          />
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-300 to-cyan-400 bg-clip-text text-transparent"
          >
            Ready to Start Your Tech Journey?
          </motion.h2>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join the School of Computers and become part of a community shaping the future of technology.
          </motion.p>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/kiosk"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-cyan-600 transition-all overflow-hidden inline-flex items-center gap-2"
              >
                <span className="relative">Apply Now</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaArrowRight />
                </motion.span>
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`mailto:${school.email}`}
                className="group px-8 py-4 border-2 border-green-500/50 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <FaEnvelope className="group-hover:scale-110 transition-transform" />
                Contact Admissions
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
      `}</style>
    </div>
  );
};

export default Computers;