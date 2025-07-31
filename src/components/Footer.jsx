import '../style/Footer.css';

export default function Footer() {
  return (
    <>
      <div className="footer-line"></div> {/* LÍNEA DECORATIVA */}

      <footer className="">
        <div className="footer-content">
          <p>
            © 2025 · Proyecto realizado por Nicole, Maryori, Valentina, Esther, Rocío y Mariana para el Bootcamp Fullstack
            (Frontend + Backend) de Factoria F5. Todo los contenidos tienen fines educativos y de divulgación.
          </p>

          <a href="https://factoriaf5.org/" target="_blank" rel="noopener noreferrer">
            <img
              className="footer-logo"
              src="https://femcoders.factoriaf5.org/wp-content/uploads/2021/12/Logo-FemCodersF5-color-300x224.png"
              alt="logo femcoders factoriaf5"
            />
          </a>
        </div>
      </footer>
    </>
  );
}


