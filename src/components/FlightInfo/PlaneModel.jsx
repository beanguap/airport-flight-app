import { Suspense } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./PlaneModel.css"; // Import the CSS file for PlaneModel

const Model = () => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf");

  // Center and scale the model
  scene.position.set(0, 0, 0);
  scene.scale.set(0.01, 0.01, 0.01); // Adjust the scale as needed

  return <primitive object={scene} />;
};

const PlaneModel = ({ width, height, style }) => {
  return (
    <div className="plane-model" style={{ width, height, ...style }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

PlaneModel.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
};

PlaneModel.defaultProps = {
  width: "100%",
  height: "100%",
  style: {},
};

export default PlaneModel;
