// src/components/Map.jsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom'; // Hook para navegación programática
import { X } from 'lucide-react';

// URL del mapa del mundo en formato TopoJSON desde CDN público
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Diccionario que mapea códigos ISO de países a nombres en español para mostrar
const countryNames = {
  FR: 'Francia',
  ES: 'España',
  IT: 'Italia',
  DE: 'Alemania',
  GB: 'Reino Unido',
  PL: 'Polonia',
  PT: 'Portugal',
  NL: 'Países Bajos', // Añadido por si aparece en datos de usuario
  BE: 'Bélgica',     // Añadido por si aparece en datos de usuario
  CH: 'Suiza',       // Añadido por si aparece en datos de usuario
  AT: 'Austria',     // Añadido por si aparece en datos de usuario
};

// Función para extraer códigos de país desde el campo Location del JSON
// MEJORADA: Ahora maneja más variaciones de nombres de países
const extractCountriesFromLocation = (location) => {
  // Convertimos el texto a minúsculas para hacer búsquedas insensibles a mayúsculas
  const locationLower = location.toLowerCase();
  const countries = [];
  
  // Buscamos menciones de países en el texto de ubicación
  // MEJORADO: Más variaciones de nombres para cada país
  if (locationLower.includes('españa') || locationLower.includes('spain') || 
      locationLower.includes('peninsula') || locationLower.includes('ibérica')) {
    countries.push('ES');
  }
  if (locationLower.includes('portugal') || locationLower.includes('portuguese')) {
    countries.push('PT');
  }
  if (locationLower.includes('francia') || locationLower.includes('france') || 
      locationLower.includes('français')) {
    countries.push('FR');
  }
  if (locationLower.includes('italia') || locationLower.includes('italy') || 
      locationLower.includes('italian')) {
    countries.push('IT');
  }
  if (locationLower.includes('alemania') || locationLower.includes('germany') || 
      locationLower.includes('german') || locationLower.includes('deutschland')) {
    countries.push('DE');
  }
  if (locationLower.includes('reino unido') || locationLower.includes('united kingdom') || 
      locationLower.includes('england') || locationLower.includes('scotland') || 
      locationLower.includes('wales') || locationLower.includes('britain')) {
    countries.push('GB');
  }
  if (locationLower.includes('polonia') || locationLower.includes('poland') || 
      locationLower.includes('polish')) {
    countries.push('PL');
  }
  // NUEVOS: Países adicionales que podrían aparecer en datos de usuario
  if (locationLower.includes('países bajos') || locationLower.includes('netherlands') || 
      locationLower.includes('holland') || locationLower.includes('holanda')) {
    countries.push('NL');
  }
  if (locationLower.includes('bélgica') || locationLower.includes('belgium') || 
      locationLower.includes('belgian')) {
    countries.push('BE');
  }
  if (locationLower.includes('suiza') || locationLower.includes('switzerland') || 
      locationLower.includes('swiss')) {
    countries.push('CH');
  }
  if (locationLower.includes('austria') || locationLower.includes('austrian')) {
    countries.push('AT');
  }
  
  return countries; // Devolvemos array con códigos ISO encontrados
};

