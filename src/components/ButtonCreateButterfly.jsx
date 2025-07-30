import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/buttoncreatebutterfly.css'; 

function ButtonCreateButterfly() {
  const navigate = useNavigate();

  const irAOtraPagina = () => {
    navigate('/newbutterfly'); // Esta es la ruta de React Router
  };

return (
  <div>
    <div className="boton-imagen">
      <img
        src="../src/assets/button-butterfly.png"
        alt="Crear Nueva Mariposa"
        onClick={irAOtraPagina}
        className="imagen-boton"
      />
       <p>¡Agrega tu<br />mariposa favorita!</p>
    </div>
  </div>
);
}

export default ButtonCreateButterfly;
