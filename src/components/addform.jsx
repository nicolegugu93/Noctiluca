import { useState } from 'react';
import { createButterfly } from '../services/ButterflyServices';

export default function ButterflyForm() {
  const [formData, setFormData] = useState({
    name: '',
    family: '',
    Location: '',
    Hábitat: '',
    Morphology: '',
    Life: '',
    Feeding: '',
    Conservation: '',
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

  const handleSubmit = async () => {
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
          family: '',
          Location: '',
          Hábitat: '',
          Morphology: '',
          Life: '',
          Feeding: '',
          Conservation: '',
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

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333'
  };

  const messageStyle = {
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid',
    backgroundColor: message.includes('correctamente') ? '#d4edda' : '#f8d7da',
    color: message.includes('correctamente') ? '#155724' : '#721c24',
    borderColor: message.includes('correctamente') ? '#c3e6cb' : '#f5c6cb'
  };

  const formGroupStyle = {
    marginBottom: '16px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '60px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '16px'
  };

  const buttonStyle = {
    padding: '12px 32px',
    borderRadius: '4px',
    fontWeight: '500',
    color: 'white',
    border: 'none',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        Añadir Nueva Mariposa
      </h2>

      {message && (
        <div style={messageStyle}>
          {message}
        </div>
      )}

      <div>
        <div style={gridStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Ej: Vanesa atalanta (Almirante rojo)"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="family" style={labelStyle}>
              Familia *
            </label>
            <input
              type="text"
              id="family"
              name="family"
              value={formData.family}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Ej: Nymphalidae (alas cepillo)"
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="Location" style={labelStyle}>
            Ubicación *
          </label>
          <textarea
            id="Location"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
            style={textareaStyle}
            placeholder="Describe la distribución geográfica de la mariposa"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="Hábitat" style={labelStyle}>
            Hábitat *
          </label>
          <textarea
            id="Hábitat"
            name="Hábitat"
            value={formData.Hábitat}
            onChange={handleChange}
            required
            style={textareaStyle}
            placeholder="Describe el hábitat natural de la mariposa"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="Morphology" style={labelStyle}>
            Morfología *
          </label>
          <textarea
            id="Morphology"
            name="Morphology"
            value={formData.Morphology}
            onChange={handleChange}
            required
            style={textareaStyle}
            placeholder="Describe las características físicas de la mariposa"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="Life" style={labelStyle}>
            Ciclo de Vida *
          </label>
          <textarea
            id="Life"
            name="Life"
            value={formData.Life}
            onChange={handleChange}
            required
            style={textareaStyle}
            placeholder="Describe el ciclo de vida y reproducción"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="Feeding" style={labelStyle}>
            Alimentación *
          </label>
          <textarea
            id="Feeding"
            name="Feeding"
            value={formData.Feeding}
            onChange={handleChange}
            required
            style={textareaStyle}
            placeholder="Describe los hábitos alimentarios"
          />
        </div>

        <div style={gridStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="Conservation" style={labelStyle}>
              Estado de Conservación *
            </label>
            <input
              type="text"
              id="Conservation"
              name="Conservation"
              value={formData.Conservation}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Ej: LC (Least Concern)"
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="image" style={labelStyle}>
              URL de Imagen
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={inputStyle}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={buttonStyle}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#1d4ed8';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#2563eb';
              }
            }}
          >
            {isSubmitting ? 'Guardando...' : 'Añadir Mariposa'}
          </button>
        </div>
      </div>
    </div>
  );
}