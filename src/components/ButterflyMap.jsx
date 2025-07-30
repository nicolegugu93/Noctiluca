import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { getAllButterflies } from '../services/ButterflyServices';


// URL del archivo de geografías mundial
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';


// 🌍 Diccionario completo de países europeos 
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


  // ⬇️ Estado inicial centrado en Europa con zoom menos aumentado para vista general
  const initialPosition = { coordinates: [15, 50], zoom: 1.2 };
  const [position, setPosition] = useState(initialPosition); // Posición y zoom del mapa


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllButterflies();
        setButterfliesData(data || []);
      } catch (error) {
        setButterfliesData([]);
      }
    }
    fetchData();
  }, []);


  // Funciones auxiliares convertISO3ToISO2, convertCountryNameToISO2, getCountryISO 


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
    const possibleISOProps = [
      'ISO_A2', 'iso_a2', 'ISO_A3', 'iso_a3', 'ADM0_A3', 'SOV_A3',
      'ISO2', 'iso2', 'ISO3', 'iso3', 'ADMIN', 'admin',
      'NAME', 'name', 'NAME_EN', 'name_en', 'NAME_ES', 'name_es',
      'SOVEREIGNT', 'sovereignt'
    ];
    for (const prop of possibleISOProps) {
      const value = props[prop];
      if (value) {
        if (typeof value === 'string' && value.length === 2 && /^[A-Z]{2}$/i.test(value)) return value.toUpperCase();
        if (typeof value === 'string' && value.length === 3) {
          const iso2 = convertISO3ToISO2(value.toUpperCase());
          if (iso2) return iso2;
        }
        if (typeof value === 'string') {
          const iso2 = convertCountryNameToISO2(value);
          if (iso2) return iso2;
        }
      }
    }
    return null;
  };


  // 🖱️ Manejo clic en país 
  const handleCountryClick = (geo) => {
    const isoCode = getCountryISO(geo);
    if (!isoCode) return;
    const butterfliesInCountry = butterfliesData.filter((butterfly) => {
      const countries = extractCountriesFromLocation(butterfly.Location || '');
      return countries.includes(isoCode);
    });
    if (butterfliesInCountry.length > 0) {
      setSelectedCountry({
        id: isoCode,
        name: countryNames[isoCode] || isoCode,
        butterflies: butterfliesInCountry,
      });
    }
  };


  // 🦋 Manejo clic en mariposa 
  const handleButterflyClick = (butterfly) => {
    setSelectedCountry(null);
    navigate(`/butterflydetail/${butterfly.id}`);
  };


  // 🔍 Control zoom
  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  };
  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  };
  const handleResetZoom = () => setPosition(initialPosition);
  const handleMoveEnd = (pos) => setPosition(pos);


  return (
    // Fondo pergamino vintage general con padding responsive
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-[#C8B676] sm:border-2 bg-[#F1E9D2]">


          {/* Instrucciones responsivas */}
          <div className="absolute top-2 sm:top-4 lg:top-6 left-2 sm:left-4 lg:left-6 z-30 bg-[#693971]/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-[#C8B676]/40 max-w-[calc(100%-120px)] sm:max-w-none">
            <p className="text-[#F5E0A3] font-lato text-xs sm:text-sm font-medium leading-tight">
              <span className="hidden sm:inline">Haz clic en un país para descubrir sus mariposas polinizadoras</span>
              <span className="sm:hidden">Toca un país para ver sus mariposas</span>
            </p>
          </div>


          {/* Controles de zoom responsivos */}
          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-2 sm:left-4 lg:left-6 z-30 flex flex-col-reverse gap-1 sm:gap-2">
            <button
              onClick={handleZoomIn}
              className="cursor-pointer p-2 sm:p-3 bg-yellow-100/90 backdrop-blur-sm text-[#F0DC82] rounded-lg sm:rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg touch-manipulation"
              title="Acercar"
            >
              <ZoomIn size={16} className="sm:w-5 sm:h-5" color="#693971" />
            </button>
            <button
              onClick={handleZoomOut}
              className="cursor-pointer p-2 sm:p-3 bg-yellow-100/90 backdrop-blur-sm text-[#F0DC82] rounded-lg sm:rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg touch-manipulation"
              title="Alejar"
            >
              <ZoomOut size={16} className="sm:w-5 sm:h-5" color="#693971" />
            </button>
            <button
              onClick={handleResetZoom}
              className="cursor-pointer p-2 sm:p-3 bg-yellow-100/90 backdrop-blur-sm text-[#F0DC82] rounded-lg sm:rounded-xl border border-[#C8B676]/40 hover:scale-105 transition-all duration-200 shadow-lg touch-manipulation"
              title="Vista inicial"
            >
              <RotateCcw size={16} className="sm:w-5 sm:h-5" color="#693971" />
            </button>
          </div>



          {/* Mapa principal con altura responsiva */}
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-[#F1E9D2]">
            <ComposableMap
              projection="geoAzimuthalEqualArea"
              projectionConfig={{ rotate: [-10, -52, 0], scale: 700 }}
              style={{ width: '100%', height: '100%', outline: 'none' }}
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
                      const hasButterflies = iso && butterfliesData.some(butterfly => {
                        const countries = extractCountriesFromLocation(butterfly.Location || '');
                        return countries.includes(iso);
                      });
                      const butterflyCount = iso ? butterfliesData.filter(butterfly => {
                        const countries = extractCountriesFromLocation(butterfly.Location || '');
                        return countries.includes(iso);
                      }).length : 0;

                      const styles = {
                        default: {
                          fill: hasButterflies ? '#F0DC82' : '#DFD8C3',
                          stroke: '#907958',
                          strokeWidth: 0.9,
                          cursor: 'pointer', 
                          opacity: 1,
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        },
                        hover: {
                          fill: '#FAE2A2',
                          stroke: '#C8B676',
                          strokeWidth: 2,
                          outline: 'none',
                          cursor: 'pointer'  // también en hover mantenemos el cursor pointer
                        },
                        pressed: {
                          fill: '#E6D3B3',
                          stroke: '#907958',
                          strokeWidth: 2.5,
                          outline: 'none',
                          cursor: 'pointer'
                        }
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


          {/* Leyenda responsiva */}
          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-30 px-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 lg:gap-6 bg-[#693971]/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border border-[#C8B676]/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: '#F0DC82', border: '1.5px solid #907958' }}></div>
                <span className="text-[#F5E0A3] font-lato text-xs sm:text-sm font-medium whitespace-nowrap">
                  <span className="hidden sm:inline">Países con mariposas</span>
                  <span className="sm:hidden">Con mariposas</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: '#DFD8C3', border: '1.5px solid #907958' }}></div>
                <span className="text-[#F5E0A3] font-lato text-xs sm:text-sm font-medium whitespace-nowrap">Sin datos</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* MODAL RESPONSIVO */}
      {selectedCountry && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6"
          style={{
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255,255,255,0.12)'
          }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm sm:max-w-2xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] lg:max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-lg border border-[#693971] sm:border-2 p-0 bg-[#F3E9C9cc] flex flex-col"
            style={{
              fontFamily: "'Lato', sans-serif",
              color: '#5B4B24',
              boxShadow: '0 4px 20px 0 #69397133'
            }}
          >
            {/* Header modal responsivo */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6"
              style={{
                background: 'linear-gradient(90deg, #69397122 0%, #D9A7C740 100%)',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
                borderBottom: '2px solid #F5E0A3'
              }}
            >
              <h3
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold pr-4"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  color: '#693971',
                  letterSpacing: '.02em'
                }}
              >
                {selectedCountry.name}
              </h3>
              <button
                onClick={() => setSelectedCountry(null)}
                className="p-2 rounded-full hover:bg-[#d9a7c7]/30 focus:outline-none transition touch-manipulation flex-shrink-0"
                style={{ border: '2px solid #693971', color: '#693971' }}
                aria-label="Cerrar modal"
              >
                <X size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
            </div>

            {/* Contador de mariposas */}
            <div className="px-4 sm:px-6 lg:px-8 py-3 border-b-2 border-[#F5E0A3]" style={{ background: 'linear-gradient(90deg, #ede6f6 0%, #f3e9c9 100%)' }}>
              <p className="text-sm sm:text-base text-[#693971] font-medium">
                Hay {selectedCountry.butterflies.length} especie{selectedCountry.butterflies.length !== 1 ? 's' : ''} de mariposas
              </p>
            </div>


            {/* Contenido mariposas responsivo */}
            <div className="p-4 sm:p-6 lg:p-8 pt-4 sm:pt-5 lg:pt-6" style={{ background: 'linear-gradient(0deg, #f3e9c9 80%, #d9a7c7 120%)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {selectedCountry.butterflies.map(butterfly => (
                  <div
                    key={butterfly.id}
                    onClick={() => handleButterflyClick(butterfly)}
                    className="cursor-pointer rounded-lg sm:rounded-xl shadow-md border border-[#69397150] bg-[#fcf5e5cc] hover:shadow-lg hover:bg-[#ede6f6] transition-colors duration-200 flex flex-col overflow-hidden group touch-manipulation"
                    style={{
                      fontFamily: "'Lato', sans-serif"
                    }}
                  >
                    {/* Imagen responsiva */}
                    <div className="relative w-full h-32 sm:h-40 lg:h-48 flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(120deg, #e5d2fa 0%, #f3e9c9 100%)'
                      }}
                    >
                      {butterfly.image ? (
                        <img
                          src={butterfly.image}
                          alt={butterfly.name}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                          onError={e => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="text-4xl sm:text-6xl lg:text-8xl opacity-40 text-[#693971] select-none">🦋</div>
                      )}
                    </div>
                    {/* Nombre mariposa responsivo */}
                    <div className="p-3 sm:p-4">
                      <h4 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold line-clamp-2"
                        style={{
                          color: '#693971',
                          fontFamily: "'Lato', sans-serif"
                        }}>
                        {butterfly.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer modal responsivo */}
            <div
              className="mt-2 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-center"
              style={{
                borderTop: '2px solid #F5E0A3',
                background: 'linear-gradient(90deg, #ede6f6 0%, #f3e9c9 100%)',
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem'
              }}
            >
              <p className="font-lato text-xs sm:text-sm" style={{ color: '#693971', fontFamily: "'Lato', sans-serif" }}>
                <span className="hidden sm:inline">Haz clic en cualquier mariposa para explorar sus detalles</span>
                <span className="sm:hidden">Toca una mariposa para ver más detalles</span>
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Mensaje cuando no hay datos - responsivo */}
      {butterfliesData.length === 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-4 sm:mt-6 lg:mt-8">
          <div className="text-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl sm:rounded-3xl border border-amber-400/30 sm:border-2 shadow-xl">
            <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6 opacity-60">🦋</div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">
              Colección en construcción
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-light max-w-md mx-auto">
              Pronto tendremos datos fascinantes sobre las mariposas de Europa para compartir contigo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


export default Map;