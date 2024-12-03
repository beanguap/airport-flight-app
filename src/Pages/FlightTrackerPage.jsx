import ExpandablePlaneViewer from "../components/FlightInfo/ExpandablePlaneViewer";
import FlightMap from "../components/FlightInfo/FlightMap";
import "../components/FlightInfo/FlightTracker.css";

const FlightTrackerPage = () => {
  return (
    <div className="flight-tracker-page">
      <ExpandablePlaneViewer />
      <FlightMap />
    </div>
  );
};

export default FlightTrackerPage;