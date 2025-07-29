import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../services/ButterflyServices.jsx';
import '../style/butterflymembers.css';

export default function ContactButterfly() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
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
      const contactData = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      };

      const result = await createContact(contactData);
      
      if (result) {
        setMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        setFormData({
          name: '',
          email: '',
          reason: ''
        });

        // Redirigir a la galería después de un momento
        setTimeout(() => {
          navigate('/butterflygallery');
        }, 2000);
      } else {
        setMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
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
    <div className="contact-butterfly-container">
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
            ¿Quieres contactarnos?
          </h1>
          <p className="subtitle">
            Rellena el formulario a continuación si buscas conocer más información sobre nuestro proyecto
          </p>
        </div>

        {/* Formulario de contacto */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            {message && (
              <div className={`message ${message.includes('correctamente') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="form-content">
              {/* Primera fila - Nombre y Email */}
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input highlighted"
                    required
                  />
                </div>
              </div>

              {/* Segunda fila - Motivo del contacto */}
              <div className="form-row full-width">
                <div className="form-group">
                  <label className="form-label">
                    Cuéntanos por qué nos contactas
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="6"
                    className="form-textarea"
                    placeholder="Describe el motivo de tu contacto..."
                    required
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
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Sección de desarrolladores */}
        <div className="developers-section">
          <h2 className="developers-title">
            Este proyecto ha sido desarrollado por:
          </h2>
          <div className="developers-grid">
            <div className="developer-card">
              <div className="developer-avatar"></div>
              <p className="developer-name">Nombre</p>
              <div className="developer-links">
                <a href="#" className="developer-link">📧</a>
                <a href="#" className="developer-link">🔗</a>
              </div>
            </div>
            <div className="developer-card">
              <div className="developer-avatar"></div>
              <p className="developer-name">Nombre</p>
              <div className="developer-links">
                <a href="#" className="developer-link">📧</a>
                <a href="#" className="developer-link">🔗</a>
              </div>
            </div>
            <div className="developer-card">
              <div className="developer-avatar"></div>
              <p className="developer-name">Nombre</p>
              <div className="developer-links">
                <a href="#" className="developer-link">📧</a>
                <a href="#" className="developer-link">🔗</a>
              </div>
            </div>
            <div className="developer-card">
              <div className="developer-avatar"></div>
              <p className="developer-name">Nombre</p>
              <div className="developer-links">
                <a href="#" className="developer-link">📧</a>
                <a href="#" className="developer-link">🔗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}