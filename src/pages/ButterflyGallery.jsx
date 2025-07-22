import React, { useEffect, useState } from 'react';

export default function ButterflyGallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/butterfly')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        return response.json();
      })
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <div>
      {data.map((family) => (
        <div key={family.familia} style={{ marginBottom: '2rem' }}>
          <h2>{family.familia}</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {family.butterfly.map(butterfly => (
              <div
                key={butterfly.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  width: '200px',
                  cursor: 'pointer',
                  perspective: '1000px'
                }}
              >
                <div>
                  <p><strong>ID:</strong> {butterfly.id}</p>
                  <p><strong>Nombre:</strong> {butterfly.Nombre}</p>
                  <p><strong>Ubicación:</strong> {butterfly["Ubicación en Europa"]}</p>
                  <p><strong>Conservación:</strong> {butterfly.Conservación}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
