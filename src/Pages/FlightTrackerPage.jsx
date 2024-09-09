import ExpandablePlaneViewer from "../components/FlightInfo/ExpandablePlaneViewer";
import FlightMap from "../components/FlightInfo/FlightMap";
import Toolbar from "../components/FlightInfo/Toolbar";
// ... other imports

const FlightTrackerPage = () => {
  return (
    <div className="flight-tracker-page">
      {/* ... other components */}
      <ExpandablePlaneViewer modelPath="public/boeing-767/source/boeing-767.gltf" />
      <FlightMap />
      <Toolbar />
      {/* ... other components */}
    </div>
  );
};

export default FlightTrackerPage;
