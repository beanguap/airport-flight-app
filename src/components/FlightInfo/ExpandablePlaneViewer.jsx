import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./ExpandablePlaneViewer.css";
import PlaneModel from "./PlaneModel";
import VirtualJoyStick from "../VirtualJoyStick/VirtualJoyStick";

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotation, setRotation] = useState(() => {
    const savedRotation = localStorage.getItem("planeRotation");
    return savedRotation ? JSON.parse(savedRotation) : { x: 0, y: 0 };
  });
  const [showIndication, setShowIndication] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    small: { width: "100%", height: "300px", borderRadius: "15px" },
    large: { width: "100%", height: "90vh", borderRadius: "15px" },
  };

  const handleJoystickMove = (position) => {
    const newRotation = {
      x: position.y,
      y: position.x,
    };
    setRotation(newRotation);
    localStorage.setItem("planeRotation", JSON.stringify(newRotation));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndication(false);
    }, 5000);
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
        width={isExpanded ? "100%" : "100%"}
        height={isExpanded ? undefined : 240}
        style={{
          height: isExpanded ? "calc(90vh - 60px)" : undefined,
          width: "100%",
        }}
        rotation={rotation}
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
