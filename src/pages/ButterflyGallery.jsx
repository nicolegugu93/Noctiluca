import React, { useEffect, useState } from 'react';

export default function ButterflyGallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchButterflies() {
      try {
        const response = await fetch('http://localhost:3002/butterfly');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    }

    fetchButterflies();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Galería de Mariposas</h1>

      {data.map((family) => (
  <div key={family.familia} style={{ marginBottom: '3rem' }}>
    <h2>{family.familia}</h2>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {family.butterfly.map((butterfly) => (
        <div
          key={butterfly.id} // ✅ key única por mariposa
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            width: '250px',
            backgroundColor: '#f8f8f8',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <p><strong>ID:</strong> {butterfly.id}</p>
          <p><strong>Nombre:</strong> {butterfly.name}</p>
          <p><strong>Ubicación:</strong> {butterfly.Location}</p>
          <p><strong>Conservación:</strong> {butterfly.Conservation}</p>
        </div>
      ))}
    </div>
  </div>
))}

    </div>
  );
}
