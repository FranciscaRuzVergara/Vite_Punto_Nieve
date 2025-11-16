import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [estado, setEstado] = useState({ loading: false, error: null })

  useEffect(() => {
    const cargarClientes = async () => {
      setEstado({ loading: true, error: null })
      try {
        const res = await fetch(`${API_BASE}/api/v1/clientes`)
        const text = await res.text()

        if (res.status === 204) {
          setClientes([])
          setEstado({ loading: false, error: null })
          return
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`)

        const data = text ? JSON.parse(text) : []
        const lista = Array.isArray(data) ? data : data.clientes || []

        setClientes(lista)
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
      setEstado({ loading: false, error: null })
    }

    cargarClientes()
  }, [])

  const formatFecha = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    return isNaN(d) ? iso : d.toLocaleDateString('es-CL')
  }

  if (estado.loading) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Clientes (API)</h1>
        <p>Cargando clientes...</p>
      </main>
    )
  }

  if (estado.error) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Clientes (API)</h1>
        <p style={{ color: 'crimson' }}>Error: {estado.error}</p>
      </main>
    )
  }

  if (!clientes.length) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Clientes (API)</h1>
        <p>No hay clientes registrados.</p>
      </main>
    )
  }

  const columnas = [
    { key: 'run', label: 'RUN' },
    { key: 'dv', label: 'DV' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'ape1', label: 'Apellido Paterno' },
    { key: 'ape2', label: 'Apellido Materno' },
    { key: 'fecnac', label: 'Fecha Nacimiento', render: formatFecha },
    { key: 'correo', label: 'Correo' }
  ]

  return (
    <main style={{ padding: '1rem', marginTop: '80px' }}>
      <h1>Listado de Clientes (API)</h1>
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
            {clientes.map(c => (
              <tr
                key={c.run}
                style={{ background: c.run ? '#fbfbfb' : 'transparent' }}
              >
                {columnas.map(col => (
                  <td
                    key={col.key}
                    style={{ padding: 8, borderBottom: '1px solid #eee' }}
                  >
                    {col.render ? col.render(c[col.key], c) : c[col.key]}
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
