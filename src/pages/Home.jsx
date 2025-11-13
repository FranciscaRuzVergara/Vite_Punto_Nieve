import React from "react";
import Carrusel from "../components/Carrusel";
import CardCategoria from "../components/CardCategoria";
import FormCotizacion from "../components/FormCotizacion";
import "../styles/Home.css";

export default function Home() {
  const slides = [
    { imagen: "/img/img1.jpg", alt: "carrusel1" },
    { imagen: "/img/img2.jpg", alt: "carrusel2" },
    { imagen: "/img/img3.jpg", alt: "carrusel3" },
    { imagen: "/img/img4.jpg", alt: "carrusel4" },
  ];

  const categorias = [
    { imagen: "/img/matrimonio.jpg", titulo: "Matrimonio" },
    { imagen: "/img/niños.jpg", titulo: "Niños" },
    { imagen: "/img/dulces.jpg", titulo: "Dulce" },
    { imagen: "/img/salado.jpg", titulo: "Salado" },
    { imagen: "/img/vegan.jpg", titulo: "Vegano y sin gluten" },
    { imagen: "/img/temporada.jpg", titulo: "De temporada" },
  ];

  return (
    <>
      {/*contenido principal*/}
      <main className="container my-4">
        <div className="position-relative mb-5">
          <Carrusel slides={slides} titulo="" id="myCarousel" />
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-3 bg-dark bg-opacity-50 rounded">
            <h2 className="h3">¡Bienvenid@ a Punto Nieve!</h2>
            <p className="mb-0">
              Aquí encontrarás la mejor repostería artesanal, con productos
              frescos para cada ocasión especial.
            </p>
          </div>
        </div>

        {/*categorías de productos*/}
        <h2
          className="h4 text-uppercase ps-1 mb-3 home-section-title"
        >
          Nuestros Productos
        </h2>

        <div className="container mt-4">
          <div className="row g-4">
            {categorias.map((c, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-4">
                <CardCategoria imagen={c.imagen} titulo={c.titulo} />
              </div>
            ))}
          </div>
        </div>

        {/*testimonios*/}
        <h2 className="h4 ps-3 mt-5">Testimonios</h2>
        <section className="container my-4">
          <div className="row g-4">
            <div className="col-lg-4">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p className="mb-0">
                    "Los dulces de Punto Nieve son simplemente espectaculares.
                    Siempre frescos y deliciosos, mi familia los ama!"
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  María González, <cite>Santiago</cite>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p className="mb-0">
                    "Me encanta la variedad de productos que tienen. Cada vez
                    que voy, salgo con algo nuevo y delicioso."
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Camila Rojas, <cite>Concepción</cite>
                </figcaption>
              </figure>
            </div>
            <div className="col-lg-4">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p className="mb-0">
                    "Los postres artesanales son una obra de arte. Repetiré
                    seguro en mi próximo evento."
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Isabella Torres, <cite>Antofagasta</cite>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/*formulario de cotización*/}
        <div className="container my-5">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <FormCotizacion />
            </div>

            <div className="col-md-6 text-center">
              <div className="position-relative d-inline-block w-100">
                <img
                  src="/img/cotización.jpg"
                  alt="Imagen invitación"
                  className="img-fluid rounded"
                />
                <div className="position-absolute top-50 start-50 translate-middle text-white px-3 py-2 bg-dark bg-opacity-50 rounded">
                  <h3>¡Haz tu evento inolvidable!</h3>
                  <p className="lead mb-0">¡Cotiza con nosotros hoy! 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
