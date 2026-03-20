import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSignInAlt,
  FaUserTie,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaFlask,
  FaLaptopCode,
  FaCar,
  FaFilm,
  FaRocket,
  FaAtom,
  FaMicrochip,
  FaCogs,
  FaPalette,
  FaArrowRight
} from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // School icons mapping
  const schoolIcons = {
    'School of Science': <FaFlask />,
    'School of Computers': <FaLaptopCode />,
    'School of Automotive': <FaCar />,
    'School of Entertainment': <FaFilm />
  };

  // School color mapping
  const schoolColors = {
    'School of Science': 'from-blue-500 to-cyan-500',
    'School of Computers': 'from-green-500 to-cyan-500',
    'School of Automotive': 'from-red-500 to-cyan-500',
    'School of Entertainment': 'from-purple-500 to-pink-500'
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Schools', path: '/schools' },
    { name: 'e-Learning', path: '/elearning' },
    { name: 'Student Kiosk', path: '/kiosk' },
    { name: 'Contact', path: '/contact' },
  ];

  const schoolsSubmenu = [
    { 
      name: 'School of Science', 
      path: '/schools/science',
      description: 'Research • Innovation • Discovery',
      icon: <FaFlask />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'School of Computers', 
      path: '/schools/computers',
      description: 'Coding • AI • Cybersecurity',
      icon: <FaLaptopCode />,
      color: 'from-green-500 to-cyan-500'
    },
    { 
      name: 'School of Automotive', 
      path: '/schools/automotive',
      description: 'EV • Diagnostics • Engineering',
      icon: <FaCar />,
      color: 'from-red-500 to-cyan-500'
    },
    { 
      name: 'School of Entertainment', 
      path: '/schools/entertainment',
      description: 'Film • Media • Creativity',
      icon: <FaFilm />,
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  // Handle link click with scroll to top
  const handleLinkClick = () => {
    scrollToTop();
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* TOP BAR - Futuristic Dark Theme */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2 border-b border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            {/* Contact Info - Left with futuristic hover */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="tel:+26461234567" className="flex items-center hover:text-blue-400 transition-colors group relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <FaPhone className="mr-2 text-blue-400 group-hover:text-blue-300 relative z-10" size={14} />
                <span className="relative z-10">+264 81 2297802</span>
              </a>
              <a href="mailto:info@sepocollege.com.na" className="flex items-center hover:text-blue-400 transition-colors group relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <FaEnvelope className="mr-2 text-blue-400 group-hover:text-blue-300 relative z-10" size={14} />
                <span className="relative z-10">info@sepocollege.com.na</span>
              </a>
            </div>

            {/* Auth Buttons - Right with futuristic design */}
            <div className="flex items-center space-x-3">
              <Link
                to="/admin/login"
                onClick={scrollToTop}
                className="group relative px-3 py-1.5 bg-purple-600/20 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-600/30 transition-all overflow-hidden border border-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-400/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <FaUserTie className="mr-1.5" size={14} />
                  Admin
                </span>
              </Link>
              
              <Link
                to="/elearning"
                onClick={scrollToTop}
                className="group relative px-3 py-1.5 bg-green-600/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-600/30 transition-all overflow-hidden border border-green-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-400/20 to-green-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <FaSignInAlt className="mr-1.5" size={14} />
                  Login
                </span>
              </Link>
              
              <Link
                to="/kiosk"
                onClick={scrollToTop}
                className="group relative px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all overflow-hidden shadow-lg shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center">
                  <FaUser className="mr-1.5" size={14} />
                  Apply
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - Futuristic Dark Theme */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-4 border-b border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            {/* Logo with futuristic glow */}
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="flex items-center space-x-3 mb-3 md:mb-0 group relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div>
                <h1 
                  className="text-6xl text-white tracking-wide relative"
                  style={{ 
                    fontFamily: "'Entirely', 'Times New Roman', serif",
                    letterSpacing: '2px',
                    textShadow: '0 0 10px rgba(59,130,246,0.5)'
                  }}
                >
                  SEPO
                  <span className="absolute -inset-1 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </h1>
                <p className="text-xs text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text tracking-wider font-medium">
                  College of Science & Technology
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Centered with futuristic design */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  item.name === 'Schools' ? (
                    <div 
                      key={item.name} 
                      className="relative"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <button 
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        className={`group relative px-4 py-2 font-medium rounded-lg transition-all duration-300 overflow-hidden ${
                          isDropdownOpen || location.pathname.includes('/schools')
                            ? 'text-blue-400'
                            : 'text-white hover:text-blue-400'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative flex items-center">
                          {item.name}
                          <FaChevronDown className={`ml-1.5 text-xs transition-all duration-300 ${
                            isDropdownOpen ? 'rotate-180 text-blue-400' : 'text-gray-500'
                          }`} />
                        </span>
                      </button>
                      
                      {/* Futuristic Dropdown Menu */}
                      <div 
                        className={`absolute left-1/2 transform -translate-x-1/2 pt-4 w-80 transition-all duration-300 ${
                          isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        {/* Glow effect behind dropdown */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-50"></div>
                        
                        {/* Invisible bridge */}
                        <div className="absolute -top-4 left-0 right-0 h-8 bg-transparent"></div>
                        
                        {/* Actual dropdown menu - Glass morphism */}
                        <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/30 shadow-2xl overflow-hidden">
                          {/* Animated background grid */}
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                          }}></div>
                          
                          {/* Decorative header with gradient and animation */}
                          <div className="relative bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 px-6 py-4 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan"></div>
                            <h3 className="text-white font-bold text-lg relative flex items-center">
                              <FaRocket className="mr-2 text-yellow-300" />
                              Explore Our Schools
                            </h3>
                            <p className="text-blue-200 text-xs mt-1 relative">Choose your path to excellence</p>
                          </div>
                          
                          {/* School links with futuristic hover effects */}
                          <div className="py-3 relative">
                            {schoolsSubmenu.map((school, index) => (
                              <Link
                                key={school.name}
                                to={school.path}
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  scrollToTop();
                                }}
                                className="group/link relative block px-6 py-4 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300"
                              >
                                {/* Animated border on hover */}
                                <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity"></div>
                                
                                <div className="flex items-start gap-4">
                                  {/* Icon with glow */}
                                  <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${school.color} rounded-xl blur-lg opacity-0 group-hover/link:opacity-50 transition-opacity`}></div>
                                    <div className={`relative w-10 h-10 bg-gradient-to-br ${school.color} rounded-xl flex items-center justify-center text-white text-lg`}>
                                      {school.icon}
                                    </div>
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-bold text-white group-hover/link:text-blue-400 transition-colors">
                                        {school.name}
                                      </h4>
                                      <FaArrowRight className="text-blue-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all text-xs" />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{school.description}</p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Quick actions footer */}
                          <div className="relative bg-gray-800/50 px-6 py-4 border-t border-blue-500/20">
                            <div className="grid grid-cols-2 gap-3">
                              <Link
                                to="/schools"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  scrollToTop();
                                }}
                                className="group/btn relative px-4 py-2 bg-gray-700/50 rounded-lg text-center overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/20 to-blue-600/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                                <span className="relative text-sm text-gray-300 group-hover/btn:text-white">All Schools</span>
                              </Link>
                              <Link
                                to="/kiosk"
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  scrollToTop();
                                }}
                                className="group/btn relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-center overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                                <span className="relative text-sm text-white">Apply Now</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        scrollToTop();
                        setIsDropdownOpen(false);
                      }}
                      className={`group relative px-4 py-2 font-medium rounded-lg transition-all duration-300 overflow-hidden ${
                        location.pathname === item.path
                          ? 'text-blue-400'
                          : 'text-white hover:text-blue-400'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative">{item.name}</span>
                      {location.pathname === item.path && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      )}
                    </Link>
                  )
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button with futuristic design */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 bg-gray-800 p-2 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all group"
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isMenuOpen ? <FaTimes size={20} className="relative" /> : <FaBars size={20} className="relative" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Futuristic Design */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-900 to-gray-800 border-t border-blue-500/20 shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              {/* Mobile Search with futuristic design */}
              <form onSubmit={handleSearch} className="mb-2 group">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={14} />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  item.name === 'Schools' ? (
                    <div key={item.name} className="space-y-2">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex justify-between items-center w-full px-4 py-3 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 rounded-lg font-medium border border-gray-700 hover:border-blue-500/50 transition-all group"
                      >
                        <span className="group-hover:text-blue-400 transition-colors">{item.name}</span>
                        <FaChevronDown className={`text-xs transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-blue-400' : 'text-gray-500'}`} />
                      </button>
                      
                      {/* Mobile Schools Submenu */}
                      {isDropdownOpen && (
                        <div className="ml-4 space-y-2 pl-4 border-l-2 border-blue-500/30">
                          {schoolsSubmenu.map((school) => (
                            <Link
                              key={school.name}
                              to={school.path}
                              onClick={handleLinkClick}
                              className="group flex items-center gap-3 px-4 py-3 bg-gray-800/30 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 rounded-lg transition-all border border-gray-700 hover:border-blue-500/30"
                            >
                              <div className={`w-8 h-8 bg-gradient-to-br ${school.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                                {school.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">{school.name}</h4>
                                <p className="text-xs text-gray-500">{school.description}</p>
                              </div>
                              <FaArrowRight className="text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-xs" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 bg-gray-800/30 hover:bg-gray-700/30 border border-gray-700 hover:border-blue-500/30'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              {/* Mobile Contact Info with futuristic design */}
              <div className="pt-4 border-t border-blue-500/20 mt-4">
                <div className="space-y-2">
                  <a href="tel:+26461234567" className="flex items-center p-3 text-gray-300 hover:text-blue-400 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <FaPhone className="mr-3 text-blue-400 relative" size={14} />
                    <span className="relative">+264 61 123 4567</span>
                  </a>
                  <a href="mailto:info@sepocollege.com.na" className="flex items-center p-3 text-gray-300 hover:text-blue-400 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all group">
                    <FaEnvelope className="mr-3 text-blue-400" size={14} />
                    <span>info@sepocollege.com.na</span>
                  </a>
                </div>
              </div>

              {/* Mobile Auth Buttons with futuristic design */}
              <div className="pt-4 border-t border-blue-500/20 grid grid-cols-3 gap-2">
                <Link
                  to="/admin/login"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center py-3 bg-purple-600/20 text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-600/30 transition-all border border-purple-500/30 group"
                >
                  <FaUserTie className="mr-1.5 group-hover:scale-110 transition-transform" size={14} />
                  Admin
                </Link>
                
                <Link
                  to="/elearning"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center py-3 bg-green-600/20 text-green-300 rounded-lg text-sm font-medium hover:bg-green-600/30 transition-all border border-green-500/30 group"
                >
                  <FaSignInAlt className="mr-1.5 group-hover:scale-110 transition-transform" size={14} />
                  Login
                </Link>
                
                <Link
                  to="/kiosk"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 group"
                >
                  <FaUser className="mr-1.5 group-hover:scale-110 transition-transform" size={14} />
                  Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;