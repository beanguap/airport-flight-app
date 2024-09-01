import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/flight-tracker" className="nav-icon">
                🏠
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
