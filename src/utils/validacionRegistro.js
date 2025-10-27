import { validateRut } from "./validaRut";

export const validateRegisterForm = (formData) => {
  let errors = {};
  
  if(!formData.run){
    errors.run = "El RUN es obligatorio"
  } else if (!validateRut(formData.run)) {
    errors.run = "El RUT ingresado no es válido.";
  }

  //Nombre
  if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formData.nombre)) {
    errors.nombre = "El nombre solo debe contener letras y espacios.";
  }

  //Apellido
  if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(formData.apellido)) {
    errors.apellido = "El apellido solo debe contener letras y espacios.";
  }

  //FecNac
  if (!formData.fechaNac) {
    errors.fechaNac = "Debe ingresar su fecha de nacimiento.";
  } else {
    const hoy = new Date();
    const fechaNacV = new Date(formData.fechaNac);
    if (fechaNacV > hoy) {
      errors.fechaNac = "La fecha no puede ser posterior a la actual.";
    }
  }

  //Correo
  const dominiosPermitidos = /^(?:[a-zA-Z0-9._%+-]+@(duocuc\.cl|gmail\.com|profesorduoc\.cl))$/;
  if (!dominiosPermitidos.test(formData.correo)) {
    errors.correo = "Ingrese un correo válido con los dominios: @duocuc.cl, @gmail.com o @profesorduoc.cl";
  }

  //Contraseña
  if (formData.contrasena.length < 8) {
    errors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
  }

  //RepContraseña
  if (formData.contrasena !== formData.repContrasena) {
    errors.repContrasena = "Las contraseñas no coinciden.";
  }

  //Terminos
  if (!formData.aceptoTerminos) {
    errors.aceptoTerminos = "Debe aceptar los términos del servicio.";
  }

  return errors;
};