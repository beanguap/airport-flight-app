import "./FlightDetails.css";

const FlightDetails = ({ flight }) => {
  if (!flight) {
    return <div className="flight-details-container">Flight information not available</div>;
  }

  const {
    airline,
    flightNumber,
    departureTime,
    arrivalTime,
    departureAirport,
    arrivalAirport,
    status,
    gate,
    terminal,
    duration,
  } = flight;

  return (
    <div className="flight-details-container">
      <div className="flight-header">
        <img
          src={airline.logo}
          alt={`${airline.name} logo`}
          className="airline-logo"
        />
        <h2 className="airline-name">{airline.name}</h2>
      </div>
      <div className="flight-info">
        <div className="flight-info-item">
          <span className="label">Flight:</span>
          <span className="value">{flightNumber}</span>
        </div>
        <div className="flight-info-item">
          <span className="label">Departure:</span>
          <span className="value">
            {departureTime} - {departureAirport}
          </span>
        </div>
        <div className="flight-info-item">
          <span className="label">Arrival:</span>
          <span className="value">
            {arrivalTime} - {arrivalAirport}
          </span>
        </div>
        <div className="flight-info-item">
          <span className="label">Status:</span>
          <span className={`value status-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        <div className="flight-info-item">
          <span className="label">Gate:</span>
          <span className="value">{gate || "TBA"}</span>
        </div>
        <div className="flight-info-item">
          <span className="label">Terminal:</span>
          <span className="value">{terminal || "TBA"}</span>
        </div>
        <div className="flight-info-item">
          <span className="label">Duration:</span>
          <span className="value">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
