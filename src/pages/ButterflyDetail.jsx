// COMPONENTE PARA MOSTRAR DETALLES DE UNA MARIPOSA ESPECÍFICA - USANDO SERVICIOS
// =====================================================

// Importamos React y los hooks necesarios
import React, { useEffect, useState } from 'react';
// Importamos useParams para obtener el ID desde la URL
import { useParams } from 'react-router-dom';
// Importamos la función que obtiene los datos de una mariposa específica
import { getOneButterfly } from '../services/ButterflyServices';
// Importamos los estilos CSS
import '../style/butterflydetail.css';

// Definimos el componente funcional ButterflyDetail
const ButterflyDetail = () => {
  // Obtenemos el ID de la mariposa desde los parámetros de la URL
  const { id } = useParams();
  
  // Creamos un estado para guardar los datos de UNA mariposa específica
  const [butterfly, setButterfly] = useState(null);
  
  // Estado para manejar los errores que puedan ocurrir
  const [error, setError] = useState(null);
  
  // Estado para mostrar un indicador de carga mientras se obtienen los datos
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente se monta O cuando cambia el ID
  useEffect(() => {
    // Función asíncrona para obtener los datos de la mariposa específica
    const fetchButterflyDetails = async () => {
      try {
        // Verificamos que tenemos un ID válido antes de hacer la petición
        if (!id) {
          console.log('Esperando a que el ID esté disponible...');
          return;
        }
        
        // Iniciamos la carga
        setLoading(true);
        
        // Llamamos al servicio que hace el fetch a la API para obtener UNA mariposa
        const data = await getOneButterfly(id);
        
        // Verificamos que recibimos datos válidos
        if (!data) {
          throw new Error('Mariposa no encontrada');
        }
        
        // Actualizamos el estado con los datos de la mariposa obtenida
        setButterfly(data);
        
        // Limpiamos cualquier error previo
        setError(null);
        
      } catch (err) {
        // Si hay un error, lo guardamos en el estado
        console.error('Error al obtener los detalles de la mariposa:', err);
        
        // Mensaje de error más específico dependiendo del tipo de error
        if (err.message.includes('404') || err.message.includes('not found')) {
          setError('La mariposa solicitada no existe.');
        } else if (err.message.includes('ID de mariposa no proporcionado')) {
          setError('ID de mariposa no válido.');
        } else {
          setError('Error al cargar los detalles de la mariposa. Inténtalo de nuevo.');
        }
        
        // Limpiamos los datos de la mariposa en caso de error
        setButterfly(null);
        
      } finally {
        // Terminamos la carga sin importar si fue exitosa o no
        setLoading(false);
      }
    };

    // Ejecutamos la función para obtener los detalles
    fetchButterflyDetails();
    
  }, [id]);

  // Renderizado condicional: Si está cargando, mostramos un mensaje
  if (loading) {
    return (
      <div className="butterfly-detail-container">
        <div className="loading-message">
          <p>Cargando detalles de la mariposa ID: {id}...</p>
        </div>
      </div>
    );
  }

  // Si hay un error, lo mostramos con opción de volver atrás
  if (error) {
    return (
      <div className="butterfly-detail-container">
        <div className="error-message">
          <p style={{ color: 'red' }}>{error}</p>
          <p>ID solicitado: {id}</p>
          <div>
            <button onClick={() => window.location.reload()} style={{ marginRight: '10px' }}>
              Reintentar
            </button>
            <button onClick={() => window.history.back()}>
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay datos de mariposa (caso edge), mostramos mensaje
  if (!butterfly) {
    return (
      <div className="butterfly-detail-container">
        <p>No se encontraron datos de la mariposa.</p>
        <button onClick={() => window.history.back()}>
          Volver atrás
        </button>
      </div>
    );
  }

  // Renderizado principal: mostramos los detalles de la mariposa
  return (
    <div className="butterfly-detail-container">
      {/* Botón para volver a la lista o página anterior */}
      <button 
        className="back-button" 
        onClick={() => window.history.back()}
      >
        ← Volver a la galeria
      </button>
      
      {/* Contenedor principal con los detalles de la mariposa */}
      <div className="butterfly-detail-card">
        
        {/* Columna izquierda - Tarjeta con imagen */}
        <div className="butterfly-image-card">
          {/* Placeholder para imagen de mariposa */}
          <div className="butterfly-image-placeholder">
            🦋
          </div>
          
          {/* Información básica en la tarjeta */}
          <div className="basic-info-card">
            <h2>Información General</h2>
            <p><strong>ID:</strong> {butterfly.id}</p>
            <p><strong>Familia:</strong> {butterfly.family}</p>
          </div>
        </div>
        
        {/* Columna derecha - Contenido detallado */}
        <div className="butterfly-content">
          {/* Título principal con el nombre de la mariposa */}
          <h1 className="butterfly-title">{butterfly.name}</h1>
          
          {/* Familia en itálica */}
          <p className="butterfly-family">{butterfly.family}</p>
          
          {/* Detalles completos organizados en secciones */}
          <div className="detailed-info">
            
            {/* Sección de Ubicación */}
            <div className="info-section">
              <h3>📍 Ubicación</h3>
              <p>{butterfly.Location || 'Información no disponible'}</p>
            </div>
            
            {/* Sección de Hábitat */}
            <div className="info-section">
              <h3>🏞️ Hábitat</h3>
              <p>{butterfly.Hábitat || 'Información no disponible'}</p>
            </div>
            
            {/* Sección de Morfología */}
            <div className="info-section">
              <h3>🔬 Morfología</h3>
              <p>{butterfly.Morphology || 'Información no disponible'}</p>
            </div>
            
            {/* Sección de Ciclo de Vida */}
            <div className="info-section">
              <h3>🔄 Ciclo de Vida</h3>
              <p>{butterfly.Life || 'Información no disponible'}</p>
            </div>
            
            {/* Sección de Alimentación */}
            <div className="info-section">
              <h3>🍃 Alimentación</h3>
              <p>{butterfly.Feeding || 'Información no disponible'}</p>
            </div>
            
            {/* Sección de Conservación */}
            <div className="info-section">
              <h3>🛡️ Estado de Conservación</h3>
              <p>{butterfly.Conservation || 'Información no disponible'}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButterflyDetail;


/*
// FETCH DIRECTO PARA MOSTRAR DETALLES DE UNA MARIPOSA ESPECÍFICA
// =====================================================

// Importamos React y los hooks necesarios
import React, { useEffect, useState } from 'react';
// Importamos useParams para obtener el ID desde la URL
import { useParams } from 'react-router-dom';

// Definimos el componente funcional ButterflyDetail
const ButterflyDetail = () => {
  // Obtenemos el ID de la mariposa desde los parámetros de la URL
  // Por ejemplo: si la ruta es /butterfly/123, id será "123"
  const { id } = useParams();
  
  // URL base de la API fake 
  // Esta URL debe coincidir con la de json-server
  const API_BASE_URL = 'http://localhost:3002/butterfly';
  
  // Creamos un estado para guardar los datos de UNA mariposa específica
  // Inicialmente es null porque esperamos a que el ID esté disponible en useEffect
  const [butterfly, setButterfly] = useState(null);
  
  // Estado para manejar los errores que puedan ocurrir
  const [error, setError] = useState(null);
  
  // Estado para mostrar un indicador de carga mientras se obtienen los datos
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta cuando el componente se monta O cuando cambia el ID
  // IMPORTANTE: El ID se pasa como dependencia para que el efecto espere a que esté disponible
  useEffect(() => {
    // Función asíncrona para obtener los datos de la mariposa específica usando fetch
    const fetchButterflyDetails = async () => {
      try {
        // Verificamos que tenemos un ID válido antes de hacer la petición
        // Esta verificación es crucial porque useEffect esperará a que ID esté disponible
        if (!id) {
          console.log('Esperando a que el ID esté disponible...');
          return; // Salimos de la función si no hay ID aún
        }
        
        // Iniciamos la carga
        setLoading(true);
        
        // Construimos la URL completa para obtener una mariposa específica
        // Por ejemplo: http://localhost:3002/butterfly/123
        const url = `${API_BASE_URL}/${id}`;
        
        // Hacemos la petición HTTP GET directamente a la API usando fetch
        // fetch() es la función nativa de JavaScript para hacer peticiones HTTP
        const response = await fetch(url);
        
        // Verificamos si la respuesta fue exitosa (status 200-299)
        if (!response.ok) {
          // Si el status es 404, significa que la mariposa no existe
          if (response.status === 404) {
            throw new Error('Mariposa no encontrada');
          }
          // Para otros errores HTTP, lanzamos un error con el status
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convertimos la respuesta a formato JSON
        // response.json() devuelve una Promise, por eso usamos await
        const data = await response.json();
        
        // Verificamos que recibimos datos válidos (un objeto, no null o undefined)
        if (!data || typeof data !== 'object') {
          throw new Error('Datos de mariposa no válidos');
        }
        
        // Actualizamos el estado con los datos de la mariposa obtenida
        setButterfly(data);
        
        // Limpiamos cualquier error previo
        setError(null);
        
      } catch (err) {
        // Si hay un error, lo guardamos en el estado
        console.error('Error al obtener los detalles de la mariposa:', err);
        
        // Mensaje de error más específico dependiendo del tipo de error
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          setError('Error de conexión. Verifica que json-server esté ejecutándose en http://localhost:3002');
        } else if (err.message.includes('404') || err.message.includes('no encontrada')) {
          setError('La mariposa solicitada no existe.');
        } else if (err.message.includes('ID de mariposa no proporcionado')) {
          setError('ID de mariposa no válido.');
        } else {
          setError(`Error al cargar los detalles de la mariposa: ${err.message}`);
        }
        
        // Limpiamos los datos de la mariposa en caso de error
        setButterfly(null);
        
      } finally {
        // Terminamos la carga sin importar si fue exitosa o no
        setLoading(false);
      }
    };

    // Ejecutamos la función para obtener los detalles
    fetchButterflyDetails();
    
  }, [id]); // CLAVE: El ID como dependencia hace que useEffect espere y se re-ejecute cuando ID cambie

  // Renderizado condicional: Si está cargando, mostramos un mensaje
  if (loading) {
    return (
      <div className="butterfly-detail-container">
        <div className="loading-message">
          <p>Cargando detalles de la mariposa desde {API_BASE_URL}/{id}...</p>          
          </div>
          </div>
        );
      }
    
      // Si hay un error, lo mostramos con información adicional y opción de volver atrás
      if (error) {
        return (
          <div className="butterfly-detail-container">
            <div className="error-message">
              <p style={{ color: 'red' }}>{error}</p>
              <p>URL intentada: {API_BASE_URL}/{id}</p>
              <div>
                <button onClick={() => window.location.reload()} style={{ marginRight: '10px' }}>
                  Reintentar
                </button>
                <button onClick={() => window.history.back()}>
                  Volver atrás
                </button>
              </div>
            </div>
          </div>
        );
      }
    
      // Si no hay datos de mariposa (caso edge), mostramos mensaje
      if (!butterfly) {
        return (
          <div className="butterfly-detail-container">
            <p>No se encontraron datos de la mariposa.</p>
            <button onClick={() => window.history.back()}>
              Volver atrás
            </button>
          </div>
        );
      }
    
      // Renderizado principal: mostramos los detalles de la mariposa
      return (
        <div className="butterfly-detail-container">          
          <button 
            className="back-button" 
            onClick={() => window.history.back()}
            style={{ marginBottom: '20px' }}
          >
            ← Volver
          </button>          
          
          <div className="butterfly-detail-card">
            
            <h1 className="butterfly-title">{butterfly.name}</h1>           
            
            <div className="basic-info">
              <h2>Información General</h2>
              <p><strong>ID:</strong> {butterfly.id}</p>
              <p><strong>Familia:</strong> {butterfly.family}</p>
            </div>            
            
            <div className="detailed-info">              
              
              <div className="info-section">
                <h3>📍 Ubicación</h3>
                <p>{butterfly.Location || 'Información no disponible'}</p>
              </div>              
              
              <div className="info-section">
                <h3>🏞️ Hábitat</h3>
                <p>{butterfly.Hábitat || 'Información no disponible'}</p>
              </div>              
              
              <div className="info-section">
                <h3>🔬 Morfología</h3>
                <p>{butterfly.Morphology || 'Información no disponible'}</p>
              </div>              
              
              <div className="info-section">
                <h3>🔄 Ciclo de Vida</h3>
                <p>{butterfly.Life || 'Información no disponible'}</p>
              </div>              
              
              <div className="info-section">
                <h3>🍃 Alimentación</h3>
                <p>{butterfly.Feeding || 'Información no disponible'}</p>
              </div>           
              
              <div className="info-section">
                <h3>🛡️ Estado de Conservación</h3>
                <p>{butterfly.Conservation || 'Información no disponible'}</p>
              </div>
              
            </div>
          </div>
        </div>
      );
    };
    
    export default ButterflyDetail;
*/

