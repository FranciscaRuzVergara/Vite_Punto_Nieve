export const validateProductoForm = (formData) => {
  const errors = {};

  const nombre = formData.nombre?.trim() || "";
  if (!nombre) {
    errors.nombre = "El nombre es obligatorio.";
  } else if (nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  const descripcion = formData.descripcion?.trim() || "";
  if (!descripcion) {
    errors.descripcion = "La descripción es obligatoria.";
  } else if (descripcion.length < 10) {
    errors.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  const precio = Number(formData.precio);
  if (Number.isNaN(precio)) {
    errors.precio = "El precio es obligatorio.";
  } else if (precio <= 0) {
    errors.precio = "El precio debe ser mayor a 0.";
  }

  const imagenUrl = formData.imagenUrl?.trim() || "";
  if (imagenUrl) {
    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(imagenUrl)) {
      errors.imagenUrl = "Ingresa una URL válida.";
    }
  }

  const idCategoria = formData.idCategoria;
  if (
    idCategoria === "" ||
    idCategoria === null ||
    typeof idCategoria === "undefined" ||
    Number.isNaN(Number(idCategoria))
  ) {
    errors.idCategoria = "Debes seleccionar una categoría válida.";
  }

  return errors;
};
