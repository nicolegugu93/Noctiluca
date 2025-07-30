import React from 'react';
import { Link } from 'react-router-dom';
import ButterflyMap from '../components/ButterflyMap';
import ButtonCreateButterfly from '../components/ButtonCreateButterfly';

const Home = () => {
  return (
    <section className="bg-linear-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen py-4 sm:py-8 lg:py-12">
      {/* Frase principal */}
      <h1 className="text-[20px] sm:text-[26px] md:text-[30px] lg:text-[34px] text-[#F5E0A3] text-center tracking-wide mb-2 px-2">
        Documentar es conservar
      </h1>
      {/* Logo centrado con espaciado controlado */}
       {/* Logo centrado con tamaño más controlado */}
      <div className="w-full flex justify-center my-6 px-4">
        <img
          src="/logo-noctiluca.png"
          alt="Logo Noctiluca"
          className="object-contain max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32 w-auto"
          style={{
            maxWidth: '90vw',
            height: 'auto'
          }}
        />
      </div>
      {/* Subtítulo con margen superior reducido */}
      <h2 className="text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] text-center text-[#F5E0A3] mt-2 sm:mt-4 mb-6 sm:mb-8 md:mb-10 px-4 sm:px-6 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-tight sm:leading-normal">
        Un proyecto que combina ciencia, arte y amor por la biodiversidad
      </h2>
      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 md:mb-10 px-4">
        <Link to="/butterflygallery">
          <button className="nocti-button w-32">
            Galería
          </button>
        </Link>
        <Link to="/contactbutterfly">
          <button className="nocti-button w-32">
            Contacto
          </button>
        </Link>
      </div>
      {/* Línea decorativa */}
      <div className="w-full mb-8 sm:mb-10 md:mb-12 px-4">
        <hr className="border-t border-[#e7d7b8] opacity-30" />
      </div>
      {/* Sección Sobre el proyecto - VERSIÓN CORREGIDA */}
<div className="px-4 sm:px-6 lg:px-8">
  <section className="bg-[#E7D7B8] text-[#1D1B3F] py-6 md:py-10 px-4 sm:px-6 md:px-8 lg:px-10 rounded-2xl shadow-lg max-w-6xl mx-auto my-10 border border-[#A77C4E]">
    <h3 className="text-2xl sm:text-3xl text-center font-extrabold text-[#1D1B3F] mb-6 tracking-tight leading-snug">
      Sobre el proyecto
    </h3>
    <div className="max-w-4xl mx-auto">
      <p className="text-base sm:text-lg md:text-xl font-serif text-justify leading-relaxed hyphens-auto">
        <span className="font-bold text-[#A77C4E]">Noctiluca</span>, palabra real que significa "la que brilla en la noche", es un cuaderno de campo digital dedicado a las mariposas de Europa. Una experiencia visual y educativa que combina ciencia, arte y conservación.
        <br /><br />
        Desde los rincones más silvestres del continente, cada especie registrada revela una historia que merece ser contada. Más que una página web, <span className="text-[#A77C4E] font-medium">Noctiluca</span> es una invitación a observar, aprender y proteger.
        <br /><br />
        Porque cada aleteo, por pequeño que parezca, es vital para el equilibrio del planeta.
      </p>
    </div>
  </section>
</div>

      <ButtonCreateButterfly/>
      {/* Mapa de mariposas */}
      <ButterflyMap />
    </section>
  );
};

export default Home;