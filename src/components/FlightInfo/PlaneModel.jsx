import PropTypes from 'prop-types';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

function PlaneModel({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <primitive
      object={gltf.scene}
      scale={1}
    />
  );
}

PlaneModel.propTypes = {
  modelPath: PropTypes.string.isRequired,
};

export default PlaneModel;
