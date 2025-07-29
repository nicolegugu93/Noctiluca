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
      <div className="galeria-extra-buttons">
        <img src={alaImg} alt="ala mariposa" className="ala-mariposa" />

        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`galeria-buttons-group ${menuOpen ? "open" : ""}`}>
          {/* Botón siempre visible */}
          <Link to="/" className="galeria-button">Home</Link>

          {/* Mostrar "Galería" solo si estás en Contacto */}
          {location.pathname === "/contactbutterfly" && (
            <Link to="/butterflygallery" className="galeria-button">Galería</Link>
          )}

          
           {/* Mostrar "Galería" en formulario de mariposas*/}
          {location.pathname.startsWith("/butterflydetail")&& (
            <Link to="/butterflygallery" className="galeria-button">Galería</Link>
          )}
           


          {/* Mostrar "Contacto" solo si estás en Galería o Home */}
          {(location.pathname === "/butterflygallery" || location.pathname === "/") && (
            <Link to="/contactbutterfly" className="galeria-button">Contacto</Link>
          )}
        </div>
      </div>

      {/* Línea decorativa debajo del nav */}
      <div className="navbar-line"></div>
    </nav>
  );
}

export default NavBar;




