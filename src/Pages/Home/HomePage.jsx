import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (section === 'Luggage') {
      navigate('/luggage');
    }
    // Add other section routes as needed
  };

  return (
    <div className="home-page">
      <div className="sections-container">
        <div className="section" onClick={() => handleSectionClick('Luggage')}>Luggage</div>
        <div className="section">Destination/Fun Facts</div>
        <div className="section">Flight/Trip Info</div>
      </div>
      <NavBar />
    </div>
  );
};

export default HomePage;