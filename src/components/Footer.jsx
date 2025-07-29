import '../style/Footer.css';

export default function Footer() {
  return (
    <>
      <div className="footer-line"></div> {/* LÍNEA DECORATIVA */}
      
      <footer className="bg-indigo-950 text-white text-center py-6 text-sm mt-auto">
        <p>
          © 2025 · Proyecto realizado por Nicole, Maryori, Valentina, Esther, Rocío y Mariana para el Bootcamp Fullstack
          (Frontend + Backend) de Factoria F5. Todo los contenidos tienen fines educativos y de divulgación.
        </p>
      </footer>
    </>
  );
}

