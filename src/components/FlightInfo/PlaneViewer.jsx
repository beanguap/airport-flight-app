import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PlaneModel from './PlaneModel';
import planeModelFile from '../assets/scene.gltf';

export default function PlaneViewer() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <PlaneModel modelPath={planeModelFile} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}