const validarRut = (rut) => {
  rut = rut.replace(/[.-]/g, ''); // Eliminar puntos y guiones
  const rutNumerico = parseInt(rut.slice(0, -1), 10);
  const digitoVerificador = rut.slice(-1).toUpperCase();
  
  if (isNaN(rutNumerico)) {
    return false;
  }
  
  const dvCalculado = calcularDigitoVerificador(rutNumerico);
  return dvCalculado === digitoVerificador;
}

function calcularDigitoVerificador(rutNumerico) {
  const serie = [2, 3, 4, 5, 6, 7, 2, 3];
  let suma = 0;
  let indiceSerie = 0;
  
  while (rutNumerico > 0) {
    const digito = rutNumerico % 10;
    suma += digito * serie[indiceSerie];
    rutNumerico = Math.floor(rutNumerico / 10);
    indiceSerie = (indiceSerie + 1) % 8;
  }
  
  const resultado = 11 - (suma % 11);
  return resultado === 10 ? 'K' : resultado === 11 ? '0' : resultado.toString();
  }

  module.exports = {
    validarRut
  }