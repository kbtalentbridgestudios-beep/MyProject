import { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBriefcase,
  FaInfoCircle,
  FaImages,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaNewspaper,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // refs and timeout for dropdown
  const aboutRef = useRef(null);
  const leaveTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // click outside handler to close About dropdown
  useEffect(() => {
    const handleDocClick = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "candidate") return "/dashboard/candidate";
    if (user.role === "employer") return "/dashboard/employer";
    if (user.role === "admin") return "/dashboard/admin";
    return "/";
  };

  const handleAboutMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    // small delay to avoid flicker when moving cursor into dropdown
    leaveTimeout.current = setTimeout(() => setAboutOpen(false), 140);
  };

  const handleAboutClick = () => {
    setAboutOpen((p) => !p);
  };

  return (
    <>
      {/* Fixed Gradient Navbar */}
      <motion.nav
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-black via-red-900 to-black shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            : "bg-gradient-to-r from-gray-900 via-black to-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.img
              src={logo}
              alt="KBTS"
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-gray-100 relative">
            {/* Pages */}
            <Link
              to="/"
              className={`flex items-center gap-2 group ${
                location.pathname === "/" ? "text-red-400" : "text-gray-300"
              }`}
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                <FaHome />
              </motion.div>
              <span className="relative">
                Home
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

              <Link
              to="/news"
              className={`flex items-center gap-2 group ${
                location.pathname === "/news" ? "text-red-400" : "text-gray-300"
              }`}
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                <FaNewspaper />
              </motion.div>
              <span className="relative">
                News
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              to="/job"
              className={`flex items-center gap-2 group ${
                location.pathname === "/job" ? "text-red-400" : "text-gray-300"
              }`}
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                <FaBriefcase />
              </motion.div>
              <span className="relative">
                Job
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            <Link
              to="/gallery"
              className={`flex items-center gap-2 group ${
                location.pathname === "/gallery"
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.2 }}>
                <FaImages />
              </motion.div>
              <span className="relative">
                Gallery
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>

            {/* About Us Dropdown - robust */}
            <div
              ref={aboutRef}
              className="relative flex items-center gap-2 cursor-pointer"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
              onClick={handleAboutClick}
              tabIndex={0} // supports keyboard focus
              aria-haspopup="menu"
              aria-expanded={aboutOpen}
            >
              <FaInfoCircle />
              <span className="relative">
                About Us
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </span>

              {/* Dropdown */}
              {aboutOpen && (
                <div className="absolute top-full mt-3 w-44 bg-black/95 border border-red-700 rounded-lg shadow-lg text-gray-200 z-50">
                  <Link
                    to="/about"
                    className="block px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    onClick={() => setAboutOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/our-vision"
                    className="block px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    onClick={() => setAboutOpen(false)}
                  >
                    Our Vision
                  </Link>
                  <Link
                    to="/our-mission"
                    className="block px-4 py-2 hover:bg-red-600 hover:text-white transition"
                    onClick={() => setAboutOpen(false)}
                  >
                    Our Mission
                  </Link>
                </div>
              )}
            </div>

            {/* Auth Links */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 group ${
                    location.pathname === "/login" ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  <FaSignInAlt />
                  <span className="relative">
                    Login
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center gap-2 group ${
                    location.pathname === "/register" ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  <FaUserPlus />
                  <span className="relative">
                    Register
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardPath()}
                  className="flex items-center gap-2 text-gray-300 group"
                >
                  <FaUser />
                  <span className="relative">
                    Profile
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 group"
                >
                  <FaSignOutAlt />
                  <span className="relative">
                    Logout
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <FaBars size={26} className="text-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-3/4 sm:w-64 bg-gradient-to-b from-black via-red-900 to-black border-l border-red-700 text-white z-[9999] shadow-2xl"
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={28} className="text-red-400" />
          </button>
        </div>

        <div className="flex flex-col space-y-6 mt-10 ml-6 font-bold text-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
            <FaHome /> Home
          </Link>
          <Link to="/news" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
            <FaNewspaper /> News
          </Link>
          <Link to="/job" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
            <FaBriefcase /> Job
          </Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
            <FaImages /> Gallery
          </Link>

          {/* Mobile About Dropdown */}
          <div className="flex flex-col ml-1">
            <div 
              className="flex items-center gap-2 hover:text-red-400 cursor-pointer"
              onClick={() => setAboutOpen(prev => !prev)}
            >
              <FaInfoCircle /> About Us
            </div>
            {aboutOpen && (
              <div className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
                <Link to="/about" onClick={() => { setIsOpen(false); setAboutOpen(false); }} className="block hover:text-red-400">
                  About Us
                </Link>
                <Link to="/our-vision" onClick={() => { setIsOpen(false); setAboutOpen(false); }} className="block hover:text-red-400">
                  Our Vision
                </Link>
                <Link to="/our-mission" onClick={() => { setIsOpen(false); setAboutOpen(false); }} className="block hover:text-red-400">
                  Our Mission
                </Link>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
                <FaUserPlus /> Register
              </Link>
            </>
          ) : (
            <>
              <Link to={dashboardPath()} onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-red-400">
                <FaUser /> Profile
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400">
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
