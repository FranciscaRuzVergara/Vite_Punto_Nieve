export const validarCorreo = (correo) => {
  const dominiosPermitidos = /^[\w.-]+@([\w-]+\.)+[\w]{2,4}$/i;
  if (!correo) {
    return "El correo electrónico es obligatorio.";
  }
  if (!dominiosPermitidos.test(correo)) {
    return "Ingrese un correo válido";
  }
  return "";
};

export const validarContrasena = (contrasena) => {
  if (!contrasena) {
    return "La contraseña es obligatoria.";
  }
  if (contrasena.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  return "";
};