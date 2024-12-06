import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export const Model = ({ initialPosition, rotation }) => {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true);
  const { camera } = useThree();
  const modelRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      // Set initial position and scale
      modelRef.current.position.set(0, 0, 0);
      modelRef.current.rotation.set(0, 0, 0);
      modelRef.current.scale.set(0.01, 0.01, 0.01);

      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Adjust camera position
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      cameraZ *= 2; // Increase zoom out factor

      camera.position.set(0, 2, cameraZ);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [scene, camera]);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={100}
      />
    </>
  );
};