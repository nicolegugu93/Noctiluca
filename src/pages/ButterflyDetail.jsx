// Importamos React y los hooks necesarios
import React, { useEffect, useState } from 'react';
// Importamos la función que obtiene los datos desde el archivo de servicios
import { getButterflies } from '../services/butterflyService'; // Asegúrate de que la ruta sea correcta

// Definimos el componente funcional ButterflyDetail
const ButterflyDetail = () => {
  // Creamos un estado para guardar el array de mariposas
  const [butterflies, setButterflies] = useState([]);

  // useEffect se ejecuta cuando el componente se monta (una sola vez)
  useEffect(() => {
    // Función asíncrona para obtener los datos desde el servicio
    const fetchData = async () => {
      const data = await getButterflies(); // Llama al servicio que hace el fetch
      setButterflies(data); // Actualiza el estado con los datos obtenidos
    };

    fetchData(); // Ejecutamos la función al montar el componente
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  return (
    // Contenedor principal del componente
    <div className="butterfly-detail-container">
      {/* Título general de la sección */}
      <h2>Mariposas Europeas</h2>

      {/* Recorremos el array de mariposas y pintamos cada una */}
      {butterflies.map((butterfly) => (
        // Usamos el id como key única para React
        <div key={butterfly.id} className="butterfly-card">
          {/* Mostramos el nombre de la mariposa */}
          <h3>{butterfly.Nombre}</h3>

          {/* Mostramos la familia (añadida en el servicio) */}
          <p><strong>Familia:</strong> {butterfly.familia}</p>

          {/* Mostramos el resto de propiedades disponibles */}
          <p><strong>Distribución:</strong> {butterfly.Distribución}</p>
          <p><strong>Ubicación en Europa:</strong> {butterfly["Ubicación en Europa"]}</p>
          <p><strong>Hábitat:</strong> {butterfly.Hábitat}</p>
          <p><strong>Morfología:</strong> {butterfly.Morfología}</p>
          <p><strong>Ciclo de vida:</strong> {butterfly["Ciclo de vida"]}</p>
          <p><strong>Alimentación:</strong> {butterfly.Alimentación}</p>
          <p><strong>Conservación:</strong> {butterfly.Conservación}</p>
        </div>
      ))}
    </div>
  );
};

// Exportamos el componente para poder usarlo en otras partes de la aplicación
export default ButterflyDetail;
