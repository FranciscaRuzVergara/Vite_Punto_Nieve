import React, { useEffect, useState } from "react";
import Carrito from "../components/Carrito";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // lee la URL del backend desde .env

function CarritoPage() {
  const [carrito, setCarrito] = useState([]);
  const [estado, setEstado] = useState({ loading: false, error: null });
  const [carritoError, setCarritoError] = useState("");

  const cargarCarrito = async () => {
    setEstado({ loading: true, error: null });

    try {
      const res = await fetch(`${API_BASE}/api/v1/carrito`);

      if (res.status === 204) {
        setCarrito([]);
        setEstado({ loading: false, error: null });
        return;
      }

      const text = await res.text();
      if (!res.ok) throw new Error(`Error ${res.status}: ${text}`);

      const data = text ? JSON.parse(text) : [];
      const lista = Array.isArray(data) ? data : data.carrito || [];

      const carritoModificado = lista.map((item) => ({
        id: item.idCarrito, 
        nombre:
          item.nombre ||
          (item.producto && item.producto.nombre) ||
          "Producto",
        imagen:
          item.imagen ||
          (item.producto && item.producto.imagen) ||
          "",
        precio: item.precioUnitario,
        cantidad: item.cantidad || 1,
        raw: item
      }));

      setCarrito(carritoModificado);
      setEstado({ loading: false, error: null });
    } catch (err) {
      setEstado({ loading: false, error: err.message || "Error al cargar carrito" });
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  useEffect(() => {
    const subtotal = carrito.reduce(
      (acc, item) => acc + item.precio * (item.cantidad || 1),
      0
    );
    if (subtotal > 500000) {
      setCarritoError("El total del carrito no puede superar $500.000");
    } else {
      setCarritoError("");
    }
  }, [carrito]);

  const sincronizarItemConBackend = async (item) => {
    try {
      const body = {
        idCarrito: item.id,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      };

      const res = await fetch(`${API_BASE}/api/v1/carrito/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error al actualizar: ${res.status} - ${text}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "No se pudo actualizar la cantidad en el carrito");
    }
  };

  const actualizarCantidad = (id, delta) => {
    setCarrito((prev) => {
      const nuevo = prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, (item.cantidad || 1) + delta) }
          : item
      );

      const actualizado = nuevo.find((i) => i.id === id);
      if (actualizado) {
        sincronizarItemConBackend(actualizado);
      }

      return nuevo;
    });
  };

  const incrementarCantidad = (id) => actualizarCantidad(id, +1);
  const decrementarCantidad = (id) => actualizarCantidad(id, -1);

  const eliminarDelCarrito = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/carrito/${id}`, {  // ← aquí también
        method: "DELETE"
      });

      if (!res.ok && res.status !== 204) {
        const text = await res.text();
        throw new Error(`Error al eliminar: ${res.status} - ${text}`);
      }

      setCarrito((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "No se pudo eliminar el producto del carrito");
    }
  };

  if (estado.loading) {
    return (
      <main className="container my-5">
        <h2 className="text-center mb-5 text-uppercase">Carrito de Compras</h2>
        <div className="alert alert-info text-center" role="alert">
          Cargando carrito...
        </div>
      </main>
    );
  }

  if (estado.error) {
    return (
      <main className="container my-5">
        <h2 className="text-center mb-5 text-uppercase">Carrito de Compras</h2>
        <div className="alert alert-danger text-center" role="alert">
          Error: {estado.error}
        </div>
      </main>
    );
  }

  return (
    <Carrito
      carrito={carrito}
      carritoError={carritoError}
      eliminarDelCarrito={eliminarDelCarrito}
      incrementarCantidad={incrementarCantidad}
      decrementarCantidad={decrementarCantidad}
    />
  );
}

export default CarritoPage;
