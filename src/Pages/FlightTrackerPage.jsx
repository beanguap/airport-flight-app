import  { useState, useEffect } from "react";
import ExpandablePlaneViewer from "../components/FlightInfo/ExpandablePlaneViewer";
import FlightMap from "../components/FlightInfo/FlightMap";
import FlightDetails from "../components/FlightDetails/FlightDetails.jsx";
import { mockApiFetch } from "../data/mockApiFetch";
import "../components/FlightInfo/FlightTracker.css";

const FlightTrackerPage = () => {
  const [flightData, setFlightData] = useState(null); // State for flight data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch flight data using the mock API
    const fetchFlightData = async () => {
      try {
        const data = await mockApiFetch(); // Call the mock API
        setFlightData(data); // Set the flight data
      } catch (err) {
        setError(err); // Set error if the mock API fails
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchFlightData(); // Trigger the fetch on component mount
  }, []);

  return (
    <div className="flight-tracker-page">
      <ExpandablePlaneViewer />

      {/* Display loading, error, or flight details */}
      {loading && <p>Loading flight details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {flightData && <FlightDetails flight={flightData} />}

      <FlightMap />
    </div>
  );
};

export default FlightTrackerPage;
