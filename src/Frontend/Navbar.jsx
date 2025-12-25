import { Link } from "react-router-dom";
import './Navbar.css';
function Navbar() {
  return (
    <div className="nav-bar">
      <Link to="/">Home</Link>
      <Link to="/trip-ideas">Trip Ideas</Link>
      <Link to="/how-this-works">How This Works</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Navbar;
