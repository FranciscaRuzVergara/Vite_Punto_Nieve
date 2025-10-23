const hero = {
  titulo: "Centro de Ayuda",
  descripcion: "Aquí encontrarás respuestas a tus dudas y soporte de nuestros servicios.",
  imagenFondo: "/img/faq.avif",
};

const faqs = [
  {
    pregunta: "¿Cómo realizo un pedido?",
    respuesta:
      "Puedes realizar tu pedido directamente desde nuestra web en la sección “Productos”.",
  },
  {
    pregunta: "¿Con cuánto tiempo debo encargar mi torta?",
    respuesta: "Recomendamos encargarla con al menos 1 semana de anticipación.",
  },
  {
    pregunta: "¿Puedo personalizar el diseño de mi torta?",
    respuesta:
      "Sí, ofrecemos tortas personalizadas. Puedes enviarnos tu idea o imagen de referencia en nuestro formulario de cotización.",
  },
  {
    pregunta: "¿Ofrecen tortas sin azúcar, sin gluten o veganas?",
    respuesta:
      "Sí, contamos con opciones especiales para dietas específicas. Consulta la disponibilidad antes de hacer tu pedido.",
  },
  {
    pregunta: "¿Cuál es el costo de envío?",
    respuesta:
      "El costo varía según la comuna. El cálculo se muestra al momento de hacer el pedido.",
  },
  {
    pregunta: "¿Qué hago si mi pedido llega dañado?",
    respuesta:
      "Si tu pedido llega en mal estado, contáctanos de inmediato con una foto del producto y solucionaremos el problema.",
  },
  {
    pregunta: "¿Cuánto tiempo se conservan las tortas en buen estado?",
    respuesta:
      "Nuestras tortas se conservan frescas entre 2 y 3 días si se mantienen refrigeradas.",
  },
  {
    pregunta: "¿Cuál es el horario de atención?",
    respuesta: "Nuestro horario es de lunes a sábado de 9:00 a 19:00 hrs.",
  },
];

function Ayuda() {
  return (
    <>
      {}
      <style>{`
        .navbar .nav-link.active {
          font-weight: bold;
          border-bottom: 2px solid white;
        }
        .centro-ayuda {
          background-image: url('${hero.imagenFondo}');
          background-size: cover;
          background-position: center;
          padding: 80px 0;
        }
        .centro-ayuda h2, .centro-ayuda p {
          color: white !important;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
        }
      `}</style>

      {/* hero */}
      <section className="centro-ayuda">
        <main className="container my-5 text-center">
          <h2 className="mb-4">{hero.titulo}</h2>
          <p className="mb-5">{hero.descripcion}</p>
        </main>
      </section>

      {/*acordeón de preguntas frecuentes*/}
      <main className="container my-5">
        <section className="mb-5">
          <h3 className="mb-3">Preguntas Frecuentes</h3>

          <div className="accordion" id="faqAccordion">
            {faqs.map((item, index) => {
              const collapseId = `collapse-${index}`;
              const headerId = `faq-${index}`;
              const first = index === 0;

              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={headerId}>
                    <button
                      className={`accordion-button ${first ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded={first ? "true" : "false"}
                      aria-controls={collapseId}
                    >
                      {item.pregunta}
                    </button>
                  </h2>
                  <div
                    id={collapseId}
                    className={`accordion-collapse collapse ${first ? "show" : ""}`}
                    data-bs-parent="#faqAccordion"
                    aria-labelledby={headerId}
                  >
                    <div className="accordion-body">{item.respuesta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/*info de entrega y retiro*/}
        <section className="mb-5">
          <h3 className="mb-3">Información de entrega y retiro</h3>
          <p>
            Realizamos entregas a domicilio dentro de la ciudad y también puedes retirar tu pedido en nuestra pastelería.
          </p>
        </section>

        {/* atención al cliente */}
        <section className="mb-5">
          <h3 className="mb-3">Atención al cliente</h3>
          <p>
            Si tienes dudas, contáctanos a través de WhatsApp o a nuestro correo electrónico:{" "}
            <a href="mailto:soporte@pasteleria.com">soporte@pasteleria.com</a>
          </p>
        </section>
      </main>
    </>
  );
}

export default Ayuda;