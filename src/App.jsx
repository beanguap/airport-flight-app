
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage.jsx';
import FlightTrackerPage from './Pages/FlightTrackerPage.jsx';
import PassportPage from './Pages/PassportPage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/flight-tracker" element={<FlightTrackerPage />} />
                <Route path="/passport" element={<PassportPage />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;
