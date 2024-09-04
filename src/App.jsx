import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage.jsx';
import FlightTrackerPage from './Pages/FlightTrackerPage.jsx';
import LuggagePage from './Pages/LuggagePage.jsx';
import PassportPage from './Pages/PassportPage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import './components/FlightInfo/FlightTracker.css';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flight-tracker" element={<FlightTrackerPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/luggage" element={<LuggagePage />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;