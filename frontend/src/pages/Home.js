// pages/Home.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaFlask,
  FaLaptopCode,
  FaCar,
  FaFilm,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaGlobeAfrica,
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaRocket,
  FaMicroscope,
  FaAtom,
  FaDna,
  FaBrain,
  FaSatellite,
  FaRobot,
  FaGlobe,
  FaCogs,
  FaPaintBrush,
  FaMusic,
  FaCamera,
  FaDesktop,
  FaRegClock,
  FaShareAlt,
  FaBookmark,
  FaEllipsisH,
  FaChevronDown,
  FaEye,
  FaHeart
} from "react-icons/fa";

/* ---------------- HERO SLIDES DATA ---------------- */

const heroSlides = [
  {
    image: "/images/science.jpg",
    title: "School of Science",
    subtitle: "Discover the Future of Innovation",
    description:
      "Explore laboratories, biotechnology research, and environmental science programs.",
    highlight: "Research • Innovation • Discovery",
    button: "Explore Science",
    link: "/schools/science",
    
  },
  {
    image: "/images/AI.jpg",
    title: "School of Computers",
    subtitle: "Build Tomorrow’s Technology",
    description:
      "Master software engineering, cybersecurity, networking and AI.",
    highlight: "Coding • Cybersecurity • AI",
    button: "Explore Computing",
    link: "/schools/computers",
    
  },
  {
    image: "/images/3.jpg",
    title: "School of Automotive",
    subtitle: "Drive the Future of Mobility",
    description:
      "Learn modern vehicle engineering and diagnostics.",
    highlight: "EV Technology • Diagnostics",
    button: "Explore Automotive",
    link: "/schools/automotive",
    
  },
  {
    image: "/images/entertainment.jpg",
    title: "School of Entertainment",
    subtitle: "Create Powerful Stories",
    description:
      "Develop your creativity in filmmaking, design and digital media.",
    highlight: "Film • Media • Creativity",
    button: "Explore Media",
    link: "/schools/entertainment",
   
  }
];

/* ---------------- SCHOOLS ---------------- */

const schools = [
  {
    id: 1,
    name: "Science",
    icon: <FaFlask />,
    description:
      "Explore biology, chemistry,and environmental sciences.",
    gradient: "from-blue-500 to-blue-700",
    path: "/schools/science",
    bg:"from-blue-500 to-cyan-500",
    text: "text-blue-600",
    glow: "blue",
    iconComponent: <FaMicroscope />
  },
  {
    id: 2,
    name: "Computers",
    icon: <FaLaptopCode />,
    description:
      "Master software development, networking and cybersecurity.",
    gradient: "from-green-500 to-green-700",
    path: "/schools/computers",
    bg:"from-green-500 to-cyan-500",
    text: "text-green-600",
    glow: "green",
    iconComponent: <FaDesktop />
  },
  {
    id: 3,
    name: "Automotive",
    icon: <FaCar />,
    description:
      "Learn modern vehicle engineering and diagnostics.",
    gradient: "from-red-500 to-red-700",
    path: "/schools/automotive",
    bg:"from-red-500 to-cyan-500",
    text: "text-red-600",
    glow: "red",
    iconComponent: <FaCogs />
  },
  {
    id: 4,
    name: "Entertainment",
    icon: <FaFilm />,
    description:
      "Creative programs in film, design and media.",
    gradient: "from-purple-500 to-purple-700",
    path: "/schools/entertainment",
    bg:"from-purple-500 to-cyan-500",
    text: "text-purple-600",
    glow: "purple",
    iconComponent: <FaCamera />
  }
];

