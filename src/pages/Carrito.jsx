import React from 'react';

function Carrito({ carrito, eliminarDelCarrito }) {

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    //Eliminar
    const handleEliminar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar "${nombre}" del carrito?`)) {
            eliminarDelCarrito(id);
        }
    };

    return (
        <main className="container my-5">
            <h2 className="text-center mb-5">Carrito de Compras</h2>
            
            {carrito.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    Tu carrito está vacío.
                </div>
            ) : (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th className="text-center">Precio Unitario</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-end">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                                            {item.nombre}
                                        </div>
                                    </td>
                                    <td className="text-center">${item.precio.toLocaleString('es-CL')}</td>
                                    <td className="text-center">{item.cantidad}</td>
                                    <td className="text-end">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            onClick={() => handleEliminar(item.id, item.nombre)}
                                            aria-label={`Eliminar ${item.nombre}`}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="row justify-content-end">
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between">
                                    Subtotal: <span>${subtotal.toLocaleString('es-CL')}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    IVA (19%): <span>${iva.toLocaleString('es-CL', { minimumFractionDigits: 0 })}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between fw-bold bg-light">
                                    Total: <span>${total.toLocaleString('es-CL', { minimumFractionDigits: 0 })}</span>
                                </li>
                            </ul>
                            <div className="d-grid gap-2 mt-3">
                                <button className="btn btn-primary btn-lg">Proceder a Pagar</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

export default Carrito;