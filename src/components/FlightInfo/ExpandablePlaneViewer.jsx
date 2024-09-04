import  { useState } from 'react';
import { motion } from 'framer-motion';
import PlaneModel from './PlaneModel';

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    small: { width: '100%', height: '300px', borderRadius: '15px' },
    large: { width: '100%', height: '90vh', borderRadius: '15px' }
  };

  return (
    <motion.div
      className="expandable-plane-viewer bg-white p-4 relative"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Flight Tracker</h2>
        <button
          onClick={toggleExpand}
          className="expand-button bg-gray-200 px-3 py-1 rounded-full text-sm"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Shrink plane viewer" : "Expand plane viewer"}
        >
          {isExpanded ? 'Shrink' : 'Expand'}
        </button>
      </div>
      <PlaneModel
        width={isExpanded ? "100%" : "100%"}
        height={isExpanded ? "calc(90vh - 60px)" : "240px"}
      />
    </motion.div>
  );
};

export default ExpandablePlaneViewer;