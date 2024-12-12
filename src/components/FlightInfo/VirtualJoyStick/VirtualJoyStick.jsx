import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./VirtualJoyStick.css";

const VirtualJoyStick = ({ onMove, initialPosition = { x: 0, y: 0 } }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const baseRef = useRef(null);

  const handleStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleEnd = useCallback(() => {
    setDragging(false);
    setPosition({ x: 0, y: 0 });
    if (onMove) onMove({ x: 0, y: 0 });
  }, [onMove]);

  const handleMove = useCallback((clientX, clientY) => {
    if (!baseRef.current) return;

    const base = baseRef.current;
    const rect = base.getBoundingClientRect();
    const baseCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const newPosition = {
      x: clientX - baseCenter.x,
      y: clientY - baseCenter.y,
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
  }, [onMove]);

  const handleMouseMove = useCallback((e) => {
    if (dragging) {
      handleMove(e.clientX, e.clientY);
    }
  }, [dragging, handleMove]);

  const handleTouchMove = useCallback((e) => {
    if (!dragging || !e.touches[0]) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, [dragging, handleMove]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("mouseup", handleEnd, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd, { passive: false });
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div
      className="joystick-base"
      ref={baseRef}
      onMouseDown={handleStart}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleStart(e);
      }}
      role="slider"
      aria-valuemin="-1"
      aria-valuemax="1"
      aria-valuenow={position.x}
      aria-label="Joystick controller"
    >
      <div
        className="joystick-handle"
        style={{
          transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div className="joystick-arrow up" aria-hidden="true">↑</div>
      <div className="joystick-arrow down" aria-hidden="true">↓</div>
      <div className="joystick-arrow left" aria-hidden="true">←</div>
      <div className="joystick-arrow right" aria-hidden="true">→</div>
    </div>
  );
};

VirtualJoyStick.propTypes = {
  onMove: PropTypes.func,
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default VirtualJoyStick;
