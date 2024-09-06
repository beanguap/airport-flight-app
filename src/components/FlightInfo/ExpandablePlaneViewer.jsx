import React, { useState, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import './ExpandablePlaneViewer.css';
import ErrorBoundary from './ErrorBoundary';

const PlaneModel = React.memo(function PlaneModel({ lightPosition, lightIntensity, castShadow }) {
  const planeRef = useRef();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  const gltf = useGLTF(new URL('../assets/boeing-767/source/!.gltf', import.meta.url).href); // Ensure correct path

  useEffect(() => {
    if (gltf) {
      setModel(gltf.scene);
    } else {
      setError('Failed to load the 3D model. Please try again.');
    }
  }, [gltf]);

  if (error) {
    return <span>{error}</span>;
  }

  if (!model) {
    return <span>Loading model...</span>;
  }

  return (
    <>
      {/* Correct usage of lights from THREE */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow={castShadow}
        shadowMapSize-width={1024}
        shadowMapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      <primitive object={model} ref={planeRef} />
    </>
  );
});

PlaneModel.propTypes = {
  lightPosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  lightIntensity: PropTypes.number.isRequired,
  castShadow: PropTypes.bool.isRequired,
};

export default function ExpandablePlaneViewer(props) {
  return (
    <ErrorBoundary>
      <PlaneModel {...props} />
    </ErrorBoundary>
  );
}
