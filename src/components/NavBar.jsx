import { useState } from "react";
import { Link } from "react-router-dom";
import '../style/NavBar.css'
import alaImg from "../assets/logo-mariposa.png";


function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    
    return(
           <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">Noctiluca 🦋</div>

        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-button" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/contacto" className="navbar-button" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>

      {/* SECCIÓN GALERÍA O HERO con ala y botones extra */}
      <section className="galeria-section">
        <div className="galeria-extra-buttons">
          <img src={alaImg} alt="ala mariposa" className="ala-mariposa" />
          <div className="galeria-buttons-group">
            <Link to="/" className="galeria-button">Home</Link>
            <Link to="/contacto" className="galeria-button">Contacto</Link>
          </div>
        </div>

        {/* Contenido de la sección */}
        <h2>Galería de Mariposas Europeas</h2>
        {/* Aquí puedes poner tarjetas, imágenes, textos, etc */}
      </section>
    </div>
  );
}
export default NavBar