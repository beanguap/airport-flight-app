import { useState, useEffect } from "react";
import "./PassportStats.css"; // Import the CSS file

const PassportStats = ({ flightData }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (flightData) {
      const calculatedStats = flightData.map((flight) => ({
        roundTrip: flight.roundTrip,
        departure: flight.departure,
        arrival: flight.arrival,
        date: flight.date,
      }));
      setStats(calculatedStats);
    }
  }, [flightData]);

  if (!flightData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="passport-stats-container">
      <table className="passport-stats-table">
        <thead>
          <tr>
            <th>Round Trip</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.roundTrip ? "Yes" : "No"}</td>
              <td>{stat.departure}</td>
              <td>{stat.arrival}</td>
              <td>{stat.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassportStats;
