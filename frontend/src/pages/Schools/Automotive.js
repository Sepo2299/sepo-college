// pages/Schools/Automotive.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCar,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUniversity,
  FaWrench,
  FaRoad,
  FaOilCan,
  FaCogs,
  FaTachometerAlt,
  FaGasPump,
  FaTruck,
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
  FaScrewdriver,
  FaBolt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Automotive = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const school = {
    id: 'automotive',
    name: 'School of Automotive',
    shortDescription: 'Power your future with hands-on automotive training and industry expertise',
    description: 'Our Automotive School provides comprehensive training in vehicle mechanics, driving skills, and automotive technology with hands-on workshops. We prepare students for careers in the automotive industry.',
    icon: <FaCar className="text-4xl" />,
    color: 'red',
    gradient: 'from-red-600 via-red-500 to-cyan-500',
    stats: {
      students: '320+',
      faculty: '24+',
      programs: '12',
      workshops: '6',
      vehicles: '25+',
      placement: '94%'
    },
    courses: [
      { 
        name: 'Basic Driving Skills', 
        code: 'AUT101',
        duration: '3 Months', 
        level: 'Certificate',
        credits: 2,
        icon: <FaRoad />,
        color: 'red',
        description: 'Master fundamental driving techniques and road safety practices',
        fullDescription: 'This comprehensive driving course covers essential skills for safe and confident driving. Students learn defensive driving techniques, road rules, vehicle control, and hazard perception. Practical sessions on our professional driving range ensure real-world readiness.',
        learningOutcomes: [
          'Master defensive driving techniques',
          'Understand road rules and regulations',
          'Develop vehicle control skills',
          'Practice hazard perception',
          'Navigate various road conditions'
        ],
        prerequisites: 'Valid Learner\'s License, Age 18+',
        careerPaths: ['Professional Driver', 'Delivery Driver', 'Fleet Driver'],
        highlights: ['Defensive Driving', 'Road Rules', 'Vehicle Control']
      },
      { 
        name: 'Vehicle Maintenance', 
        code: 'AUT102',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 3,
        icon: <FaOilCan />,
        color: 'red',
        description: 'Learn essential vehicle maintenance and repair procedures',
        fullDescription: 'This hands-on certificate program teaches fundamental vehicle maintenance skills. Students learn oil changes, brake service, tire rotation, fluid checks, and basic diagnostic procedures. Working on actual vehicles in our professional workshop builds practical experience.',
        learningOutcomes: [
          'Perform routine maintenance procedures',
          'Diagnose common mechanical issues',
          'Service brake systems',
          'Maintain vehicle fluids',
          'Conduct safety inspections'
        ],
        prerequisites: 'Basic mechanical interest',
        careerPaths: ['Service Technician', 'Maintenance Assistant', 'Quick Lube Technician'],
        highlights: ['Oil Changes', 'Brake Service', 'Tire Rotation']
      },
      { 
        name: 'Automotive Engineering', 
        code: 'AUT201',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 4,
        icon: <FaCogs />,
        color: 'red',
        description: 'Comprehensive study of vehicle systems and engineering principles',
        fullDescription: 'This diploma program provides in-depth knowledge of automotive systems and engineering principles. Students study engine mechanics, transmission systems, electrical systems, and vehicle dynamics. Advanced diagnostics and repair techniques prepare graduates for master technician roles.',
        learningOutcomes: [
          'Analyze engine performance and efficiency',
          'Diagnose transmission issues',
          'Troubleshoot electrical systems',
          'Understand vehicle dynamics',
          'Perform advanced repairs'
        ],
        prerequisites: 'Certificate in Vehicle Maintenance or equivalent',
        careerPaths: ['Automotive Engineer', 'Master Technician', 'Workshop Manager'],
        highlights: ['Engine Mechanics', 'Transmission', 'Electrical Systems']
      },
      { 
        name: 'Advanced Driving Techniques', 
        code: 'AUT103',
        duration: '6 Months', 
        level: 'Certificate',
        credits: 2,
        icon: <FaTachometerAlt />,
        color: 'red',
        description: 'Professional driving skills for challenging conditions',
        fullDescription: 'This advanced driving course builds on basic skills to handle challenging conditions. Students master skid control, emergency maneuvers, night driving, and off-road techniques. Training on our specialized facilities builds confidence for professional driving roles.',
        learningOutcomes: [
          'Control vehicles in skid conditions',
          'Execute emergency maneuvers',
          'Drive safely at night',
          'Navigate off-road terrain',
          'Handle adverse weather conditions'
        ],
        prerequisites: 'Valid Driver\'s License, Basic Driving Certificate',
        careerPaths: ['Professional Driver', 'Emergency Vehicle Operator', 'Driving Instructor'],
        highlights: ['Skid Control', 'Night Driving', 'Off-road Techniques']
      },
      { 
        name: 'Transport Management', 
        code: 'AUT202',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 4,
        icon: <FaTruck />,
        color: 'red',
        description: 'Manage fleet operations and transport logistics',
        fullDescription: 'This diploma program covers the business and management side of transportation. Students learn fleet management, logistics planning, route optimization, and regulatory compliance. Real-world case studies prepare graduates for supervisory roles in transport companies.',
        learningOutcomes: [
          'Manage fleet operations efficiently',
          'Plan and optimize logistics',
          'Ensure regulatory compliance',
          'Coordinate transport schedules',
          'Manage transport budgets'
        ],
        prerequisites: 'Diploma in Business or relevant experience',
        careerPaths: ['Fleet Manager', 'Transport Coordinator', 'Logistics Supervisor'],
        highlights: ['Fleet Management', 'Logistics', 'Route Planning']
      },
      { 
        name: 'Heavy Vehicle Operation', 
        code: 'AUT104',
        duration: '6 Months', 
        level: 'Certificate',
        credits: 2,
        icon: <FaTruck />,
        color: 'red',
        description: 'Specialized training for trucks and heavy vehicles',
        fullDescription: 'This specialized program prepares drivers for heavy vehicle operation. Students learn to handle trucks, buses, and heavy equipment safely. Training covers vehicle inspection, cargo securement, and specialized driving techniques for large vehicles.',
        learningOutcomes: [
          'Operate heavy vehicles safely',
          'Conduct pre-trip inspections',
          'Secure cargo properly',
          'Navigate with large vehicles',
          'Understand weight distribution'
        ],
        prerequisites: 'Valid Code B License, Medical Fitness',
        careerPaths: ['Truck Driver', 'Bus Driver', 'Heavy Equipment Operator'],
        highlights: ['Code C License', 'Vehicle Inspection', 'Cargo Safety']
      },
      { 
        name: 'Automotive Electronics', 
        code: 'AUT105',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 3,
        icon: <FaBolt />,
        color: 'red',
        description: 'Diagnose and repair modern vehicle electronic systems',
        fullDescription: 'This program focuses on the complex electronic systems in modern vehicles. Students learn ECU diagnostics, sensor systems, wiring diagrams, and advanced electronic troubleshooting. Hands-on work with diagnostic equipment prepares graduates for modern automotive repair.',
        learningOutcomes: [
          'Diagnose ECU and module issues',
          'Test and replace sensors',
          'Read wiring diagrams',
          'Troubleshoot electronic systems',
          'Use diagnostic scan tools'
        ],
        prerequisites: 'Basic electrical knowledge',
        careerPaths: ['Auto Electrician', 'Diagnostic Technician', 'Electronics Specialist'],
        highlights: ['ECU Diagnostics', 'Sensors', 'Wiring Systems']
      },
      {
        name: 'Electric Vehicle Technology',
        code: 'AUT106',
        duration: '1 Year',
        level: 'Certificate',
        credits: 3,
        icon: <FaBolt />,
        color: 'red',
        description: 'Specialized training for electric and hybrid vehicle maintenance',
        fullDescription: 'This cutting-edge program covers the unique systems in electric and hybrid vehicles. Students learn high-voltage safety, battery systems, electric motors, and regenerative braking. Training prepares technicians for the growing EV market.',
        learningOutcomes: [
          'Follow high-voltage safety procedures',
          'Diagnose battery system issues',
          'Maintain electric motors',
          'Service charging systems',
          'Understand regenerative braking'
        ],
        prerequisites: 'Automotive Electronics Certificate or equivalent',
        careerPaths: ['EV Technician', 'Hybrid Specialist', 'Battery Systems Technician'],
        highlights: ['High-Voltage Safety', 'Battery Systems', 'Electric Motors']
      }
    ],
    facilities: [
      { name: 'Professional Driving Range', icon: <FaRoad />, color: 'red', capacity: '10 vehicles', equipment: 'Skid Pan, Obstacle Course, Wet Surface' },
      { name: 'Vehicle Workshop', icon: <FaWrench />, color: 'red', capacity: '20 bays', equipment: 'Hydraulic Lifts, Diagnostic Tools, Tool Sets' },
      { name: 'Simulation Lab', icon: <FaTachometerAlt />, color: 'red', capacity: '15 stations', equipment: 'Driving Simulators, VR Systems' },
      { name: 'Diagnostic Center', icon: <FaCogs />, color: 'red', capacity: '8 bays', equipment: 'Scan Tools, Oscilloscopes, Multimeters' },
      { name: 'Parts Library', icon: <FaOilCan />, color: 'red', capacity: '500+ parts', equipment: 'Engine Parts, Transmissions, Components' },
      { name: 'Fleet Vehicles', icon: <FaCar />, color: 'red', capacity: '25 vehicles', equipment: 'Cars, Trucks, Buses, Motorcycles' },
      { name: 'EV Workshop', icon: <FaBolt />, color: 'red', capacity: '5 bays', equipment: 'EV Chargers, Battery Testers, Safety Gear' },
      { name: 'Heavy Vehicle Bay', icon: <FaTruck />, color: 'red', capacity: '4 bays', equipment: 'Heavy Lifts, Truck Tools, Inspection Pits' }
    ],
    requirements: 'Valid Learners License, Grade 10 Certificate, Medical Fitness Certificate, Age 18+',
    email: 'automotive@sepocollege.com.na',
    phone: '+264 61 123 4569',
    location: 'Automotive Complex, Industrial Campus',
    departmentHead: 'Mr. John Namaseb, MSc Automotive Engineering',
    researchAreas: [
      { name: 'Electric Vehicles', icon: <FaBolt />, color: 'red', projects: 5, description: 'EV technology, battery systems, and charging infrastructure' },
      { name: 'Engine Efficiency', icon: <FaCogs />, color: 'red', projects: 6, description: 'Fuel economy, emissions reduction, and performance optimization' },
      { name: 'Safety Systems', icon: <FaTachometerAlt />, color: 'red', projects: 4, description: 'Advanced driver assistance systems and vehicle safety' },
      { name: 'Alternative Fuels', icon: <FaGasPump />, color: 'red', projects: 5, description: 'Hydrogen, biofuels, and sustainable fuel technologies' },
      { name: 'Autonomous Vehicles', icon: <FaCar />, color: 'red', projects: 3, description: 'Self-driving technology and vehicle automation' }
    ],
    licenses: [
      { name: 'Code B', description: 'Light Vehicles', icon: <FaCar />, details: 'Cars, SUVs, Light Commercial' },
      { name: 'Code C', description: 'Heavy Vehicles', icon: <FaTruck />, details: 'Trucks, Buses, Heavy Equipment' },
      { name: 'Code EC', description: 'Trailers', icon: <FaTruck />, details: 'Articulated Vehicles, Trailers' }
    ],
    achievements: [
      { year: '2024', title: 'Best Technical Training Provider', icon: <FaAward />, description: 'Namibia Technical Awards' },
      { year: '2023', title: 'National Driving Challenge Winners', icon: <FaRoad />, description: 'Southern African Driving Competition' },
      { year: '2022', title: 'Automotive Innovation Award', icon: <FaRocket />, description: 'African Automotive Summit' }
    ],
    testimonials: [
      { name: 'Petrus Shikongo', role: 'Fleet Manager at TransNamib', quote: 'The practical training at the School of Automotive prepared me for real-world challenges in fleet management. The hands-on experience was invaluable.', rating: 5 },
      { name: 'Julia Nangula', role: 'Master Technician at Toyota', quote: 'The workshop facilities are top-notch and the instructors are true industry professionals. I still use skills I learned here every day.', rating: 5 },
      { name: 'Michael van Wyk', role: 'EV Specialist', quote: 'The Electric Vehicle program gave me the specialized knowledge I needed to excel in this growing field. Highly recommended!', rating: 5 }
    ]
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Certificate': return 'from-red-500 to-cyan-500';
      case 'Diploma': return 'from-red-600 to-cyan-600';
      case 'Advanced Diploma': return 'from-red-700 to-cyan-700';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Certificate': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Diploma': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Advanced Diploma': return 'bg-red-500/20 text-red-300 border-red-500/30';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-cyan-950 text-white">
      {/* Hero Section with Image */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative h-[50vh] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/3.jpg" 
            alt="Automotive School" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-red-90/50 to-cyan-90/90"></div>
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/20 rounded-full"
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
              className="flex items-center gap-2 text-sm text-red-300/80 mb-4 backdrop-blur-sm bg-red-950/30 px-4 py-2 rounded-full w-fit border border-red-500/30"
            >
              <Link to="/" className="hover:text-red-300 transition">Home</Link>
              <span>/</span>
              <Link to="/schools" className="hover:text-red-300 transition">Schools</Link>
              <span>/</span>
              <span className="text-white">Automotive</span>
            </motion.div>

            {/* Title with Glow Effect */}
            <motion.h1 
              variants={bounceIn}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                {school.name}
              </span>
            </motion.h1>

            {/* Animated Tagline */}
            <motion.div 
              variants={slideInRight}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-red-400 to-transparent"></div>
              <p className="text-xl text-red-200/80 font-light tracking-wide">
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
                <FaUsers className="text-red-400" />
                <span className="text-gray-300">{school.stats.students} Students</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-cyan-400" />
                <span className="text-gray-300">{school.stats.faculty} Faculty</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaWrench className="text-red-400" />
                <span className="text-gray-300">{school.stats.workshops} Workshops</span>
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
          <div className="flex items-center gap-2 text-xs text-red-300/50">
            <span>SCROLL</span>
            <div className="w-6 h-10 border border-red-500/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-red-400/50 rounded-full mt-2"
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
        className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-red-500/20"
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
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-cyan-500 opacity-20 blur-xl"
                  />
                )}
                
                {/* Border Gradient */}
                <div className={`absolute inset-0 border border-red-500/30 rounded-lg ${
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 via-red-500 to-cyan-500"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent">
                Automotive Programs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Choose from our comprehensive range of automotive programs designed to drive your career forward.
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
                    className="relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all duration-300"
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
                            <span className="flex items-center gap-1 text-red-400">
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
                          className="text-red-400"
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
                          className="border-t border-red-500/20 bg-gray-900/50 overflow-hidden"
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
                                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Program Overview</h4>
                                  <p className="text-gray-300 leading-relaxed">{course.fullDescription}</p>
                                </div>

                                {/* Learning Outcomes */}
                                <div>
                                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Learning Outcomes</h4>
                                  <ul className="space-y-2">
                                    {course.learningOutcomes.map((outcome, i) => (
                                      <motion.li 
                                        key={i}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (i * 0.05) }}
                                        className="flex items-start gap-2 text-gray-300"
                                      >
                                        <FaCheckCircle className="text-red-400 mt-1 flex-shrink-0" size={14} />
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
                                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Prerequisites</h4>
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                  >
                                    <p className="text-gray-300">{course.prerequisites}</p>
                                  </motion.div>
                                </div>

                                {/* Career Paths */}
                                <div>
                                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Career Opportunities</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.careerPaths.map((career, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gray-800/80 border border-red-500/20 rounded-full text-sm text-gray-300"
                                      >
                                        {career}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                  <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Program Highlights</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.highlights.map((highlight, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-red-500/10 to-cyan-500/10 border border-red-500/30 rounded-full text-sm text-red-300"
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-cyan-500 rounded-lg font-semibold hover:from-red-600 hover:to-cyan-600 transition-all group"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent">
                Professional Facilities
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                State-of-the-art workshops and training facilities equipped with industry-standard tools and vehicles
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
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r from-red-500/10 to-cyan-500/10`}
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
                    <div className={`absolute inset-0 bg-gradient-to-r from-red-500 to-cyan-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    <div className={`relative w-14 h-14 bg-gradient-to-br from-red-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl`}>
                      {facility.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2">{facility.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-400">
                      <FaUsers className="text-red-400" size={12} />
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
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-cyan-400"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent">
                Automotive Research
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Advancing automotive technology through cutting-edge research and innovation
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {school.researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={slideInLeft}
                  whileHover={{ y: -5 }}
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.2) 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>

                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br from-red-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl`}
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
                          <span className="text-red-400">{area.projects}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r from-red-500 to-cyan-500 rounded-full`}
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
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs border border-red-500/30"
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
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/20 to-cyan-500/20 rotate-45 translate-x-20 -translate-y-20`}
                      animate={{ rotate: [45, 50, 45] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* License Types */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
                License Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {school.licenses.map((license, index) => (
                  <motion.div
                    key={index}
                    variants={zoomIn}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 text-center hover:border-red-500/30 transition-all duration-500"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500/30 to-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-3 text-red-400 text-3xl">
                      {license.icon}
                    </div>
                    <h4 className="font-bold text-white text-lg">{license.name}</h4>
                    <p className="text-sm text-gray-400">{license.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{license.details}</p>
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent">
                Our Achievements
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-cyan-500 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Recognition and accolades from the automotive industry
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
                className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent"
              >
                What Our Students Say
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {school.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-500"
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
                        className="w-12 h-12 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
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
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-cyan-900"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)'
            }}></div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-300 to-cyan-400 bg-clip-text text-transparent"
          >
            Ready to Start Your Engine?
          </motion.h2>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join the School of Automotive and drive your career forward with industry-leading training.
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
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-cyan-600 transition-all overflow-hidden inline-flex items-center gap-2"
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
                className="group px-8 py-4 border-2 border-red-500/50 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
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

export default Automotive;