import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getAllButterflies } from '../services/ButterflyServices'; // <- Importamos servicio personalizado

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Diccionario para mostrar nombres bonitos
const countryNames = {
  FR: 'Francia',
  ES: 'España',
  IT: 'Italia',
  DE: 'Alemania',
  GB: 'Reino Unido',
  PL: 'Polonia',
  PT: 'Portugal',
  NL: 'Países Bajos',
  BE: 'Bélgica',
  CH: 'Suiza',
  AT: 'Austria',
};

// Función que detecta países mencionados en el campo Location
const extractCountriesFromLocation = (location) => {
  const locationLower = location.toLowerCase();
  const countries = [];

  if (locationLower.includes('españa') || locationLower.includes('spain') || locationLower.includes('ibérica')) {
    countries.push('ES');
  }
  if (locationLower.includes('portugal')) countries.push('PT');
  if (locationLower.includes('francia')) countries.push('FR');
  if (locationLower.includes('italia')) countries.push('IT');
  if (locationLower.includes('alemania') || locationLower.includes('germany')) countries.push('DE');
  if (locationLower.includes('reino unido') || locationLower.includes('england')) countries.push('GB');
  if (locationLower.includes('polonia')) countries.push('PL');
  if (locationLower.includes('países bajos') || locationLower.includes('holanda')) countries.push('NL');
  if (locationLower.includes('bélgica')) countries.push('BE');
  if (locationLower.includes('suiza')) countries.push('CH');
  if (locationLower.includes('austria')) countries.push('AT');

  return countries;
};

