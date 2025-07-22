import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // o usa SVGs si no usas esta lib

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-b from-indigo-900 to-purple-800 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <span>Noctiluca 🦋</span>
        </Link>

        {/* Botón hamburguesa */}
        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <ul className={`lg:flex gap-8 font-medium ${open ? "block mt-4" : "hidden"} lg:block`}>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
