
function checkRut(rut) {
  var valor = rut.value.replace(/\./g, '').replace('-', '');

  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();

  rut.value = cuerpo.replace(/^(\d{1,3})(\d{3})(\d{3})$/, '$1.$2.$3') + '-' + dv;
  
  if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
  
  suma = 0;
  multiplo = 2;
  
  for(i=1;i<=cuerpo.length;i++) {
      index = multiplo * valor.charAt(cuerpo.length - i);
      
      suma = suma + index;
      
      if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  }
  
  dvEsperado = 11 - (suma % 11);
  dv = (dv == 'K')?10:dv;
  dv = (dv == 0)?11:dv;
  if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
  rut.setCustomValidity('');
}

function checkEmail(emailInput) {
  var email = emailInput.value.trim(); // Elimina espacios en blanco al principio y al final

  // Expresión regular para validar correo electrónico
  var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailPattern.test(email)) {
      emailInput.setCustomValidity("Correo electrónico no válido. Ingresa un correo válido.");
      return false;
  } else {
      emailInput.setCustomValidity(""); // Correo válido
      return true;
  }
}

