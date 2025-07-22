import React, { useEffect, useState } from 'react';

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
        console.log("Response OK:", response.ok);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const jsonData = await response.json();
        console.log("JSON recibido:", jsonData);
        
        setData(jsonData);
      } catch (error) {
        console.error('Error en la petición:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchButterflies();
  }, []);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Galería de Mariposas</h1>
        <p>Cargando mariposas...</p>
      </div>
    );
  }

  // Mostrar error si ocurrió
  if (error) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Galería de Mariposas</h1>
        <div style={{ 
          backgroundColor: '#ffe6e6', 
          border: '1px solid #ff9999', 
          borderRadius: '4px', 
          padding: '1rem', 
          color: '#cc0000' 
        }}>
          <h3>Error al cargar los datos:</h3>
          <p>{error}</p>
          <p><strong>Posibles soluciones:</strong></p>
          <ul>
            <li>Verifica que el servidor esté ejecutándose en puerto 3002</li>
            <li>Revisa la estructura del archivo JSON</li>
            <li>Comprueba la consola del servidor para más detalles</li>
          </ul>
        </div>
      </div>
    );
  }

  console.log("data:", data);
  if (Array.isArray(data)) {
    data.forEach(f => console.log("family:", f.familia, "butterfly:", f.butterfly));
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Galería de Mariposas</h1>

      {Array.isArray(data) && data.length > 0 ? (
        data.map((family, index) => (
          <div key={family.familia || `family-${index}`} style={{ marginBottom: '3rem' }}>
            <h2>{family.familia || 'Familia desconocida'}</h2>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {Array.isArray(family.butterfly) && family.butterfly.length > 0 ? (
                family.butterfly.map((butterfly, butterflyIndex) => (
                  <div
                    key={butterfly.id || `butterfly-${index}-${butterflyIndex}`}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '1rem',
                      width: '250px',
                      backgroundColor: '#f8f8f8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <p><strong>ID:</strong> {butterfly.id || 'N/A'}</p>
                    <p><strong>Nombre:</strong> {butterfly.Nombre || 'Sin nombre'}</p>
                    <p><strong>Ubicación en Europa:</strong> {butterfly["Ubicación en Europa"] || 'No especificada'}</p>
                    <p><strong>Conservación:</strong> {butterfly.Conservación || 'No especificado'}</p>
                  </div>
                ))
              ) : (
                <p>No hay mariposas en esta familia.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          borderRadius: '4px', 
          padding: '1rem' 
        }}>
          <p>No se encontraron datos de mariposas.</p>
        </div>
      )}
    </div>
  );
}