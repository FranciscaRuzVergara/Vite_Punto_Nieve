export const cleanRut = (rut) => {
  if (typeof rut !== 'string') return '';
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
};

export const validateRut = (rutCompleto) => {
  const rutLimpio = cleanRut(rutCompleto);
  if (rutLimpio.length < 8) {
        return false; 
    }

    if (!/^\d{7,8}[0-9K]$/.test(rutLimpio)) {
        return false;
    }

  let cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + parseInt(cuerpo.charAt(i)) * multiplo;
    if (multiplo < 7) {
      multiplo++;
    } else {
      multiplo = 2;
    }
  }
  let dvEsperado = 11 - (suma % 11);

  if (dvEsperado === 11) {
    dvEsperado = '0';
  } else if (dvEsperado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = String(dvEsperado);
  }

  return dvEsperado === dv;
};