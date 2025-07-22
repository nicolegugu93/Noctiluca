import { useState } from 'react';
import { createButterfly } from './services/butterflyService';

function App() {
  const [formData, setFormData] = useState({
    id: '',
    family: '',
    name: '',
    image: '',
    location_in_europe: '',
    habitat: '',
    morphology: '',
    life_cycle: '',
    feeding: '',
    conservation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createButterfly(formData);
      alert('Mariposa agregada con éxito');
      setFormData({
        id: '',
        family: '',
        name: '',
        image: '',
        location_in_europe: '',
        habitat: '',
        morphology: '',
        life_cycle: '',
        feeding: '',
        conservation: ''
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Formulario de Mariposas</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Agregar Mariposa</button>
      </form>
    </div>
  );
}

export default App;
