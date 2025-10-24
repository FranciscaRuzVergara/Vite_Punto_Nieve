import React from "react";

export default function CardCategoria({ imagen, titulo }) {
  return (
    <div className="card h-100"> {/* <- sin bg-primary ni text-white */}
      <div className="ratio ratio-4x3">
        <img src={imagen} alt={titulo} className="w-100 h-100 object-fit-cover" />
      </div>
      <div className="card-body">
        <h5 className="card-title mb-0">{titulo}</h5>
      </div>
    </div>
  );
}
