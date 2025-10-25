import CardProducto from "../components/CardProducto";

const productos = [
  {
    id:1,
    imagen: "./img/pastel2.jpg",
    nombre: "Pastel",
    descripcion: "Bizcocho",
    precio: 14990,
  },
  {
    id:2,
    imagen: "./img/pastel5.jpg",
    nombre: "Pastel de frutos rojos",
    descripcion: "Exquisito pastel con frutos del bosque y crema batida.",
    precio: 12500,
  },
];

function Productos({agregarAlCarrito}) {
  return (
    <main className="container my-5">
      <h2 className="text-center mb-5">Nuestros Productos</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((prod) => (
          <CardProducto
            key={prod.id}
            producto={prod}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>
    </main>
  );
}

export default Productos;
