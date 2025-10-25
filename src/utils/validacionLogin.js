export const validarCorreo = (correo) => {
  const dominiosPermitidos = /^(?:[a-zA-Z0-9._%+-]+@(duocuc\.cl|gmail\.com|profesorduoc\.cl))$/;
  if (!correo) {
    return "El correo electrónico es obligatorio.";
  }
  if (!dominiosPermitidos.test(correo)) {
    return "Ingrese un correo válido con los dominios: @duocuc.cl, @gmail.com o @profesorduoc.cl";
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