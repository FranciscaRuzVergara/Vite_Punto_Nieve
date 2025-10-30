export const validateCotizacionForm = (formData) => {
  const errors = {};

  // nombre
  const nombre = formData.nombre?.trim() || "";
  if (!nombre) errors.nombre = "El nombre es obligatorio.";
  else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre))
    errors.nombre = "El nombre solo debe contener letras y espacios.";

  // correo
  const correo = formData.correo?.trim() || "";
  if (!correo) errors.correo = "El correo es obligatorio.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))
    errors.correo = "Por favor, ingrese un correo electrónico válido.";

  // mensaje
  const mensaje = formData.mensaje?.trim() || "";
  if (!mensaje) errors.mensaje = "El mensaje es obligatorio.";
  else if (mensaje.length < 10)
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";

  // fecha: debe ser >= hoy+7
  const fecha = formData.fecha || "";
  if (!fecha) {
    errors.fecha = "Por favor, seleccione una fecha para el evento.";
  } else {
    const [yy, mm, dd] = fecha.split("-").map(Number);
    const sel = new Date(yy, mm - 1, dd); sel.setHours(0,0,0,0);

    const min = new Date(); min.setHours(0,0,0,0); min.setDate(min.getDate() + 7);

    if (sel < min) {
      errors.fecha = "La fecha debe ser al menos dentro de una semana.";
    }
  }

  return errors;
};
