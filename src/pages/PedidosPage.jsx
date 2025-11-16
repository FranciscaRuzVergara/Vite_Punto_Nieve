import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [estado, setEstado] = useState({ loading: false, error: null })

  useEffect(() => {
    const cargarPedidos = async () => {
      setEstado({ loading: true, error: null })
      try {
        const res = await fetch(`${API_BASE}/api/v1/pedido`)
        const text = await res.text()

        if (res.status === 204) {
          setPedidos([])
          setEstado({ loading: false, error: null })
          return
        }

        if (!res.ok) throw new Error(`Error ${res.status}: ${text}`)

        const data = text ? JSON.parse(text) : []
        const lista = Array.isArray(data) ? data : data.pedidos || []

        const pedidosModificados = lista.map(p => ({
          id: p.idPedido ?? p.id,
          fecha: p.fechaPedido ?? p.fecha ?? null,
          estado: p.estado ?? p.estadoPedido ?? '',
          total: p.total ?? p.montoTotal ?? null,
          raw: p
        }))

        setPedidos(pedidosModificados)
        setEstado({ loading: false, error: null })
      } catch (err) {
        setEstado({ loading: false, error: err.message })
        return
      }
    }

    cargarPedidos()
  }, [])

  const formatFecha = (valor) => {
    if (!valor) return ''
    const d = new Date(valor)
    return isNaN(d) ? valor : d.toLocaleDateString('es-CL')
  }

  const formatTotal = (valor) => {
    if (valor == null) return ''
    return `$${Number(valor).toLocaleString('es-CL')}`
  }

  if (estado.loading) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Pedidos (API)</h1>
        <p>Cargando pedidos...</p>
      </main>
    )
  }

  if (estado.error) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Pedidos (API)</h1>
        <p style={{ color: 'crimson' }}>Error: {estado.error}</p>
      </main>
    )
  }

  if (!pedidos.length) {
    return (
      <main style={{ padding: '1rem', marginTop: '80px' }}>
        <h1>Listado de Pedidos (API)</h1>
        <p>No hay pedidos registrados.</p>
      </main>
    )
  }

  const columnas = [
    { key: 'id', label: 'ID Pedido' },
    { key: 'fecha', label: 'Fecha', render: formatFecha },
    { key: 'estado', label: 'Estado' },
    { key: 'total', label: 'Total', render: formatTotal }
  ]

  return (
    <main style={{ padding: '1rem', marginTop: '80px' }}>
      <h1>Listado de Pedidos (API)</h1>
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
            {pedidos.map(p => (
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
