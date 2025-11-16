import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ProductosPage() {
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
        setProductos(lista)
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
      setEstado({ loading: false, error: null })
    }

    cargarProductos()
  }, [])

  const formatPrecio = (valor) => {
    if (valor == null) return ''
    return `$${Number(valor).toLocaleString('es-CL')}`
  }

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

  const columnas = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'precio', label: 'Precio', render: formatPrecio },
    {
      key: 'imagenUrl',
      label: 'Imagen',
      render: (url, prod) =>
        url ? (
          <img
            src={url}
            alt={prod.nombre}
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          '—'
        )
    }
  ]

  return (
    <main style={{ padding: '1rem', marginTop: '80px' }}>
      <h1>Listado de Productos (API)</h1>
      <div style={{ overflowX: 'auto', marginTop: 18 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {columnas.map(c => (
                <th
                  key={c.key}
                  style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #ddd' }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr
                key={p.id}
                style={{ background: p.id % 2 ? '#fbfbfb' : 'transparent' }}
              >
                {columnas.map(c => (
                  <td
                    key={c.key}
                    style={{ padding: 8, borderBottom: '1px solid #eee' }}
                  >
                    {c.render ? c.render(p[c.key], p) : p[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
