import React from "react";
import { Link } from "react-router-dom";
import "../styles/MapaSitio.css";

function MapaSitio() {
  return (
    <main className="container mt-4 mb-5">
      <div className="card shadow-sm p-4">
        <h1
          className="card-title text-center text-dark mb-4 mapa-sitio-title"
        >
          Mapa del Sitio
        </h1>

        <div className="list-group">
          <Link to="/" className="list-group-item list-group-item-action">
            <i className="bi bi-house-door me-2 text-dark"></i>Inicio
          </Link>

          <Link to="/productos" className="list-group-item list-group-item-action">
            <i className="bi bi-box-seam me-2 text-dark"></i>Productos
          </Link>

          <Link to="/ayuda" className="list-group-item list-group-item-action">
            <i className="bi bi-question-circle me-2 text-dark"></i>Ayuda
          </Link>

          <Link to="/nosotros" className="list-group-item list-group-item-action">
            <i className="bi bi-people me-2 text-dark"></i>Nosotros
          </Link>

          <Link to="/login" className="list-group-item list-group-item-action">
            <i className="bi bi-person me-2 text-dark"></i>Iniciar sesión
          </Link>

          <Link to="/registro" className="list-group-item list-group-item-action">
            <i className="bi bi-person-plus me-2 text-dark"></i>Registrarse
          </Link>

          <Link
            to="/mapasitio"
            className="list-group-item list-group-item-action active bg-dark text-white border-dark"
            aria-current="true"
          >
            <i className="bi bi-map me-2"></i>Mapa de Sitio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MapaSitio;
