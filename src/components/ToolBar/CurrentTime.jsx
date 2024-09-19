import React, { useState, useEffect } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2 style={{ color: "#ff9500" }}>Current Time</h2>
      <p>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default CurrentTime;
