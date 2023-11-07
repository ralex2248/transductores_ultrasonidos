

function updateDescripcion() {
    var select = document.getElementById('nombre_fluido');
    var descripcion = select.options[select.selectedIndex].getAttribute('data-descripcion');
    document.getElementById('descripcionInput').textContent = descripcion;
}
// Llamada a la función updateDescripcion para establecer la descripción al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateDescripcion(); // Esto establecerá la descripción cuando la página se cargue
});

// Obtener los valores de las entradas ajustables
const frecuenciaInput = document.getElementById("frecuenciaInput");
const voltajeInput = document.getElementById("voltajeInput");
const pasosInput = document.getElementById("pasosInput");
const resistenciaInput = document.getElementById("resistenciaInput");
const sensibilidadInput = document.getElementById("sensibilidadInput");
const nombre_fluido = document.getElementById("nombre_fluido");
const comentario = document.getElementById("comentario");
const nombre_experimento = document.getElementById("nombre_experimento");
// Crear gráfico 1
const ctx1 = document.getElementById("chart1").getContext("2d");
const chart1 = new Chart(ctx1, {
    type: "line",
    data: {
        labels: ["Frecuencia", "Voltaje"], //debe cambiarse a z y frecuencia
        datasets: [{
            label: "Valores",
            data: [0, 0],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 2,
        }],
    },
});

// Crear gráfico 2
const ctx2 = document.getElementById("chart2").getContext("2d");
const chart2 = new Chart(ctx2, {
    type: "line",
    data: {
        labels: ["Pasos", "Resistencia"], // debe cambiarse a ohm y frecuencia
        datasets: [{
            label: "Valores",
            data: [0, 0],
            fill: false,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointRadius: 5,
        }],
    },
});

// Actualizar gráficos cuando cambian los valores de las entradas
frecuenciaInput.addEventListener("input", () => {
    chart1.data.datasets[0].data[0] = parseFloat(frecuenciaInput.value);
    chart1.update();
});

voltajeInput.addEventListener("input", () => {
    chart1.data.datasets[0].data[1] = parseFloat(voltajeInput.value);
    chart1.update();
});

pasosInput.addEventListener("input", () => {
    chart2.data.datasets[0].data[0] = parseFloat(pasosInput.value);
    chart2.update();
});

resistenciaInput.addEventListener("input", () => {
    chart2.data.datasets[0].data[1] = parseFloat(resistenciaInput.value);
    chart2.update();
});

// Referencias a los botones
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const cancelButton = document.getElementById("cancelButton");
const clearButton = document.getElementById("clearButton");
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
    if (pausa == ''){
        var time_remaining = parseFloat((pasos*0.154) + 11.529)
    } else {
        var time_remaining = parseFloat((pasos*0.153) + 11.529 + (int(pausa) * pasos))
    }
    
    var time_remaining_rounded = Math.round(time_remaining);

    var mensajeConfirmacion = "¿Estás seguro de que quieres " + action + "?";

    if (action === 'Iniciar') {
        // Comprobar si hay campos vacíos
        if (!nombre_fluido || !sensibilidad || !pasos || !frecuencia || !voltaje || (checkboxPausa && !pausa)) {
            alert('Todos los campos requeridos deben estar llenos para iniciar el experimento.');
            return; // Detiene la función si hay campos vacíos
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
            mostrarOverlayCargando(); // Mostrar el overlay de carga si es necesario
            startCountdown(time_remaining_rounded);
            formulario.submit(); // Si el usuario confirma, envía el formulario
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



let simulationRunning = false;

// Función de limpiar datos
clearButton.addEventListener("click", () => {
// Restablece los gráficos a sus valores predeterminados
chart1.data.datasets[0].data = [0, 0];
chart2.data.datasets[0].data = [0, 0];
chart1.update();
chart2.update();
console.log("Datos limpiados");
});

const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", () => {
// Captura los datos de los gráficos
const chart1Data = chart1.data.datasets[0].data;
const chart2Data = chart2.data.datasets[0].data;



// Formatea los datos como texto
const textData = `

Nombre del fluido: ${nombre_fluido.value}
Nombre del Experimento: ${nombre_experimento.value}

Comentario: ${comentario.value}

Sensibilidad: ${sensibilidadInput.value}
Pasos: ${pasosInput.value}

Datos del Gráfico 1:
Frecuencia: ${chart1Data[0]}
Voltaje: ${chart1Data[1]}

Datos del Gráfico 2:
Pasos: ${chart2Data[0]}
Resistencia: ${chart2Data[1]}
`;

// Crea un enlace temporal para descargar el archivo
const blob = new Blob([textData], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'experimento_pausado.txt';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("experimentoForm");
    const chart1 = document.getElementById("chart1");
    const chart2 = document.getElementById("chart2");
    const clearButton = document.getElementById("clearButton");

    clearButton.addEventListener("click", function () {
        // Restablecer valores del formulario
        form.reset();
        
        // Eliminar gráfico
        if (chart1 && chart1.getContext) {
            const ctx1 = chart1.getContext("2d");
            ctx1.clearRect(0, 0, chart1.width, chart1.height);
        }

        if (chart2 && chart2.getContext) {
            const ctx2 = chart2.getContext("2d");
            ctx2.clearRect(0, 0, chart2.width, chart2.height);
        }
    });
}); 

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



// Iniciar el contador regresivo con una duración de 60 segundos

