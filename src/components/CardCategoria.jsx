function CardCategoria({ imagen, titulo }) {
  return (
    <div className="col-md-4">
      <div className="card text-white bg-primary h-100">
        <img src={imagen} className="card-img-top mx-auto d-block" alt={titulo} style={{ maxHeight: "150px", objectFit: "cover" }}/>
        <div className="card-body">
          <h4 className="card-title">{titulo}</h4>
        </div>
      </div>
    </div>
  );
}

export default CardCategoria;
