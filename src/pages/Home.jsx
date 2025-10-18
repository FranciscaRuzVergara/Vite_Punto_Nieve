import CardCategoria from "../components/CardCategoria";
import Carrusel from "../components/Carrusel";

const categorias = [
  { imagen: "./img/matrimonio.jpg", titulo: "Matrimonio" },
  { imagen: "./img/niños.jpg", titulo: "Niños" },
  { imagen: "./img/dulces.jpg", titulo: "Dulce" },
  { imagen: "./img/vegan.jpg", titulo: "Vegano y Sin Gluten" },
];

function Home() {
    const slides = [
    { imagen: "/img/img1.jpg", alt: "Primer slide" },
    { imagen: "/img/img2.jpg", alt: "Segundo slide" },
    { imagen: "/img/img3.jpg", alt: "Tercer slide" },
    { imagen: "/img/img4.jpg", alt: "Cuarto slide" },
  ];

  return (
    <main className="container-fluid my-4">
        <Carrusel
        slides={slides}
        titulo="Bienvenido a Punto Nieve"
      />
      <h1>Bienvenidos</h1>
      <h2>Categorias</h2>
      <div className="container mt-4" style={{ paddingBottom: "6rem" }}>
        <div className="row g-4">
          {categorias.map((cat, index) => (
            <CardCategoria key={index} imagen={cat.imagen} titulo={cat.titulo} />
          ))}
        </div>
      </div>
      
    </main>
  );
}

export default Home;
