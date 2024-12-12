import { useEffect, useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const { scene } = useGLTF("/boeing-767/source/boeing-767.gltf", true);
  const modelRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    // 1. Rotate the model to show a side profile.
    //    If the plane's nose originally points along +Z, this rotation makes it point along +X.
    modelRef.current.rotation.set(0, Math.PI / 2, 0);

    // 2. Apply a fixed scale so the model is a reasonable size.
    modelRef.current.scale.set(0.01, 0.01, 0.01);

    // 3. Compute the bounding box and center the model.
    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    modelRef.current.position.sub(center);

    // 4. If using OrbitControls, ensure it looks at the model center.
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
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
