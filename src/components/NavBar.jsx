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
    <div className="app-container">
      {/* NAVBAR FIJA */}
      <div className="galeria-extra-buttons">
        <img src={alaImg} alt="ala mariposa" className="ala-mariposa" />
        <div className="galeria-buttons-group">
          <Link to="/" className="galeria-button">Home</Link>
          <Link to="/contactbutterfly" className="galeria-button">Contacto</Link>
        </div>
      </div>

     
    </div>
  );
}

export default NavBar;

