import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4">
      <div className="container">
        <div className="row">
          
          {/*columna 1*/}
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Contacto</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Ubicación</a></li>
              <li><a href="#" className="text-white text-decoration-none">Horario de Atención</a></li>
              <li><a href="#" className="text-white text-decoration-none">Redes Sociales</a></li>
              <a href="https://www.instagram.com" className="text-white me-3" aria-label="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://www.facebook.com" className="text-white me-3" aria-label="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://wa.me/numerodetelefono" className="text-white" aria-label="WhatsApp">
                <i className="bi bi-whatsapp fs-4"></i>
              </a>
            </ul>
          </div>

          {/*columna 2*/}
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Información</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Política de Privacidad</a></li>
              <li><a href="#" className="text-white text-decoration-none">Términos y Condiciones</a></li>
              <li>
                <Link className="text-white text-decoration-none" to="ayuda">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="mapaSitio">
                  Mapa de Sitio
                </Link>
              </li>
            </ul>
          </div>

          {/*columna 3*/}
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Servicios</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Suscríbete a nuestro boletín</a></li>
              <li><a href="#" className="text-white text-decoration-none">Métodos de Pago</a></li>
              <li><a href="#" className="text-white text-decoration-none">Envío y Entrega</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center py-3 border-top border-secondary mt-3 footer-brand">
          © 2025 Punto Nieve.
        </div>
      </div>
    </footer>
  );
}
