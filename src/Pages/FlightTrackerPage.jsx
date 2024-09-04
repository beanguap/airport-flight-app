
import ExpandablePlaneViewer from '../components/FlightInfo/ExpandablePlaneViewer';
import FlightMap from '../components/FlightInfo/FlightMap';
import Toolbar from '../components/FlightInfo/Toolbar';
// ... other imports

const FlightTrackerPage = () => {
  return (
    <div className="flight-tracker-page">
      <h1>Flight Tracker</h1>
      {/* ... other components */}
      <ExpandablePlaneViewer />
      <FlightMap />
      <Toolbar />
      {/* ... other components */}
    </div>
  );
};

export default FlightTrackerPage;