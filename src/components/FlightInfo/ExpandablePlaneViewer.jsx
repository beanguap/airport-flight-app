import { useState } from 'react';
import { motion } from 'framer-motion';
import PlaneModel from './PlaneModel';

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    small: { width: '300px', height: '300px', borderRadius: '15px' },
    large: { width: '90vw', height: '90vh', borderRadius: '30px' }
  };

  return (
    <motion.div
      className="expandable-plane-viewer"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <button 
        onClick={toggleExpand}
        className="expand-button"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Shrink plane viewer" : "Expand plane viewer"}
      >
        {isExpanded ? 'Shrink' : 'Expand'}
      </button>
      <PlaneModel 
        width={isExpanded ? window.innerWidth * 0.9 : 300} 
        height={isExpanded ? window.innerHeight * 0.9 : 300} 
      />
    </motion.div>
  );
};

export default ExpandablePlaneViewer;