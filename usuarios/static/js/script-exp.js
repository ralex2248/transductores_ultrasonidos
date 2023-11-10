

function updateDescripcion() {
    var select = document.getElementById('nombre_fluido');
    var descripcion = select.options[select.selectedIndex].getAttribute('data-descripcion');
    document.getElementById('descripcionInput').textContent = descripcion;
}
// Llamada a la función updateDescripcion para establecer la descripción al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateDescripcion(); // Esto establecerá la descripción cuando la página se cargue
});

// Referencias a los botones
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const cancelButton = document.getElementById("cancelButton");
const guardarButton = document.getElementById("saveButton");



function checkAction(event, action) {
    event.preventDefault(); // Detiene el envío automático del formulario.

    var nombre_fluido = document.getElementById("nombre_fluido").value;
    var sensibilidad = document.getElementById("sensibilidadInput").value;
    var pasos = document.getElementById("pasosInput").value;
    var frecuencia = document.getElementById("frecuenciaInput").value;
    var voltaje = document.getElementById("voltajeInput").value;
    var checkboxPausa = document.getElementById("checkboxPausa").checked; // Estado del checkbox
    var pausa = document.getElementById("pause").value;
    var formulario = document.getElementById("experimentoForm");
    var frecuencia_final = Math.round(((parseFloat(frecuencia) + parseFloat(sensibilidad*parseFloat(pasos))) - parseFloat(sensibilidad))*10)/10;
    var pasos_int = parseInt(pasos);
    var frecuencia_int = parseInt(frecuencia);
    var voltaje_int = parseFloat(voltaje);
    var sensibilidad_int = parseFloat(sensibilidad);
    if (pausa == ''){
        var time_remaining = parseFloat((pasos*0.154) + 11.529)
    } else {
        var time_remaining = parseFloat((pasos*0.153) + 11.529 + (parseInt(pausa) * pasos))
    }
    
    var time_remaining_rounded = Math.round(time_remaining);

    var mensajeConfirmacion = "¿Estás seguro de que quieres " + action + "?";

    if (action === 'Iniciar') {
        // Comprobar si hay campos vacíos
        if (!nombre_fluido || !sensibilidad || !pasos || !frecuencia || !voltaje || (checkboxPausa && !pausa)) {
            alert('Todos los campos requeridos deben estar llenos para iniciar el experimento.');
            return; // Detiene la función si hay campos vacíos
        } else if (pasos_int <= 0 || frecuencia_int <= 0 || voltaje_int <= 0 || sensibilidad_int <= 0) {
            alert('Los valores no pueden ser negativos o 0.');
            return;
        }


        // Construye el mensaje de confirmación con los detalles del experimento
        mensajeConfirmacion += "\n\nNombre del fluido: " + nombre_fluido +
        (checkboxPausa ? "\nTiempo de pausa: " + pausa : "") +
        "\nPasos: " + pasos +
        "\nFrecuencia inicial: " + frecuencia + " Hz" +
        "\nFrecuencia final: " + String(frecuencia_final) + " Hz" +
        "\nVoltaje: " + voltaje + " V" +
        "\nSensibilidad: " + sensibilidad;

        // Muestra la ventana de confirmación
        if (window.confirm(mensajeConfirmacion)) {
            formulario.submit(); // Si el usuario confirma, envía el formulario
            mostrarOverlayCargando(); // Mostrar el overlay de carga si es necesario
            startCountdown(time_remaining_rounded);
            
        } else {
            // Si el usuario cancela, simplemente registra la acción
            console.log(action + " cancelado.");
        }
    } else {
        // Para otras acciones que no sean 'Iniciar', solo muestra el mensaje de confirmación básico
        if (window.confirm("¿Estás seguro de que quieres " + action + "?")) {
            // Aquí podrías manejar otras acciones como 'Detener' o 'Cancelar'
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('nombre_experimento').addEventListener('input', function() {
        var nombre = this.value;
        var errorDiv = document.getElementById('nombre_experimento_error');
        if (nombre.length >= 50) {
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }
    });

    document.getElementById('experimentoForm').addEventListener('submit', function(e) {
        var nombre = document.getElementById('nombre_experimento').value;
        if (nombre.length > 50) {
            e.preventDefault(); 
            document.getElementById('nombre_experimento_error').style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('pasosInput').addEventListener('input', function() {
        var pasos = parseInt(this.value);
        var errorDiv = document.getElementById('pasos_error');
        if (pasos < 0) {
            errorDiv.style.display = 'block';
        } else {
            errorDiv.style.display = 'none';
        }
    });

    document.getElementById('experimentoForm').addEventListener('submit', function(e) {
        var pasos = parseInt(document.getElementById('pasosInput').value);
        if (pasos < 0) {
            e.preventDefault();
            document.getElementById('pasos_error').style.display = 'block';
        }
    });
});

function mostrarOverlayCargando() {
    document.getElementById("loadingOverlay").style.display = "flex"; // Mostrar el overlay de carga
}

function toggleInput(checkbox) {
    var inputContainer = document.getElementById("inputContainer");
    var textInput = document.getElementById("pause");

    if (checkbox.checked) {
        inputContainer.style.display = "block";
        textInput.disabled = false;
    } else {
        inputContainer.style.display = "none";
        textInput.disabled = true;
        textInput.value = "";  // Establece el valor como cadena vacía al desmarcar
    }

    textInput.disabled = !checkbox.checked; // Asegura que el campo esté habilitado/deshabilitado según el estado del checkbox
}


function startCountdown(duration) {
    var timer = duration, minutes, seconds;
    var countdownElement = document.getElementById('countdown'); // Asegúrate de tener un elemento con el id 'countdown' en tu HTML

    var countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Actualizar la interfaz de usuario aquí con los minutos y segundos
        countdownElement.textContent = minutes + ":" + seconds; // Asegúrate de que este ID exista en tu HTML

        if (--timer < 0) {
            clearInterval(countdownInterval); // Detiene el intervalo
            countdownElement.textContent = "00:00"; // Actualiza el contador a 00:00
            // Otras acciones cuando el contador llega a cero, como ocultar el overlay de carga
        }
    }, 1000);
}

// Iniciar el contador regresivo con una duración de 60 segundoS

//Funcion para limpiar los datos de la pestaña experimentos
function limpiarDatos(){
    document.getElementById("voltajeInput").value = "";
    document.getElementById("frecuenciaInput").value = "";
    document.getElementById("pasosInput").value = "";
    document.getElementById("sensibilidadInput").value = "";
    document.getElementById("nombre_experimento").value = "";
    document.getElementById("pause").value = "";
    document.getElementById("comentario").value = "";
    
}
