const rutInput = document.getElementById("rut-input");

rutInput.addEventListener("blur", function() {
    let value = rutInput.value.replace(/[^0-9Kk]/g, '');

    // Verificar si el RUT tiene más de 9 caracteres
    if (value.length > 9) {
        alert('El RUT no debe tener más de 9 caracteres.');
        rutInput.value = '';
        return;
    }

    let body = value.slice(0, -1);
    let verifier = value.slice(-1).toUpperCase(); // El último carácter y convertirlo a mayúscula
    body = body.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Insertar puntos
    rutInput.value = `${body}-${verifier}`; 
});
