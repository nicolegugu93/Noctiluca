//FETCH DIRECTO CON URL 
// ==========================================================

// Importamos React y los hooks necesarios
import React, { useEffect, useState } from 'react';

// Definimos el componente funcional ButterflyDetail
const ButterflyDetail = () => {
  // Creamos un estado para guardar el array de mariposas
  // Inicialmente es un array vacío []
  const [butterflies, setButterflies] = useState([]);
  
  // Estado para manejar los errores que puedan ocurrir
  const [error, setError] = useState(null);
  
  // Estado para mostrar un indicador de carga mientras se obtienen los datos
  const [loading, setLoading] = useState(true);

  // URL de la API fake 
  // Esta URL debe coincidir con la de json-server
  const API_URL = 'http://localhost:3002/butterfly';

  // useEffect se ejecuta cuando el componente se monta (una sola vez)
  useEffect(() => {
    // Función asíncrona para obtener los datos directamente desde la API
    const fetchData = async () => {
      try {
        // Iniciamos la carga
        setLoading(true);
        
        // Hacemos la petición HTTP GET directamente a la API
        // fetch() es la función nativa de JavaScript para hacer peticiones HTTP
        const response = await fetch(API_URL);
        
        // Verificamos si la respuesta fue exitosa (status 200-299)
        if (!response.ok) {
          // Si no fue exitosa, lanzamos un error con el status
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convertimos la respuesta a formato JSON
        // response.json() devuelve una Promise, por eso usamos await
        const data = await response.json();
        
        // Verificamos que los datos sean un array
        if (Array.isArray(data)) {
          // Actualizamos el estado con los datos obtenidos
          setButterflies(data);
        } else {
          // Si no es un array, lanzamos un error
          throw new Error('Los datos recibidos no son un array válido');
        }
        
        // Limpiamos cualquier error previo
        setError(null);
        
      } catch (err) {
        // Si hay un error, lo guardamos en el estado
        console.error('Error al obtener las mariposas:', err);
        
        // Mensaje de error más específico según el tipo de error
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          setError('Error de conexión. Verifica que json-server esté ejecutándose en http://localhost:3001');
        } else {
          setError(`Error al cargar las mariposas: ${err.message}`);
        }
        
      } finally {
        // Terminamos la carga sin importar si fue exitosa o no
        setLoading(false);
      }
    };

    // Ejecutamos la función al montar el componente
    fetchData();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // Si está cargando, mostramos un mensaje
  if (loading) {
    return (
      <div className="butterfly-detail-container">
        <p>Cargando mariposas desde {API_URL}...</p>
      </div>
    );
  }

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <div className="butterfly-detail-container">
        <p style={{ color: 'red' }}>{error}</p>
        <p>URL intentada: {API_URL}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="butterfly-detail-container">
      <h2>Mariposas Europeas</h2>
      <p>Total de especies: {butterflies.length}</p>
      {butterflies.map((butterfly) => (
        <div key={butterfly.id} className="butterfly-card">
          <h3>{butterfly.name}</h3>
          <p><strong>Familia:</strong> {butterfly.family}</p>
          <p><strong>Ubicación:</strong> {butterfly.Location}</p>
          <p><strong>Hábitat:</strong> {butterfly.Hábitat}</p>
          <p><strong>Morfología:</strong> {butterfly.Morphology}</p>
          <p><strong>Ciclo de vida:</strong> {butterfly.Life}</p>
          <p><strong>Alimentación:</strong> {butterfly.Feeding}</p>
          <p><strong>Conservación:</strong> {butterfly.Conservation}</p>
        </div>
      ))}
    </div>
  );
};

export default ButterflyDetail;


/*
// USANDO SERVICIO 
// =====================================================

// Importamos React y los hooks necesarios
import React, { useEffect, useState } from 'react';
// Importamos la función que obtiene los datos desde el archivo de servicios
// Esta función encapsula la lógica de la petición HTTP
import { getButterflies } from '../services/ButterflyServices';

// Definimos el componente funcional ButterflyDetail
const ButterflyDetail = () => {
  // Creamos un estado para guardar el array de mariposas
  // Inicialmente es un array vacío []
  const [butterflies, setButterflies] = useState([]);
  
  // Estado para manejar los errores que puedan ocurrir
  const [error, setError] = useState(null);
  
  // Estado para mostrar un indicador de carga mientras se obtienen los datos
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente se monta (una sola vez)
  useEffect(() => {
    // Función asíncrona para obtener los datos desde el servicio
    const fetchData = async () => {
      try {
        // Iniciamos la carga
        setLoading(true);
        
        // Llamamos al servicio que hace el fetch a la API
        // Esta función está definida en butterflyService.js
        const data = await getButterflies();
        
        // Actualizamos el estado con los datos obtenidos
        setButterflies(data);
        
        // Limpiamos cualquier error previo
        setError(null);
        
      } catch (err) {
        // Si hay un error, lo guardamos en el estado
        console.error('Error al obtener las mariposas:', err);
        setError('Error al cargar las mariposas. Inténtalo de nuevo.');
        
      } finally {
        // Terminamos la carga sin importar si fue exitosa o no
        setLoading(false);
      }
    };

    // Ejecutamos la función al montar el componente
    fetchData();
  }, []); // El array vacío [] asegura que solo se ejecute una vez

  // Si está cargando, mostramos un mensaje
  if (loading) {
    return (
      <div className="butterfly-detail-container">
        <p>Cargando mariposas...</p>
      </div>
    );
  }

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <div className="butterfly-detail-container">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="butterfly-detail-container">
      <h2>Mariposas Europeas</h2>
      <p>Total de especies: {butterflies.length}</p>
      {butterflies.map((butterfly) => (
        <div key={butterfly.id} className="butterfly-card">
          <h3>{butterfly.name}</h3>
          <p><strong>Familia:</strong> {butterfly.family}</p>
          <p><strong>Ubicación:</strong> {butterfly.Location}</p>
          <p><strong>Hábitat:</strong> {butterfly.Hábitat}</p>
          <p><strong>Morfología:</strong> {butterfly.Morphology}</p>
          <p><strong>Ciclo de vida:</strong> {butterfly.Life}</p>
          <p><strong>Alimentación:</strong> {butterfly.Feeding}</p>
          <p><strong>Conservación:</strong> {butterfly.Conservation}</p>
        </div>
      ))}
    </div>
  );
};

export default ButterflyDetail;
*/