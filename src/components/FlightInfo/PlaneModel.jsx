import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';

export default function PlaneModel({ modelPath }) {
  const group = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.2; // This will make the plane spin
  });

  return <primitive ref={group} object={scene} />;
}

PlaneModel.propTypes = {
  modelPath: PropTypes.string.isRequired,
};