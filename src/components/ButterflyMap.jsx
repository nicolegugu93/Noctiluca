import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { getAllButterflies } from '../services/ButterflyServices';

// URL del archivo de geografías mundial
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// 🌍 Diccionario completo de países europeos para mostrar nombres bonitos
const countryNames = {
  // Europa Occidental
  FR: 'Francia',
  ES: 'España',
  IT: 'Italia',
  DE: 'Alemania',
  GB: 'Reino Unido',
  PT: 'Portugal',
  NL: 'Países Bajos',
  BE: 'Bélgica',
  CH: 'Suiza',
  AT: 'Austria',
  LU: 'Luxemburgo',
  IE: 'Irlanda',
  IS: 'Islandia',
  
  // Europa del Este
  PL: 'Polonia',
  CZ: 'República Checa',
  SK: 'Eslovaquia',
  HU: 'Hungría',
  RO: 'Rumania',
  BG: 'Bulgaria',
  HR: 'Croacia',
  SI: 'Eslovenia',
  RS: 'Serbia',
  BA: 'Bosnia y Herzegovina',
  ME: 'Montenegro',
  MK: 'Macedonia del Norte',
  AL: 'Albania',
  XK: 'Kosovo',
  
  // Europa Nórdica
  SE: 'Suecia',
  NO: 'Noruega',
  DK: 'Dinamarca',
  FI: 'Finlandia',
  
  // Países Bálticos
  EE: 'Estonia',
  LV: 'Letonia',
  LT: 'Lituania',
  
  // Europa Oriental
  UA: 'Ucrania',
  BY: 'Bielorrusia',
  MD: 'Moldavia',
  RU: 'Rusia',
  
  // Otros
  GR: 'Grecia',
  CY: 'Chipre',
  MT: 'Malta',
  MC: 'Mónaco',
  SM: 'San Marino',
  VA: 'Vaticano',
  AD: 'Andorra',
  LI: 'Liechtenstein'
};

// 🔍 Función que detecta países mencionados en el campo Location de las mariposas
const extractCountriesFromLocation = (location) => {
  const locationLower = location.toLowerCase();
  const countries = [];

  // Buscamos menciones de países en diferentes idiomas
  if (locationLower.includes('españa') || locationLower.includes('spain') || locationLower.includes('ibérica')) {
    countries.push('ES');
  }
  if (locationLower.includes('portugal')) countries.push('PT');
  if (locationLower.includes('francia') || locationLower.includes('france')) countries.push('FR');
  if (locationLower.includes('italia') || locationLower.includes('italy')) countries.push('IT');
  if (locationLower.includes('alemania') || locationLower.includes('germany') || locationLower.includes('deutschland')) countries.push('DE');
  if (locationLower.includes('reino unido') || locationLower.includes('england') || locationLower.includes('united kingdom')) countries.push('GB');
  if (locationLower.includes('polonia') || locationLower.includes('poland')) countries.push('PL');
  if (locationLower.includes('países bajos') || locationLower.includes('holanda') || locationLower.includes('netherlands')) countries.push('NL');
  if (locationLower.includes('bélgica') || locationLower.includes('belgium')) countries.push('BE');
  if (locationLower.includes('suiza') || locationLower.includes('switzerland')) countries.push('CH');
  if (locationLower.includes('austria') || locationLower.includes('österreich')) countries.push('AT');
  if (locationLower.includes('grecia') || locationLower.includes('greece')) countries.push('GR');
  if (locationLower.includes('suecia') || locationLower.includes('sweden')) countries.push('SE');
  if (locationLower.includes('noruega') || locationLower.includes('norway')) countries.push('NO');
  if (locationLower.includes('dinamarca') || locationLower.includes('denmark')) countries.push('DK');
  if (locationLower.includes('finlandia') || locationLower.includes('finland')) countries.push('FI');

  return countries;
};