// COMPONENTE PRINCIPAL MEJORADO
// Ahora recibe datos dinámicos y puede navegar a detalles
const Map = ({ butterfliesData = [] }) => {
  // Hook de navegación para redirigir a páginas de detalles
  const navigate = useNavigate();
  
  // Estado para controlar qué país está seleccionado y su modal
  const [selectedCountry, setSelectedCountry] = useState(null);
  // Estado para controlar qué país tiene el cursor encima (hover)
  const [hoveredISO, setHoveredISO] = useState(null);

  // MEJORADO: Ahora usa solo datos externos (del usuario + datos base)
  // Si no hay datos, muestra mensaje vacío en lugar de datos por defecto
  const dataToUse = butterfliesData;

  // Función que se ejecuta cuando se hace clic en un país del mapa
  const handleCountryClick = (isoCode) => {
    // Filtramos mariposas que existen en el país clickeado
    const butterfliesInCountry = dataToUse.filter((butterfly) => {
      // Extraemos países de la ubicación de cada mariposa
      const countries = extractCountriesFromLocation(butterfly.Location || '');
      // Verificamos si el país clickeado está en la lista de países de la mariposa
      return countries.includes(isoCode);
    });
    
    // Si hay mariposas en ese país, abrimos el modal
    if (butterfliesInCountry.length > 0) {
      setSelectedCountry({
        id: isoCode, // Código ISO del país
        name: countryNames[isoCode] || isoCode, // Nombre bonito del país
        butterflies: butterfliesInCountry, // Array de mariposas en ese país
      });
    }
  };

  // NUEVA FUNCIÓN: Maneja el clic en una mariposa específica
  const handleButterflyClick = (butterfly) => {
    // Cerramos el modal primero
    setSelectedCountry(null);
    // Navegamos a la página de detalles usando el ID de la mariposa
    navigate(`/butterflydetail/${butterfly.id}`);
  };

  return (
    // Contenedor principal con ancho máximo y centrado
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Contenedor del mapa con fondo degradado y sombra */}
      <div
        className="rounded-xl shadow-2xl relative overflow-hidden p-6"
        style={{
          // Fondo degradado beige/dorado que simula pergamino antiguo
          background: 'linear-gradient(135deg, #F5F5DC 0%, #E6D7B8 30%, #D2B48C 100%)',
        }}
      >
        {/* Textura de puntos sutil como fondo decorativo */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            // SVG inline que crea patrón de puntos pequeños
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* MEJORADO: Título más descriptivo que incluye datos dinámicos */}
        <div className="text-center mb-4 z-10 relative">
          <p className="text-gray-700 text-lg font-medium" style={{ fontFamily: 'serif' }}>
            Haz clic en un país para descubrir sus mariposas polinizadoras.
          </p>
          {/* NUEVO: Contador de especies documentadas */}
          <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: 'serif' }}>
            {dataToUse.length > 0 
              ? `${dataToUse.length} especies documentadas` 
              : 'Cargando datos de mariposas...'}
          </p>
        </div>

        {/* Componente de mapa interactivo */}
        <ComposableMap
          projection="geoAzimuthalEqualArea" // Proyección que mantiene áreas proporcionales
          projectionConfig={{ rotate: [-10, -52, 0], scale: 850 }} // Configuración para centrar en Europa
          className="relative z-10"
          style={{ maxHeight: '600px', width: '100%' }}
        >
          {/* Componente que maneja las geografías del mapa */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              // Mapeamos cada país del archivo TopoJSON
              geographies.map((geo) => {
                // Obtenemos código ISO del país actual
                const iso = geo.properties.ISO_A2;
                
                // Verificamos si hay mariposas documentadas en este país
                const hasButterflies = dataToUse.some((butterfly) => {
                  const countries = extractCountriesFromLocation(butterfly.Location || '');
                  return countries.includes(iso);
                });

                // MEJORADO: Contamos cuántas especies hay en cada país
                const butterflyCount = dataToUse.filter((butterfly) => {
                  const countries = extractCountriesFromLocation(butterfly.Location || '');
                  return countries.includes(iso);
                }).length;

                // Verificamos si el mouse está sobre este país
                const isHovered = hoveredISO === iso;

                // Definimos estilos según si el país tiene mariposas o no
                const styles = {
                  // Estilo por defecto
                  default: {
                    fill: hasButterflies ? '#8B7355' : '#E5E7EB', // Marrón si tiene mariposas, gris si no
                    stroke: hasButterflies ? '#6B5B47' : '#D1D5DB', // Borde más oscuro
                    cursor: hasButterflies ? 'pointer' : 'not-allowed', // Cursor cambia según interactividad
                    opacity: hasButterflies ? 1 : 0.6, // Más opaco si tiene mariposas
                    transition: 'all 0.3s ease', // Transición suave para cambios
                  },
                  // Estilo cuando se pasa el mouse encima
                  hover: {
                    fill: hasButterflies ? '#D4AF37' : '#E5E7EB', // Dorado si tiene mariposas
                    stroke: hasButterflies ? '#B8860B' : '#D1D5DB',
                    cursor: hasButterflies ? 'pointer' : 'not-allowed',
                  },
                  // Estilo cuando se presiona
                  pressed: {
                    fill: '#B8860B', // Dorado más oscuro
                  },
                };

                // Renderizamos cada país como componente Geography
                return (
                  <Geography
                    key={geo.rsmKey} // Key único para React
                    geography={geo} // Datos geográficos del país
                    onClick={() => handleCountryClick(iso)} // Evento de clic
                    onMouseEnter={() => setHoveredISO(iso)} // Evento cuando entra el mouse
                    onMouseLeave={() => setHoveredISO(null)} // Evento cuando sale el mouse
                    style={styles} // Aplicamos estilos definidos arriba
                    // NUEVO: Tooltip con información del país
                    title={hasButterflies 
                      ? `${countryNames[iso] || iso}: ${butterflyCount} especie${butterflyCount !== 1 ? 's' : ''}`
                      : `${countryNames[iso] || iso}: Sin datos`}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* MODAL SIMPLIFICADO que aparece cuando se selecciona un país */}
        {selectedCountry && (
          // Overlay de fondo oscuro semitransparente
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            {/* Contenedor principal del modal - REDUCIDO EN ALTURA */}
            <div className="rounded-xl max-w-5xl w-full max-h-80 overflow-auto shadow-2xl" style={{ backgroundColor: '#F5F5DC' }}>
              {/* Header del modal con título y botón cerrar */}
              <div
                className="flex justify-between items-center p-4 border-b rounded-t-xl"
                style={{ background: 'linear-gradient(135deg, #4A4458 0%, #3D3650 100%)' }}
              >
                {/* Título del modal mostrando nombre del país */}
                <h3 className="text-lg font-bold text-yellow-300" style={{ fontFamily: 'serif' }}>
                  Mariposas de {selectedCountry.name}
                </h3>
                {/* Botón X para cerrar modal */}
                <button 
                  onClick={() => setSelectedCountry(null)} 
                  className="text-yellow-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENIDO SIMPLIFICADO del modal */}
              <div className="p-4">
                {/* Texto descriptivo con cantidad de especies - MÁS COMPACTO */}
                <p className="text-gray-700 mb-4 text-center text-sm" style={{ fontFamily: 'serif' }}>
                  <strong>{selectedCountry.butterflies.length}</strong> especie
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} documentada
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} • 
                  Haz clic en una mariposa para ver sus detalles
                </p>

                {/* GRID MEJORADO para mostrar las mariposas - MÁS COMPACTO */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {/* Mapeamos cada mariposa del país seleccionado */}
                  {selectedCountry.butterflies.map((butterfly) => (
                    // TARJETA SIMPLIFICADA de cada mariposa - SOLO IMAGEN Y NOMBRE
                    <div
                      key={butterfly.id} // Key único usando ID de la mariposa
                      className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => handleButterflyClick(butterfly)} // NUEVA: Usa función de navegación
                      style={{ borderColor: '#8B7355', backgroundColor: '#FEFEFE' }}
                    >
                      {/* IMAGEN COMPACTA de la mariposa */}
                      <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                        {butterfly.image ? (
                          // Si tiene imagen, la mostramos
                          <img 
                            src={butterfly.image} 
                            alt={butterfly.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Si la imagen falla al cargar, mostramos placeholder
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        {/* Placeholder COMPACTO cuando no hay imagen o falla al cargar */}
                        <div 
                          className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
                          style={{ display: butterfly.image ? 'none' : 'flex' }}
                        >
                          <div className="text-2xl">🦋</div>
                        </div>
                      </div>
                      
                      {/* INFORMACIÓN MÍNIMA de la mariposa - SOLO NOMBRE */}
                      <div className="p-2">
                        {/* Nombre común de la mariposa - TEXTO MÁS PEQUEÑO */}
                        <h4 className="font-medium text-purple-800 text-xs text-center leading-tight" style={{ fontFamily: 'serif' }}>
                          {butterfly.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NUEVO: Mensaje cuando no hay datos */}
        {dataToUse.length === 0 && (
          <div className="text-center mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-4xl mb-2">🦋</div>
            <p className="text-gray-600" style={{ fontFamily: 'serif' , color:'black'}}>
              No hay datos de mariposas disponibles.
            </p>
            <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'serif',color:'black' }}>
              Agrega nuevas mariposas para verlas en el mapa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Exportamos el componente para uso en otros archivos
export default Map;