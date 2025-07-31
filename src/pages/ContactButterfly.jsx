import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContact } from '../services/ButterflyServices.jsx';
import '../style/butterflymembers.css';
import ButtonCreateButterfly from '../components/ButtonCreateButterfly';
import marianaImg from '../assets/mariana.jpeg';
import nicoleImg from '../assets/nicole.jpg';
import valentinaImg from '../assets/valentina.jpeg';
import maryoriImg from '../assets/maryori.jpeg';
import estherImg from '../assets/esther.jpg';
import rocioImg from '../assets/rocio.jpeg';

import butterflyWing from '../assets/logo-mariposa.png'; 

export default function ContactButterfly() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [imageLoadStatus, setImageLoadStatus] = useState({});

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

  const handleImageLoad = (developerName) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [developerName]: 'loaded'
    }));
  };

  const handleImageError = (developerName) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [developerName]: 'error'
    }));
  };

  const handleLinkClick = (url, platform) => {
    console.log(`Abriendo ${platform}: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const developers = [
    {
            name: "Esther",
      image: estherImg, 
      github: "https://github.com/EstherTapias",
      linkedin: "https://www.linkedin.com/in/esther-tapias-paez-camino/"
    },
    {
      name: "Nicole", 
      image: nicoleImg, 
      github: "https://github.com/nicolegugu93",
      linkedin: "https://www.linkedin.com/in/nicoleguevaragutierrez"
    },
    {
      name: "Valentina",
      image: valentinaImg, 
      github: "https://github.com/ValenMontilla7",
      linkedin: "https://www.linkedin.com/in/valentin-montilla-march/"
    },
    {
      name: "Rocío",
      image: rocioImg, 
      github: "https://github.com/Rocio-Coronel",
      linkedin: "https://www.linkedin.com/in/roc%C3%ADo-coronel/"
      
    },
    {
      name: "Mariana",
      image: marianaImg, 
      github: "https://github.com/MarianaMH1195",
      linkedin: "https://www.linkedin.com/in/mariana-moreno-henao-70305a16b/"
    },
    {
      name: "Maryori",
      image: maryoriImg, 
      github: "https://github.com/MaryoriCruz",
      linkedin: "https://www.linkedin.com/in/maryori-cruz-eguizabal-6b440116b/"
    }
  ];

  return (
    <section className="bg-gradient-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      <div className="contact-butterfly-container">
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

          {/* Sección de desarrolladores con las wings */}
          <div className="developers-section">
            <h2 className="developers-title">
              Este proyecto ha sido desarrollado por:
            </h2>
            <div className="developers-grid">
              {developers.map((developer, index) => (
                <div key={index} className="developer-card">
                  {/* Ala izquierda - Usar la imagen importada */}
                  <img 
                    src={butterflyWing}
                    alt="Wing" 
                    className="butterfly-wing left-wing"
                    onError={(e) => {
                      console.log('Error cargando ala izquierda');
                      e.target.style.display = 'none';
                    }}
                  />

                  <div className="developer-content">
                    <div 
                      className="developer-image-container"
                      data-has-image={imageLoadStatus[developer.name] === 'loaded' ? 'true' : undefined}
                    >
                      <img 
                        src={developer.image} 
                        alt={developer.name}
                        className="developer-image"
                        onLoad={() => handleImageLoad(developer.name)}
                        onError={() => handleImageError(developer.name)}
                        style={{
                          display: imageLoadStatus[developer.name] === 'loaded' ? 'block' : 'none'
                        }}
                      />
                      <div 
                        className="developer-placeholder"
                        style={{
                          display: imageLoadStatus[developer.name] === 'loaded' ? 'none' : 'flex'
                        }}
                      >
                        👤
                      </div>
                    </div>
                  </div>

                  {/* Ala derecha  */}
                  <img 
                    src={butterflyWing}
                    alt="Wing" 
                    className="butterfly-wing right-wing"
                    onError={(e) => {
                      console.log('Error cargando ala derecha');
                      e.target.style.display = 'none';
                    }}
                  />

                  <p className="developer-name">{developer.name}</p>

                  <div className="developer-links-external">
                    {/* Enlace GitHub */}
                    {developer.github && (
                      <a 
                        href={developer.github}
                        className="developer-link github"
                        title={`GitHub de ${developer.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          console.log('Click en GitHub:', developer.github);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    
                    {/* Enlace LinkedIn */}
                    {developer.linkedin && (
                      <a 
                        href={developer.linkedin}
                        className="developer-link linkedin"
                        title={`LinkedIn de ${developer.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          console.log('Click en LinkedIn:', developer.linkedin);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ButtonCreateButterfly/>
    </section>
  );
}