/* ---------------- NEWS ---------------- */
// 9 news items for perfect 3x3 grid
const newsItems = [
  // Row 1: Wide first, then two small
  {
    id: 1,
    title: "New Biotechnology Lab Opening at School of Science",
    summary: "State-of-the-art $2M facility to boost research in genetics and molecular biology, featuring advanced PCR, sequencing equipment, and 30 research stations.",
    imageUrl: "/images/science.jpg",
    category: "Science",
    date: "2 hours ago",
    author: "Dr. Sepo Fortune",
    readTime: "4 min",
    likes: 234,
    views: 1200,
    featured: true,
    wide: "left", // Wide on left in row 1
    link: "/news/science"
  },
  {
    id: 2,
    title: "Tech Hackathon 2026: Students Develop AI Solution",
    summary: "Student teams compete for $10,000 prize, creating innovative AI-powered solutions for sustainable farming.",
    imageUrl: "/images/4.jpg",
    category: "Technology",
    date: "Yesterday",
    author: "Prof. Sepiso Hope",
    readTime: "3 min",
    likes: 456,
    views: 2300,
    featured: false,
    wide: "none",
    link: "/news/hackathon"
  },
  {
    id: 3,
    title: "EV Internship Program Launches with Major Partners",
    summary: "Automotive students gain hands-on experience with Tesla, Toyota, and local EV manufacturers.",
    imageUrl: "/images/2.jpeg",
    category: "Automotive",
    date: "3 days ago",
    author: "Eng. Thabo Happy",
    readTime: "5 min",
    likes: 189,
    views: 890,
    featured: false,
    wide: "none",
    link: "/news/ev"
  },
  
  // Row 2: Two small first, wide last
  {
    id: 4,
    title: "Film Festival Winners: Student Documentary Goes Viral",
    summary: "Entertainment students win national awards with documentary on Namibian culture, receiving praise from industry professionals.",
    imageUrl: "/images/1.jpg",
    category: "Entertainment",
    date: "5 days ago",
    author: "Prof. Libangosi Bkay",
    readTime: "2 min",
    likes: 567,
    views: 3400,
    featured: false,
    wide: "none",
    link: "/news/film"
  },
  {
    id: 5,
    title: "School of Computers Ranked Top 10 in Africa for AI Research",
    summary: "International ranking recognizes excellence in artificial intelligence and machine learning research programs.",
    imageUrl: "/images/AI.jpg",
    category: "Technology",
    date: "1 week ago",
    author: "Prof. Michael Chen",
    readTime: "3 min",
    likes: 789,
    views: 4500,
    featured: true,
    wide: "none",
    link: "/news/ranking"
  },
  {
    id: 6,
    title: "Alumni Success: Science Graduate Wins Prestigious Research Award",
    summary: "Dr. Maria Nangula receives Young Scientist Award for breakthrough research in cancer treatment using nanotechnology.",
    imageUrl: "/images/science.jpg",
    category: "Alumni",
    date: "1 week ago",
    author: "Alumni Office",
    readTime: "4 min",
    likes: 345,
    views: 2100,
    featured: true,
    wide: "right", // Wide on right in row 2
    link: "/news/alumni"
  },
  
  // Row 3: Wide first, then two small
  {
    id: 7,
    title: "New Partnership with Tech Giants for Student Internships",
    summary: "Microsoft, Google, and Amazon partner with Sepo College for exclusive internship programs starting next semester.",
    imageUrl: "/images/AI.jpg",
    category: "Technology",
    date: "2 weeks ago",
    author: "Career Office",
    readTime: "3 min",
    likes: 567,
    views: 3200,
    featured: false,
    wide: "left", // Wide on left in row 3
    link: "/news/partnership"
  },
  {
    id: 8,
    title: "Science Symposium 2026: Students Present Groundbreaking Research",
    summary: "Annual research symposium showcases student innovations in various scientific fields with industry judges.",
    imageUrl: "/images/science.jpg",
    category: "Science",
    date: "2 weeks ago",
    author: "Dr. Sarah Johnson",
    readTime: "4 min",
    likes: 234,
    views: 1500,
    featured: false,
    wide: "none",
    link: "/news/symposium"
  },
  {
    id: 9,
    title: "Entertainment Students Win at International Film Festival",
    summary: "Student film wins Best Documentary at the African Film Festival, competing against professional filmmakers.",
    imageUrl: "/images/4.jpg",
    category: "Entertainment",
    date: "3 weeks ago",
    author: "Prof. Lisa Wong",
    readTime: "2 min",
    likes: 890,
    views: 5600,
    featured: false,
    wide: "none",
    link: "/news/film-festival"
  }
];

