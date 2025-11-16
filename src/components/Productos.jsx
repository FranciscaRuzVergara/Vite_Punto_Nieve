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
    { id: 1, nombre: "Torta Red Velvet",
      descripcion: "Deliciosa torta de  red velvet con cobertura de queso crema.",
      precio: 14990,
      imagen: "/img/redvelvet.png"
    },
    { id: 2, nombre: "Cheesecake de Lotus",
      descripcion: "Exquisito cheesecake de galleta Lotus.",
      precio: 12500,
      imagen: "/img/lotus.jpg" },
    { id: 3, nombre: "Cupcake Ferrero Rocher",
      descripcion: "Cupcake relleno y decorado con Ferrero Rocher.",
      precio: 2990,
      imagen: "/img/cupcake.jpg" 
    },
    { id: 4,
      nombre: "Cinnamon Roll",
      descripcion: "Delicioso rollo de canela con glaseado de queso crema.",
      precio: 3990,
      imagen: "/img/cinnamon.jpg"
    },
    { id: 5,
      nombre: "Set de Macarons",
      descripcion: "Set de 6 macarons surtidos.",
      precio: 7990,
      imagen: "/img/macarron.jpg"
    },
    { id: 6,
      nombre: "Pain au Chocolat",
      descripcion: "Clásico croissant relleno de chocolate.",
      precio: 2990,
      imagen: "/img/panchocolate.jpg"
    },
    { id: 7,
      nombre: "Set Cannelés",
      descripcion: "Deliciosos cannelés franceses con centro suave y exterior crujiente.",
      precio: 3990,
      imagen: "/img/cannele.jpg"
    },
    { id: 8,
      nombre: "Carrot Cake",
      descripcion: "Torta de zanahoria con nueces y cobertura de queso crema.",
      precio: 12990,
      imagen: "/img/carrot.png"
    },
    { id: 9,
      nombre: "Torta panqueque naranja",
      descripcion: "Torta de panqueques con relleno y cobertura de crema sabor naranja.",
      precio: 13990,
      imagen: "/img/naranja.jpg"
    },
    { id: 10,
      nombre: "Torta mil hojas manjar",
      descripcion: "Torta de mil hojas rellena con manjar y crema chantilly.",
      precio: 14990,
      imagen: "/img/milhojas.jpg"
    }
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
