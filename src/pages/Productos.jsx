import React from "react";
import CardProducto from "../components/CardProducto";

function Productos({
  carrito,
  agregarAlCarrito,
  incrementarCantidad,
  decrementarCantidad,
}) {
  const carritoSeguro = Array.isArray(carrito) ? carrito : [];

  const listaProductos = [
    {
      id: 1,
      nombre: "Torta Red Velvet",
      descripcion: "Deliciosa torta de  red velvet con cobertura de queso crema.",
      precio: 14990,
      imagen: "/img/redvelvet.png",
    },
    {
      id: 2,
      nombre: "Cheesecake de Lotus",
      descripcion: "Exquisito cheesecake de galleta Lotus.",
      precio: 12500,
      imagen: "/img/lotus.jpg",
    },
  ];

  return (
    <main className="container my-5">
      <h2 className="text-center mb-4 text-uppercase">Nuestros Productos</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {listaProductos.map((prod) => {
          const itemEnCarrito = carritoSeguro.find(
            (item) => String(item.id) === String(prod.id)
          );
          const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

          return (
            <CardProducto
              key={prod.id}
              producto={prod}
              cantidadEnCarrito={cantidadEnCarrito}
              onAgregar={agregarAlCarrito}         
              onIncrementar={incrementarCantidad}  
              onDecrementar={decrementarCantidad} 
            />
          );
        })}
      </div>
    </main>
  );
}

export default Productos;