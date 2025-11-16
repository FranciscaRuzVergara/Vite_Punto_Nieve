import React from "react";
import "../styles/Carrito.css";

function Carrito({
  carrito,
  carritoError,
  eliminarDelCarrito,
  incrementarCantidad,
  decrementarCantidad
}) {
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar "${nombre}" del carrito?`)) {
      eliminarDelCarrito(id);
    }
  };

  return (
    <main className="container my-5">
      <h2 className="text-center mb-5 text-uppercase">Carrito de Compras</h2>

      {/* alerta si el carrito supera los 500mil */}
      {carritoError && (
        <div className="alert alert-danger text-center" role="alert">
          {carritoError}
        </div>
      )}

      {carrito.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Tu carrito está vacío.
        </div>
      ) : (
        <>
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Precio Unitario</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="cart-item-image"
                      />
                      <span>{item.nombre}</span>
                    </div>
                  </td>

                  <td className="text-center">
                    ${item.precio.toLocaleString("es-CL")}
                  </td>

                  <td className="text-center">
                    <div className="d-inline-flex align-items-center justify-content-between cart-qty-control">
                      {/* botón - */}
                      <button
                        className="btn btn-link text-white text-decoration-none p-0 px-2 cart-qty-btn"
                        onClick={() => decrementarCantidad(item.id)}
                        aria-label={`Disminuir cantidad de ${item.nombre}`}
                      >
                        −
                      </button>

                      <span className="cart-qty-value">
                        {item.cantidad}
                      </span>

                      <button
                        className="btn btn-link text-white text-decoration-none p-0 px-2 cart-qty-btn"
                        onClick={() => incrementarCantidad(item.id)}
                        aria-label={`Aumentar cantidad de ${item.nombre}`}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="text-end">
                    {(item.precio * item.cantidad).toLocaleString("es-CL")}
                  </td>

                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminar(item.id, item.nombre)}
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row justify-content-end">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  Subtotal:
                  <span>${subtotal.toLocaleString("es-CL")}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  IVA (19%):
                  <span>
                    ${iva.toLocaleString("es-CL", { minimumFractionDigits: 0 })}
                  </span>
                </li>

                <li className="list-group-item d-flex justify-content-between fw-bold bg-light">
                  Total:
                  <span>
                    $
                    {total.toLocaleString("es-CL", {
                      minimumFractionDigits: 0
                    })}
                  </span>
                </li>
              </ul>

              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-primary btn-lg cart-pay-button"
                  disabled={!!carritoError}
                >
                  Proceder a Pagar
                </button>
              </div>

              {carritoError && (
                <small className="text-danger d-block mt-2 text-center">
                  Ajusta las cantidades para continuar.
                </small>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