const Home = () => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [animationPhase, setAnimationPhase] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    // Reset animation phase when slide changes
    setAnimationPhase(0);
    
    // Phase 1: Heading pops up (after image loads)
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 200);
    
    // Phase 2: Content slides in sentence by sentence
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 900);
    
    // Phase 3: Heading drops, links emerge
    const phase3Timer = setTimeout(() => setAnimationPhase(3), 2600);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
    };
  }, [slide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Toggle save/bookmark
  const toggleSave = (id) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(item => item !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  // Toggle like
  const toggleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(item => item !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  // Image sliding animation with smoother easing
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.4 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.6 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: 0.4 }
      }
    })
  };

  // Heading animation - smooth pop up then smooth drop
  const headingVariants = {
    initial: { 
      y: 0,
      opacity: 0,
      scale: 0.95
    },
    phase1: { 
      y: -35,
      opacity: 1,
      scale: 1.1,
      transition: {
        y: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] },
        opacity: { duration: 0.5, ease: "easeOut" },
        scale: { duration: 0.6, ease: [0.2, 0.9, 0.3, 1] }
      }
    },
    phase2: { 
      y: -35,
      opacity: 1,
      scale: 1.1
    },
    phase3: { 
      y: 20,
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },
    final: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    }
  };

  // Content sliding in sentence by sentence with smooth easing
  const subtitleVariants = {
    hidden: { x: 400, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { 
        x: { duration: 0.7, ease: [0.2, 0.9, 0.3, 1], delay: 0.1 },
        opacity: { duration: 0.6, ease: "easeOut", delay: 0.1 }
      }
    }
  };

  const descriptionVariants = {
    hidden: { x: 400, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { 
        x: { duration: 0.7, ease: [0.2, 0.9, 0.3, 1], delay: 0.3 },
        opacity: { duration: 0.6, ease: "easeOut", delay: 0.3 }
      }
    }
  };

  const highlightVariants = {
    hidden: { x: 400, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { 
        x: { duration: 0.7, ease: [0.2, 0.9, 0.3, 1], delay: 0.5 },
        opacity: { duration: 0.6, ease: "easeOut", delay: 0.5 }
      }
    }
  };

  // Links emerging from bottom with smooth motion
const linksVariants = {
  hidden: { 
    y: 50,
    opacity: 0
  },
  phase3: { 
    y: 0,
    opacity: 1,
    transition: {
      y: { 
        duration: 0.6, 
        ease: [0.2, 0.9, 0.3, 1],
        delay: 0.1
      },
      opacity: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.1
      }
    }
  }
};

  // Content wrapper movement for phase 3
  const contentWrapperVariants = {
    phase2: { y: 0 },
    phase3: { 
      y: 20,
      transition: {
        y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },
    final: { 
      y: 0,
      transition: {
        y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    }
  };

  // Animation variants for schools section
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
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* ---------------- HERO ---------------- */}

      <section className="relative h-[80vh] overflow-hidden">
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden z-10">
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

        {/* Sliding images */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`image-${slide}`}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img 
              src={heroSlides[slide].image} 
              alt={heroSlides[slide].title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content with gear-like animation */}
        <div className="relative z-20 container mx-auto px-8 md:px-12 lg:px-16 h-full flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-3xl ml-4 md:ml-8 lg:ml-12"
            >
              {/* Breadcrumb */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                // className="flex items-center gap-2 text-sm text-cyan-300/80 mb-4 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full w-fit border border-cyan-500/20"
              >
                {/* <span>Welcome to</span>
                <span className="text-white">Sepo College</span> */}
              </motion.div>

              {/* Heading - moves up then drops down */}
              <motion.h1 
                variants={headingVariants}
                initial="initial"
                animate={
                  animationPhase === 0 ? "initial" :
                  animationPhase === 1 ? "phase1" :
                  animationPhase === 2 ? "phase2" :
                  animationPhase === 3 ? "phase3" : "final"
                }
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 whitespace-normal break-words"
                style={{ maxWidth: '100%' }}
              >
                <span className="bg-white bg-clip-text text-transparent">
                  {heroSlides[slide].title}
                </span>
              </motion.h1>

              {/* Content wrapper that moves in phase 3 */}
              <motion.div
                variants={contentWrapperVariants}
                animate={
                  animationPhase >= 3 ? "phase3" : 
                  animationPhase === 2 ? "phase2" : "phase2"
                }
              >
                {/* Content that slides in sentence by sentence */}
                <motion.div
                  initial="hidden"
                  animate={animationPhase >= 2 ? "phase2" : "hidden"}
                >
                  <motion.h2 
                    variants={subtitleVariants}
                    className="text-lg md:text-xl text-cyan-300 mb-3 whitespace-normal break-words"
                  >
                    {heroSlides[slide].subtitle}
                  </motion.h2>

                  <motion.p 
                    variants={descriptionVariants}
                    className="text-gray-300 mb-3 text-sm md:text-base whitespace-normal break-words"
                  >
                    {heroSlides[slide].description}
                  </motion.p>

                  <motion.div 
                    variants={highlightVariants}
                    className="inline-block px-3 py-1.5 bg-yellow-500 text-white font-semibold rounded-full mb-4 text-sm"
                  >
                    {heroSlides[slide].highlight}
                  </motion.div>
                </motion.div>
              </motion.div>

              

                  {/* Links that emerge from bottom */}
                  <motion.div
                    variants={linksVariants}
                    initial="hidden"
                    animate={animationPhase >= 3 ? "phase3" : "hidden"}
                    className="mt-4" // Add margin-top to create space
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={heroSlides[slide].link}
                        className="group relative px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 text-center overflow-hidden text-sm md:text-base"
                      >
                        <span className="relative flex items-center justify-center gap-2">
                          {heroSlides[slide].button}
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </Link>

                      <Link
                        to="/kiosk"
                        className="px-4 md:px-5 py-2 md:py-2.5 border-2 border-cyan-500/50 text-white rounded-lg hover:bg-white/5 transition-all transform hover:scale-105 text-center backdrop-blur-sm text-sm md:text-base"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 p-2.5 text-white rounded-full hover:bg-black/60 transition z-30 backdrop-blur-sm border border-white/10"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 p-2.5 text-white rounded-full hover:bg-black/60 transition z-30 backdrop-blur-sm border border-white/10"
        >
          <FaChevronRight />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > slide ? 1 : -1);
                setSlide(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-8 bg-cyan-400" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-4 right-8 z-30 hidden md:block"
        >
          <div className="flex items-center gap-2 text-xs text-cyan-300/60">
            <span>SCROLL</span>
            <div className="w-6 h-10 border border-cyan-500/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-2 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------------- SCHOOLS ---------------- Futuristic Section with Tilt Effect */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 relative overflow-hidden"
      >
        {/* Futuristic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/5 text-4xl"
              initial={{ 
                x: Math.random() * 100,
                y: Math.random() * 100,
                rotate: 0
              }}
              animate={{ 
                y: [null, -30, 30, -30],
                rotate: 360
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 ? <FaAtom /> : i % 3 === 1 ? <FaMicroscope /> : <FaDna />}
            </motion.div>
          ))}
        </div>

        <div className="relative container mx-auto px-6 z-10">
          {/* Section Header */}
          <motion.div 
            variants={zoomIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-yellow-500 bg-clip-text text-transparent">
                Explore Our Schools
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg">
              Discover your path to excellence across our specialized schools
            </p>
          </motion.div>

          {/* Schools Grid with Tilt Effect */}
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {schools.map((school, index) => (
              <motion.div
                key={school.id}
                variants={rotateIn}
                className="group relative"
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="cyan"
                  glarePosition="all"
                  scale={1.02}
                  transitionSpeed={400}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-${school.glow}-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500">
                    {/* Header with Gradient */}
                    <div className={`relative p-6 bg-gradient-to-br ${school.bg} bg-opacity-90`}>
                      {/* Icon Container */}
                      <motion.div 
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {school.iconComponent || school.icon}
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
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {school.description}
                      </p>

                      {/* Explore Link */}
                      <Link
                        to={school.path}
                        className="group/link inline-flex items-center gap-2 text-yellow-400 font-semibold hover:text-cyan-300 transition-colors"
                      >
                        Explore School
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <FaArrowRight className="text-sm" />
                        </motion.span>
                      </Link>

                      {/* Hover Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-transparent rotate-45 translate-x-8 -translate-y-8"></div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    
      {/* ---------------- STATS ---------------- Futuristic Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 relative overflow-hidden"
      >
        {/* Background with Parallax */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
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

        <div className="relative container mx-auto px-6 z-10">
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-10 text-center">
            <motion.div variants={fadeInUp} className="group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaUserGraduate />
                </div>
              </div>
              <motion.h3 
                className="text-5xl font-bold text-black mb-2"
                whileHover={{ scale: 1.1 }}
              >
                5000+
              </motion.h3>
              <p className="text-yellow-400 text-lg">Students</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaChalkboardTeacher />
                </div>
              </div>
              <motion.h3 
                className="text-5xl font-bold text-black mb-2"
                whileHover={{ scale: 1.1 }}
              >
                120+
              </motion.h3>
              <p className="text-yellow-400 text-lg">Lecturers</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-4xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <FaGlobeAfrica />
                </div>
              </div>
              <motion.h3 
                className="text-5xl font-bold text-black mb-2"
                whileHover={{ scale: 1.1 }}
              >
                30+
              </motion.h3>
              <p className="text-yellow-400 text-lg">Programs</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------------- NEWS ---------------- 3x3 Grid with Alternating Wide Cards */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"></div>

        <div className="relative container mx-auto px-6 z-10">
          {/* Section Header */}
          <motion.div variants={zoomIn} className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Latest News
              </h2>
              <span className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
            </div>
            <p className="text-gray-400">Stay updated with the latest happenings at Sepo College</p>
          </motion.div>

          {/* News Feed - Perfect 3x3 Grid with Alternating Wide Cards */}
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
            >
              {newsItems.map((news, index) => {
                // Determine column span based on wide property and position in grid
                let colSpan = "lg:col-span-1";
                
                // Row 1: Index 0 (wide left), indices 1-2 (normal)
                // Row 2: Indices 3-4 (normal), index 5 (wide right)
                // Row 3: Index 6 (wide left), indices 7-8 (normal)
                
                if (news.wide === "left") {
                  colSpan = "lg:col-span-2"; // Wide card spans 2 columns
                } else if (news.wide === "right") {
                  colSpan = "lg:col-span-2"; // Wide card spans 2 columns
                }
                
                return (
                  <motion.div
                    key={news.id}
                    variants={fadeInUp}
                    custom={index}
                    className={`${colSpan} h-full`}
                  >
                    <Link to={news.link} className="group block h-full">
                      <div className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 h-full">
                        {/* Animated gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="relative h-full flex flex-col">
                          {/* Image Container - Fixed height */}
                          <div className="h-36 overflow-hidden">
                            <img
                              src={news.imageUrl}
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                            
                            {/* Category Tag */}
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-medium rounded-full z-10">
                              {news.category}
                            </span>
                            
                            {/* Featured Badge */}
                            {news.featured && (
                              <span className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-bold rounded-full z-10">
                                FEATURED
                              </span>
                            )}
                          </div>

                          {/* Content - Compact padding */}
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 line-clamp-2">
                              {news.title}
                            </h3>
                            
                            <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                              {news.summary}
                            </p>

                            {/* Meta - Smaller text */}
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-3">
                              <span className="flex items-center gap-1">
                                <FaRegClock className="text-cyan-400 text-[8px]" />
                                {news.date}
                              </span>
                              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                              <span>{news.readTime}</span>
                            </div>

                            {/* Actions - Compact */}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleLike(news.id);
                                  }}
                                  className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <FaHeart className={`text-xs ${likedItems.includes(news.id) ? 'text-red-500 fill-red-500' : ''}`} />
                                  <span className="text-[10px]">{likedItems.includes(news.id) ? news.likes + 1 : news.likes}</span>
                                </button>
                                <span className="flex items-center gap-1 text-gray-400">
                                  <FaEye className="text-blue-400 text-xs" />
                                  <span className="text-[10px]">{news.views}</span>
                                </span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleSave(news.id);
                                }}
                                className={`text-xs text-gray-400 hover:text-cyan-400 transition-colors ${savedItems.includes(news.id) ? 'text-cyan-400' : ''}`}
                              >
                                <FaBookmark />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Hover border effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* News Ticker - Compact */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-cyan-400 font-semibold whitespace-nowrap text-xs">⚡ TRENDING:</span>
                <div className="flex gap-6 animate-marquee">
                  {newsItems.map((news) => (
                    <Link key={news.id} to={news.link} className="text-gray-300 hover:text-cyan-400 transition-colors text-xs whitespace-nowrap">
                      {news.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ---------------- CTA ---------------- Futuristic CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative py-28 overflow-hidden"
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

        <div className="relative container mx-auto px-6 text-center z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Start Your Future Today
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Join Sepo College and build the career you dream of.
          </motion.p>
          
          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/kiosk"
                className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl text-lg hover:from-cyan-600 hover:to-blue-600 transition-all overflow-hidden inline-flex items-center gap-2"
              >
                <span className="relative">Apply Now</span>
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
          </motion.div>
        </div>
      </motion.section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;