import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Location from "../../components/ToolBar/Location.jsx";
import Time from "../../components/ToolBar/CurrentTime.jsx";
import Weather from "../../components/ToolBar/Weather.jsx";
import ClosestAirport from "../../components/ToolBar/ClosestAirport.jsx";
import "./HomePage.css";
import "../../components/ToolBar/ToolBar.css"; // Import the ToolBar CSS
import luggageDisplay from "../../assets/LuggageDisplay.jpg";
import FlightTrack from "../../assets/FlightTrack.webp";
import plane from "../../assets/plane.jpg"; // Import the plane image

const HomePage = () => {
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (section === "Luggage") {
      navigate("/luggage");
    }
    // Add other section routes as needed
  };

  return (
    <div className="home-page">
      <Location />
      <Time />
      <Weather />
      <ClosestAirport />
      <div className="sections-container">
        <div className="section" onClick={() => handleSectionClick("Luggage")}>
          <div className="section-image-container">
            <img
              src={luggageDisplay}
              alt="Luggage Display"
              className="section-image"
            />
          </div>
          <div className="section-title-container">
            <div className="section-title">Luggage</div>
          </div>
        </div>
        <div
          className="section"
          onClick={() => handleSectionClick("Destination")}
        >
          <div className="section-image-container">
            <img src={plane} alt="Plane" className="section-image" />
          </div>
          <div className="section-title-container">
            <div className="section-title">Destination/Fun Facts</div>
          </div>
        </div>
        <div className="section" onClick={() => handleSectionClick("Flight")}>
          <div className="section-image-container">
            <img
              src={FlightTrack}
              alt="Flight Track"
              className="section-image"
            />
          </div>
          <div className="section-title-container">
            <div className="section-title">Flight/Trip Info</div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default HomePage;
