// pages/Schools/Science.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaFlask, 
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUniversity,
  FaMicroscope,
  FaFlask as FaBeaker,
  FaAtom,
  FaLeaf,
  FaDna,
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
  FaGlobeAfrica,
  FaHeartbeat,
  FaChartLine,
  FaCogs,
  FaRegLightbulb,
  FaRegGem,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
  FaBrain,
  FaSatellite,
  FaSpaceShuttle,
  FaGlobe,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaTree,
  FaFish,
  FaBug,
  FaLeaf as FaLeafIcon
} from 'react-icons/fa';

const Science = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const school = {
    id: 'science',
    name: 'School of Science',
    shortDescription: 'Advancing knowledge through research and innovation',
    description: 'Our School of Science provides comprehensive education in natural sciences with state-of-the-art laboratory facilities. We focus on practical skills and research methodologies that prepare students for successful careers in science and technology.',
    icon: <FaFlask className="text-4xl text-blue-600" />,
    color: 'blue',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    stats: {
      students: '450+',
      faculty: '35+',
      programs: '12',
      researchCenters: '5',
      publications: '120+',
      successRate: '94%'
    },
    courses: [
      { 
        name: 'Biology Fundamentals', 
        code: 'SCI101',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 120,
        icon: <FaDna className="text-green-500" />,
        color: 'green',
        description: 'Introduction to biological concepts, cell structure, and basic life processes',
        fullDescription: 'This comprehensive course covers the fundamental principles of biology including cell structure and function, genetics, evolution, and ecology. Students will engage in hands-on laboratory work, learning essential techniques such as microscopy, cell culture, and DNA analysis. The course emphasizes critical thinking and scientific methodology, preparing students for advanced studies in biological sciences.',
        learningOutcomes: [
          'Understand cell structure and function',
          'Master basic laboratory techniques',
          'Analyze genetic inheritance patterns',
          'Evaluate ecological relationships',
          'Apply scientific method to biological questions'
        ],
        prerequisites: 'Grade 12 Biology (minimum 60%)',
        careerPaths: ['Research Assistant', 'Laboratory Technician', 'Biology Teacher', 'Environmental Consultant'],
        highlights: ['Lab Work', 'Field Trips', 'Research Project']
      },
      { 
        name: 'Chemistry & Laboratory Techniques', 
        code: 'SCI102',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaBeaker className="text-blue-500" />,
        color: 'blue',
        description: 'Fundamental principles of chemistry with hands-on laboratory experience',
        fullDescription: 'This diploma program provides a thorough foundation in analytical, organic, and physical chemistry. Students develop proficiency in modern laboratory techniques including spectroscopy, chromatography, and titration. The curriculum emphasizes safety protocols, data analysis, and technical report writing. Graduates are prepared for roles in quality control, research laboratories, and chemical industries.',
        learningOutcomes: [
          'Master analytical chemistry techniques',
          'Conduct organic synthesis reactions',
          'Operate laboratory instrumentation',
          'Analyze chemical data statistically',
          'Implement safety protocols'
        ],
        prerequisites: 'Grade 12 Chemistry and Mathematics',
        careerPaths: ['Analytical Chemist', 'Quality Control Specialist', 'Laboratory Manager', 'Chemical Technician'],
        highlights: ['Analytical Chemistry', 'Organic Synthesis', 'Instrumentation']
      },
      { 
        name: 'Physics Principles', 
        code: 'SCI103',
        duration: '1 Year', 
        level: 'Certificate',
        credits: 120,
        icon: <FaAtom className="text-purple-500" />,
        color: 'purple',
        description: 'Core concepts in mechanics, energy, and motion',
        fullDescription: 'This certificate program explores the fundamental laws of physics governing our universe. Topics include classical mechanics, thermodynamics, electromagnetism, and introduction to quantum physics. Students engage in problem-solving sessions and laboratory experiments that demonstrate theoretical concepts. The course develops strong analytical and mathematical skills applicable to various technical fields.',
        learningOutcomes: [
          'Apply Newtonian mechanics principles',
          'Solve thermodynamic problems',
          'Understand electromagnetic theory',
          'Perform physics experiments',
          'Develop mathematical modeling skills'
        ],
        prerequisites: 'Grade 12 Physics and Mathematics',
        careerPaths: ['Physics Assistant', 'Engineering Technician', 'Data Analyst', 'Science Educator'],
        highlights: ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism']
      },
      { 
        name: 'Environmental Science', 
        code: 'SCI104',
        duration: '2 Years', 
        level: 'Diploma',
        credits: 240,
        icon: <FaLeafIcon className="text-emerald-500" />,
        color: 'emerald',
        description: 'Study of ecosystems, environmental challenges, and conservation',
        fullDescription: 'This diploma program addresses critical environmental issues facing our planet. Students study ecosystem dynamics, climate change impacts, pollution control, and sustainable resource management. Fieldwork components allow students to collect and analyze environmental data. The curriculum integrates policy, ethics, and scientific principles to develop well-rounded environmental professionals.',
        learningOutcomes: [
          'Assess ecosystem health',
          'Analyze climate data trends',
          'Develop conservation strategies',
          'Conduct environmental impact assessments',
          'Implement sustainability practices'
        ],
        prerequisites: 'Grade 12 Science and Geography',
        careerPaths: ['Environmental Consultant', 'Conservation Officer', 'Sustainability Coordinator', 'Field Researcher'],
        highlights: ['Ecology', 'Climate Change', 'Sustainability']
      },
      { 
        name: 'Science Laboratory Technology', 
        code: 'SCI201',
        duration: '3 Years', 
        level: 'Advanced Diploma',
        credits: 360,
        icon: <FaMicroscope className="text-amber-500" />,
        color: 'amber',
        description: 'Advanced laboratory techniques and research methodologies',
        fullDescription: 'This advanced diploma prepares students for leadership roles in laboratory settings. The curriculum covers advanced analytical techniques, laboratory management, quality assurance systems, and research methodology. Students complete a major research project, gaining experience in experimental design, data analysis, and scientific writing. Graduates are qualified for senior technician positions in research institutions and industry.',
        learningOutcomes: [
          'Master advanced analytical methods',
          'Manage laboratory operations',
          'Implement quality assurance systems',
          'Design research experiments',
          'Prepare scientific publications'
        ],
        prerequisites: 'Certificate or Diploma in Science',
        careerPaths: ['Senior Laboratory Technician', 'Quality Assurance Officer', 'Research Assistant', 'Laboratory Manager'],
        highlights: ['Microbiology', 'Analytical Methods', 'Quality Control']
      },
      { 
        name: 'Astrophysics & Space Science', 
        code: 'SCI301',
        duration: '3 Years', 
        level: 'Degree',
        credits: 360,
        icon: <FaSatellite className="text-indigo-500" />,
        color: 'indigo',
        description: 'Study of celestial phenomena and space exploration',
        fullDescription: 'This degree program explores the mysteries of the cosmos through the lens of modern astrophysics. Students study stellar evolution, galactic dynamics, cosmology, and space exploration technologies. The curriculum includes observational astronomy using our on-campus observatory. Computational modeling and data analysis from real space missions prepare students for careers in space research and aerospace industries.',
        learningOutcomes: [
          'Analyze stellar spectra and evolution',
          'Model galactic dynamics',
          'Understand cosmological theories',
          'Process astronomical data',
          'Apply space technology principles'
        ],
        prerequisites: 'Diploma in Physics or Mathematics',
        careerPaths: ['Astrophysics Researcher', 'Space Scientist', 'Observatory Technician', 'Aerospace Analyst'],
        highlights: ['Observational Astronomy', 'Cosmology', 'Space Technology']
      },
      { 
        name: 'Neuroscience & Cognitive Science', 
        code: 'SCI302',
        duration: '3 Years', 
        level: 'Degree',
        credits: 360,
        icon: <FaBrain className="text-pink-500" />,
        color: 'pink',
        description: 'Exploration of brain function and cognitive processes',
        fullDescription: 'This interdisciplinary degree combines biology, psychology, and computational approaches to understand the brain. Students study neural mechanisms, cognitive functions, and neurological disorders. Laboratory work includes EEG recording, behavioral experiments, and neural imaging analysis. The program prepares students for research careers in neuroscience, cognitive science, and related health fields.',
        learningOutcomes: [
          'Understand neural signaling mechanisms',
          'Analyze cognitive processes',
          'Conduct neuroscience experiments',
          'Interpret brain imaging data',
          'Apply computational neuroscience models'
        ],
        prerequisites: 'Diploma in Biology or Psychology',
        careerPaths: ['Neuroscience Researcher', 'Cognitive Scientist', 'Clinical Research Coordinator', 'Neuroimaging Technician'],
        highlights: ['Brain Imaging', 'Cognitive Psychology', 'Neurological Disorders']
      },
      { 
        name: 'Biotechnology & Genetic Engineering', 
        code: 'SCI303',
        duration: '4 Years', 
        level: 'Degree',
        credits: 480,
        icon: <FaDna className="text-green-600" />,
        color: 'green',
        description: 'Application of biological systems in technology',
        fullDescription: 'This comprehensive degree program focuses on the manipulation of biological systems for practical applications. Students learn genetic engineering techniques, protein expression systems, and bioprocessing methods. The curriculum includes recombinant DNA technology, CRISPR applications, and bioinformatics. A substantial research project allows students to contribute to cutting-edge developments in the field.',
        learningOutcomes: [
          'Master genetic engineering techniques',
          'Apply CRISPR technology',
          'Develop bioprocessing protocols',
          'Analyze genomic data',
          'Design biotechnology experiments'
        ],
        prerequisites: 'Diploma in Biology or Chemistry',
        careerPaths: ['Biotechnologist', 'Genetic Engineer', 'Research Scientist', 'Biopharmaceutical Specialist'],
        highlights: ['CRISPR Technology', 'Protein Engineering', 'Bioinformatics']
      }
    ],
    facilities: [
      { name: 'Molecular Biology Lab', icon: <FaDna />, color: 'green', capacity: '30 students', equipment: 'PCR, Centrifuges, Sequencers' },
      { name: 'Analytical Chemistry Lab', icon: <FaBeaker />, color: 'blue', capacity: '25 students', equipment: 'HPLC, GC-MS, Spectrophotometers' },
      { name: 'Physics Research Center', icon: <FaAtom />, color: 'purple', capacity: '20 students', equipment: 'Laser Systems, Oscilloscopes, Vacuum Chambers' },
      { name: 'Environmental Field Station', icon: <FaLeafIcon />, color: 'emerald', capacity: '40 students', equipment: 'Weather Stations, Water Sensors' },
      { name: 'Biotechnology Lab', icon: <FaDna />, color: 'amber', capacity: '25 students', equipment: 'Fermenters, Incubators, Bioreactors' },
      { name: 'Observatory', icon: <FaSatellite />, color: 'indigo', capacity: '15 students', equipment: 'Telescopes, Spectrographs' },
      { name: 'Neuroscience Lab', icon: <FaBrain />, color: 'pink', capacity: '20 students', equipment: 'EEG, Eye-trackers, VR Systems' },
      { name: 'Science Library', icon: <FaBook />, color: 'gray', capacity: '100 students', equipment: 'Digital Resources, Journals, Databases' }
    ],
    requirements: 'Grade 12 with Science & Mathematics, Minimum 25 points in 5 subjects including Science and Mathematics',
    email: 'sepocollege@gmail.com',
    phone: '+264 812297802',
    location: 'Science Complex, Main Campus',
    departmentHead: 'Prof. Sarah Johnson, PhD',
    researchAreas: [
      { name: 'Molecular Biology', icon: <FaDna />, color: 'green', projects: 8, description: 'Gene expression and regulation' },
      { name: 'Environmental Chemistry', icon: <FaLeafIcon />, color: 'emerald', projects: 6, description: 'Pollution monitoring and remediation' },
      { name: 'Quantum Physics', icon: <FaAtom />, color: 'purple', projects: 5, description: 'Quantum computing and materials' },
      { name: 'Climate Change Studies', icon: <FaGlobeAfrica />, color: 'blue', projects: 7, description: 'Climate modeling and impacts' },
      { name: 'Biotechnology', icon: <FaMicroscope />, color: 'amber', projects: 9, description: 'Genetic engineering and bioprocessing' },
      { name: 'Neuroscience', icon: <FaBrain />, color: 'pink', projects: 6, description: 'Brain-computer interfaces' },
      { name: 'Astrophysics', icon: <FaSatellite />, color: 'indigo', projects: 4, description: 'Exoplanet detection' }
    ],
    achievements: [
      { year: '2024', title: 'Best Research Institution Award', icon: <FaAward />, description: 'National Science Foundation' },
      { year: '2023', title: 'Innovation in Science Education', icon: <FaRocket />, description: 'African Education Awards' },
      { year: '2022', title: 'International Collaboration Grant', icon: <FaGlobeAfrica />, description: 'UNESCO Science Program' }
    ],
    testimonials: [
      { name: 'Dr. Maria Nangula', role: 'Alumni, Research Scientist', quote: 'The School of Science prepared me excellently for my career in research. The hands-on experience and mentorship were invaluable.', rating: 5 },
      { name: 'John Kambonde', role: 'Current Student', quote: 'State-of-the-art facilities and supportive lecturers make learning enjoyable. I\'m proud to be part of this community.', rating: 5 },
      { name: 'Prof. David Namib', role: 'Industry Partner', quote: 'Graduates from this program are well-prepared and make immediate contributions to our research team.', rating: 5 }
    ]
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Certificate': return 'from-cyan-500 to-blue-500';
      case 'Diploma': return 'from-blue-500 to-indigo-500';
      case 'Advanced Diploma': return 'from-indigo-500 to-purple-500';
      case 'Degree': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Certificate': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Diploma': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Advanced Diploma': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Degree': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-blue-700 to-indigo-700 text-white">
      {/* Hero Section with Image from Home */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative h-[50vh] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/science.jpg" 
            alt="Science Laboratory" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90"></div>
        </div>

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
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
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <motion.div 
              variants={slideInLeft}
              className="flex items-center gap-2 text-sm text-cyan-300/80 mb-4 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full w-fit border border-cyan-500/20"
            >
              <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
              <span>/</span>
              <Link to="/schools" className="hover:text-cyan-300 transition">Schools</Link>
              <span>/</span>
              <span className="text-white">Science</span>
            </motion.div>

            {/* Title with Glow Effect */}
            <motion.h1 
              variants={bounceIn}
              className="text-6xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                {school.name}
              </span>
            </motion.h1>

            {/* Animated Tagline */}
            <motion.div 
              variants={slideInRight}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              <p className="text-xl text-cyan-300/90 font-light tracking-wide">
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
                <FaUsers className="text-cyan-400" />
                <span className="text-gray-300">{school.stats.students} Students</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-400" />
                <span className="text-gray-300">{school.stats.faculty} Faculty</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <FaMicroscope className="text-purple-400" />
                <span className="text-gray-300">{school.stats.researchCenters} Research Centers</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-cyan-300/60 tracking-wider">SCROLL</span>
            <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-cyan-400 rounded-full mt-2"
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
        className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-cyan-500/20"
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
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"
                  />
                )}
                
                {/* Border Gradient */}
                <div className={`absolute inset-0 border border-cyan-500/30 rounded-lg ${
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
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Academic Programs
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-6 text-lg">
                Explore our comprehensive range of science programs. Click on any course to see detailed information.
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
                    className="relative backdrop-blur-sm bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
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
                            <span className="flex items-center gap-1 text-cyan-400">
                              <FaCalendarAlt size={12} />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1 text-blue-400">
                              <FaBook size={12} />
                              {course.credits} Credits
                            </span>
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <motion.div 
                          className="text-cyan-400"
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
                          className="border-t border-cyan-500/20 bg-gray-900/50 overflow-hidden"
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
                                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Program Overview</h4>
                                  <p className="text-gray-300 leading-relaxed">{course.fullDescription}</p>
                                </div>

                                {/* Learning Outcomes */}
                                <div>
                                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Learning Outcomes</h4>
                                  <ul className="space-y-2">
                                    {course.learningOutcomes.map((outcome, i) => (
                                      <motion.li 
                                        key={i}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (i * 0.05) }}
                                        className="flex items-start gap-2 text-gray-300"
                                      >
                                        <FaCheckCircle className="text-cyan-400 mt-1 flex-shrink-0" size={14} />
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
                                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Prerequisites</h4>
                                  <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                                  >
                                    <p className="text-gray-300">{course.prerequisites}</p>
                                  </motion.div>
                                </div>

                                {/* Career Paths */}
                                <div>
                                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Career Opportunities</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.careerPaths.map((career, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gray-800/80 border border-cyan-500/20 rounded-full text-sm text-gray-300"
                                      >
                                        {career}
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Program Highlights</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {course.highlights.map((highlight, i) => (
                                      <motion.span 
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                        whileHover={{ scale: 1.1 }}
                                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300"
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
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all group"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Advanced Facilities
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-6 text-lg">
                State-of-the-art laboratories and research centers equipped with cutting-edge technology
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
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Glow */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r from-${facility.color}-500/10 to-cyan-500/10`}
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
                    <div className={`absolute inset-0 bg-${facility.color}-500 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    <div className={`relative w-14 h-14 bg-gradient-to-br from-${facility.color}-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl`}>
                      {facility.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2">{facility.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-gray-400">
                      <FaUsers className="text-cyan-400" size={12} />
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
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Research Excellence
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-6 text-lg">
                Pushing the boundaries of knowledge through innovative research
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {school.researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={slideInLeft}
                  whileHover={{ y: -5 }}
                  className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)',
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>

                  <div className="relative flex items-start gap-6">
                    {/* Icon */}
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br from-${area.color}-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl`}
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
                          <span className="text-cyan-400">{area.projects}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r from-${area.color}-500 to-cyan-500 rounded-full`}
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
                          className={`px-3 py-1 bg-${area.color}-500/20 text-${area.color}-300 rounded-full text-xs border border-${area.color}-500/30`}
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
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-${area.color}-500/20 to-transparent rotate-45 translate-x-20 -translate-y-20`}
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
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Awards & Recognition
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-6 text-lg">
                Celebrating excellence in science education and research
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
                className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              >
                Voices of Excellence
              </motion.h3>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {school.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500"
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
                        className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)'
            }}></div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Ready to Shape the Future?
          </motion.h2>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join the School of Science and become part of a community dedicated to discovery and innovation.
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
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all overflow-hidden inline-flex items-center gap-2"
              >
                <span className="relative">Begin Your Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaRocket />
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
                className="group px-8 py-4 border-2 border-cyan-500/50 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2"
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

export default Science;