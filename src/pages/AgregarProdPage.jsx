import React, { useEffect, useState } from 'react';
import { validateProductoForm } from '../utils/validacionAgregarProd';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const FormularioEnvio = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    imagenUrl: '',
    idCategoria: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async () =>{
    try{
        const response = await fetch(`${API_BASE}/api/v1/categorias`)
        if(response.ok){
            const data = await response.json();
            const categoria = data.map(cat=>({
                idCategoria: cat.idCategoria,
                nombre: cat.descripcion
            }))
            setCategorias(categoria);
            if(categoria.length>0){
                setFormData(prevData => ({
                    ...prevData,
                    idCategoria: categoria[0].idCategoria
                }));
            }
        }else{
            console.error('Error al obtener categorias',response.statusText)
            setMensaje('Error al cargar categorias')
        }
    }catch(error){
        console.error('Error de conexion al obtener categorias:',error);
        setMensaje('No se pudo conectar con el servidor')
    }
  };

  useEffect(()=>{
    obtenerCategorias();
  },[]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = (type === 'number' || name === 'idCategoria') 
      ? parseFloat(value) 
      : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    // llamada a la validación
    const validationErrors = validateProductoForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setMensaje('Por favor corrige los errores del formulario.');
      console.log('Errores de validación:', validationErrors);
      return;
    }

    setMensaje('Enviando datos...');

    const productData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      imagenUrl: formData.imagenUrl.trim() === '' ? null : formData.imagenUrl,
      detallePedidos: [], 
      categoria: {
        idCategoria: parseInt(formData.idCategoria, 10),
      }
    };

    try {
      const response = await fetch((`${API_BASE}/api/v1/productos`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Éxito:', result);
        setMensaje('Producto registrado con éxito.');
        setFormData({
          nombre: '',
          descripcion: '',
          precio: 0,
          imagenUrl: '',
          idCategoria: categorias.length>0 ? categorias[0].idCategoria: '', 
        });
      } else {
        setMensaje('Error al enviar los datos. Revisa el servidor.');
        console.error('Error al enviar el formulario:', response.statusText);
      }
    } catch (error) {
      setMensaje('No se pudo conectar con el servidor.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center form-container">
      <div className="card bg-dark text-white p-4 my-4 registro-card">
      <h2>Agregar Producto</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className='form-label'>Nombre:</label>
          <input 
            type="text" 
            className='form-control'
            id="nombre" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="descripcion" className='form-label'>Descripción:</label>
          <textarea 
            className='form-control'
            id="descripcion" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="precio" className='form-label'>Precio ($):</label>
          <input 
            type="number" 
            className='form-control'
            id="precio" 
            name="precio" 
            value={formData.precio} 
            onChange={handleChange} 
            required 
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="imagenUrl" className='form-label'>URL de la Imagen:</label>
          <input 
            type="text" 
            className='form-control'
            id="imagenUrl" 
            name="imagenUrl" 
            value={formData.imagenUrl} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="idCategoria" className='form-label'>ID Categoría:</label>
          <select 
            className='form-select'
            id="idCategoria" 
            name="idCategoria" 
            value={formData.idCategoria} 
            onChange={handleChange} 
            required>
            {categorias.length === 0 && <option value="">Cargando categorías...</option>}
            {categorias.length > 0 && categorias.map(categoria => (
              <option 
                key={categoria.idCategoria} 
                value={categoria.idCategoria}
              >
                {categoria.nombre}
              </option>
            ))}
            </select>
        </div>
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success btn-md">Enviar</button>
        </div>
      </form>

      {mensaje && (
        <p style={{ marginTop: 12, fontWeight: 'bold', color: mensaje.includes('✅') ? 'green' : 'crimson' }}>
          {mensaje}
        </p>
      )}
      </div>
    </div>
  );
};

export default FormularioEnvio;
