import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../style/NavBar.css';
import alaImg from "../assets/logo-mariposa.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-container">
      <div className="gallery-extra-buttons">
        <img src={alaImg} alt="butterfly-wing" className="butterfly-wing" />

        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`gallery-buttons-group ${menuOpen ? "open" : ""}`}>
          
          <Link to="/" className="gallery-button">Home</Link>

          
          {location.pathname === "/contactbutterfly" && (
            <Link to="/butterflygallery" className="gallery-button">Galería</Link>
          )}

          
          {(location.pathname === "/butterflygallery" || location.pathname === "/") && (
            <Link to="/contactbutterfly" className="gallery-button">Contacto</Link>
          )}
        </div>
      </div>

     
      <div className="navbar-line"></div>
    </nav>
  );
}

export default NavBar;




