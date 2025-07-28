import { useState } from 'react';
import { createButterfly } from '../services/ButterflyServices.jsx';
import '../style/createbutterfly.css';

export default function CreateButterfly() {
  const [formData, setFormData] = useState({
    name: '',
    'other names': '',
    family: '',
    Location: '',
    Hábitat: '',
    Morphology: '',
    Life: '',
    Feeding: '',
    Conservation: '',
    'about conservation': '',
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const newId = Date.now().toString();
      const newButterfly = {
        id: newId,
        ...formData
      };

      const result = await createButterfly(newButterfly);
      
      if (result) {
        setMessage('¡Mariposa añadida correctamente!');
        setFormData({
          name: '',
          'other names': '',
          family: '',
          Location: '',
          Hábitat: '',
          Morphology: '',
          Life: '',
          Feeding: '',
          Conservation: '',
          'about conservation': '',
          image: ''
        });
      } else {
        setMessage('Error al añadir la mariposa');
      }
    } catch (error) {
      setMessage('Error de conexión: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToGallery = () => {
    // Aquí puedes agregar la lógica de navegación
    console.log('Regresar a la galería');
  };

  return (
    <div className="create-butterfly-container">
      {/* Botón superior */}
      <div className="back-button-container">
        <button 
          onClick={handleBackToGallery}
          className="back-button"
        >
          » Regresar a la galería
        </button>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div className="header-section">
          <h1 className="main-title">
            Cada mariposa tiene una historia ¿Quieres contarla?
          </h1>
          <p className="subtitle">
            Comparte lo que sabes sobre una especie europea.
          </p>
          <p className="subtitle">
            Con tu ayuda, la magia de Noctiluca seguirá creciendo.
          </p>
        </div>

        {/* Decorative butterfly */}
        <div className="butterfly-decoration">
          <svg width="80" height="80" viewBox="0 0 100 100" className="butterfly-svg">
            <path d="M50 20 C40 10, 20 15, 15 35 C10 50, 20 60, 35 55 C40 52, 45 48, 50 50 C55 48, 60 52, 65 55 C80 60, 90 50, 85 35 C80 15, 60 10, 50 20 Z" 
                  fill="currentColor" opacity="0.6"/>
            <path d="M50 50 C45 60, 40 70, 35 85 C30 95, 40 98, 50 90 C50 85, 50 75, 50 70 C50 75, 50 85, 50 90 C60 98, 70 95, 65 85 C60 70, 55 60, 50 50 Z" 
                  fill="currentColor" opacity="0.4"/>
          </svg>
        </div>

        {/* Formulario */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="butterfly-form">
            {message && (
              <div className={`message ${message.includes('correctamente') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="form-content">
              {/* Primera fila */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input highlighted"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Hábitat
                  </label>
                  <input
                    type="text"
                    name="Hábitat"
                    value={formData.Hábitat}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Alimentación
                  </label>
                  <input
                    type="text"
                    name="Feeding"
                    value={formData.Feeding}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              {/* Segunda fila */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Otros nombres
                  </label>
                  <input
                    type="text"
                    name="other names"
                    value={formData['other names']}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Morfología
                  </label>
                  <input
                    type="text"
                    name="Morphology"
                    value={formData.Morphology}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Conservación detallada
                  </label>
                  <input
                    type="text"
                    name="Conservation"
                    value={formData.Conservation}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              {/* Tercera fila */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Familia
                  </label>
                  <input
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Vida
                  </label>
                  <input
                    type="text"
                    name="Life"
                    value={formData.Life}
                    onChange={handleChange}
                    className="form-input"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Estado de conservación
                  </label>
                  <select
                    name="about conservation"
                    value={formData['about conservation']}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="LC">LC (Least Concern)</option>
                    <option value="NT">NT (Near Threatened)</option>
                    <option value="VU">VU (Vulnerable)</option>
                    <option value="EN">EN (Endangered)</option>
                    <option value="CR">CR (Critically Endangered)</option>
                  </select>
                </div>
              </div>

              {/* Cuarta fila */}
              <div className="form-row two-cols">
                <div className="form-group">
                  <label className="form-label">
                    Ubicación
                  </label>
                  <textarea
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    rows="3"
                    className="form-textarea"
                    placeholder=""
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    URL de la imagen
                  </label>
                  <textarea
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    rows="3"
                    className="form-textarea"
                    placeholder="https://"
                  />
                </div>
              </div>

              {/* Botón de envío */}
              <div className="submit-container">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? 'disabled' : ''}`}
                >
                  {isSubmitting ? 'Guardando...' : 'Crear Mariposa'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}