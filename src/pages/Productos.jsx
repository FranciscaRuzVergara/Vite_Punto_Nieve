import CardProducto from "../components/CardProducto";

const productos = [
  {
    imagen: "./img/pastel2.jpg",
    nombre: "Pastel",
    descripcion: "Bizcocho",
    precio: "$14.990",
  },
  {
    imagen: "./img/pastel5.jpg",
    nombre: "Pastel de frutos rojos",
    descripcion: "Exquisito pastel con frutos del bosque y crema batida.",
    precio: "$12.500",
  },
];

function Productos() {
  return (
    <main className="container my-5">
      <h2 className="text-center mb-5">Nuestros Productos</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((prod, index) => (
          <CardProducto
            key={index}
            imagen={prod.imagen}
            nombre={prod.nombre}
            descripcion={prod.descripcion}
            precio={prod.precio}
          />
        ))}
      </div>
    </main>
  );
}

export default Productos;
