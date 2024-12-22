import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css";
import flightIcon from "../../assets/icons/flight.svg";
import homeIcon from "../../assets/icons/home.svg";
import luggageIcon from "../../assets/icons/luggage.svg";
import passportIcon from "../../assets/icons/passport.svg";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipItem, setTooltipItem] = useState(null);

  const navItems = [
    { to: "/flight-tracker", icon: <img src={flightIcon} alt="Flight" />, label: "Flight" },
    { to: "/", icon: <img src={homeIcon} alt="Home" />, label: "Home" },
    { to: "/luggage", icon: <img src={luggageIcon} alt="Luggage" />, label: "Luggage" },
    { to: "/passport", icon: <img src={passportIcon} alt="Passport" />, label: "Passport" },
  ];

  // Handle scroll behavior
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translate(-50%, 100%)";
      } else {
        navbar.style.transform = "translate(-50%, 0)";
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e) => {
      const currentIndex = navItems.findIndex(item => item.to === location.pathname);
      
      if (e.key === "ArrowRight" && currentIndex < navItems.length - 1) {
        navigate(navItems[currentIndex + 1].to);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigate(navItems[currentIndex - 1].to);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [location.pathname, navigate, navItems]);

  const handleNavClick = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const currentIndex = navItems.findIndex(item => item.to === location.pathname);

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0 && currentIndex < navItems.length - 1) {
        navigate(navItems[currentIndex + 1].to);
      } else if (diff < 0 && currentIndex > 0) {
        navigate(navItems[currentIndex - 1].to);
      }
    }
  };

  const handleHover = (item) => {
    const timer = setTimeout(() => {
      setTooltipItem(item);
      setShowTooltip(true);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <nav 
      className="navbar" 
      role="navigation" 
      aria-label="Main Navigation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence >
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.02 }}
              className="nav-item-container"
              onMouseEnter={() => handleHover(item)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Link
                to={item.to}
                className={`nav-icon ${isActive ? "active" : ""}`}
                onClick={handleNavClick}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                {item.icon}
                {showTooltip && tooltipItem === item && (
                  <motion.span
                    className="tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
              {isActive && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1]
                  }}
                />
              )}
              {isLoading && (
                <motion.div 
                  className="loading-shimmer"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;