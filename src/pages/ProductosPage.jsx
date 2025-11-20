import React, { useEffect, useState } from 'react'
import CardProducto from '../components/CardProducto';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ProductosPage({
  carrito,
  agregarAlCarrito,
  incrementarCantidad,
  decrementarCantidad,
}) {
  const carritoSeguro = Array.isArray(carrito) ? carrito : [];

  const [productos, setProductos] = useState([])
  const [estado, setEstado] = useState({ loading: false, error: null })

  useEffect(() => {
    const cargarProductos = async () => {
      setEstado({ loading: true, error: null })
      try {
        const res = await fetch(`${API_BASE}/api/v1/productos`)
        const text = await res.text()

        if (res.status === 204) {
          setProductos([])
          setEstado({ loading: false, error: null })
          return
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`)

        const data = text ? JSON.parse(text) : []
        const lista = Array.isArray(data) ? data : data.productos || []
  
        const formato= lista.map(p=>({
          id: p.idProducto,
          imagen: p.imagenUrl,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio
        }))
        setProductos(formato)
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
      setEstado({ loading: false, error: null })
    }

    cargarProductos()
  }, [])

  if (estado.loading) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Productos (API)</h1>
        <p>Cargando productos...</p>
      </main>
    )
  }

  if (estado.error) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Productos (API)</h1>
        <p style={{ color: 'crimson' }}>Error: {estado.error}</p>
      </main>
    )
  }

  if (!productos.length) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Productos (API)</h1>
        <p>No hay productos para mostrar.</p>
      </main>
    )
  }

  return (
    <main className='container mt-5'>
      <h1>Listado de Productos (API)</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productos.map(p => {
          const itemEnCarrito = carritoSeguro.find(
            (item) => String(item.id) === String(p.id)
          );
          const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

          return(
          <CardProducto 
            key={p.id} 
            producto={p} 
            onAgregar={agregarAlCarrito}
            onIncrementar={incrementarCantidad}
            onDecrementar={decrementarCantidad}
            cantidadEnCarrito={cantidadEnCarrito} 
            />
            );
      })}
      </div>
    </main>
  )
}
