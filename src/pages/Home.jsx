import React from 'react';
import { Link } from 'react-router-dom';
import ButterflyMap from '../components/ButterflyMap';

const Home = () => {
  return (
      <section className="bg-gradient-to-r from-indigoprofundo via-orotenue-800 to-rosaatardecer font-libre min-h-screen">
      
      {/* Frase principal */}
      <p className="text-lg md:text-xl text-center text-[#F1F1F1] pt-6 tracking-wide font-semibold drop-shadow-md">
        Documentar es conservar
      </p>

      {/* Logo centrado */}
      <div className="flex justify-center mt-4 mb-2">
        <img
          src="/logo-noctiluca.png"
          alt="Logo Noctiluca"
          className="w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[50rem] h-auto"
        />
      </div>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-center text-[#F1F1F1] mb-4 px-4 max-w-3xl mx-auto">
        Un proyecto que combina ciencia, arte y amor por la biodiversidad
      </p>

      {/* Botones */}
      <div className="flex gap-4 justify-center flex-wrap mb-8">
        <Link to="/butterflygallery">
          <button className="bg-[#e7d7b8] text-[#2c1f4a] px-6 py-2 rounded-full shadow-lg hover:bg-[#fff3d4] transition-all duration-300">
            Galería
          </button>
        </Link>
        <Link to="/contactbutterfly">
          <button className="bg-indigoprofundo text-[#2c1f4a] px-6 py-2 rounded-full shadow-lg hover:bg-[#F5E0A3] transition-all duration-300">
            Contacto
          </button>
        </Link>
      </div>

      {/* Línea decorativa */}
      <div className="w-full mb-8 px-4">
        <hr className="border-t border-[#e7d7b8] opacity-30" />
      </div>

      {/* Sección Sobre el proyecto */}
      <section className="bg-white p-6 md:p-10 max-w-4xl mx-auto my-8 rounded-xl shadow-lg border border-[#f0e5d8]">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 tracking-tight">
          Sobre el proyecto
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          <strong>Noctiluca</strong> es un cuaderno de campo digital dedicado a las mariposas de Europa. Una experiencia visual y educativa que combina ciencia, arte y conservación. Desde los rincones más silvestres del continente, cada especie registrada revela una historia que merece ser contada.
          <br /><br />
          Más que una página web, Noctiluca es una invitación a observar, aprender y proteger. Porque cada aleteo, por pequeño que parezca, es vital para el equilibrio del planeta.
        </p>
      </section>

      {/* Mapa de mariposas */}
      <ButterflyMap />

    </section>
  );
};

export default Home;