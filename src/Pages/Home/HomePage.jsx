import NavBar from '../../components/NavBar/NavBar.jsx';
import './HomePage.css';

const HomePage = () => (
  <div className="home-page">
    <div className="sections-container">
      <div className="section">Luggage</div>
      <div className="section">Destination/Fun Facts</div>
      <div className="section">Flight/Trip Info</div>
    </div>
    <NavBar />
  </div>
);

export default HomePage;