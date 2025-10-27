export const validateCarrito = (carrito) => {
  let errors = {};

  const subtotal = carrito.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 0;
    return acc + precio * cantidad;
  }, 0);

  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  // validar q total no supere 500mil
  if (total > 500000) {
    errors.total = "El monto total no puede superar los $500.000 CLP.";
  }

  return errors;
};
