import { useNavigate } from "react-router-dom";
import Location from "../../components/ToolBar/Location.jsx";
import Time from "../../components/ToolBar/CurrentTime.jsx";
import Weather from "../../components/ToolBar/Weather.jsx";
import ClosestAirport from "../../components/ToolBar/ClosestAirport.jsx";
import "./HomePage.css";
import luggageDisplay from "../../assets/LuggageDisplay.jpg";
import FlightTrack from "../../assets/FlightTrack.webp";
import plane from "../../assets/plane.jpg"; // Import the plane image
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (section === "Luggage") {
      navigate("/luggage");
    }
    // Add other section routes as needed
  };

  useEffect(() => {
    const toolbarContainer = document.querySelector(".toolbar-container");

    return () => {
      // Clean up event listeners if any were added
    };
  }, []);

  return (
    <div className="home-page">
      <div className="toolbar-container">
        <div className="toolbar-item">
          <Location className="location" />
        </div>
        <div className="toolbar-item">
          <Time className="time" />
        </div>
        <div className="toolbar-item">
          <Weather className="weather" />
        </div>
        <div className="toolbar-item">
          <ClosestAirport className="closest-airport" />
        </div>
      </div>
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
            <div className="section-title">Destination</div>
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
            <div className="section-title">Flight</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
