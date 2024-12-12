import { useEffect, useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true);
  const modelRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    requestAnimationFrame(() => {
      // Rotate to show side profile
      modelRef.current.rotation.set(0, Math.PI / 2, 0);

      // Scale the model
      modelRef.current.scale.set(0.01, 0.01, 0.01);

      // Center the model
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      modelRef.current.position.sub(center);

      // Update OrbitControls target
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    });
  }, []);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={1}
        maxDistance={50}
        enablePan={true}
        enableZoom={true}
      />
    </>
  );
}
