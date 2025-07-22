import { useState } from "react";
import { Link } from "react-router-dom";

import '../style/NavBar.css'


function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    
    return(
           <nav className="navbar">
      {/* Logo o nombre (opcional) */}
      <div className="navbar-logo">🦋</div>

      {/* Botón hamburguesa (solo visible en móviles) */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Botones de navegación */}
      <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="navbar-button" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/contacto" className="navbar-button" onClick={() => setMenuOpen(false)}>
          Contacto
        </Link>
      </div>
    </nav>
    )
}
export default NavBar