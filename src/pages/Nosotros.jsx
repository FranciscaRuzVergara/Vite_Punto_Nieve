import "../styles/Nosotros.css";

const secciones = [
  {
    titulo: "¿Quiénes somos?",
    descripcion: "Descubre nuestra historia, misión y visión.",
    imagen: "./img/qnessomos.jpg",
    fondo: true,
  },
  {
    titulo: "Sobre Nosotros",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quo at architecto eius vel fugit labore esse placeat dicta cumque magnam, ab, aliquam sunt voluptas sapiente ipsa, blanditiis qui eaque.",
    imagen: "./img/nosotros.jpg",
  },
  {
    titulo: "Misión",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quo at architecto eius vel fugit labore esse placeat dicta cumque magnam, ab, aliquam sunt voluptas sapiente ipsa, blanditiis qui eaque.",
    imagen: "./img/mision.jpg",
  },
  {
    titulo: "Visión",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quo at architecto eius vel fugit labore esse placeat dicta cumque magnam, ab, aliquam sunt voluptas sapiente ipsa, blanditiis qui eaque.",
    imagen: "./img/vision.jpg",
  },
];

function Nosotros() {
  return (
    <main className="container-fluid p-0">
      {secciones.map((sec, index) => (
        <section
          key={index}
          className={`py-5 text-center ${
            sec.fondo ? "nosotros-hero text-white" : ""
          }`}
        >
          <div className="container">
            <h2 className="mb-4">{sec.titulo}</h2>
            <p className="mb-4">{sec.descripcion}</p>

            {!sec.fondo && (
              <img
                src={sec.imagen}
                alt={sec.titulo}
                className="img-fluid mt-3 nosotros-section-image"
              />
            )}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Nosotros;
