import { useState } from "react"; 
import { validateCotizacionForm } from "../utils/validacionForm";

export default function FormCotizacion() {
  const [formData, setFormData] = useState({ nombre: "", correo: "", mensaje: "", fecha: "" });
  const [errors, setErrors] = useState({}); 
  const [ok, setOk] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const next = validateCotizacionForm({ ...formData, [name]: value }); 
    setErrors(next); 
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validateCotizacionForm(formData);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setOk(true);
    } else {
      setOk(false);
    }
  }; 

  const hasErrors = Object.keys(errors).length > 0; // hay errores?
  const requiredEmpty = !formData.nombre || !formData.correo || !formData.mensaje || !formData.fecha; // campos vacíos?

  return (
    <div className="card bg-dark text-white border-0"> {/* negro + texto blanco */}
      <div className="card-body">
        <h2 className="text-center mb-4">Formulario de Cotización</h2>

        {ok && <div className="alert alert-success">¡Formulario enviado con éxito!</div>}

        <form id="formCotizacion" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              id="nombre" name="nombre" type="text"
              value={formData.nombre} onChange={handleChange}
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              id="correo" name="correo" type="email"
              value={formData.correo} onChange={handleChange}
              className={`form-control ${errors.correo ? "is-invalid" : ""}`}
            />
            {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              id="mensaje" name="mensaje" rows={3}
              value={formData.mensaje} onChange={handleChange}
              className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
            />
            {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="fecha" className="form-label">Fecha del evento</label>
            <input
              id="fecha" name="fecha" type="date"
              value={formData.fecha} onChange={handleChange}
              className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
              placeholder="dd-mm-aaaa"
            />
            {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success"
              disabled={hasErrors || requiredEmpty}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
