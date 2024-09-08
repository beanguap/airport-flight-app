import { Suspense } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./PlaneModel.css"; // Import the CSS file for PlaneModel

const Model = () => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf");
  return <primitive object={scene} />;
};

const PlaneModel = ({ width, height, style }) => {
  return (
    <div className="plane-model" style={{ width, height, ...style }}>
      <Canvas>
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
