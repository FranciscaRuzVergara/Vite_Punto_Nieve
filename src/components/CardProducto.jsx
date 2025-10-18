function CardProducto({imagen,nombre,descripcion,precio}){
    return(
        <div className="col">
      <div className="card product-card h-100 shadow">
        <img src={imagen} className="card-img-top" alt={nombre} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text text-muted">{descripcion}</p>
          <h4 className="text-primary mt-auto mb-3">{precio}</h4>
          <button className="btn btn-success d-block" style={{ borderRadius: "10px" }}>
            <i className="bi bi-cart-plus me-2"></i>Añadir al carrito
          </button>
        </div>
      </div>
    </div>
    );
}

export default CardProducto;