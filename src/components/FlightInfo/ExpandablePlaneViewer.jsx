import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import VirtualJoyStick from "./VirtualJoyStick/VirtualJoyStick";
import Model from "./Model";
import './ExpandablePlaneViewer.css';

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Maintain rotation state in memory (no localStorage)
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // A stable, default camera position (no localStorage)
  const cameraPosition = [-2, 0, 0];
  
  const [showIndication, setShowIndication] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleJoystickMove = (position) => {
    // Map joystick position directly to rotation
    const newRotation = {
      x: position.y,
      y: position.x,
    };
    setRotation(newRotation);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndication(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="viewer-wrapper">
      <motion.div
        className="expandable-plane-viewer"
        variants={{
          small: { width: "100%", height: "300px", borderRadius: "15px", margin: "0 20px" },
          large: { width: "100%", height: "90vh", borderRadius: "15px", margin: "0 20px" },
        }}
        initial="small"
        animate={isExpanded ? "large" : "small"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="header">
          <h2 className="title">Flight Tracker</h2>
        </div>

        <div className="plane-model">
          <Canvas camera={{ position: cameraPosition, fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              {/* The Model receives rotation as a prop and just rotates the model accordingly */}
              <Model rotation={rotation} />
            </Suspense>
          </Canvas>
        </div>

        <div className="joystick-container">
          <VirtualJoyStick onMove={handleJoystickMove} />
          {showIndication && (
            <div className="joystick-indication">
              Use the joystick to control the plane
            </div>
          )}
        </div>

        <button
          onClick={toggleExpand}
          className="expand-button"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Shrink plane viewer" : "Expand plane viewer"}
        >
          {isExpanded ? "Shrink" : "Expand"}
        </button>
      </motion.div>
    </div>
  );
};

export default ExpandablePlaneViewer;
