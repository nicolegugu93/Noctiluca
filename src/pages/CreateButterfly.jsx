import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createButterfly } from '../services/ButterflyServices.jsx';
import '../style/createbutterfly.css';

export default function CreateButterfly() {
  const navigate = useNavigate();

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
  const handleImageUpload = () => {

    if (!window.cloudinary) {
      alert('Error: Cloudinary no está disponible. Verifica que el script esté cargado.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget({
      cloudName: 'dggqy6jfb',
      uploadPreset: 'butterflies_preset',
      folder: 'butterflies',
      multiple: false,
      resourceType: 'image',
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      maxFileSize: 10000000,
      sources: ['local', 'url', 'camera']
    }, (error, result) => {
      console.log('Cloudinary result:', result); 

      if (error) {
        console.error('Error en Cloudinary:', error);
        return;
      }

      if (result && result.event === "success") {
        console.log('Imagen subida exitosamente:', result.info.secure_url);
        setFormData(prev => ({
          ...prev,
          image: result.info.secure_url
        }));
      }
    });

    widget.open();
  };
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

        setTimeout(() => {
          navigate('/butterflygallery'); 
        }, 1500);
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
    navigate('/butterflygallery');
  };

  return (
    <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      <div className="create-butterfly-container">

        {/* Contenido principal */}
        <div className="main-content">
          
          {/* FORMULARIO */}
          <div className="form-wrapper">
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

            <form onSubmit={handleSubmit} className="butterfly-form">
              {message && (
                <div className={`message ${message.includes('correctamente') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="form-content">
                {/* Primera fila - 3 columnas */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Hábitat</label>
                    <input
                      type="text"
                      name="Hábitat"
                      value={formData.Hábitat}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Alimentación</label>
                    <input
                      type="text"
                      name="Feeding"
                      value={formData.Feeding}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Segunda fila  */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Otros nombres</label>
                    <input
                      type="text"
                      name="other names"
                      value={formData['other names']}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Morfología</label>
                    <input
                      type="text"
                      name="Morphology"
                      value={formData.Morphology}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Conservación detallada</label>
                    <input
                      type="text"
                      name="Conservation"
                      value={formData.Conservation}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="form-row three-cols">
                  <div className="form-group">
                    <label className="form-label">Familia</label>
                    <input
                      type="text"
                      name="family"
                      value={formData.family}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Vida</label>
                    <input
                      type="text"
                      name="Life"
                      value={formData.Life}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Estado de conservación</label>
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

                {/* Cuarta fila - 2 columnas */}
                <div className="form-row two-cols">
                  <div className="form-group">
                    <label className="form-label">Ubicación</label>
                    <textarea
                      name="Location"
                      value={formData.Location}
                      onChange={handleChange}
                      rows="4"
                      className="form-textarea"
                      required
                    />
                  </div>                 

                  <div className="form-group">
                    <label className="form-label">Imagen</label>
                    <div className="image-upload-section">
                      <textarea
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        rows="3"
                        className="form-textarea"
                        placeholder="https://"
                      />
                      <div className="upload-divider">O</div>
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        className="upload-button"
                      >
                        📁 Subir imagen desde ordenador
                      </button>
                    </div>
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
    </section>
  );
}