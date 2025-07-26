import React, { useEffect, useState } from 'react';
import '../style/butterflygallery.css';
import { getAllButterflies, updateButterfly, deleteButterfly } from '../services/ButterflyServices';
import Swal from 'sweetalert2';

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
    image: '',
    // Campos simplificados
    habitat: '',
    morphology: '',
    life: '',
    feeding: '',
    conservation: ''
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
      image: butterfly.image || '',
      habitat: butterfly.habitat || '',
      morphology: butterfly.morphology || '',
      life: butterfly.life || '',
      feeding: butterfly.feeding || '',
      conservation: butterfly.conservation || ''
    });
    setShowEditModal(true);
  };

  // Función para manejar la eliminación con SweetAlert2 personalizado
  const handleDelete = async (butterfly) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar la mariposa "${butterfly.name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text',
          confirmButton: 'custom-swal-confirm',
          cancelButton: 'custom-swal-cancel'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3',
        backdrop: `
          rgba(0, 0, 0, 0.7)
        `
      });

      if (result.isConfirmed) {
        await deleteButterfly(butterfly.id);
        await fetchButterflies();
        
        Swal.fire({
          title: 'Eliminada',
          text: 'La mariposa ha sido eliminada correctamente.',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            htmlContainer: 'custom-swal-text'
          },
          background: 'rgba(29, 27, 63, 0.95)',
          color: '#f5e0a3'
        });
      }
    } catch (error) {
      console.error('Error al eliminar la mariposa:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar la mariposa.',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
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
      
      Swal.fire({
        title: 'Actualizada',
        text: 'La mariposa ha sido actualizada correctamente.',
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
    } catch (error) {
      console.error('Error al actualizar la mariposa:', error);
      window.Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar la mariposa.',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-text'
        },
        background: 'rgba(29, 27, 63, 0.95)',
        color: '#f5e0a3'
      });
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

                      {/* Botones de Editar y Eliminar - Mejorados */}
                      <div className="card-actions">
                        <button 
                          className="btn-edit improved-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(butterfly);
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          className="btn-delete improved-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(butterfly);
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          🗑️ Eliminar
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

      {/* Modal de Edición Expandido */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content expanded-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Mariposa</h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="edit-form expanded-form">
              <div className="form-columns">
                {/* Columna 1 - Información Básica */}
                <div className="form-column">
                  <h3>Información Básica</h3>
                  
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
                </div>

                {/* Columna 2 - Características Físicas y Hábitat */}
                <div className="form-column">
                  <h3>Características y Hábitat</h3>
                  
                  <div className="form-group">
                    <label htmlFor="habitat">Hábitat:</label>
                    <textarea
                      id="habitat"
                      name="habitat"
                      value={editFormData.habitat}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Descripción del hábitat natural"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="morphology">Morfología:</label>
                    <textarea
                      id="morphology"
                      name="morphology"
                      value={editFormData.morphology}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Descripción física de la mariposa"
                    />
                  </div>
                </div>

                {/* Columna 3 - Comportamiento y Conservación */}
                <div className="form-column">
                  <h3>Comportamiento y Conservación</h3>
                  
                  <div className="form-group">
                    <label htmlFor="life">Vida:</label>
                    <textarea
                      id="life"
                      name="life"
                      value={editFormData.life}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Ciclo de vida y comportamiento"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="feeding">Alimentación:</label>
                    <textarea
                      id="feeding"
                      name="feeding"
                      value={editFormData.feeding}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Hábitos alimentarios"
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
                </div>
              </div>

              {/* Conservación - Ancho completo */}
              <div className="form-group full-width">
                <label htmlFor="conservation">Estado de Conservación:</label>
                <select
                  id="conservation"
                  name="conservation"
                  value={editFormData.conservation}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar estado de conservación...</option>
                  <option value="Preocupación menor (LC)">Preocupación menor (LC)</option>
                  <option value="Casi amenazada (NT)">Casi amenazada (NT)</option>
                  <option value="Vulnerable (VU)">Vulnerable (VU)</option>
                  <option value="En peligro (EN)">En peligro (EN)</option>
                  <option value="En peligro crítico (CR)">En peligro crítico (CR)</option>
                  <option value="Extinta en estado silvestre (EW)">Extinta en estado silvestre (EW)</option>
                  <option value="Extinta (EX)">Extinta (EX)</option>
                </select>
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