import { useState } from "react";
import { Link } from "react-router-dom";
import '../style/NavBar.css';
import alaImg from "../assets/logo-mariposa.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-container">
      <div className="galeria-extra-buttons">
        <img src={alaImg} alt="ala mariposa" className="ala-mariposa" />

        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`galeria-buttons-group ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="galeria-button">Home</Link>
          <Link to="/butterflygallery" className="galeria-button">Galería</Link>
          <Link to="/contactbutterfly" className="galeria-button">Contacto</Link>
        </div>
      </div>

      <div className="navbar-line"></div>
    </nav>
  );
}

export default NavBar;




