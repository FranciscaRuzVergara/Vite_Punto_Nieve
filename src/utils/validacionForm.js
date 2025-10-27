export const validateCotizacionForm = (formData) => {
  let errors = {};

  // nombre
  if (!formData.nombre) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formData.nombre.trim())) {
    errors.nombre = "El nombre solo debe contener letras y espacios.";
  }

  // correo
  if (!formData.correo) {
    errors.correo = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo.trim())) {
    errors.correo = "Por favor, ingrese un correo electrónico válido.";
  }

  // mensaje
  if (!formData.mensaje) {
    errors.mensaje = "El mensaje es obligatorio.";
  } else if (formData.mensaje.trim().length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  }

  // fecha evento
  if (!formData.fecha) {
    errors.fecha = "Por favor, seleccione una fecha para el evento.";
  } else {
    const hoyMas7 = new Date();
    hoyMas7.setDate(hoyMas7.getDate() + 7);
    hoyMas7.setHours(0, 0, 0, 0);

    const fechaSeleccionada = new Date(formData.fecha);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoyMas7) {
      errors.fecha = "La fecha debe ser al menos dentro de una semana.";
    }
  }

  return errors;
};