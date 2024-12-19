import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './PassportStats.css';

const Sticker = ({ sticker, index, updateSticker }) => {
  const handleDrag = (e, data) => {
    updateSticker(index, { ...sticker, left: data.x, top: data.y });
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
        style={{ width: sticker.width, height: sticker.height }}
      />
    </Draggable>
  );
};

const PassportStats = () => {
  const [stickers, setStickers] = useState([]);
  const [travelStats] = useState({
    flights: 10,
    distance: '25,000 km',
    flightTime: '40h',
    airports: 15,
    airlines: 5,
  });

  const [currentFlight] = useState({
    departureAirport: 'JFK',
    destinationAirport: 'LAX',
    airline: 'Delta Airlines',
    flightNumber: 'DL1234',
    departureTime: '2023-10-05 08:00',
    arrivalTime: '2023-10-05 11:00',
    flightDuration: '6h',
    distance: '3,945 km',
  });

  const [pastTrips] = useState([
    {
      date: '2023-09-15',
      departureAirport: 'LAX',
      destinationAirport: 'ORD',
      flightTime: '4h',
      distance: '2,800 km',
      airline: 'United Airlines',
    },
    {
      date: '2023-08-10',
      departureAirport: 'ORD',
      destinationAirport: 'MIA',
      flightTime: '3h',
      distance: '1,900 km',
      airline: 'American Airlines',
    },
    // Add more trips as needed
  ]);

  const handleStickerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSticker = {
          src: reader.result,
          left: 50,
          top: 50,
          width: 80,
          height: 80,
        };
        setStickers([...stickers, newSticker]);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSticker = (index, newSticker) => {
    const updatedStickers = [...stickers];
    updatedStickers[index] = newSticker;
    setStickers(updatedStickers);
  };

  return (
    <div className="passport-container">
      <div className="passport-book">
        <div className="passport-left-page">
          <h2>Current Flight Info</h2>
          <div className="flight-info">
            <p><strong>Departure Airport:</strong> {currentFlight.departureAirport}</p>
            <p><strong>Destination Airport:</strong> {currentFlight.destinationAirport}</p>
            <p><strong>Airline:</strong> {currentFlight.airline}</p>
            <p><strong>Flight Number:</strong> {currentFlight.flightNumber}</p>
            <p><strong>Departure Time:</strong> {currentFlight.departureTime}</p>
            <p><strong>Arrival Time:</strong> {currentFlight.arrivalTime}</p>
            <p><strong>Flight Duration:</strong> {currentFlight.flightDuration}</p>
            <p><strong>Distance:</strong> {currentFlight.distance}</p>
          </div>
        </div>
        <div className="passport-right-page">
          <h2>Travel History</h2>
          <div className="past-trips">
            {pastTrips.map((trip, index) => (
              <div key={index} className="trip-card">
                <p><strong>Date:</strong> {trip.date}</p>
                <p><strong>Route:</strong> {trip.departureAirport} → {trip.destinationAirport}</p>
                <p><strong>Flight Time:</strong> {trip.flightTime}</p>
                <p><strong>Distance:</strong> {trip.distance}</p>
                <p><strong>Airline:</strong> {trip.airline}</p>
                {/* Option to add stickers to each trip */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="passport-footer">
        <div>Total Distance Flown: {travelStats.distance}</div>
        <div>Total Flight Time: {travelStats.flightTime}</div>
        <div>Total Airports Visited: {travelStats.airports}</div>
        <div>Total Airlines Used: {travelStats.airlines}</div>
      </div>
      <div className="sticker-section">
        <input type="file" accept="image/*" onChange={handleStickerUpload} />
        <div className="stickers-container">
          {stickers.map((sticker, index) => (
            <Sticker
              key={index}
              index={index}
              sticker={sticker}
              updateSticker={updateSticker}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassportStats;