import React, { useEffect, useState } from 'react';
import '../style/butterflygallery.css';
import { getAllButterflies, updateButterfly, deleteButterfly } from '../services/ButterflyServices';

export default function ButterflyGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingButterfly, setEditingButterfly] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    family: '',
    Location: '',
    image: ''
  });

  useEffect(() => {
    fetchButterflies();
  }, []);

  async function fetchButterflies() {
    try {
      setLoading(true);
      setError(null);
      
      // Usar el servicio getAllButterflies
      const butterflies = await getAllButterflies();
      
      if (butterflies) {
        // Verificar la estructura de los datos
        if (butterflies.butterfly) {
          setData(butterflies.butterfly);
        } else if (Array.isArray(butterflies)) {
          setData(butterflies);
        } else {
          throw new Error("Estructura de datos no reconocida");
        }
      } else {
        throw new Error("No se pudieron cargar los datos");
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

  // Función para manejar la edición
  const handleEdit = (butterfly) => {
    setEditingButterfly(butterfly);
    setEditFormData({
      name: butterfly.name || '',
      family: butterfly.family || '',
      Location: butterfly.Location || '',
      image: butterfly.image || ''
    });
    setShowEditModal(true);
  };

  // Función para manejar la eliminación
  const handleDelete = async (butterfly) => {
    const isConfirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar la mariposa "${butterfly.name}"?`
    );
    
    if (isConfirmed) {
      try {
        await deleteButterfly(butterfly.id);
        // Actualizar la lista después de eliminar
        await fetchButterflies();
        alert('Mariposa eliminada correctamente');
      } catch (error) {
        console.error('Error al eliminar la mariposa:', error);
        alert('Error al eliminar la mariposa');
      }
    }
  };

  // Función para manejar el envío del formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateButterfly(editingButterfly.id, editFormData);
      setShowEditModal(false);
      setEditingButterfly(null);
      // Actualizar la lista después de editar
      await fetchButterflies();
      alert('Mariposa actualizada correctamente');
    } catch (error) {
      console.error('Error al actualizar la mariposa:', error);
      alert('Error al actualizar la mariposa');
    }
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowEditModal(false);
    setEditingButterfly(null);
  };

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

                  {/* Parte trasera - Información y Botones */}
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

                      {/* Botones de Editar y Eliminar */}
                      <div className="card-actions">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(butterfly)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDelete(butterfly)}
                        >
                          Eliminar
                        </button>
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

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Mariposa</h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="family">Familia:</label>
                <input
                  type="text"
                  id="family"
                  name="family"
                  value={editFormData.family}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="Location">Ubicación:</label>
                <textarea
                  id="Location"
                  name="Location"
                  value={editFormData.Location}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">URL de Imagen:</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={editFormData.image}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}