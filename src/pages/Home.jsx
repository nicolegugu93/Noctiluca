import React from 'react';
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <section className='min-h-screen bg-gradient-to-b from-[#2c1f4a] to-[#6b4b77] text-center text-white flex flex-col justify-center items-center px-4'>
      <p className='text-sm mb-2'>Un cuaderno de campo sobre las mariposas de Europa</p>
      <h1 className='text-6xl font-serif font-bold text-[#e7d7b8] mb-4 flex items-center gap-2'>Noctiluca<span className="text-3xl">🦋</span>
      </h1>
      <p className='text-md max-w-md mb-6 text-[#f0e8d4]'>Explora el mundo místico de las mariposas europeas, su belleza y su rol esencial como polinizadoras</p>
      <div className='flex gap-4'>
        <Link to="/galeria">
        <button className='bg-[#e7d7b8] text-[#2c1f4a] px-6 py-2 rounded-full shadow-md hover:bg-[#fff3d4] transition'>
          Galería
        </button>
        </Link>
        <Link to='src/pages/ContactButterfly.jsx'> {/* enlaza el link correcto */}
        <button className='bg-[#e7d7b8] text-[#2c1f4a] px-6 py-2 rounded-full shadow-md hover:bg-[#fff3d4] transition'>
          Contacto
        </button>
        </Link>
      </div>
      </section>
  );
};
export default home;