const Map = () => {
  const navigate = useNavigate();

  // 📊 Estados para manejar los datos y la interfaz
  const [butterfliesData, setButterfliesData] = useState([]); // Datos de mariposas desde la API
  const [selectedCountry, setSelectedCountry] = useState(null); // País seleccionado para mostrar modal
  const [hoveredISO, setHoveredISO] = useState(null); // País sobre el que está el cursor
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 }); // Posición y zoom del mapa

  // 🔄 Cargar datos de mariposas al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllButterflies();
        console.log('Mariposas cargadas:', data);
        setButterfliesData(data || []);
      } catch (error) {
        console.error('Error cargando mariposas:', error);
        setButterfliesData([]);
      }
    }

    fetchData();
  }, []);

  // 🗺️ Función auxiliar para convertir ISO3 a ISO2
  const convertISO3ToISO2 = (iso3) => {
    const iso3ToIso2Map = {
      'ESP': 'ES', 'FRA': 'FR', 'ITA': 'IT', 'DEU': 'DE', 'GBR': 'GB',
      'POL': 'PL', 'PRT': 'PT', 'NLD': 'NL', 'BEL': 'BE', 'CHE': 'CH',
      'AUT': 'AT', 'USA': 'US', 'CAN': 'CA', 'MEX': 'MX', 'BRA': 'BR',
      'ARG': 'AR', 'CHL': 'CL', 'PER': 'PE', 'COL': 'CO', 'VEN': 'VE',
      'GRC': 'GR', 'SWE': 'SE', 'NOR': 'NO', 'DNK': 'DK', 'FIN': 'FI',
      'EST': 'EE', 'LVA': 'LV', 'LTU': 'LT', 'CZE': 'CZ', 'SVK': 'SK',
      'HUN': 'HU', 'ROU': 'RO', 'BGR': 'BG', 'HRV': 'HR', 'SVN': 'SI'
    };
    return iso3ToIso2Map[iso3] || null;
  };

  // 🏷️ Función auxiliar para convertir nombres de países a ISO2
  const convertCountryNameToISO2 = (countryName) => {
    const nameToIso2Map = {
      'spain': 'ES', 'españa': 'ES', 'espagne': 'ES',
      'france': 'FR', 'francia': 'FR',
      'italy': 'IT', 'italia': 'IT', 'italie': 'IT',
      'germany': 'DE', 'alemania': 'DE', 'deutschland': 'DE', 'allemagne': 'DE',
      'united kingdom': 'GB', 'reino unido': 'GB', 'great britain': 'GB',
      'poland': 'PL', 'polonia': 'PL', 'pologne': 'PL',
      'portugal': 'PT',
      'netherlands': 'NL', 'países bajos': 'NL', 'holanda': 'NL', 'holland': 'NL',
      'belgium': 'BE', 'bélgica': 'BE', 'belgique': 'BE',
      'switzerland': 'CH', 'suiza': 'CH', 'suisse': 'CH',
      'austria': 'AT', 'österreich': 'AT', 'autriche': 'AT',
      'greece': 'GR', 'grecia': 'GR',
      'sweden': 'SE', 'suecia': 'SE',
      'norway': 'NO', 'noruega': 'NO',
      'denmark': 'DK', 'dinamarca': 'DK',
      'finland': 'FI', 'finlandia': 'FI'
    };
    return nameToIso2Map[countryName.toLowerCase()] || null;
  };

  // 🔍 Función robusta para obtener el código ISO del país desde los datos geográficos
  const getCountryISO = (geo) => {
    const props = geo.properties;
    
    // Lista de posibles propiedades que contienen códigos de país
    const possibleISOProps = [
      'ISO_A2', 'iso_a2', 'ISO_A3', 'iso_a3', 'ADM0_A3', 'SOV_A3',
      'ISO2', 'iso2', 'ISO3', 'iso3', 'ADMIN', 'admin',
      'NAME', 'name', 'NAME_EN', 'name_en', 'NAME_ES', 'name_es',
      'SOVEREIGNT', 'sovereignt'
    ];

    // Intentamos encontrar un código ISO válido
    for (const prop of possibleISOProps) {
      const value = props[prop];
      if (value) {
        // Si es un código de 2 letras, lo usamos directamente
        if (typeof value === 'string' && value.length === 2 && /^[A-Z]{2}$/i.test(value)) {
          return value.toUpperCase();
        }
        // Si es un código de 3 letras, intentamos convertirlo a 2 letras
        if (typeof value === 'string' && value.length === 3) {
          const iso2 = convertISO3ToISO2(value.toUpperCase());
          if (iso2) return iso2;
        }
        // Si es un nombre de país, intentamos convertirlo
        if (typeof value === 'string') {
          const iso2 = convertCountryNameToISO2(value);
          if (iso2) return iso2;
        }
      }
    }
    
    return null;
  };

  // 🖱️ Manejo del clic en un país
  const handleCountryClick = (geo) => {
    const isoCode = getCountryISO(geo);
    
    console.log('País clicado - ISO detectado:', isoCode);
    
    if (!isoCode) {
      console.log('No se pudo determinar el código del país');
      return;
    }

    // Filtrar mariposas que pertenecen a este país
    const butterfliesInCountry = butterfliesData.filter((butterfly) => {
      const countries = extractCountriesFromLocation(butterfly.Location || '');
      return countries.includes(isoCode);
    });
  
    console.log('Mariposas en', isoCode, butterfliesInCountry);
  
    // Si hay mariposas, abrimos el modal
    if (butterfliesInCountry.length > 0) {
      setSelectedCountry({
        id: isoCode,
        name: countryNames[isoCode] || isoCode,
        butterflies: butterfliesInCountry,
      });
    } else {
      console.log(`No hay mariposas registradas en ${countryNames[isoCode] || isoCode}`);
    }
  };

  // 🦋 Manejo del clic en una mariposa para ir a su detalle
  const handleButterflyClick = (butterfly) => {
    console.log('Navegando a mariposa:', butterfly);
    setSelectedCountry(null); // Cerrar modal
    navigate(`/butterflydetail/${butterfly.id}`); // Navegar a página de detalle
  };

  // 🔍 Funciones de control de zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleResetZoom = () => {
    setPosition({ coordinates: [0, 20], zoom: 1 });
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F1E8' }}>
      {/* 📦 Contenedor principal centrado */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* 🎨 Header estilo vintage */}
        <div className="text-center mb-8">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{ 
              color: '#D4AF37',
              fontFamily: 'serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
           
          </h1>
          <p 
            className="text-xl mb-2"
            style={{ 
              color: '#5D4E37',
              fontFamily: 'serif'
            }}
          >
            Explora el mundo místico de las mariposas europeas
          </p>
          <p 
            className="text-lg"
            style={{ 
              color: '#8B7355',
              fontFamily: 'serif'
            }}
          >
            Haz clic en un país para descubrir sus mariposas polinizadoras
          </p>
        </div>

        {/* 🗺️ Contenedor del mapa con estilo vintage */}
        <div 
          className="relative rounded-2xl shadow-2xl overflow-hidden border-4"
          style={{ 
            backgroundColor: '#E8DCC0',
            borderColor: '#B8860B',
            height: '500px'
          }}
        >
          {/* 🎛️ Controles de zoom estilo vintage */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg shadow-lg border-2 transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#D4AF37',
                borderColor: '#B8860B',
                color: '#5D4E37'
              }}
              title="Acercar"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg shadow-lg border-2 transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#D4AF37',
                borderColor: '#B8860B',
                color: '#5D4E37'
              }}
              title="Alejar"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg shadow-lg border-2 transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#D4AF37',
                borderColor: '#B8860B',
                color: '#5D4E37'
              }}
              title="Restablecer vista"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* 🗺️ Mapa con colores vintage */}
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{ 
              rotate: [-10, -52, 0], 
              scale: 700 
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              minZoom={1}
              maxZoom={8}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso = getCountryISO(geo);

                    // Verificar si el país tiene mariposas registradas
                    const hasButterflies = iso && butterfliesData.some((butterfly) => {
                      const countries = extractCountriesFromLocation(butterfly.Location || '');
                      return countries.includes(iso);
                    });

                    // Contar mariposas en este país
                    const butterflyCount = iso ? butterfliesData.filter((butterfly) => {
                      const countries = extractCountriesFromLocation(butterfly.Location || '');
                      return countries.includes(iso);
                    }).length : 0;

                    // 🎨 Estilos vintage del mapa
                    const styles = {
                      default: {
                        fill: hasButterflies ? '#8B7D6B' : '#C4B5A0', // Verde oliva vs beige claro
                        stroke: '#654321',
                        strokeWidth: 0.5,
                        cursor: hasButterflies ? 'pointer' : 'default',
                        opacity: hasButterflies ? 0.9 : 0.7,
                        transition: 'all 0.3s ease',
                      },
                      hover: {
                        fill: hasButterflies ? '#A0916F' : '#C4B5A0', // Verde oliva más claro
                        stroke: '#8B7355',
                        strokeWidth: 1,
                        cursor: hasButterflies ? 'pointer' : 'default',
                        opacity: 1,
                      },
                      pressed: {
                        fill: '#B8A082',
                        strokeWidth: 1.5,
                      },
                    };

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(geo)}
                        onMouseEnter={() => setHoveredISO(iso)}
                        onMouseLeave={() => setHoveredISO(null)}
                        style={styles}
                        title={
                          hasButterflies
                            ? `${countryNames[iso] || iso}: ${butterflyCount} especie${butterflyCount !== 1 ? 's' : ''}`
                            : `${countryNames[iso] || iso}: Sin datos`
                        }
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* 📈 Leyenda vintage */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-8 text-sm" style={{ color: '#5D4E37' }}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#8B7D6B', borderColor: '#654321' }}></div>
              <span style={{ fontFamily: 'serif' }}>Países con mariposas documentadas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#C4B5A0', borderColor: '#654321' }}></div>
              <span style={{ fontFamily: 'serif' }}>Sin datos disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🪟 MODAL estilo vintage centrado */}
      {selectedCountry && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(93, 78, 55, 0.85)' }}
        >
          <div 
            className="rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl border-4"
            style={{ 
              backgroundColor: '#F5F1E8',
              borderColor: '#B8860B'
            }}
          >
            {/* 🏷️ Header del modal vintage */}
            <div
              className="px-8 py-6 border-b-4 flex justify-between items-center"
              style={{ 
                backgroundColor: '#5D4E37',
                borderColor: '#B8860B'
              }}
            >
              <div>
                <h3 
                  className="text-3xl font-bold mb-2"
                  style={{ 
                    color: '#D4AF37',
                    fontFamily: 'serif'
                  }}
                >
                  {selectedCountry.name}
                </h3>
                <p 
                  className="text-lg"
                  style={{ 
                    color: '#F5F1E8',
                    fontFamily: 'serif'
                  }}
                >
                  {selectedCountry.butterflies.length} especie{selectedCountry.butterflies.length !== 1 ? 's' : ''} documentada{selectedCountry.butterflies.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="p-2 rounded-lg transition-all hover:scale-110"
                style={{ 
                  backgroundColor: '#D4AF37',
                  color: '#5D4E37'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* 📋 Contenido del modal - solo nombre e imagen */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCountry.butterflies.map((butterfly) => (
                  <div
                    key={butterfly.id}
                    className="border-3 rounded-xl overflow-hidden shadow-lg transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => handleButterflyClick(butterfly)}
                    style={{ 
                      backgroundColor: '#FFF8DC',
                      borderColor: '#8B7355'
                    }}
                  >
                    {/* 🖼️ Imagen de la mariposa */}
                    <div 
                      className="w-full h-48 flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: '#E8DCC0' }}
                    >
                      {butterfly.image ? (
                        <img
                          src={butterfly.image}
                          alt={butterfly.name}
                          className="w-full h-full object-cover transition-transform hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ 
                          display: butterfly.image ? 'none' : 'flex',
                          background: 'linear-gradient(135deg, #F0E68C 0%, #DDD3B8 100%)'
                        }}
                      >
                        <div className="text-6xl">🦋</div>
                      </div>
                    </div>

                    {/* 📝 Solo nombre de la mariposa */}
                    <div className="p-4 text-center">
                      <h4 
                        className="font-bold text-lg leading-tight"
                        style={{ 
                          color: '#5D4E37',
                          fontFamily: 'serif'
                        }}
                      >
                        {butterfly.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💡 Footer informativo */}
            <div 
              className="px-8 py-4 border-t-4 text-center"
              style={{ 
                backgroundColor: '#E8DCC0',
                borderColor: '#B8860B'
              }}
            >
              <p 
                className="text-sm"
                style={{ 
                  color: '#5D4E37',
                  fontFamily: 'serif'
                }}
              >
                💡 Haz clic en cualquier mariposa para ver más detalles
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ MENSAJE cuando no hay datos */}
      {butterfliesData.length === 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <div 
            className="text-center p-8 rounded-2xl border-4 shadow-lg"
            style={{ 
              backgroundColor: '#FFF8DC',
              borderColor: '#DAA520'
            }}
          >
            <div className="text-6xl mb-4">🦋</div>
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: '#5D4E37',
                fontFamily: 'serif'
              }}
            >
              No hay datos de mariposas disponibles
            </h3>
            <p 
              style={{ 
                color: '#8B7355',
                fontFamily: 'serif'
              }}
            >
              Agrega nuevas mariposas a la base de datos para verlas en el mapa interactivo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;