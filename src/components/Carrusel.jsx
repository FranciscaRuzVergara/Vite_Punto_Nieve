function Carrusel({ slides, titulo }) {
  return (
    <div
      id="myCarousel"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
      style={{ paddingBottom: "2rem" }}
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
            <img
              src={slide.imagen}
              className="d-block w-100"
              alt={slide.alt}
              style={{ height: "360px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {titulo && (
        <div
          style={{
            position: "absolute",
            top: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.5)",
            padding: "0.75rem 1.5rem",
            borderRadius: "10px",
            zIndex: 10,
            textAlign: "center",
            color: "white"
          }}
        >
          <h2 style={{ fontFamily: "'Dela Gothic One', cursive", fontSize: "1.6rem", margin: 0 }}>
            {titulo}
          </h2>
        </div>
      )}

      <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carrusel;
