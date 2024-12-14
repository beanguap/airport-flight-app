import { useState, useEffect } from "react";
import ExpandablePlaneViewer from "../../components/FlightInfo/ExpandablePlaneViewer.jsx";
import FlightMap from "../../components/FlightInfo/FlightMap.jsx";
import FlightDetails from "../../components/FlightDetails/FlightDetails.jsx";
import OtherFlights from "../../components/OtherFlights/OtherFlights.jsx";
import "./FlightTrackerPage.css";
import { mockApiFetch } from "../../data/mockApiFetch.jsx";


const FlightTrackerPage = () => {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const data = await mockApiFetch();
        setFlightData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  return (
    <div className="flight-tracker-page">
      <ExpandablePlaneViewer />

      {loading && <p>Loading flight details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flight-details-wrapper">
        {flightData && <FlightDetails flight={flightData} />}
        {flightData && <OtherFlights flights={flightData.otherFlights} />}
      </div>

      <FlightMap />
    </div>
  );
};

export default FlightTrackerPage;