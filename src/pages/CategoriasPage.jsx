import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [estado, setEstado] = useState({ loading: false, error: null })

  useEffect(() => {
    const cargarCategorias = async () => {
      setEstado({ loading: true, error: null })
      try {
        const res = await fetch(`${API_BASE}/api/v1/categorias`)
        const text = await res.text()

        if (res.status === 204) {
          setCategorias([])
          setEstado({ loading: false, error: null })
          return
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`)

        const data = text ? JSON.parse(text) : []
        const lista = Array.isArray(data) ? data : data.categorias || []

        setCategorias(lista)
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
      setEstado({ loading: false, error: null })
    }

    cargarCategorias()
  }, [])

  if (estado.loading) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Categorías (API)</h1>
        <p>Cargando categorías...</p>
      </main>
    )
  }

  if (estado.error) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Categorías (API)</h1>
        <p style={{ color: 'crimson' }}>Error: {estado.error}</p>
      </main>
    )
  }

  if (!categorias.length) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Categorías (API)</h1>
        <p>No hay categorías registradas.</p>
      </main>
    )
  }

  const columnas = [
    { key: 'id', label: 'ID' },
    { key: 'descripcion', label: 'Descripción' }
  ]

  return (
    <main style={{ padding: '1rem', marginTop: '80px' }}>
      <h1>Listado de Categorías (API)</h1>
      <div style={{ overflowX: 'auto', marginTop: 18 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {columnas.map(c => (
                <th
                  key={c.key}
                  style={{
                    textAlign: 'left',
                    padding: 8,
                    borderBottom: '2px solid #ddd'
                  }}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categorias.map(cat => (
              <tr
                key={cat.id}
                style={{ background: cat.id % 2 ? '#fbfbfb' : 'transparent' }}
              >
                {columnas.map(col => (
                  <td
                    key={col.key}
                    style={{ padding: 8, borderBottom: '1px solid #eee' }}
                  >
                    {cat[col.key]}
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
