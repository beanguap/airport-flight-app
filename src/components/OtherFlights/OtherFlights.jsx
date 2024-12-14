import "./OtherFlights.css";

const OtherFlights = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return <div className="other-flights-container">No other flights available.</div>;
  }

  return (
    <div className="other-flights-container">
      <h3>Other Flights from {flights[0].departureAirport}</h3>
      {flights.map((flight, index) => (
        <div key={index} className="other-flight-item">
          <div className="flight-info-item">
            <span className="label">Flight:</span>
            <span className="value">{flight.flightNumber}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Airline:</span>
            <span className="value">{flight.airline.name}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Departure:</span>
            <span className="value">{flight.departureTime}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Arrival:</span>
            <span className="value">{flight.arrivalTime}</span>
          </div>
          <div className="flight-info-item">
            <span className="label">Status:</span>
            <span className={`value status-${flight.status.toLowerCase()}`}>{flight.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherFlights;