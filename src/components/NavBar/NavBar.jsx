import { Link } from 'react-router-dom';
import AirplaneIcon from './assets/airplane.svg';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/flight-tracker" className="nav-icon">
                {AirplaneIcon}
            </Link>
            <Link to="/" className="nav-icon">
                🏠
            </Link>
            <Link to="/luggage" className="nav-icon">
                🎒
            </Link>
            <Link to="/passport" className="nav-icon">
                📘
            </Link>
        </nav>
    );
};

export default NavBar;
