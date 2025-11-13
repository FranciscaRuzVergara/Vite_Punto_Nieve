import { useState, useEffect } from "react";
import "../styles/CardProducto.css";

function CardProducto({
  producto,
  cantidadEnCarrito = 0,
  onAgregar,
  onIncrementar,
  onDecrementar
}) {
  const { id, imagen, nombre, descripcion, precio } = producto;

  const [showMsg, setShowMsg] = useState(false); // mensaje agregado

  const handleAgregar = () => {
    if (onAgregar) {
      onAgregar(producto);
    }
    setShowMsg(true);
  };

  // ocultar msje dsps de 2.5s
  useEffect(() => {
    if (showMsg) {
      const t = setTimeout(() => setShowMsg(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showMsg]);

  const precioFormateado = (
    typeof precio === "number" ? precio : 0
  ).toLocaleString("es-CL");

  return (
    <div className="col">
      <div className="card product-card h-100 shadow position-relative">

        {showMsg && (
          <div
            className="alert alert-success py-1 px-2 position-absolute product-alert"
          >
            <i className="bi bi-check-circle-fill me-1"></i>
            Agregado
          </div>
        )}

        <img
          src={imagen}
          className="card-img-top product-image"
          alt={nombre}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-uppercase">{nombre}</h5>
          <p className="card-text text-muted">{descripcion}</p>
          <h4 className="mt-auto mb-3 product-price">
            {precioFormateado}
          </h4>

          {cantidadEnCarrito === 0 ? (
            <button
              className="btn btn-success d-block w-100 product-add-btn"
              onClick={handleAgregar}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Añadir al carrito
            </button>
          ) : (
            <div
              className="d-flex align-items-center justify-content-between w-100 product-qty-container"
            >
              <button
                className="btn btn-link text-white text-decoration-none px-2 product-qty-btn"
                onClick={() => onDecrementar && onDecrementar(id)}
              >
                −
              </button>

              {/* cantidad actual */}
              <span className="product-qty-value">
                {cantidadEnCarrito}
              </span>

              <button
                className="btn btn-link text-white text-decoration-none px-2 product-qty-btn"
                onClick={() => onIncrementar && onIncrementar(id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProducto;
