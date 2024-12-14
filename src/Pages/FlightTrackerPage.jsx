import ExpandablePlaneViewer from "../components/FlightInfo/ExpandablePlaneViewer";
import FlightMap from "../components/FlightInfo/FlightMap";
import FlightDetails from "../components/FlightDetails/FlightDetails.jsx";
import "../components/FlightInfo/FlightTracker.css";

const FlightTrackerPage = () => {
  return (
    <div className="flight-tracker-page">
      <ExpandablePlaneViewer />
      <FlightDetails />
      <FlightMap />
    </div>
  );
};

export default FlightTrackerPage;