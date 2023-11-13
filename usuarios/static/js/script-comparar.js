document.addEventListener('DOMContentLoaded', function() {
    let chartDataElements = document.getElementsByClassName('chartData');
    let datasets = [];
    let allFrequencies = new Set();
    let shift_phase_dataset = [];

    // Crear datasets basados en los datos de cada experimento
    Array.from(chartDataElements).forEach(function(chartDataDiv) {
        let finalValues = JSON.parse(chartDataDiv.getAttribute('data-final-values'));
        let frecuencies = JSON.parse(chartDataDiv.getAttribute('data-frecuencies'));
        let shift_phase = JSON.parse(chartDataDiv.getAttribute('data-shift-phase'));
        let nombre = chartDataDiv.getAttribute('data-nombre');

        frecuencies.forEach(frequency => allFrequencies.add(frequency));

        datasets.push({
            label: nombre,
            data: finalValues,
            fill: false,
            borderWidth: 1.8, 
            pointRadius: 0.5,
            tension: 0.4
            // Estilos personalizados para cada conjunto de datos, si es necesario
        });
        shift_phase_dataset.push({
            label: nombre,
            data: shift_phase,
            fill: false,
            borderWidth: 1.8, 
            pointRadius: 0.5, 
            tension: 0.4
        });
    });

    allFrequencies = Array.from(allFrequencies).sort((a, b) => a - b);

    // Inicializar el gráfico
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allFrequencies,
            datasets: datasets,
        },
        options: {
            plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    drag: {
                        enabled: false
                    },
                    pinch: {
                        enabled: false
                    },
                    mode: 'x'
                }
            }
        }
        }
    });
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: allFrequencies,
            datasets: shift_phase_dataset,
            fill: false,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1.8, 
            pointRadius: 0.5, 
            pointBackgroundColor: 'rgba(255, 0, 0, 1)',
            tension: 0.4
        },
        options: {
            plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    drag: {
                        enabled: false
                    },
                    pinch: {
                        enabled: false
                    },
                    mode: 'x'
                }
            }
        }
        }
    });
});