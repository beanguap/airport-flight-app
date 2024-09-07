import { motion } from "framer-motion";
import { useState } from "react";
import "./ExpandablePlaneViewer.css"; // Import the CSS file
import PlaneModel from "./PlaneModel";

const ExpandablePlaneViewer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    small: { width: "100%", height: "300px", borderRadius: "15px" },
    large: { width: "100%", height: "90vh", borderRadius: "15px" },
  };

  return (
    <motion.div
      className="expandable-plane-viewer"
      variants={containerVariants}
      initial="small"
      animate={isExpanded ? "large" : "small"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="header">
        <h2 className="title">Flight Tracker</h2>
        <button
          onClick={toggleExpand}
          className="expand-button"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Shrink plane viewer" : "Expand plane viewer"
          }
        >
          {isExpanded ? "Shrink" : "Expand"}
        </button>
      </div>
      <PlaneModel
        width={isExpanded ? "100%" : 100} // Use "100%" for width as string
        height={isExpanded ? undefined : 240} // Use undefined for calc or percentage heights
        style={{
          height: isExpanded ? "calc(90vh - 60px)" : undefined,
          width: isExpanded ? "100%" : "100%",
        }}
      />
    </motion.div>
  );
};

export default ExpandablePlaneViewer;
