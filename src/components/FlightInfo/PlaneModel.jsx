import { Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Grid } from "@react-three/drei";
import * as THREE from "three";
import "./PlaneModel.css";

const Model = ({ initialPosition, rotation }) => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf");
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

Model.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  rotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
};

Model.defaultProps = {
  initialPosition: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
};

const PlaneModel = ({
  width = "100%",
  height = "100%",
  style = {},
  rotation = { x: 0, y: 0, z: 0 },
  initialPosition = { x: 0, y: 0, z: 0 },
}) => {
  return (
    <div className="plane-model" style={{ width, height, ...style }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model initialPosition={initialPosition} rotation={rotation} />
          <Grid infiniteGrid />
        </Suspense>
      </Canvas>
    </div>
  );
};

PlaneModel.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  rotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
};

export default PlaneModel;