import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export const Model = ({ initialPosition, rotation }) => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true);
  const { camera, size } = useThree();
  const modelRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      // Set initial position and scale
      modelRef.current.position.set(0, 0, 0);
      modelRef.current.rotation.set(0, Math.PI / 2, 0); // 90 degrees around Y-axis
      modelRef.current.scale.set(0.008, 0.008, 0.008); // Adjusted scale

      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const sizeBox = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);
      const fov = 60; // Reduced FOV for less distortion
      camera.fov = fov;
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();

      let cameraZ = Math.abs(maxDim / 2 / Math.tan((fov / 2) * (Math.PI / 180)));
      cameraZ *= 2; // Increase zoom out factor

      camera.position.set(0, 2, cameraZ);
      camera.lookAt(0, 0, 0);

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [scene, camera, size]);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={100}
        autoRotate={false} // Disabled auto-rotation
      />
    </>
  );
};