import { useState, useEffect, useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Grid } from "@react-three/drei";
import * as THREE from "three";
import VirtualJoyStick from "./VirtualJoyStick/VirtualJoyStick";

const Model = ({ initialPosition, rotation }) => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true, (error) => {
    console.error("Error loading model:", error);
  });
  const { camera } = useThree();
  const modelRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(
        initialPosition.x,
        initialPosition.y,
        initialPosition.z,
      );
      modelRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
      modelRef.current.scale.set(0.01, 0.01, 0.01);

      // Center the camera on the model
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

      cameraZ *= 1.5; // Zoom out a little so object fits in view

      camera.position.set(center.x, center.y, center.z + cameraZ);
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.target.set(center.x, center.y, center.z);
        controlsRef.current.update();
      }
    }
  }, [scene, camera, initialPosition, rotation]);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls ref={controlsRef} />
    </>
  );
};

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
      variants={{
        small: { width: "100%", height: "300px", borderRadius: "15px" },
        large: { width: "100%", height: "90vh", borderRadius: "15px" },
      }}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="header">
        <h2 className="title">Flight Tracker</h2>
      </div>
      <div className="plane-model">
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Model initialPosition={{ x: 0, y: 0, z: 0 }} rotation={rotation} />
            <Grid infiniteGrid />
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
  );
};

export default ExpandablePlaneViewer;