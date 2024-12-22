// src/components/Sticker.jsx
import { useState } from 'react';
import Draggable from 'react-draggable';
import './Sticker.css';

const Sticker = ({ sticker, index, updateSticker }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempNote, setTempNote] = useState(sticker.note || '');

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    updateSticker(index, {
      ...sticker,
      left: data.x,
      top: data.y,
      note: tempNote,
    });
  };

  const handleNoteChange = (e) => {
    setTempNote(e.target.value);
  };

  const toggleEditMode = (e) => {
    e.stopPropagation(); // Prevent drag event from interfering
    setEditMode(!editMode);
  };

  return (
    <Draggable
      defaultPosition={{ x: sticker.left, y: sticker.top }}
      onStart={handleStart}
      onStop={handleStop}
      bounds="parent"
    >
      <div
        className={`sticker-wrapper ${isDragging ? 'sticker-dragging' : ''}`}
        style={{
          width: sticker.width,
          height: sticker.height,
        }}
      >
        <img
          src={sticker.src}
          alt={`Sticker ${index}`}
          draggable={false}
          className="sticker-image"
        />
        {editMode ? (
          <textarea
            className="sticker-note-input"
            value={tempNote}
            onChange={handleNoteChange}
          />
        ) : (
          sticker.note && <div className="sticker-note-label">{sticker.note}</div>
        )}

        <button
          type="button"
          className="sticker-edit-btn"
          onClick={toggleEditMode}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
      </div>
    </Draggable>
  );
};

export default Sticker;
