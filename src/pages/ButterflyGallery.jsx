import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/butterflygallery.css';
import { getAllButterflies, updateButterfly, deleteButterfly } from '../services/ButterflyServices';
import Swal from 'sweetalert2';



export default function ButterflyGallery() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingButterfly, setEditingButterfly] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    'other names': '',
    family: '',
    Location: '',
    'Hábitat': '',
    Morphology: '',
    Life: '',
    Feeding: '',
    Conservation: '',
    'about conservation': '',
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
      setError(`Error del servidor: ${error.message}. Mostrando datos de prueba.`);
    } finally {
      setLoading(false);
    }
  }

  // Función para navegar al detalle de la mariposa
  const handleCardClick = (butterfly) => {
    navigate(`/butterflydetail/${butterfly.id}`, { state: { butterfly } });
  };

  // Función para manejar la edición
  const handleEdit = (e, butterfly) => {
    e.stopPropagation(); // Prevenir que se active el click de la card
    setEditingButterfly(butterfly);
    setEditFormData({
      name: butterfly.name || '',
      'other names': butterfly['other names'] || '',
      family: butterfly.family || '',
      Location: butterfly.Location || '',
      'Hábitat': butterfly['Hábitat'] || '',
      Morphology: butterfly.Morphology || '',
      Life: butterfly.Life || '',
      Feeding: butterfly.Feeding || '',
      Conservation: butterfly.Conservation || '',
      'about conservation': butterfly['about conservation'] || '',
      image: butterfly.image || ''
    });
    setShowEditModal(true);
  };

  // Función para obtener el color del estado de conservación
  const getConservationColor = (status) => {
    if (!status) return '#f5e0a3';
    
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('lc') || lowerStatus.includes('preocupación menor')) {
      return '#4ade80'; // Verde
    } else if (lowerStatus.includes('nt') || lowerStatus.includes('casi amenazada')) {
      return '#fbbf24'; // Amarillo
    } else if (lowerStatus.includes('vu') || lowerStatus.includes('vulnerable')) {
      return '#f97316'; // Naranja
    } else if (lowerStatus.includes('en') || lowerStatus.includes('peligro')) {
      return '#ef4444'; // Rojo
    } else if (lowerStatus.includes('cr') || lowerStatus.includes('crítico')) {
      return '#dc2626'; // Rojo oscuro
    } else if (lowerStatus.includes('ex') || lowerStatus.includes('extinta')) {
      return '#6b7280'; // Gris
    }
    return '#f5e0a3'; // Color por defecto
  };

  // Función para manejar la eliminación con SweetAlert2 personalizado
  const handleDelete = async (e, butterfly) => {
    e.stopPropagation(); // Prevenir que se active el click de la card
    
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
        backdrop: `rgba(0, 0, 0, 0.7)`
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
      Swal.fire({
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
      <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h1>Galería de Mariposas</h1>
          <p>Cargando mariposas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
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
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      <div className="gallery-container">
        <div className="gallery-content">
          <h1 className="gallery-title">🦋 Galería de Mariposas Europeas</h1>

          {Array.isArray(data) && data.length > 0 ? (
            <div className="cards-grid">
              {data.map((butterfly) => (
                <div key={butterfly.id} className="card-container">
                  <div className="card" onClick={() => handleCardClick(butterfly)}>
                    
                    {/* Parte frontal - Imagen con estado de conservación */}
                    <div className="card-front">
                      {/* Estado de conservación en la parte superior */}
                      <div 
                        className="conservation-badge"
                        style={{ backgroundColor: getConservationColor(butterfly['about conservation']) }}
                      >
                        {butterfly['about conservation'] || 'No especificado'}
                      </div>
                      
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
                        <span>Dame clic! 👆</span>
                      </div>
                    </div>

                    {/* Parte trasera - Información básica y Botones */}
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
                            className="btn-edit improved-btn"
                            onClick={(e) => handleEdit(e, butterfly)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn-delete improved-btn"
                            onClick={(e) => handleDelete(e, butterfly)}
                            onMouseDown={(e) => e.preventDefault()}
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

        {/* Modal de Edición Expandido con todos los campos del JSON */}
        {showEditModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content expanded-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Editar Mariposa</h2>
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
              </div>
              
              <div className="edit-form expanded-form">
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
                      <label htmlFor="other names">Otros nombres:</label>
                      <input
                        type="text"
                        id="other names"
                        name="other names"
                        value={editFormData['other names']}
                        onChange={handleInputChange}
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
                      ></textarea>
                    </div>
                  </div>

                  {/* Columna 2 - Características Físicas y Hábitat */}
                  <div className="form-column">
                    <h3>Características y Hábitat</h3>
                    
                    <div className="form-group">
                      <label htmlFor="Hábitat">Hábitat:</label>
                      <textarea
                        id="Hábitat"
                        name="Hábitat"
                        value={editFormData['Hábitat']}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descripción del hábitat natural"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Morphology">Morfología:</label>
                      <textarea
                        id="Morphology"
                        name="Morphology"
                        value={editFormData.Morphology}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descripción física de la mariposa"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Life">Vida:</label>
                      <textarea
                        id="Life"
                        name="Life"
                        value={editFormData.Life}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Ciclo de vida y comportamiento"
                      ></textarea>
                    </div>
                  </div>

                  {/* Columna 3 - Comportamiento y Conservación */}
                  <div className="form-column">
                    <h3>Comportamiento y Conservación</h3>
                    
                    <div className="form-group">
                      <label htmlFor="Feeding">Alimentación:</label>
                      <textarea
                        id="Feeding"
                        name="Feeding"
                        value={editFormData.Feeding}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Hábitos alimentarios"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="Conservation">Conservación Detallada:</label>
                      <textarea
                        id="Conservation"
                        name="Conservation"
                        value={editFormData.Conservation}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Información detallada sobre conservación"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="about conservation">Estado de Conservación:</label>
                      <select
                        id="about conservation"
                        name="about conservation"
                        value={editFormData['about conservation']}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar estado...</option>
                        <option value="LC">LC - Preocupación menor</option>
                        <option value="NT">NT - Casi amenazada</option>
                        <option value="VU">VU - Vulnerable</option>
                        <option value="EN">EN - En peligro</option>
                        <option value="CR">CR - En peligro crítico</option>
                        <option value="EW">EW - Extinta en estado silvestre</option>
                        <option value="EX">EX - Extinta</option>
                      </select>
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

                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="button" className="btn-save" onClick={handleEditSubmit}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}