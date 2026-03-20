// pages/Schools.js

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFlask, 
  FaLaptopCode, 
  FaCar, 
  FaFilm,
  FaArrowRight,
  FaChevronDown,
  FaStar,
  FaRocket,
  FaGraduationCap,
  FaUsers,
  FaAward
} from 'react-icons/fa';

const Schools = () => {
  const schoolsData = [
    {
      id: 'science',
      name: 'School of Science',
      shortDescription: 'Comprehensive education in natural sciences with state-of-the-art laboratory facilities.',
      icon: <FaFlask className="text-3xl" />,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-600 to-cyan-600',
      text: 'text-blue-400',
      path: '/schools/science',
      highlights: ['Modern Labs', 'Research Focus', 'Practical Training'],
      stats: { students: '450+', programs: '12', labs: '8' }
    },
    {
      id: 'computers',
      name: 'School of Computers',
      shortDescription: 'Cutting-edge IT education focusing on software development, networking, and information systems.',
      icon: <FaLaptopCode className="text-3xl" />,
      color: 'green',
      gradient: 'from-green-500 to-cyan-500',
      bg: 'from-green-600 to-cyan-600',
      text: 'text-green-400',
      path: '/schools/computers',
      highlights: ['Software Development', 'Network Admin', 'Web Development'],
      stats: { students: '650+', programs: '15', labs: '12' }
    },
    {
      id: 'automotive',
      name: 'School of Automotive',
      shortDescription: 'Comprehensive training in vehicle mechanics, driving skills, and automotive technology.',
      icon: <FaCar className="text-3xl" />,
      color: 'red',
      gradient: 'from-red-500 to-cyan-500',
      bg: 'from-red-600 to-cyan-600',
      text: 'text-red-400',
      path: '/schools/automotive',
      highlights: ['Driving Skills', 'Vehicle Maintenance', 'Engineering'],
      stats: { students: '320+', programs: '12', workshops: '6' }
    },
    {
      id: 'entertainment',
      name: 'School of Entertainment',
      shortDescription: 'Creative arts, media production, and performance arts for the creative industries.',
      icon: <FaFilm className="text-3xl" />,
      color: 'purple',
      gradient: 'from-purple-500 to-cyan-500',
      bg: 'from-purple-600 to-cyan-600',
      text: 'text-purple-400',
      path: '/schools/entertainment',
      highlights: ['Media Production', 'Graphic Design', 'Performing Arts'],
      stats: { students: '380+', programs: '15', studios: '8' }
    },
  ];

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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const zoomIn = {
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
    hidden: { opacity: 0, x: -50 },
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
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, -100]
              }}
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

        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={zoomIn} className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                Discover Your Path
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Schools & Programs
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Sepo College offers specialized education through four distinct schools, 
              each providing industry-relevant programs and hands-on training in state-of-the-art facilities.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 tracking-wider">EXPLORE</span>
            <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schools Overview Cards */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolsData.map((school, index) => (
            <motion.div
              key={school.id}
              variants={rotateIn}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${school.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              {/* Card */}
              <div className="relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full">
                {/* Header with Gradient */}
                <div className={`relative p-6 bg-gradient-to-br ${school.bg} bg-opacity-90`}>
                  {/* Icon Container */}
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {school.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-1">{school.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(school.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {school.shortDescription}
                  </p>
                  
                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {school.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${school.color}-400`}></span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <Link 
                      to={school.path}
                      className={`group/link inline-flex items-center gap-1 ${school.text} font-semibold hover:text-white transition-colors text-sm`}
                    >
                      View Details
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <FaArrowRight className="text-xs" />
                      </motion.span>
                    </Link>
                    
                    <Link 
                      to="/kiosk"
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all ${school.text}`}
                    >
                      Apply
                    </Link>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${school.gradient} opacity-20 rotate-45 translate-x-8 -translate-y-8`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Schools Quick Navigation */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="container mx-auto px-4 py-16"
      >
        <motion.div variants={zoomIn} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quick School Navigation
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6">
            Explore each school in detail or jump straight to your program of interest
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schoolsData.map((school, index) => (
              <motion.div 
                key={school.id} 
                variants={slideInLeft}
                custom={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${school.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <Link 
                  to={school.path}
                  className="relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 hover:border-white/30 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${school.bg} flex items-center justify-center text-white text-xl`}>
                      {school.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{school.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">Click to explore programs</p>
                    </div>
                  </div>
                  <FaChevronDown className={`transform transition-transform group-hover:rotate-180 ${school.text} text-xl`} />
                </Link>
                
                {/* Dropdown preview */}
                <div className="absolute left-0 right-0 top-full mt-2 bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-xl z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-3">{school.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <Link 
                        to={school.path}
                        className={`${school.text} hover:text-white transition-colors text-sm font-medium flex items-center gap-1`}
                      >
                        Full Details <FaArrowRight className="text-xs" />
                      </Link>
                      <Link 
                        to="/kiosk"
                        className={`px-3 py-1 rounded-lg text-xs font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-all ${school.text}`}
                      >
                        Quick Apply
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 relative overflow-hidden"
      >
        {/* Background with Parallax */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            }}></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1800+</div>
              <div className="text-gray-300">Active Students</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">120+</div>
              <div className="text-gray-300">Expert Faculty</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">54</div>
              <div className="text-gray-300">Programs Offered</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">94%</div>
              <div className="text-gray-300">Employment Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Application CTA */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-20 overflow-hidden"
      >
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          />
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Ready to Start Your Journey?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of successful graduates from Sepo College. 
            Choose your preferred school and apply today!
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/kiosk" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all overflow-hidden inline-flex items-center gap-2"
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
              <Link 
                to="/contact" 
                className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                Request More Info
              </Link>
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

export default Schools;