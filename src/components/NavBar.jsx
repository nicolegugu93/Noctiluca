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
          <Link to="/contacto" className="galeria-button">Contacto</Link>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <section className="galeria-section">
        <h2>Galería de Mariposas Europeas</h2>
        {/* Aquí irán las tarjetas o el contenido que desees */}
      </section>
    </div>
  );
}

export default NavBar;

