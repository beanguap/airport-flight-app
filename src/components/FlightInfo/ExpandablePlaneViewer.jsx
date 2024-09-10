import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./ExpandablePlaneViewer.css"; // Import the CSS file
import PlaneModel from "./PlaneModel";
import VirtualJoyStick from "../VirtualJoyStick/VirtualJoyStick"; // Import the VirtualJoyStick component

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [showIndication, setShowIndication] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    small: { width: "100%", height: "300px", borderRadius: "15px" },
    large: { width: "100%", height: "90vh", borderRadius: "15px" },
  };

  const handleJoystickMove = (position) => {
    // Update the rotation state based on joystick position
    setRotation({
      x: position.y, // Adjust as needed for your model's rotation
      y: position.x, // Adjust as needed for your model's rotation
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndication(false);
    }, 5000); // Hide indication after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="expandable-plane-viewer"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="header">
        <h2 className="title">Flight Tracker</h2>
        <button
          onClick={toggleExpand}
          className="expand-button"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Shrink plane viewer" : "Expand plane viewer"
          }
        >
          {isExpanded ? "Shrink" : "Expand"}
        </button>
      </div>
      <PlaneModel
        width={isExpanded ? "100%" : 100} // Use "100%" for width as string
        height={isExpanded ? undefined : 240} // Use undefined for calc or percentage heights
        style={{
          height: isExpanded ? "calc(90vh - 60px)" : undefined,
          width: isExpanded ? "100%" : "100%",
        }}
        rotation={rotation} // Pass the rotation state to the PlaneModel
      />
      <div className="joystick-container">
        <VirtualJoyStick onMove={handleJoystickMove} />
        {showIndication && (
          <div className="joystick-indication">
            Use the joystick to control the plane
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExpandablePlaneViewer;
