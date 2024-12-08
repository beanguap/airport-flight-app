import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import PropTypes from 'prop-types';
import * as THREE from "three";

export const Model = ({ initialPosition, rotation }) => {
  // Update path to correctly point to your model file
  const { scene } = useGLTF("/public/boeing-767/source/boeing-767.gltf", true);
  const { camera, size } = useThree();
  const modelRef = useRef();
  const controlsRef = useRef();



  useEffect(() => {
    if (modelRef.current) {
      // Set position and rotation from props
      modelRef.current.position.set(
        initialPosition?.x || 0,
        initialPosition?.y || 0,
        initialPosition?.z || 0
      );
      modelRef.current.rotation.set(
        rotation?.x || 0,
        rotation?.y || Math.PI / 2,
        rotation?.z || 0
      );
      modelRef.current.scale.set(0.008, 0.008, 0.008);

      const box = new THREE.Box3().setFromObject(modelRef.current);
      const sizeBox = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);
      const fov = 60;
      camera.fov = fov;
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      let cameraZ = Math.abs(maxDim / 2 / Math.tan((fov / 2) * (Math.PI / 180)));
      cameraZ *= 2;

      camera.position.set(0, 2, cameraZ);
      camera.lookAt(0, 0, 0);

      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [scene, camera, size, initialPosition, rotation]);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={5}
        maxDistance={100}
        enablePan={true}
        enableZoom={true}
      />
    </>
  );
};

Model.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  rotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
};

Model.defaultProps = {
  initialPosition: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: Math.PI / 2, z: 0 }
};

export default Model;