import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.jsx";
import "./HomePage.css";
import luggageDisplay from "../../assets/LuggageDisplay.jpg";
import FlightTrack from "../../assets/FlightTrack.webp";

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
            {/* Add an image for Destination if available */}
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
