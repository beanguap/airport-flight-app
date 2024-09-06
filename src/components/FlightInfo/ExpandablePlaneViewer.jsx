import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useGLTF,
  AmbientLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  PlaneGeometry,
  MeshStandardMaterial,
} from '@react-three/drei';
import PropTypes from 'prop-types';
import './ExpandablePlaneViewer.css';

// Memoized PlaneModel Component
const PlaneModel = React.memo(({ lightPosition, lightIntensity, castShadow, environmentPreset }) => {
  const planeRef = useRef();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  const loadModel = useCallback(async () => {
    try {
      const { scene } = await useGLTF('src/assets/boeing767/scene.gltf'); // Replace with actual path
      setModel(scene);
    } catch (error) {
      console.error('Failed to load the model:', error);
      setError('Failed to load the 3D model. Please try again.');
    }
  }, []);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  if (error) {
    return <span>{error}</span>;
  }

  if (!model) {
    return <span>Loading model...</span>;
  }

  return (
    <>
      <AmbientLight intensity={0.3} />
      <DirectionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow={castShadow}
        shadowMapSize={[1024, 1024]}
      />
      <PointLight position={[-5, 5, -5]} intensity={0.5} />
      <SpotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      <primitive ref={planeRef} object={model} castShadow receiveShadow />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <PlaneGeometry args={[10, 10]} />
        <MeshStandardMaterial color="white" />
      </mesh>
      <Environment preset={environmentPreset} background />
    </>
  );
});

PlaneModel.displayName = 'PlaneModel'; // Add display name for clarity

PlaneModel.propTypes = {
  lightPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  lightIntensity: PropTypes.number.isRequired,
  castShadow: PropTypes.bool.isRequired,
  environmentPreset: PropTypes.string,
};

// ExpandablePlaneViewer Component
const ExpandablePlaneViewer = ({ environmentPreset = 'sunset' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      // Adjust dimensions or camera based on container size
      // Example: containerRef.current.style.height = isExpanded ? '90vh' : '300px';
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const containerVariants = {
    small: { width: '100%', height: '300px', borderRadius: '15px' },
    large: { width: '100%', height: '90vh', borderRadius: '15px' },
  };

  return (
    <motion.div
      ref={containerRef}
      className="expandable-plane-viewer"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <h2>Flight Tracker</h2>
      <button onClick={toggleExpand} aria-label={isExpanded ? 'Shrink viewer' : 'Expand viewer'}>
        {isExpanded ? 'Shrink' : 'Expand'}
      </button>
      <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
          <PlaneModel
            lightPosition={[0, 10, 0]}
            lightIntensity={1.5}
            castShadow
            environmentPreset={environmentPreset}
          />
          <OrbitControls />
        </Canvas>
      </div>
    </motion.div>
  );
};

ExpandablePlaneViewer.propTypes = {
  environmentPreset: PropTypes.string,
};

export default ExpandablePlaneViewer;