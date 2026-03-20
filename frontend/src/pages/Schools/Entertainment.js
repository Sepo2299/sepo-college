// pages/Schools/Entertainment.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilm,
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUniversity,
  FaMusic,
  FaPaintBrush,
  FaCamera,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaRocket,
  FaGlobeAfrica,
  
  FaUsers,
  FaTheaterMasks,
  FaAward,
  FaEnvelope,
  FaGraduationCap
} from 'react-icons/fa';

// Import FA6 icons separately
import { 
  FaMicrophone,
  FaVideo,
  FaChevronDown,
  FaChevronUp,
  FaPalette,
  FaHeadphones,
  FaClapperboard,
  FaInstagram,
  FaYoutube,
  FaTiktok
} from 'react-icons/fa6';

const Entertainment = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const school = {
    id: 'entertainment',
    name: 'School of Entertainment',
    shortDescription: 'Unleash your creativity in the world of media and performing arts',
    description: 'The School of Entertainment focuses on creative arts, media production, and performance arts, preparing students for dynamic careers in the creative industries through hands-on training and industry exposure.',
    icon: <FaFilm className="text-4xl text-purple-600" />,
    color: 'purple',
    gradient: 'from-purple-500 to-cyan-500',
    stats: {
      students: '380+',
      faculty: '28+',
      programs: '15',
      studios: '8',
      productions: '45+',
      successRate: '92%'
    },
    courses: [
      { 
        name: 'Media Production', 
        code: 'ENT101',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 120,
        icon: <FaVideo className="text-purple-400" />,
        color: 'purple',
        description: 'Introduction to media production techniques and equipment',
        fullDescription: 'This comprehensive certificate program introduces students to the fundamentals of media production. Learn camera operation, lighting techniques, sound recording, and basic editing. Through hands-on projects, students create short-form content while developing technical skills essential for media careers.',
        learningOutcomes: [
          'Operate professional cameras and equipment',
          'Apply lighting techniques for video production',
          'Record and mix basic audio',
          'Edit video using industry software',
          'Produce short-form media content'
        ],
        prerequisites: 'Grade 12 Certificate, Basic computer literacy',
        careerPaths: ['Production Assistant', 'Camera Operator', 'Video Editor', 'Content Creator'],
        highlights: ['Studio Production', 'Field Recording', 'Post-Production']
      },
      { 
        name: 'Graphic Design', 
        code: 'ENT102',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaPaintBrush className="text-purple-400" />,
        color: 'purple',
        description: 'Master visual communication and digital design principles',
        fullDescription: 'This diploma program develops creative and technical skills in visual communication. Students master industry-standard design software, typography, color theory, and layout principles. Through portfolio projects, they develop a professional body of work showcasing their design capabilities.',
        learningOutcomes: [
          'Master Adobe Creative Suite applications',
          'Apply typography and color theory principles',
          'Design for print and digital media',
          'Develop brand identity systems',
          'Create professional design portfolio'
        ],
        prerequisites: 'Grade 12 Certificate, Creative portfolio',
        careerPaths: ['Graphic Designer', 'Art Director', 'UI/UX Designer', 'Brand Specialist'],
        highlights: ['Branding Projects', 'Digital Illustration', 'Portfolio Development']
      },
      { 
        name: 'Performing Arts', 
        code: 'ENT103',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaTheaterMasks className="text-indigo-400" />,
        color: 'indigo',
        description: 'Develop your craft in acting, voice, and stage performance',
        fullDescription: 'This intensive diploma program trains students in acting techniques, voice projection, movement, and stagecraft. Through practical workshops and live performances, students develop confidence and versatility. The curriculum includes both classical and contemporary approaches to performance.',
        learningOutcomes: [
          'Apply various acting methodologies',
          'Develop vocal technique and projection',
          'Master stage movement and blocking',
          'Interpret dramatic texts',
          'Perform in live productions'
        ],
        prerequisites: 'Grade 12 Certificate, Audition required',
        careerPaths: ['Actor', 'Voice Artist', 'Theatre Practitioner', 'Performance Coach'],
        highlights: ['Live Performances', 'Scene Study', 'Character Development']
      },
      { 
        name: 'Digital Marketing', 
        code: 'ENT104',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 120,
        icon: <FaGlobeAfrica className="text-blue-400" />,
        color: 'blue',
        description: 'Master social media, content marketing, and digital strategy',
        fullDescription: 'This certificate program prepares students for the fast-paced world of digital marketing. Learn social media strategy, content creation, analytics, and campaign management. Through real-world projects, students develop skills to promote brands and engage audiences across digital platforms.',
        learningOutcomes: [
          'Develop social media strategies',
          'Create engaging content',
          'Analyze marketing analytics',
          'Manage digital campaigns',
          'Optimize for search engines'
        ],
        prerequisites: 'Grade 12 Certificate, Basic computer literacy',
        careerPaths: ['Digital Marketer', 'Social Media Manager', 'Content Creator', 'SEO Specialist'],
        highlights: ['Campaign Management', 'Analytics', 'Content Strategy']
      },
      { 
        name: 'Entertainment Management', 
        code: 'ENT201',
        duration: '3 Years', 
        level: 'Advanced Diploma',
        credits: 360,
        icon: <FaUniversity className="text-purple-400" />,
        color: 'purple',
        description: 'Lead and manage creative projects and entertainment ventures',
        fullDescription: 'This advanced diploma prepares students for leadership roles in the entertainment industry. Study event management, artist management, production budgeting, and entertainment law. Through industry placements and projects, students gain practical experience in managing creative enterprises.',
        learningOutcomes: [
          'Plan and execute entertainment events',
          'Manage artist contracts and relationships',
          'Budget and finance productions',
          'Understand entertainment law',
          'Lead creative teams'
        ],
        prerequisites: 'Diploma in related field or industry experience',
        careerPaths: ['Event Manager', 'Artist Manager', 'Production Manager', 'Venue Manager'],
        highlights: ['Event Planning', 'Artist Relations', 'Production Management']
      },
      { 
        name: 'Music Production', 
        code: 'ENT202',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 120,
        icon: <FaHeadphones className="text-indigo-400" />,
        color: 'indigo',
        description: 'Create and produce music in professional studio environments',
        fullDescription: 'This hands-on certificate program covers the essentials of music production. Learn recording techniques, MIDI programming, mixing, and mastering. Using industry-standard software and equipment, students produce original music while developing technical and creative skills.',
        learningOutcomes: [
          'Operate recording studio equipment',
          'Program MIDI and virtual instruments',
          'Mix and master audio tracks',
          'Arrange and compose music',
          'Produce original recordings'
        ],
        prerequisites: 'Grade 12 Certificate, Musical aptitude',
        careerPaths: ['Music Producer', 'Recording Engineer', 'Sound Designer', 'Composer'],
        highlights: ['Studio Recording', 'Mixing & Mastering', 'Electronic Production']
      },
      { 
        name: 'Film & TV Production', 
        code: 'ENT203',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaClapperboard className="text-purple-400" />,
        color: 'purple',
        description: 'Create compelling visual stories for screen',
        fullDescription: 'This diploma program covers all aspects of film and television production. From screenwriting to post-production, students learn the entire filmmaking process. Working in crews, they produce short films, documentaries, and TV segments while building professional portfolios.',
        learningOutcomes: [
          'Develop screenplays and treatments',
          'Direct actors and crew',
          'Operate cinema cameras',
          'Edit with professional workflows',
          'Produce finished films'
        ],
        prerequisites: 'Grade 12 Certificate, Creative portfolio',
        careerPaths: ['Filmmaker', 'Director', 'Screenwriter', 'Editor'],
        highlights: ['Short Films', 'Documentaries', 'Studio Production']
      },
      { 
        name: 'Photography & Digital Imaging', 
        code: 'ENT204',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaCamera className="text-indigo-400" />,
        color: 'indigo',
        description: 'Master the art and technique of professional photography',
        fullDescription: 'This comprehensive program develops technical expertise and artistic vision in photography. Students master camera techniques, lighting, composition, and digital post-production. Through assignments and projects, they build a professional portfolio across various genres.',
        learningOutcomes: [
          'Master camera operations and techniques',
          'Apply studio and location lighting',
          'Compose compelling images',
          'Edit and retouch photographs',
          'Develop photographic portfolio'
        ],
        prerequisites: 'Grade 12 Certificate, Basic photography experience',
        careerPaths: ['Photographer', 'Photo Editor', 'Studio Assistant', 'Content Creator'],
        highlights: ['Studio Photography', 'Location Shoots', 'Digital Post-Production']
      }
    ],
    facilities: [
      { name: 'Recording Studio', icon: <FaMicrophone />, color: 'purple', capacity: '8 artists', equipment: 'Pro Tools, Microphones, Mixers' },
      { name: 'Media Production Lab', icon: <FaVideo />, color: 'indigo', capacity: '20 students', equipment: 'Cameras, Lighting, Green Screen' },
      { name: 'Performance Theater', icon: <FaTheaterMasks />, color: 'purple', capacity: '150 seats', equipment: 'Stage Lighting, Sound System' },
      { name: 'Design Studio', icon: <FaPaintBrush />, color: 'indigo', capacity: '25 students', equipment: 'Wacom Tablets, iMacs' },
      { name: 'Photography Studio', icon: <FaCamera />, color: 'purple', capacity: '15 students', equipment: 'Studio Lighting, Backdrops' },
      { name: 'Editing Suites', icon: <FaFilm />, color: 'indigo', capacity: '10 stations', equipment: 'Mac Pros, Adobe Suite' },
      { name: 'Art Gallery', icon: <FaPalette />, color: 'purple', capacity: '100 visitors', equipment: 'Exhibition Lighting, Display Systems' },
      { name: 'Green Screen Studio', icon: <FaVideo />, color: 'indigo', capacity: '12 students', equipment: 'Cyclorama Wall, Lighting Grid' }
    ],
    requirements: 'Grade 12 Certificate, Portfolio/Interview, Creative aptitude test',
    email: 'entertainment@sepocollege.com.na',
    phone: '+264 61 123 4590',
    location: 'Creative Arts Complex, Main Campus',
    departmentHead: 'Prof. Lisa Wong, MFA',
    researchAreas: [
      { name: 'Digital Media Arts', icon: <FaVideo />, color: 'purple', projects: 7, description: 'Interactive media and digital storytelling' },
      { name: 'Music Technology', icon: <FaHeadphones />, color: 'indigo', projects: 5, description: 'Electronic music and sound design' },
      { name: 'Performance Studies', icon: <FaTheaterMasks />, color: 'purple', projects: 4, description: 'Contemporary theatre and performance' },
      { name: 'Visual Communication', icon: <FaPaintBrush />, color: 'indigo', projects: 6, description: 'Design thinking and visual culture' },
      { name: 'Film Studies', icon: <FaClapperboard />, color: 'purple', projects: 5, description: 'Cinematic language and criticism' },
      { name: 'Creative Technology', icon: <FaRocket />, color: 'indigo', projects: 4, description: 'Emerging technologies in arts' }
    ],
    achievements: [
      { year: '2024', title: 'Best Film School Award', icon: <FaAward />, description: 'Namibian Film Festival' },
      { year: '2023', title: 'Innovation in Arts Education', icon: <FaRocket />, description: 'African Creative Awards' },
      { year: '2022', title: 'International Collaboration Grant', icon: <FaGlobeAfrica />, description: 'UNESCO Creative Cities' }
    ],
    testimonials: [
      { name: 'Maria Rodrigues', role: 'Alumni, Film Director', quote: 'The hands-on training and industry connections launched my career in film production.', rating: 5 },
      { name: 'Thomas Kambonde', role: 'Current Student', quote: 'The facilities are world-class and the lecturers are practicing professionals.', rating: 5 },
      { name: 'Elena Nangula', role: 'Industry Partner', quote: 'Graduates from this program bring fresh creativity and technical skills to our studio.', rating: 5 }
    ],
    socialMedia: [
      { platform: 'Instagram', icon: <FaInstagram />, handle: '@sepocollege_creative', link: 'https://instagram.com' },
      { platform: 'YouTube', icon: <FaYoutube />, handle: 'Sepo Creative', link: 'https://youtube.com' },
      { platform: 'TikTok', icon: <FaTiktok />, handle: '@sepo.creative', link: 'https://tiktok.com' }
    ]
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Certificate': return 'from-purple-600 to-purple-800';
      case 'Diploma': return 'from-indigo-600 to-purple-700';
      case 'Advanced Diploma': return 'from-purple-700 to-indigo-800';
      case 'Degree': return 'from-indigo-600 to-purple-600';
      default: return 'from-gray-700 to-gray-900';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Certificate': return 'bg-purple-900/30 text-purple-300 border-purple-700/50';
      case 'Diploma': return 'bg-indigo-900/30 text-indigo-300 border-indigo-700/50';
      case 'Advanced Diploma': return 'bg-purple-900/30 text-purple-300 border-purple-700/50';
      case 'Degree': return 'bg-indigo-900/30 text-indigo-300 border-indigo-700/50';
      default: return 'bg-gray-800/30 text-gray-300 border-gray-700/50';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 text-white">
      {/* Hero Section with Image */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative h-[50vh] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/entertainment.jpg" 
            alt="Entertainment School" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/50 via-indigo-950/50 to-purple-950/90"></div>
        </div>

        {/* Animated Grid Overlay - Subtle */}
        <div className="absolute inset-0 opacity-10 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles - Subtle */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
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
              className="flex items-center gap-2 text-sm text-purple-300/80 mb-4 backdrop-blur-sm bg-purple-950/30 px-4 py-2 rounded-full w-fit border border-purple-700/30"
            >
              <Link to="/" className="hover:text-purple-300 transition">Home</Link>
              <span>/</span>
              <Link to="/schools" className="hover:text-purple-300 transition">Schools</Link>
              <span>/</span>
              <span className="text-white">Entertainment</span>
            </motion.div>

            {/* Title with Glow Effect - More Subtle */}
            <motion.h1 
              variants={bounceIn}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                {school.name}
              </span>
            </motion.h1>

            {/* Animated Tagline */}
            <motion.div 
              variants={slideInRight}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-purple-400 to-transparent"></div>
              <p className="text-xl text-purple-200/80 font-light tracking-wide">
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
                <FaUsers className="text-purple-400" />
                <span className="text-gray-300">{school.stats.students} Students</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-indigo-400" />
                <span className="text-gray-300">{school.stats.faculty} Faculty</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaFilm className="text-purple-400" />
                <span className="text-gray-300">{school.stats.studios} Studios</span>
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
          <div className="flex items-center gap-2 text-xs text-purple-300/50">
            <span>SCROLL</span>
            <div className="w-6 h-10 border border-purple-700/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-purple-400/50 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Tabs - Subtle Design */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-purple-800/30"
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
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-20 blur-xl"
                  />
                )}
                
                {/* Border Gradient */}
                <div className={`absolute inset-0 border border-purple-700/30 rounded-lg ${
                  activeTab === tab ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                
                {/* Shine Effect */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
                
                <span className="relative capitalize">{tab}</span>
                
                {/* Active Indicator */}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                Creative Programs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-indigo-700 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Explore our range of creative programs designed to launch your career in entertainment and media.
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
                    className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(course.level)} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                    whileHover={{ opacity: 0.05 }}
                  />
                  
                  {/* Main Card */}
                  <motion.div 
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-700/30 transition-all duration-300"
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
                          <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(course.level)} rounded-xl blur-xl opacity-30`}></div>
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
                            <span className="flex items-center gap-1 text-purple-400">
                              <FaCalendarAlt size={12} />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1 text-indigo-400">
                              <FaBook size={12} />
                              {course.credits} Credits
                            </span>
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <motion.div 
                          className="text-purple-400"
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
                          className="border-t border-purple-700/20 bg-gray-900/50 overflow-hidden"
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
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Program Overview</h4>
                                  <p className="text-gray-300 leading-relaxed">{course.fullDescription}</p>
                                </div>

                                {/* Learning Outcomes */}
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Learning Outcomes</h4>
                                  <ul className="space-y-2">
                                    {course.learningOutcomes.map((outcome, i) => (
                                      <motion.li 
                                        key={i}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (i * 0.05) }}
                                        className="flex items-start gap-2 text-gray-300"
                                      >
                                        <FaCheckCircle className="text-purple-400 mt-1 flex-shrink-0" size={14} />
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
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Prerequisites</h4>
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                  >
                                    <p className="text-gray-300">{course.prerequisites}</p>
                                  </motion.div>
                                </div>

                                {/* Career Paths */}
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Career Opportunities</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.careerPaths.map((career, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gray-800/80 border border-purple-700/30 rounded-full text-sm text-gray-300"
                                      >
                                        {career}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                  <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">Program Highlights</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.highlights.map((highlight, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-700/30 rounded-full text-sm text-purple-300"
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-lg font-semibold hover:from-purple-800 hover:to-indigo-800 transition-all group"
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

        {/* Facilities Tab - Subtle Cards */}
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                Creative Facilities
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-indigo-700 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                State-of-the-art studios and creative spaces equipped with industry-standard technology
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
                  className="group relative backdrop-blur-sm bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 hover:border-purple-700/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r from-${facility.color}-700/10 to-purple-700/10`}
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
                    <div className={`absolute inset-0 bg-${facility.color}-700 rounded-xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                    <div className={`relative w-14 h-14 bg-gradient-to-br from-${facility.color}-700 to-purple-700 rounded-xl flex items-center justify-center text-white text-2xl`}>
                      {facility.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2">{facility.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-400">
                      <FaUsers className="text-purple-400" size={12} />
                      <span>{facility.capacity}</span>
                    </p>
                    <p className="text-gray-300 text-xs">{facility.equipment}</p>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-500/50 rounded-full"
                    />
                    <span className="text-xs text-gray-500">Active</span>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                Creative Research
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-indigo-700 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Pushing creative boundaries through innovative research and experimentation
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {school.researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={slideInLeft}
                  whileHover={{ y: -5 }}
                  className="group relative backdrop-blur-sm bg-gray-800/20 border border-gray-700/50 rounded-2xl p-8 hover:border-purple-700/40 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.2) 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>

                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br from-${area.color}-700 to-purple-700 rounded-2xl flex items-center justify-center text-white text-3xl`}
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
                          <span className="text-purple-400">{area.projects}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r from-${area.color}-600 to-purple-600 rounded-full`}
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
                          className={`px-3 py-1 bg-${area.color}-900/30 text-${area.color}-300 rounded-full text-xs border border-${area.color}-700/30`}
                        >
                          Research
                        </motion.span>
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs border border-purple-700/30"
                        >
                          Active
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <motion.div 
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-${area.color}-600/10 to-purple-600/10 rotate-45 translate-x-20 -translate-y-20`}
                      animate={{ rotate: [45, 50, 45] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    />
                  </div>
                </motion.div>
              ))}
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                Awards & Recognition
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-700 to-indigo-700 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 text-lg">
                Celebrating creative excellence in entertainment and media arts
              </p>
            </motion.div>

            {/* Achievement Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {school.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={zoomIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-gray-800/20 border border-gray-700/50 rounded-2xl p-8 hover:border-yellow-600/30 transition-all duration-500 overflow-hidden text-center"
                >
                  {/* Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-amber-600/5"
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
                    <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-700 to-amber-700 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto">
                      {achievement.icon}
                    </div>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="inline-block px-4 py-2 bg-gray-800/80 border border-yellow-600/30 rounded-full text-sm font-medium text-yellow-300 mb-4"
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
                className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent"
              >
                Voices of Creativity
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {school.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-sm bg-gray-800/20 border border-gray-700/50 rounded-2xl p-6 hover:border-purple-700/30 transition-all duration-500"
                  >
                    {/* Rating */}
                    <motion.div 
                      className="flex gap-1 text-yellow-500/70 mb-4"
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
                        className="w-12 h-12 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-lg"
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

            {/* Social Media Section */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Follow Our Creative Journey
              </h3>
              <div className="flex justify-center gap-6">
                {school.socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl text-purple-400 border border-purple-700/30 hover:border-purple-500 transition-all">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 mt-4">@sepocollege_creative</p>
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            }}></div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          />
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent"
          >
            Ready to Create Something Amazing?
          </motion.h2>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join the School of Entertainment and unleash your creative potential in the world of media and performing arts.
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
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-xl font-bold text-lg hover:from-purple-800 hover:to-indigo-800 transition-all overflow-hidden inline-flex items-center gap-2"
              >
                <span className="relative">Begin Your Creative Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaRocket />
                </motion.span>
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`mailto:${school.email}`}
                className="group px-8 py-4 border-2 border-purple-700/30 text-white rounded-xl font-bold text-lg hover:bg-purple-900/20 transition-all flex items-center justify-center gap-2"
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

export default Entertainment;