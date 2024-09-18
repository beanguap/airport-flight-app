const Time = () => {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="time">
      <h2>Current Time: {currentTime}</h2>
    </div>
  );
};

export default Time;
