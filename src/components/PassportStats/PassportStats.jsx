import { useState } from 'react';
import Draggable from 'react-draggable';
import './PassportStats.css';

const Sticker = ({ sticker, index, updateStickerPosition }) => {
  const handleDrag = (e, data) => {
    updateStickerPosition(index, data.x, data.y);
  };

  return (
    <Draggable
      position={{ x: sticker.left, y: sticker.top }}
      onDrag={handleDrag}
      bounds="parent"
    >
      <img
        src={sticker.src}
        alt={`Sticker ${index}`}
        className="sticker"
        role="img"
        aria-label={`Sticker ${index}`}
      />
    </Draggable>
  );
};

const Passport = () => {
  const [stickers, setStickers] = useState([]);
  const [travelStats] = useState({
    flights: 0,
    distance: '0 km',
    flightTime: '0h',
    airports: 0,
    airlines: 0,
  });

  const handleStickerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSticker = {
          src: reader.result,
          left: 50,
          top: 50,
        };
        setStickers([...stickers, newSticker]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateStickerPosition = (index, left, top) => {
    const updatedStickers = [...stickers];
    updatedStickers[index] = { ...updatedStickers[index], left, top };
    setStickers(updatedStickers);
  };

  return (
    <div className="passport-container">
      <div className="passport">
        <div className="passport-stats-info">
          <div className="stat-item">
            <h3>Flights</h3>
            <p>{travelStats.flights}</p>
          </div>
          <div className="stat-item">
            <h3>Distance</h3>
            <p>{travelStats.distance}</p>
          </div>
          <div className="stat-item">
            <h3>Flight Time</h3>
            <p>{travelStats.flightTime}</p>
          </div>
          <div className="stat-item">
            <h3>Airports</h3>
            <p>{travelStats.airports}</p>
          </div>
          <div className="stat-item">
            <h3>Airlines</h3>
            <p>{travelStats.airlines}</p>
          </div>
        </div>
        <div className="passport-stickers">
          {stickers.map((sticker, index) => (
            <Sticker
              key={index}
              index={index}
              sticker={sticker}
              updateStickerPosition={updateStickerPosition}
            />
          ))}
        </div>
      </div>
      <div className="sticker-input">
        <input type="file" accept="image/*" onChange={handleStickerUpload} />
      </div>
    </div>
  );
};

export default Passport;