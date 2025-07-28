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

  // ⬇️ Estado inicial centrado en Europa con zoom menos aumentado para vista general más amplia
  // Coordenadas del centro aproximado de Europa
  const initialPosition = { coordinates: [15, 50], zoom: 2 };  // zoom reducido de 2.7 a 2 para menos aumento
  const [position, setPosition] = useState(initialPosition); // Posición y zoom del mapa

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

  // 🗺️ Funciones auxiliares convertISO3ToISO2, convertCountryNameToISO2, getCountryISO
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
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  // 🗺️ Botón de reset que vuelve a centrar Europa con zoom moderado
  const handleResetZoom = () => {
    setPosition(initialPosition);
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  return (
    // Fondo exterior: fijo color pergamino vintage, no azul ni gris
    <div >
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Contenedor del mapa estilo pergamino */}
        <div className="relative rounded-3xl shadow-2xl overflow-hidden border-2 border-[#C8B676] bg-[#F1E9D2]">
          
          {/* Instrucciones */}
          <div className="absolute top-6 left-6 z-30 bg-[#693971]/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-[#C8B676]/40">
            <p className="text-[#F0DC82] text-sm font-medium">
              Haz clic en un país para descubrir sus mariposas polinizadoras
            </p>
          </div>

          {/* Controles de zoom con el mismo estilo morado/vintage que instrucciones */}
          <div className="absolute top-6 right-6 z-30 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-3 bg-[#693971]/90 backdrop-blur-sm text-[#F0DC82] rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg"
              title="Acercar"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-[#693971]/90 backdrop-blur-sm text-[#F0DC82] rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg"
              title="Alejar"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-3 bg-[#693971]/90 backdrop-blur-sm text-[#F0DC82] rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg"
              title="Vista inicial"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Mapa principal. Proyección y centro Europa en configuración inicial */}
          <div className="h-[600px] bg-[#F1E9D2]">
            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{ 
                rotate: [-10, -52, 0], 
                scale: 700 
              }}
              style={{ 
                width: '100%', 
                height: '100%',
                outline: 'none' // Elimina el contorno negro feo
              }}
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

                      // 🎨 Estilos vintage pergamino para los países
                      const styles = {
                        default: {
                          fill: hasButterflies ? '#F0DC82' : '#DFD8C3', // Highlight/Beige viejo
                          stroke: '#907958', // Marrón viejo para bordes
                          strokeWidth: 0.9,
                          cursor: hasButterflies ? 'pointer' : 'default',
                          opacity: 1,
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        },
                        hover: {
                          fill: '#FAE2A2',
                          stroke: '#C8B676',
                          strokeWidth: 2,
                          outline: 'none'
                        },
                        pressed: {
                          fill: '#E6D3B3',
                          stroke: '#907958',
                          strokeWidth: 2.5,
                          outline: 'none'
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

          {/* Leyenda vintage, ahora con el mismo estilo morado/dorado que los controles e instrucciones */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex items-center gap-6 bg-[#693971]/90 backdrop-blur-sm rounded-xl px-6 py-3 border border-[#C8B676]/40">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#F0DC82', border: '1.5px solid #907958' }}></div>
                <span className="text-[#F0DC82] text-sm font-medium">Países con mariposas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#DFD8C3', border: '1.5px solid #907958' }}></div>
                <span className="text-[#F0DC82] text-sm font-medium">Sin datos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL  */}
      {selectedCountry && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCountry(null)}
        >
          <div 
            className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl border-2 border-amber-400/30 transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal estilo vintage */}
            <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6">
              
              {/* Patrón decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M10 0l10 10-10 10L0 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}></div>
              </div>

              <div className="relative flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-4xl font-bold text-amber-300 tracking-wide">
                      {selectedCountry.name}
                    </h3>
                    <div className="text-2xl">🦋</div>
                  </div>
                  <p className="text-amber-100 text-lg font-light">
                    {selectedCountry.butterflies.length} especie{selectedCountry.butterflies.length !== 1 ? 's' : ''} documentada{selectedCountry.butterflies.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-3 bg-amber-400/20 text-amber-300 rounded-xl hover:bg-amber-400/30 hover:scale-110 transition-all duration-200"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCountry.butterflies.map((butterfly) => (
                  <div
                    key={butterfly.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-stone-200 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-white/90"
                    onClick={() => handleButterflyClick(butterfly)}
                  >
                    {/* Imagen de la mariposa */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                      {butterfly.image ? (
                        <img
                          src={butterfly.image}
                          alt={butterfly.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ 
                          display: butterfly.image ? 'none' : 'flex'
                        }}
                      >
                        <div className="text-6xl opacity-60">🦋</div>
                      </div>
                      
                      {/* Overlay con efecto hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Información de la mariposa */}
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-slate-900 transition-colors duration-200">
                        {butterfly.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer del modal */}
            <div className="bg-gradient-to-r from-stone-200 to-stone-100 px-8 py-4 border-t border-stone-300">
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <div className="text-lg">✨</div>
                <p className="text-sm font-medium">
                  Haz clic en cualquier mariposa para explorar sus detalles
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay datos */}
      {butterfliesData.length === 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-8">
          <div className="text-center p-12 bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl border-2 border-amber-400/30 shadow-xl">
            <div className="text-8xl mb-6 opacity-60">🦋</div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Colección en construcción
            </h3>
            <p className="text-lg text-slate-600 font-light max-w-md mx-auto">
              Pronto tendremos datos fascinantes sobre las mariposas de Europa para compartir contigo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
