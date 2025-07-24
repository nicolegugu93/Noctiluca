import React, { useEffect, useState } from 'react';
import '../style/butterflygallery.css';

export default function ButterflyGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchButterflies() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Intentando conectar con: http://localhost:3002/butterfly");
        
        const response = await fetch('http://localhost:3002/butterfly');
        
        console.log("Status de la respuesta:", response.status);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        console.log("JSON recibido:", jsonData);
        
        // Verificar la estructura de los datos
        if (jsonData && jsonData.butterfly) {
          setData(jsonData.butterfly);
        } else if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          throw new Error("Estructura de datos no reconocida");
        }
        
      } catch (error) {
        console.error('Error en la petición:', error);
        
        // Datos de prueba en caso de error del servidor
        console.log("Cargando datos de prueba...");
        const mockData = [
          {
            "id": "1",
            "name": "Vanesa atalanta (Almirante rojo)",
            "family": "Nymphalidae (alas cepillo)",
            "Location": "Presente en España, Francia, Italia, Reino Unido, Alemania, Suecia, Noruega, Finlandia",
            "image": "https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=400&h=300&fit=crop&auto=format"
          },
          {
            "id": "2",
            "name": "Vanesa de los cardos (Painted lady)",
            "family": "Nymphalidae (alas cepillo)",
            "Location": "España, Portugal, Francia, Reino Unido, Irlanda, Alemania, Italia, Suecia",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
          },
          {
            "id": "3",
            "name": "Cola de golondrina (Papilio machaon)",
            "family": "Papilionidae (colas de golondrina)",
            "Location": "España, Francia, Alemania, Italia, Suiza, Polonia, Reino Unido, Suecia, Noruega, Finlandia",
            "image": "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop&auto=format"
          }
        ];
        
        setData(mockData);
        setError(`Error del servidor: ${error.message}. Mostrando datos de prueba.`);
      } finally {
        setLoading(false);
      }
    }

    fetchButterflies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h1>Galería de Mariposas</h1>
        <p>Cargando mariposas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Galería de Mariposas</h1>
        <div className="error-box">
          <h3>Error al cargar los datos:</h3>
          <p>{error}</p>
          <div>
            <strong>Posibles soluciones:</strong>
            <ul>
              <li>Verifica que el servidor esté ejecutándose en puerto 3002</li>
              <li>Revisa la estructura del archivo JSON</li>
              <li>Comprueba la consola del servidor para más detalles</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <h1 className="gallery-title">🦋 Galería de Mariposas Europeas</h1>

        {Array.isArray(data) && data.length > 0 ? (
          <div className="cards-grid">
            {data.map((butterfly) => (
              <div key={butterfly.id} className="card-container">
                <div className="card">
                  
                  {/* Parte frontal - Imagen */}
                  <div className="card-front">
                    <img
                      src={butterfly.image || 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop&auto=format'}
                      alt={butterfly.name}
                      className="butterfly-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop&auto=format';
                      }}
                    />
                    <div className="image-overlay"></div>
                    <div className="hover-indicator">
                      <span>🔄 Hover para más info</span>
                    </div>
                  </div>

                  {/* Parte trasera - Información */}
                  <div className="card-back">
                    <div className="card-info">
                      <div className="butterfly-name">
                        {butterfly.name || 'No disponible'}
                      </div>
                      
                      <div className="butterfly-family">
                        {butterfly.family || 'No especificada'}
                      </div>
                      
                      <div className="location-section">
                        <h3>Ubicación</h3>
                        <p>{butterfly.Location || 'No especificada'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <div className="no-data-icon">🦋</div>
            <h2>No se encontraron datos de mariposas</h2>
            <p>Verifica que el servidor esté proporcionando los datos correctamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}