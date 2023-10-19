
    // Obtener los elementos del DOM
    const nombreFluidoSelect = document.getElementById("nombre_fluido");
    const descripcionInput = document.getElementById("descripcionInput");

    // Escuchar el evento de cambio en el menú desplegable
    nombreFluidoSelect.addEventListener("change", () => {
        // Obtener la opción seleccionada
        const selectedOption = nombreFluidoSelect.options[nombreFluidoSelect.selectedIndex];
        
        // Obtener la descripción del atributo "data-descripcion"
        const descripcion = selectedOption.getAttribute("data-descripcion");
        
        // Actualizar el campo de descripción
        descripcionInput.value = descripcion;
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

function checkAction(action) {
    var confirmation = window.confirm("¿Estás seguro de que quieres " + action + "?");

    if (confirmation) {
        // Aquí pones el código que se ejecuta si el usuario presiona "Aceptar"
        console.log(action + " confirmado.");
    } else {
        // Aquí pones el código que se ejecuta si el usuario presiona "Cancelar"
        console.log(action + " cancelado.");
    }
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
    a.download = 'experimento_con_tiempo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});



