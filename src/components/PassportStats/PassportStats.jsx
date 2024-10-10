import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./PassportStats.css";

const ItemTypes = {
  STICKER: "sticker",
};

const Sticker = ({ name, index, moveSticker }) => {
  const [, ref] = useDrag({
    type: ItemTypes.STICKER,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.STICKER,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSticker(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="sticker-item">
      {name}
    </div>
  );
};

const PassportStats = () => {
  const [stickers, setStickers] = useState([]);
  const [stickerName, setStickerName] = useState("");
  const [route, setRoute] = useState({ from: "MIA", to: "LAX" });

  const handleAddSticker = () => {
    if (stickerName.trim() !== "") {
      setStickers([...stickers, stickerName]);
      setStickerName("");
    }
  };

  const moveSticker = (fromIndex, toIndex) => {
    const updatedStickers = [...stickers];
    const [movedSticker] = updatedStickers.splice(fromIndex, 1);
    updatedStickers.splice(toIndex, 0, movedSticker);
    setStickers(updatedStickers);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="passport-stats">
        <div className="passport">
          <h2>Passport</h2>

          {/* Flight Stats */}
          <div className="passport-stats-info">
            <div className="stat-item">Flights: 12</div>
            <div className="stat-item">Distance: 24,500 km</div>
            <div className="stat-item">Flight Time: 30h</div>
            <div className="stat-item">Airports: 5</div>
            <div className="stat-item">Airlines: 3</div>
          </div>

          {/* Route Information */}
          <div className="route-info">
            <h3>Route:</h3>
            <p>
              {route.from} → {route.to}
            </p>
          </div>

          {/* Display stickers on the passport */}
          <div className="passport-stickers">
            {stickers.map((sticker, index) => (
              <Sticker
                key={index}
                index={index}
                name={sticker}
                moveSticker={moveSticker}
              />
            ))}
          </div>
        </div>

        {/* Sticker Input */}
        <div className="sticker-input">
          <input
            type="text"
            value={stickerName}
            onChange={(e) => setStickerName(e.target.value)}
            placeholder="Enter sticker name"
          />
          <button onClick={handleAddSticker}>Add Sticker</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default PassportStats;
