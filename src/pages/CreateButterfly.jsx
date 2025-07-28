import { useState } from 'react';

// Simulación del servicio (en tu caso real usarías la importación)
const createButterfly = async (butterflyData) => {
  // Simulación de la función - en tu código real importarías desde ButterflyServices.jsx
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mariposa creada:', butterflyData);
      resolve({ success: true, data: butterflyData });
    }, 1000);
  });
};

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

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #2D1B69 0%, #11092A 50%, #0D0820 100%)',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Botón superior */}
      <div className="pt-6 pl-6">
        <button className="px-4 py-2 bg-yellow-600 text-yellow-100 rounded-md text-sm font-medium hover:bg-yellow-700 transition-colors">
          » Regresar a la galería
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-yellow-200 mb-6">
            Cada mariposa tiene una historia ¿Quieres contarla?
          </h1>
          <p className="text-lg text-purple-200 mb-2">
            Comparte lo que sabes sobre una especie europea.
          </p>
          <p className="text-lg text-purple-200">
            Con tu ayuda, la magia de Noctiluca seguirá creciendo.
          </p>
        </div>

        {/* Decorative butterfly */}
        <div className="absolute top-32 right-16 opacity-30">
          <svg width="80" height="80" viewBox="0 0 100 100" className="text-yellow-300">
            <path d="M50 20 C40 10, 20 15, 15 35 C10 50, 20 60, 35 55 C40 52, 45 48, 50 50 C55 48, 60 52, 65 55 C80 60, 90 50, 85 35 C80 15, 60 10, 50 20 Z" 
                  fill="currentColor" opacity="0.6"/>
            <path d="M50 50 C45 60, 40 70, 35 85 C30 95, 40 98, 50 90 C50 85, 50 75, 50 70 C50 75, 50 85, 50 90 C60 98, 70 95, 65 85 C60 70, 55 60, 50 50 Z" 
                  fill="currentColor" opacity="0.4"/>
          </svg>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-4xl">
          <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm p-8 rounded-3xl border-2 border-yellow-400 shadow-2xl">
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
                message.includes('correctamente') 
                  ? 'bg-green-900 bg-opacity-50 text-green-300 border border-green-700' 
                  : 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700'
              }`}>
                {message}
              </div>
            )}

            <div className="space-y-6">
              {/* Primera fila */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border-2 border-blue-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Hábitat
                  </label>
                  <input
                    type="text"
                    name="Hábitat"
                    value={formData.Hábitat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Alimentación
                  </label>
                  <input
                    type="text"
                    name="Feeding"
                    value={formData.Feeding}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              {/* Segunda fila */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Otros nombres
                  </label>
                  <input
                    type="text"
                    name="other names"
                    value={formData['other names']}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Morfología
                  </label>
                  <input
                    type="text"
                    name="Morphology"
                    value={formData.Morphology}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Conservación detallada
                  </label>
                  <input
                    type="text"
                    name="Conservation"
                    value={formData.Conservation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              {/* Tercera fila */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Familia
                  </label>
                  <input
                    type="text"
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Vida
                  </label>
                  <input
                    type="text"
                    name="Life"
                    value={formData.Life}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Estado de conservacion
                  </label>
                  <select
                    name="about conservation"
                    value={formData['about conservation']}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Ubicación
                  </label>
                  <textarea
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-vertical"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    URL de la imagen
                  </label>
                  <textarea
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 bg-opacity-70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-vertical"
                    placeholder="https://"
                  />
                </div>
              </div>

              {/* Botón de envío */}
              <div className="flex justify-center pt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? 'Guardando...' : 'Crear Mariposa'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}