import React from "react";
import { Link } from "react-router-dom";

function CardCategoria({ imagen, titulo }) {
  return (
    <Link
      to="/productos"
      className="text-decoration-none text-dark"
      style={{ cursor: "pointer" }}
    >
      <div className="card h-100">
        <div className="ratio ratio-4x3">
          <img
            src={imagen}
            alt={titulo}
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="card-body">
          <h5
            className="card-title mb-0 text-uppercase"
            style={{ letterSpacing: "0.08em" }}
          >
            {titulo}
          </h5>
        </div>
      </div>
    </Link>
  );
}

export default CardCategoria;
