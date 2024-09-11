import { Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./PlaneModel.css"; // Import the CSS file for PlaneModel

const Model = ({ rotation }) => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf");

  // Center and scale the model
  scene.position.set(0, 0, 0);
  scene.scale.set(0.01, 0.01, 0.01); // Adjust the scale as needed
  scene.rotation.set(rotation.x, rotation.y, 0); // Apply rotation

  const { camera } = useThree();
  const controlsRef = useRef();

  // Function to save the camera position and rotation in localStorage
  const saveCameraState = () => {
    const cameraState = {
      position: camera.position.toArray(),
      rotation: camera.rotation.toArray(),
      target: controlsRef.current.target.toArray(), // Target for OrbitControls
    };
    localStorage.setItem("cameraState", JSON.stringify(cameraState));
  };

  // Function to load the camera position and rotation from localStorage
  const loadCameraState = () => {
    const savedState = localStorage.getItem("cameraState");
    if (savedState) {
      const { position, rotation, target } = JSON.parse(savedState);
      camera.position.fromArray(position);
      camera.rotation.fromArray(rotation);
      controlsRef.current.target.fromArray(target);

      // Force the controls to update with the new target
      controlsRef.current.update();
    }
  };

  useEffect(() => {
    // Load the saved camera state when the component mounts
    loadCameraState();

    // Save the camera state whenever it changes
    const controls = controlsRef.current;
    controls.addEventListener("change", saveCameraState);

    // Clean up the event listener when the component unmounts
    return () => {
      controls.removeEventListener("change", saveCameraState);
    };
  }, [camera]);

  return (
    <>
      <primitive object={scene} />
      <OrbitControls ref={controlsRef} />
    </>
  );
};

const PlaneModel = ({ width, height, style, rotation }) => {
  return (
    <div className="plane-model" style={{ width, height, ...style }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model rotation={rotation} />
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
  }),
};

PlaneModel.defaultProps = {
  width: "100%",
  height: "100%",
  style: {},
  rotation: { x: 0, y: 0 },
};

export default PlaneModel;
