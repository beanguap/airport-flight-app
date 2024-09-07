import React, { useState, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import './ExpandablePlaneViewer.css';
import ErrorBoundary from './ErrorBoundary';

const PlaneModel = React.memo(function PlaneModel({ lightPosition, lightIntensity, castShadow }) {
  const planeRef = useRef();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  // Construct the URL for the GLTF file relative to the current JS file
  const gltfPath = new URL('src/assets/boeing-767/source/boeing-767.gltf', import.meta.url).toString();
  
  const { scene, error: gltfError } = useGLTF(gltfPath);

  useEffect(() => {
    if (scene) {
      setModel(scene);
    } else if (gltfError) {
      setError('Failed to load the 3D model. Please check the file path or network requests.');
    }
  }, [scene, gltfError]);

  if (error) {
    return <span className="error-message">{error}</span>;
  }

  if (!model) {
    return <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>; // Placeholder while loading
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow={castShadow}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
  lightPosition: PropTypes.arrayOf(PropTypes.number),
  lightIntensity: PropTypes.number,
  castShadow: PropTypes.bool
};

export default function ExpandablePlaneViewer(props) {
  return (
    <ErrorBoundary>
      <PlaneModel {...props} />
    </ErrorBoundary>
  );
}