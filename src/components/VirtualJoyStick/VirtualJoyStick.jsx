import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./VirtualJoyStick.css"; // Ensure this import is correct

const VirtualJoyStick = ({ onMove }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const baseRef = useRef(null);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setPosition({ x: 0, y: 0 });
    if (onMove) onMove({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const base = baseRef.current;
    const rect = base.getBoundingClientRect();
    const baseCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const newPosition = {
      x: e.clientX - baseCenter.x,
      y: e.clientY - baseCenter.y,
    };

    const distance = Math.sqrt(newPosition.x ** 2 + newPosition.y ** 2);
    const maxDistance = rect.width / 2;

    if (distance > maxDistance) {
      const angle = Math.atan2(newPosition.y, newPosition.x);
      newPosition.x = maxDistance * Math.cos(angle);
      newPosition.y = maxDistance * Math.sin(angle);
    }

    setPosition(newPosition);
    if (onMove) onMove(newPosition);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="joystick-base" ref={baseRef} onMouseDown={handleMouseDown}>
      <div
        className="joystick-handle"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div className="joystick-arrow up">↑</div>
      <div className="joystick-arrow down">↓</div>
      <div className="joystick-arrow left">←</div>
      <div className="joystick-arrow right">→</div>
    </div>
  );
};

VirtualJoyStick.propTypes = {
  onMove: PropTypes.func,
};

export default VirtualJoyStick;
