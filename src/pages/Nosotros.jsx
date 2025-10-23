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
            sec.fondo ? "text-white" : ""
          }`}
          style={
            sec.fondo
              ? {
                  backgroundImage: `url(${sec.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }
              : {}
          }
        >
          <div className="container">
            <h2 className="mb-4">{sec.titulo}</h2>
            <p className="mb-4">{sec.descripcion}</p>

            {!sec.fondo && (
              <img
                src={sec.imagen}
                alt={sec.titulo}
                className="img-fluid mt-3"
                style={{ maxHeight: "400px", width: "80%", objectFit: "cover" }}
              />
            )}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Nosotros;