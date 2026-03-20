// pages/Contact.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaRocket,
  FaStar,
  FaUsers,
  FaHeadset,
  FaGlobeAfrica,
  FaChevronRight
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Visit Us',
      gradient: 'from-blue-500 to-cyan-500',
      details: [
        'EXT:16 Wewer Straat',
        'Windhoek, Namibia',
        'P.O. Box 81588, Olympia'
      ]
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'Call Us',
      gradient: 'from-green-500 to-cyan-500',
      details: [
        '+264 81 2297802 (Office)',
        '++264 81 2297802(Mobile)',
        '++264 81 2297802 (Fax)'
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email Us',
      gradient: 'from-purple-500 to-pink-500',
      details: [
        'info@sepocollege.com.na',
        'admissions@sepocollege.com.na',
        'support@sepocollege.com.na'
      ]
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: 'Working Hours',
      gradient: 'from-red-500 to-orange-500',
      details: [
        'Monday - Friday: 8:00 AM - 5:00 PM',
        'Saturday: 9:00 AM - 1:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  const departments = [
    { name: 'Admissions Office', email: 'admissions@sepocollege.com.na', phone: '+264 61 123 4567 ext. 101' },
    { name: 'Academic Office', email: 'academics@sepocollege.com.na', phone: '+264 61 123 4567 ext. 102' },
    { name: 'Finance Department', email: 'finance@sepocollege.com.na', phone: '+264 61 123 4567 ext. 103' },
    { name: 'Student Services', email: 'studentservices@sepocollege.com.na', phone: '+264 61 123 4567 ext. 104' },
    { name: 'ICT Support', email: 'ict@sepocollege.com.na', phone: '+264 61 123 4567 ext. 105' },
    { name: 'Examinations Office', email: 'exams@sepocollege.com.na', phone: '+264 61 123 4567 ext. 106' },
  ];

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will respond within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: 'general',
      message: ''
    });
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

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <FaHeadset className="absolute top-20 left-[10%] text-8xl animate-float-slow" />
          <FaGlobeAfrica className="absolute bottom-20 right-[15%] text-7xl animate-float" />
          <FaUsers className="absolute top-40 right-[25%] text-6xl animate-float-delayed" />
          <FaRocket className="absolute bottom-40 left-[20%] text-7xl animate-float-slow" />
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
                Get In Touch
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Get in touch with Sepo College. We're here to answer your questions and provide assistance.
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
            <span className="text-xs text-gray-400 tracking-wider">CONNECT</span>
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

      {/* Contact Information Cards */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={rotateIn}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              <div className="relative backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 text-center h-full">
                {/* Icon Container */}
                <motion.div 
                  className="relative mb-4 inline-block"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-full blur-xl opacity-50`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto`}>
                    {info.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
          >
            <div className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={contactForm.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="academic">Academic</option>
                      <option value="finance">Finance</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback/Suggestions</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition h-48"
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 group"
                >
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Department Contacts & Map */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="space-y-8"
          >
            {/* Department Contacts */}
            <div className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Department Contacts
              </h2>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-bold text-white mb-2">{dept.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1"
                      >
                        <FaEnvelope className="text-xs" />
                        {dept.email}
                      </a>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <FaPhone className="text-xs" />
                        {dept.phone}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Connect With Us
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <FaFacebook />, color: 'from-blue-600 to-blue-700', name: 'Facebook' },
                  { icon: <FaTwitter />, color: 'from-blue-400 to-cyan-400', name: 'Twitter' },
                  { icon: <FaInstagram />, color: 'from-pink-600 to-purple-600', name: 'Instagram' },
                  { icon: <FaLinkedin />, color: 'from-blue-700 to-indigo-700', name: 'LinkedIn' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`group relative bg-gradient-to-br ${social.color} p-4 rounded-xl text-center transition-all`}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative text-white text-2xl mb-2">{social.icon}</div>
                    <p className="relative text-white text-xs font-medium">{social.name}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Our Location
              </h2>
              <div className="relative rounded-xl overflow-hidden h-64">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <FaMapMarkerAlt className="text-5xl text-red-500 mb-4" />
                  </motion.div>
                  <p className="text-white font-bold text-lg">Sepo College Campus</p>
                  <p className="text-gray-300 mb-4">123 Education Street, Windhoek</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
                  >
                    Get Directions
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainerSlow}
        className="container mx-auto px-4 py-16"
      >
        <motion.div variants={zoomIn} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6">
            Find quick answers to common questions about admissions and our college
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'How do I apply for admission?',
              a: 'You can apply through our online Student Kiosk. First, complete the quick application form on the homepage to get your student number, then proceed to the full application in the kiosk.'
            },
            {
              q: 'What are the admission requirements?',
              a: 'Requirements vary by program. Generally, you need a Grade 12 certificate with specific subject combinations. Check the specific school pages for detailed requirements.'
            },
            {
              q: 'How do I access the e-learning platform?',
              a: 'Registered students receive login credentials. Use your student number and e-learning password to access the platform through the e-Learning page.'
            },
            {
              q: 'What payment methods are available?',
              a: 'We accept bank transfers, credit/debit cards, and sponsor payments. Payment details are available in the Student Kiosk during registration.'
            },
            {
              q: 'How long does application processing take?',
              a: 'Applications are typically processed within 5-7 working days. You will receive notifications via SMS and email.'
            },
            {
              q: 'Can I study part-time or online?',
              a: 'Yes! We offer full-time, part-time, and online study options for most programs. Select your preferred mode during application.'
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group relative backdrop-blur-sm bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <h3 className="font-bold text-white mb-3 flex items-start gap-2">
                  <FaChevronRight className="text-blue-400 mt-1 flex-shrink-0" />
                  <span>Q: {faq.q}</span>
                </h3>
                <p className="text-gray-300 pl-6">A: {faq.a}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact;