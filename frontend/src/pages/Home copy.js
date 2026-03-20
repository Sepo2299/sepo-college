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
  FaUser
} from "react-icons/fa";

/* ---------------- HERO SLIDES DATA ---------------- */

const heroSlides = [
  {
    image: "/images/1.jpg",
    title: "School of Science",
    subtitle: "Discover the Future of Innovation",
    description:
      "Explore laboratories, biotechnology research, and environmental science programs.",
    highlight: "Research • Innovation • Discovery",
    button: "Explore Science",
    link: "/schools/science",
    
  },
  {
    image: "/images/2.jpeg",
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
    image: "/images/4.jpg",
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
      "Explore biology, chemistry, physics and environmental sciences.",
    gradient: "from-blue-500 to-blue-700",
    path: "/schools/science",
    bg:"from-blue-500 to-blue-700",
    text: "text-blue-600"
  },
  {
    id: 2,
    name: "Computers",
    icon: <FaLaptopCode />,
    description:
      "Master software development, networking and cybersecurity.",
    gradient: "from-green-500 to-green-700",
    path: "/schools/computers",
    bg:"from-green-500 to-green-700",
    text: "text-green-600"
  },
  {
    id: 3,
    name: "Automotive",
    icon: <FaCar />,
    description:
      "Learn modern vehicle engineering and diagnostics.",
    gradient: "from-red-500 to-red-700",
    path: "/schools/automotive",
    bg:"from-red-500 to-red-700",
    text: "text-red-600"
  },
  {
    id: 4,
    name: "Entertainment",
    icon: <FaFilm />,
    description:
      "Creative programs in film, design and media.",
    gradient: "from-purple-500 to-purple-700",
    path: "/schools/entertainment",
    bg:"from-purple-500 to-purple-700",
    text: "text-purple-600"
  }
];

/* ---------------- NEWS ---------------- */

const newsItems = [
  {
    id: 1,
    title: "New Science Lab Opening",
    date: "March 15, 2026",
    author: "Dr. Sarah Johnson",
    content: "New biotechnology lab opening next month.",
    link: "/news/science"
  },
  {
    id: 2,
    title: "Tech Hackathon 2026",
    date: "March 10, 2026",
    author: "Prof. Michael Chen",
    content: "Students compete for $10,000 innovation prize.",
    link: "/news/hackathon"
  },
  {
    id: 3,
    title: "EV Internship Program",
    date: "March 5, 2026",
    author: "Eng. Robert Miles",
    content: "Automotive students gain EV industry internships.",
    link: "/news/ev"
  },
  {
    id: 4,
    title: "Film Festival Winners",
    date: "March 1, 2026",
    author: "Prof. Lisa Wong",
    content: "Entertainment students win national awards.",
    link: "/news/film"
  }
];

const Home = () => {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Reset animation phase when slide changes
    setAnimationPhase(0);
    
    // Phase 1: Heading pops up (after image loads)
    const phase1Timer = setTimeout(() => setAnimationPhase(1), 100);
    
    // Phase 2: Content slides in sentence by sentence
    const phase2Timer = setTimeout(() => setAnimationPhase(2), 800);
    
    // Phase 3: Heading drops, links emerge
    const phase3Timer = setTimeout(() => setAnimationPhase(3), 2400);

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
    }, 8000);

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

  // Image sliding animation
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration: 0.7, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    })
  };

  // Heading animation - pops up then drops down
  const headingVariants = {
    initial: { 
      y: 0,
      opacity: 0,
      scale: 0.3
    },
    phase1: { 
      y: -30,
      opacity: 1,
      scale: 1.1,
      transition: {
        y: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    phase2: { 
      y: -30,
      opacity: 1,
      scale: 1.1
    },
    phase3: { 
      y: 20,
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.3, ease: "easeInOut" },
        scale: { duration: 0.3 }
      }
    },
    final: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.3, ease: "easeInOut" },
        scale: { duration: 0.3 }
      }
    }
  };

  // Content sliding in sentence by sentence
  const contentVariants = {
    hidden: { 
      x: 300,
      opacity: 0
    },
    phase2: (custom) => ({
      x: 0,
      opacity: 1,
      transition: {
        x: { 
          duration: 0.5, 
          ease: "easeOut",
          delay: custom * 0.5 // Stagger each sentence
        },
        opacity: { 
          duration: 0.4,
          delay: custom * 0.15
        }
      }
    }),
    phase3: { 
      x: 0,
      opacity: 1,
      y: 0
    }
  };

  // Links emerging from bottom
  const linksVariants = {
    hidden: { 
      y: 60,
      opacity: 0
    },
    phase3: { 
      y: 0,
      opacity: 1,
      transition: {
        y: { 
          duration: 0.4, 
          ease: "easeOut",
          delay: 0.1
        },
        opacity: { 
          duration: 0.3,
          delay: 0.1
        }
      }
    }
  };

  // Subtitle animation (part of content)
  const subtitleVariants = {
    hidden: { x: 300, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.15 }
    }
  };

  const descriptionVariants = {
    hidden: { x: 300, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.3 }
    }
  };

  const highlightVariants = {
    hidden: { x: 300, opacity: 0 },
    phase2: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.45 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100">

      {/* ---------------- HERO ---------------- */}

      <section className="relative h-[600px] overflow-hidden">

        {/* Sliding images */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide}
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
            <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content with gear-like animation */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl relative"
            >
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
                className="text-5xl md:text-6xl font-bold text-white mb-4 relative z-20"
              >
                {heroSlides[slide].title}
              </motion.h1>

              {/* Content that slides in sentence by sentence */}
              <motion.div
                initial="hidden"
                animate={animationPhase >= 2 ? "phase2" : "hidden"}
                className="relative z-10"
                style={{ y: animationPhase >= 3 ? 20 : 0 }}
              >
                <motion.h2 
                  variants={subtitleVariants}
                  className="text-2xl text-blue-300 mb-6"
                >
                  {heroSlides[slide].subtitle}
                </motion.h2>

                <motion.p 
                  variants={descriptionVariants}
                  className="text-gray-200 mb-6"
                >
                  {heroSlides[slide].description}
                </motion.p>

                <motion.div 
                  variants={highlightVariants}
                  className="inline-block px-4 py-2 bg-yellow-400 text-black font-semibold rounded-full mb-8"
                >
                  {heroSlides[slide].highlight}
                </motion.div>
              </motion.div>

              {/* Links that emerge from bottom */}
              <motion.div
                variants={linksVariants}
                initial="hidden"
                animate={animationPhase >= 3 ? "phase3" : "hidden"}
                className="relative z-30"
              >
                <div className="flex gap-4">
                  <Link
                    to={heroSlides[slide].link}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:scale-105 transition"
                  >
                    {heroSlides[slide].button}
                  </Link>

                  <Link
                    to="/kiosk"
                    className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition"
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
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 text-white rounded-full hover:bg-black/60 transition z-20"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 p-3 text-white rounded-full hover:bg-black/60 transition z-20"
        >
          <FaChevronRight />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > slide ? 1 : -1);
                setSlide(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === slide ? "bg-yellow-400 w-6" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>

      </section>

      {/* ---------------- SCHOOLS ---------------- */}
      <section className="py-20 bg-black">
    
        <div className="container mx-auto px-6">
    
          <h2 className="text-4xl font-bold text-center mb-14 text-yellow-400">
            Explore Our Schools
          </h2>
    
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schools.map((school, index)=>(
              <motion.div
                key={school.id}
                initial={{opacity:0, y:40}}
                whileInView={{opacity:1, y:0}}
                transition={{delay: index * 0.2}}
                viewport={{once: true}}
              >
                <Tilt glareEnable glareMaxOpacity={0.4} scale={1.05}>
                  <div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                    
                    {/* header - always visible */}
                    <div className={`flex items-center gap-4 p-6 bg-gradient-to-r ${school.bg}`}>
                      <div className="text-3xl text-white">
                        {school.icon}
                      </div>
                      <h3 className="text-white font-semibold text-lg">
                        {school.name}
                      </h3>
                    </div>

                    {/* body - always visible, no hover needed */}
                    <div className="p-6 bg-white">
                      <p className="text-gray-600 text-sm mb-4">
                        {school.description}
                      </p>
                      <Link
                        to={school.path}
                        className={`inline-flex items-center text-sm font-semibold ${school.text} hover:underline`}
                      >
                        Explore School
                        <FaArrowRight className="ml-2 text-xs"/>
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
    
        </div>
    
      </section>
    
      {/* ---------------- STATS ---------------- */}

      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <FaUserGraduate className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p>Students</p>
          </div>

          <div>
            <FaChalkboardTeacher className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">120+</h3>
            <p>Lecturers</p>
          </div>

          <div>
            <FaGlobeAfrica className="text-5xl text-yellow-300 mx-auto mb-4"/>
            <h3 className="text-4xl font-bold">30+</h3>
            <p>Programs</p>
          </div>

        </div>

      </section>

      {/* ---------------- NEWS ---------------- */}

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">

        <div className="container mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Latest News
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {newsItems.map((news) => (

              <div
                key={news.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
              >

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">

                  <h3 className="font-bold text-lg">
                    {news.title}
                  </h3>

                  <div className="text-xs mt-2 flex gap-4 opacity-80">

                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1"/>
                      {news.date}
                    </span>

                    <span className="flex items-center">
                      <FaUser className="mr-1"/>
                      {news.author}
                    </span>

                  </div>

                </div>

                <div className="p-6">

                  <p className="text-gray-600 text-sm mb-4">
                    {news.content}
                  </p>

                  <Link
                    to={news.link}
                    className="text-blue-600 font-semibold flex items-center hover:underline"
                  >
                    Read More <FaArrowRight className="ml-2"/>
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ---------------- CTA ---------------- */}

      <section className="py-28 text-center text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">

        <h2 className="text-4xl font-bold mb-6">
          Start Your Future Today
        </h2>

        <p className="mb-10 text-lg">
          Join Sepo College and build the career you dream of.
        </p>

        <Link
          to="/kiosk"
          className="px-10 py-4 bg-white text-blue-700 font-bold rounded-lg hover:scale-105 transition inline-block"
        >
          Apply Now
        </Link>

      </section>

    </div>
  );
};

export default Home;