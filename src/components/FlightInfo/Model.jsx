import { useEffect, useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true);
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    // Rotate the model to show a side profile
    modelRef.current.rotation.set(0, Math.PI / 2, 0);

    // Apply a fixed scale so the model is a reasonable size.
    // Adjust as needed.
    modelRef.current.scale.set(0.01, 0.01, 0.01);

    // Compute the bounding box and center the model
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());

    // Position model so that its center is at the origin
    modelRef.current.position.sub(center);

  }, [scene]);

  return (
    <>
      <primitive ref={modelRef} object={scene} />
      <OrbitControls
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
