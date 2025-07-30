import React from 'react';
import { Link } from 'react-router-dom';
import ButterflyMap from '../components/ButterflyMap';

const Home = () => {
  return (
      <section className="bg-linear-to-t from-rosaatardecer to-indigoprofundo font-libre min-h-screen">
      {/* Frase principal */}
      <h1 className="text-[30px] text-[#F5E0A3] text-center tracking-wide p-10">
      Documentar es conservar
      </h1>

      {/* Logo centrado */}
      <div className="flex justify-center items-center -mt-20 mb-8">
        <img
          src="/logo-noctiluca.png"
          alt="Logo Noctiluca"
          className="w-[20rem] sm:w-[28rem] md:w-[36rem] lg:w-[44rem] xl:w-[52rem] -m-30"
        />
      </div>
      {/* Subtítulo */}
      <h2 className="text-[30px] text-center text-[#F5E0A3] mb-18 -my-14 px-4 max-w-3xl mx-auto">
        Un proyecto que combina ciencia, arte y amor por la biodiversidad
      </h2>

      {/* Botones */}
      <div className="flex gap-4 justify-center flex-wrap mb-10">
        <Link to="/butterflygallery">
          <button className="flex mx-10 bg-[#f5e8c7] text-[#1D1B3F] font-semibold px-8 py-2 rounded-full border border-[#A77C4E] shadow-md transition-all duration-300 ease-in-out hover:bg-[#e0c896]">
            Galería
          </button>
        </Link>
        <Link to="/contactbutterfly">
          <button className="flex mx-10 bg-[#f5e8c7] text-[#1D1B3F] font-semibold px-6 py-2 rounded-full border border-[#A77C4E] shadow-md transition-all duration-300 ease-in-out hover:bg-[#e0c896]">
            Contacto
          </button>
        </Link>
      </div>
        {/* Línea decorativa */}
      <div className="w-full mb-12 px-4">
        <hr className="border-t border-[#e7d7b8] opacity-30" />
      </div>
      {/* Sección Sobre el proyecto */}
      <section className="bg-[#E7D7B8] text-[#1D1B3F] p-8 md:p-12 rounded-2xl shadow-lg max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 my-10 border border-[#A77C4E]">
  <h3 className="text-3xl text-center md:text-4xl font-extrabold text-[#1D1B3F] mb-6 tracking-tight">
    Sobre el proyecto
  </h3>
  <p className="text-lg md:text-xl font-serif text-justify leading-relaxed">
    <span className="font-bold text-[#A77C4E]">Noctiluca</span>, palabra real que significa “la que brilla en la noche”, es un cuaderno de campo digital dedicado a las mariposas de Europa. Una experiencia visual y educativa que combina ciencia, arte y conservación.
    <br /><br />
    Desde los rincones más silvestres del continente, cada especie registrada revela una historia que merece ser contada. Más que una página web, <span className="text-[#A77C4E] font-medium">Noctiluca</span> es una invitación a observar, aprender y proteger.
    <br /><br />
    Porque cada aleteo, por pequeño que parezca, es vital para el equilibrio del planeta.
  </p>
</section>

      <ButtonCreateButterfly/>
      {/* Mapa de mariposas */}
      <ButterflyMap />
    </section>
  );
};

export default Home;