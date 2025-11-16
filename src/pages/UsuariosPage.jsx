import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL;


export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [estado, setEstado] = useState({ loading: false, error: null })

  useEffect(() => {
    const cargarUsuarios = async () => {
      setEstado({ loading: true, error: null })
      try {
        const res = await fetch(`${API_BASE}/api/v1/usuarios`)
        const text = await res.text()

        if (res.status === 204) {
          setUsuarios([])
          setEstado({ loading: false, error: null })
          return
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`)

        const data = text ? JSON.parse(text) : []
        const lista = Array.isArray(data) ? data : data.usuarios || []

        const usuariosModificados = lista.map(u => ({
          id: u.idUsuario ?? u.id,
          nombreUsuario: u.nombreUsuario ?? '',
          raw: u
        }))

        setUsuarios(usuariosModificados)
        setEstado({ loading: false, error: null })
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
    }

    cargarUsuarios()
  }, [])

  if (estado.loading) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Usuarios (API)</h1>
        <p>Cargando usuarios...</p>
      </main>
    )
  }

  if (estado.error) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Usuarios (API)</h1>
        <p style={{ color: 'crimson' }}>Error: {estado.error}</p>
      </main>
    )
  }

  if (!usuarios.length) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Usuarios (API)</h1>
        <p>No hay usuarios registrados.</p>
      </main>
    )
  }

  const columnas = [
    { key: 'id', label: 'ID Usuario' },
    { key: 'nombreUsuario', label: 'Nombre de usuario' }
  ]

  return (
    <main style={{ padding: '1rem', marginTop: '80px' }}>
      <h1>Listado de Usuarios (API)</h1>
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
            {usuarios.map(u => (
              <tr
                key={u.id}
                style={{ background: u.id % 2 ? '#fbfbfb' : 'transparent' }}
              >
                {columnas.map(col => (
                  <td
                    key={col.key}
                    style={{ padding: 8, borderBottom: '1px solid #eee' }}
                  >
                    {u[col.key]}
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
