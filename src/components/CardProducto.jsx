import { useState, useEffect } from "react";

function CardProducto({
  producto,
  cantidadEnCarrito = 0,
  onAgregar,
  onIncrementar,
  onDecrementar
}) {
  const { id, imagen, nombre, descripcion, precio } = producto;

  const [showMsg, setShowMsg] = useState(false); // controla mensaje agregado

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
            className="alert alert-success py-1 px-2 position-absolute"
            style={{
              top: "10px",
              right: "10px",
              fontSize: "0.8rem",
              borderRadius: "6px",
              marginBottom: 0,
            }}
          >
            <i className="bi bi-check-circle-fill me-1"></i>
            Agregado
          </div>
        )}

        <img
          src={imagen}
          className="card-img-top"
          alt={nombre}
          style={{
            objectFit: "cover",
            maxHeight: "240px"
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-uppercase">{nombre}</h5>
          <p className="card-text text-muted">{descripcion}</p>
          <h4
            className="mt-auto mb-3"
            style={{ color: "#40963dff", fontWeight: "600" }}
          >
            {precioFormateado}
          </h4>


          {cantidadEnCarrito === 0 ? (
            <button
              className="btn btn-success d-block w-100"
              style={{ borderRadius: "10px" }}
              onClick={handleAgregar}
            >
              <i className="bi bi-cart-plus me-2"></i>
              Añadir al carrito
            </button>
          ) : (
            <div
              className="d-flex align-items-center justify-content-between w-100"
              style={{
                backgroundColor: "#23272eff",
                color: "#fff",
                borderRadius: "12px",
                padding: "0.5rem 0.75rem",
                fontWeight: "500",
              }}
            >
              <button
                className="btn btn-link text-white text-decoration-none px-2"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1rem",
                  fontWeight: "600",
                }}
                onClick={() => onDecrementar && onDecrementar(id)}
              >
                −
              </button>

              {/* Cantidad actual */}
              <span style={{ fontSize: "1rem", minWidth: "2rem", textAlign: "center" }}>
                {cantidadEnCarrito}
              </span>

              <button
                className="btn btn-link text-white text-decoration-none px-2"
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1rem",
                  fontWeight: "600",
                }}
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
