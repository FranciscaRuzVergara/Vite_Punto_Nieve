import React, { useEffect, useState } from "react";
import Carrusel from "../components/Carrusel";
import CardCategoria from "../components/CardCategoria";
import FormCotizacion from "../components/FormCotizacion";
import "../styles/Home.css";

export default function Home() {
  const [clima, setClima] = useState(null);
  const [cargandoClima, setCargandoClima] = useState(true);
  const [errorClima, setErrorClima] = useState(null);

  const API_URL ="https://my.meteoblue.com/packages/basic-1h?apikey=ezOHlkSoXN86sZm3&lat=-33.4569&lon=-70.6483&asl=556&format=json";

  useEffect(() => {
  const fetchClima = async () => {
    try {
      setCargandoClima(true);
      setErrorClima(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener clima");

      const data = await res.json();

      const hour = data?.data_1h;

      if (hour && hour.temperature?.length > 0) {
        setClima({
          temp: hour.temperature[0],
          weatherCode: null,
        });
      } else {
        throw new Error("Estructura de clima inválida");
      }
    } catch (e) {
      console.log(e);
      setErrorClima("No se pudo cargar el clima.");
    } finally {
      setCargandoClima(false);
    }
  };

  fetchClima();
}, []);
  
  const TarjetaClima = () => {
    if (cargandoClima) {
      return (
        <div className="text-center p-3 bg-light rounded-4 shadow-sm mb-4">
          Cargando clima...
        </div>
      );
    }

    if (errorClima) {
      return (
        <div className="alert alert-warning text-center rounded-4" role="alert">
          {errorClima}
        </div>
      );
    }

    if (!clima) return null;
    const cardBgClass = "bg-dark text-white";

    return (
    <div className={`card ${cardBgClass} mb-4 shadow-lg border-0 rounded-4`}>
      <div className="card-body p-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0">
            Clima en Santiago
          </h5>
          <p className="card-text mb-0">
            Temperatura actual del día
          </p>
        </div>
        <div className="text-end">
          <h4 className="mb-0">
            {clima.temp}°C
          </h4>
        </div>
      </div>
    </div>
  );   
};

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

        <div className="col-12 col-lg-4 order-lg-2">
          <TarjetaClima />  
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