const Map = () => {
  const navigate = useNavigate();

  const [butterfliesData, setButterfliesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredISO, setHoveredISO] = useState(null);

  // ✅ Al cargar el componente, obtenemos los datos desde nuestro servicio
  useEffect(() => {
    async function fetchData() {
      const data = await getAllButterflies();
      console.log('Mariposas cargadas:', data);
      setButterfliesData(data || []);
    }

    fetchData();
  }, []);

  // 👆 Función mejorada para obtener el código ISO del país
  const getCountryISO = (geo) => {
    const props = geo.properties;
    
    // Lista ampliada de posibles propiedades que contienen códigos de país
    const possibleISOProps = [
      'ISO_A2',     // Más común
      'iso_a2',     // Minúsculas
      'ISO_A3',     // 3 letras
      'iso_a3',     // 3 letras minúsculas
      'ADM0_A3',    // Administrative code
      'SOV_A3',     // Sovereign code
      'ISO2',       // Variante
      'iso2',       // Variante minúsculas
      'ISO3',       // Variante 3 letras
      'iso3',       // Variante 3 letras minúsculas
      'ADMIN',      // Nombre administrativo
      'admin',      // Nombre administrativo minúsculas
      'NAME',       // Nombre del país
      'name',       // Nombre minúsculas
      'NAME_EN',    // Nombre en inglés
      'name_en',    // Nombre en inglés minúsculas
      'NAME_ES',    // Nombre en español
      'name_es',    // Nombre en español minúsculas
      'SOVEREIGNT', // Soberanía
      'sovereignt', // Soberanía minúsculas
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

  // Función auxiliar para convertir ISO3 a ISO2
  const convertISO3ToISO2 = (iso3) => {
    const iso3ToIso2Map = {
      'ESP': 'ES', 'FRA': 'FR', 'ITA': 'IT', 'DEU': 'DE', 'GBR': 'GB',
      'POL': 'PL', 'PRT': 'PT', 'NLD': 'NL', 'BEL': 'BE', 'CHE': 'CH',
      'AUT': 'AT', 'USA': 'US', 'CAN': 'CA', 'MEX': 'MX', 'BRA': 'BR',
      'ARG': 'AR', 'CHL': 'CL', 'PER': 'PE', 'COL': 'CO', 'VEN': 'VE'
    };
    return iso3ToIso2Map[iso3] || null;
  };

  // Función auxiliar para convertir nombres de países a ISO2
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
      'austria': 'AT', 'österreich': 'AT', 'autriche': 'AT'
    };
    return nameToIso2Map[countryName.toLowerCase()] || null;
  };

  // 👆 Cuando se hace clic en un país
  const handleCountryClick = (geo) => {
    // Debug más detallado
    console.log('País clicado - Objeto geo completo:', geo);
    console.log('País clicado - Propiedades:', Object.keys(geo.properties));
    console.log('País clicado - Valores:', Object.entries(geo.properties));
    
    // Obtenemos el código ISO de diferentes formas posibles
    const isoCode = getCountryISO(geo);
    
    console.log('País clicado - ISO detectado:', isoCode);
    
    if (!isoCode) {
      console.log('No se pudo determinar el código del país');
      return;
    }

    const butterfliesInCountry = butterfliesData.filter((butterfly) => {
      const countries = extractCountriesFromLocation(butterfly.Location || '');
      return countries.includes(isoCode);
    });
  
    console.log('Mariposas en', isoCode, butterfliesInCountry);
  
    if (butterfliesInCountry.length > 0) {
      setSelectedCountry({
        id: isoCode,
        name: countryNames[isoCode] || isoCode,
        butterflies: butterfliesInCountry,
      });
    } else {
      // Opcional: mostrar mensaje cuando no hay mariposas
      console.log(`No hay mariposas registradas en ${countryNames[isoCode] || isoCode}`);
    }
  };

  // 👉 Cuando clicas en una mariposa, vas a su página de detalle
  const handleButterflyClick = (butterfly) => {
    console.log('Navegando a mariposa:', butterfly); // 👈 Para debug
    setSelectedCountry(null); // Cerramos modal
    navigate(`/butterflydetail/${butterfly.id}`); // Redirigimos con el ID
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div
        className="rounded-xl shadow-2xl relative overflow-hidden p-6"
        style={{
          background: 'linear-gradient(135deg, #F5F5DC 0%, #E6D7B8 30%, #D2B48C 100%)',
        }}
      >
        {/* Fondo decorativo con puntitos */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="text-center mb-4 z-10 relative">
          <p className="text-gray-700 text-lg font-medium" style={{ fontFamily: 'serif' }}>
            Haz clic en un país para descubrir sus mariposas polinizadoras.
          </p>
          <p className="text-gray-600 text-sm mt-2" style={{ fontFamily: 'serif' }}>
            {butterfliesData.length > 0
              ? `${butterfliesData.length} especies documentadas`
              : 'Cargando datos de mariposas...'}
          </p>
        </div>

        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{ rotate: [-10, -52, 0], scale: 850 }}
          className="relative z-10"
          style={{ maxHeight: '600px', width: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso = getCountryISO(geo);

                const hasButterflies = iso && butterfliesData.some((butterfly) => {
                  const countries = extractCountriesFromLocation(butterfly.Location || '');
                  return countries.includes(iso);
                });

                const butterflyCount = iso ? butterfliesData.filter((butterfly) => {
                  const countries = extractCountriesFromLocation(butterfly.Location || '');
                  return countries.includes(iso);
                }).length : 0;

                const isHovered = hoveredISO === iso;

                // 🎨 Estilos del país en diferentes estados
                const styles = {
                  default: {
                    fill: hasButterflies ? '#8B7355' : '#E5E7EB',
                    stroke: hasButterflies ? '#6B5B47' : '#D1D5DB',
                    cursor: hasButterflies ? 'pointer' : 'not-allowed',
                    opacity: hasButterflies ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                  },
                  hover: {
                    fill: hasButterflies ? '#FFD700' : '#E5E7EB',
                    stroke: hasButterflies ? '#DAA520' : '#D1D5DB',
                    cursor: hasButterflies ? 'pointer' : 'not-allowed',
                  },
                  pressed: {
                    fill: '#B8860B',
                  },
                };

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)} // 👈 Pasamos todo el objeto geo
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
        </ComposableMap>

        {/* MODAL de mariposas por país */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl max-w-5xl w-full max-h-80 overflow-auto shadow-2xl" style={{ backgroundColor: '#F5F5DC' }}>
              <div
                className="flex justify-between items-center p-4 border-b rounded-t-xl"
                style={{ background: 'linear-gradient(135deg, #4A4458 0%, #3D3650 100%)' }}
              >
                <h3 className="text-lg font-bold text-yellow-300" style={{ fontFamily: 'serif' }}>
                  Mariposas de {selectedCountry.name}
                </h3>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-yellow-300 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <p className="text-gray-700 mb-4 text-center text-sm" style={{ fontFamily: 'serif' }}>
                  <strong>{selectedCountry.butterflies.length}</strong> especie
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} documentada{selectedCountry.butterflies.length !== 1 ? 's' : ''}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {selectedCountry.butterflies.map((butterfly) => (
                    <div
                      key={butterfly.id}
                      className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => handleButterflyClick(butterfly)}
                      style={{ borderColor: '#8B7355', backgroundColor: '#FEFEFE' }}
                    >
                      <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                        {butterfly.image ? (
                          <img
                            src={butterfly.image}
                            alt={butterfly.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center"
                          style={{ display: butterfly.image ? 'none' : 'flex' }}
                        >
                          <div className="text-2xl">🦋</div>
                        </div>
                      </div>

                      <div className="p-2">
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

        {/* MENSAJE si no hay datos */}
        {butterfliesData.length === 0 && (
          <div className="text-center mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-4xl mb-2">🦋</div>
            <p className="text-gray-600" style={{ fontFamily: 'serif', color: 'black' }}>
              No hay datos de mariposas disponibles.
            </p>
            <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'serif', color: 'black' }}>
              Agrega nuevas mariposas para verlas en el mapa.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;