import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import planeModelFile from '../../assets/boeing767/scene.gltf';
import PlaneModel from './PlaneModel';
import './ExpandablePlaneViewer.css';

export default function ExpandablePlaneViewer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`plane-viewer-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="plane-viewer-content" onClick={toggleExpand}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <PlaneModel modelPath={planeModelFile} />
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
          />
        </Canvas>
      </div>
      {isExpanded && (
        <div className="expanded-controls">
          <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}