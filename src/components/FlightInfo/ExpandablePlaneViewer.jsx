import  { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlaneModel from './PlaneModel';
import './ExpandablePlaneViewer.css';

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [isExpanded]);

  const containerVariants = {
    small: { width: '100%', height: '300px', borderRadius: '15px' },
    large: { width: '100%', height: '90dvh', borderRadius: '15px' }
  };

  return (
    <motion.div
      ref={containerRef}
      className="expandable-plane-viewer"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <h2>Flight Tracker</h2>
      <button onClick={toggleExpand}>
        {isExpanded ? 'Shrink' : 'Expand'}
      </button>
      <PlaneModel
        width={dimensions.width}
        height={dimensions.height - 60} // Subtract 60px for the header and button
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
        }}
        lightPosition={[0, 10, 0]}
        lightIntensity={1.5}
        castShadow={true}
      />
    </motion.div>
  );
};

export default ExpandablePlaneViewer;