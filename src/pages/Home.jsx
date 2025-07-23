import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='min-h-screen bg-gradient-to-b from-[#2c1f4a] to-[#6b4b77] text-center text-white flex flex-col justify-center items-center px-4'>
      <p className='text-sm mb-2'>Un cuaderno de campo sobre las mariposas de Europa</p>
      <img src="/logo-noctiluca.png" alt="Logo Noctiluca" className="w-1 h-auto" />
      <p className='text-md max-w-md mb-6 text-[#f0e8d4]'>Explora el mundo místico de las mariposas europeas, su belleza y su rol esencial como polinizadoras</p>
      <div className='flex gap-4'>
        <Link to="/butterflygallery">
        <button className='bg-[#e7d7b8] text-[#2c1f4a] px-6 py-2 rounded-full shadow-md hover:bg-[#fff3d4] transition'>
          Galería
        </button>
        </Link>
        <Link to='/butterflymembers'> 
        <button className='bg-[#e7d7b8] text-[#2c1f4a] px-6 py-2 rounded-full shadow-md hover:bg-[#fff3d4] transition'>
          Contacto
        </button>
        </Link>
      </div>
      {/* Línea decorativa abajo, opcional SVG */}
      <div className="mt-10 w-full">
        <hr className="border-t border-[#e7d7b8] opacity-30" />
        {/* Aquí podrías poner un SVG decorativo si lo tienes exportado del Figma */}
      </div>
      <section className="bg-white p-6 max-w-4xl mx-auto my-8 rounded-xl shadow-md border">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Sobre el proyecto</h2>
  <p className="text-gray-700 leading-relaxed">
    Las mariposas no solo embellecen nuestro mundo, sino que mantienen los ecosistemas en equilibrio. <strong>“Noctiluca”</strong> documenta su presencia en Europa, promoviendo la observación, conservación y digitalización del conocimiento natural.
  </p>
  
</section>

      </section>
  );
};
export default Home;
