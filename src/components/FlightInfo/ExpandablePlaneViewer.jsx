import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import VirtualJoyStick from "../VirtualJoyStick/VirtualJoyStick";
import Model from "./Model";
import './ExpandablePlaneViewer.css';

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Keep rotation at (0,0) initially so the model stays in its side profile view
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Camera positioned along the Z-axis for a side-on view
  const cameraPosition = [0, 0, 5];

  const [showIndication, setShowIndication] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleJoystickMove = (position) => {
    const newRotation = {
      x: position.y,
      y: position.x
    };
    setRotation(newRotation);
  };

  // Reset rotation when the viewer is shrunk back
  useEffect(() => {
    if (!isExpanded) {
      setRotation({ x: 0, y: 0 });
    }
  }, [isExpanded]);

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

        <div className="plane-model" style={{ position: 'relative', flex: '1' }}>
          <Canvas camera={{ position: cameraPosition, fov: 50, near: 0.1, far: 1000 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              {/* Model should be rotated to side profile in Model.jsx and centered after it loads */}
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
