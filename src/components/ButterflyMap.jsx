// src/components/Map.jsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { X } from 'lucide-react';

// URL del mapa del mundo en formato TopoJSON
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Diccionario de nombres bonitos
const countryNames = {
  FR: 'Francia',
  ES: 'España',
  IT: 'Italia',
  DE: 'Alemania',
  GB: 'Reino Unido',
  PL: 'Polonia',
  
};

const defaultButterfliesData = [
  {
    id: 1,
    name: 'Swallowtail',
    scientificName: 'Papilio machaon',
    countries: ['FR', 'ES', 'IT', 'DE'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Adonis Blue',
    scientificName: 'Polyommatus bellargus',
    countries: ['FR', 'ES', 'IT'],
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Purple Emperor',
    scientificName: 'Apatura iris',
    countries: ['FR', 'DE', 'PL'],
    image: 'https://images.unsplash.com/photo-1582026479918-b3e1ba32e60d?w=300&h=200&fit=crop',
  },
];

const Map = ({ butterfliesData = [], onButterflySelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredISO, setHoveredISO] = useState(null);

  const dataToUse = butterfliesData.length ? butterfliesData : defaultButterfliesData;

  const handleCountryClick = (isoCode) => {
    const butterfliesInCountry = dataToUse.filter((b) => b.countries.includes(isoCode));
    if (butterfliesInCountry.length > 0) {
      setSelectedCountry({
        id: isoCode,
        name: countryNames[isoCode] || isoCode,
        butterflies: butterfliesInCountry,
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div
        className="rounded-xl shadow-2xl relative overflow-hidden p-6"
        style={{
          background: 'linear-gradient(135deg, #F5F5DC 0%, #E6D7B8 30%, #D2B48C 100%)',
        }}
      >
        {/* Textura de fondo opcional */}
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
                const iso = geo.properties.ISO_A2;
                const hasButterflies = dataToUse.some((b) => b.countries.includes(iso));

                const isHovered = hoveredISO === iso;

                const styles = {
                  default: {
                    fill: hasButterflies ? '#8B7355' : '#E5E7EB',
                    stroke: hasButterflies ? '#6B5B47' : '#D1D5DB',
                    cursor: hasButterflies ? 'pointer' : 'not-allowed',
                    opacity: hasButterflies ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                  },
                  hover: {
                    fill: hasButterflies ? '#D4AF37' : '#E5E7EB',
                    stroke: hasButterflies ? '#B8860B' : '#D1D5DB',
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
                    onClick={() => handleCountryClick(iso)}
                    onMouseEnter={() => setHoveredISO(iso)}
                    onMouseLeave={() => setHoveredISO(null)}
                    style={styles}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Modal */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl max-w-3xl w-full max-h-96 overflow-auto shadow-2xl" style={{ backgroundColor: '#F5F5DC' }}>
              <div
                className="flex justify-between items-center p-6 border-b rounded-t-xl"
                style={{ background: 'linear-gradient(135deg, #4A4458 0%, #3D3650 100%)' }}
              >
                <h3 className="text-xl font-bold text-yellow-300" style={{ fontFamily: 'serif' }}>
                  Mariposas de {selectedCountry.name}
                </h3>
                <button onClick={() => setSelectedCountry(null)} className="text-yellow-300 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-6 text-center" style={{ fontFamily: 'serif' }}>
                  Hemos documentado <strong>{selectedCountry.butterflies.length}</strong> especie
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} de mariposa
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} polinizadora
                  {selectedCountry.butterflies.length !== 1 ? 's' : ''} en {selectedCountry.name}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCountry.butterflies.map((butterfly) => (
                    <div
                      key={butterfly.id}
                      className="border-2 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                      onClick={() => {
                        if (onButterflySelect) onButterflySelect(butterfly);
                        setSelectedCountry(null);
                      }}
                      style={{ borderColor: '#8B7355', backgroundColor: '#FEFEFE' }}
                    >
                      <img src={butterfly.image} alt={butterfly.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-purple-800 mb-1" style={{ fontFamily: 'serif' }}>
                          {butterfly.name}
                        </h4>
                        <p className="text-sm text-gray-600 italic mb-2" style={{ fontFamily: 'serif' }}>
                          {butterfly.scientificName}
                        </p>
                        <p className="text-xs" style={{ color: '#8B7355', fontFamily: 'serif' }}>
                          Toca para explorar →
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
