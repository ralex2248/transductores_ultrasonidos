document.addEventListener("DOMContentLoaded", function() {
    const greetingMessage = document.getElementById("greeting-message");
    const hours = new Date().getHours();
    
    if (hours >= 6 && hours < 12) {
        greetingMessage.textContent = "Buenos días, " + greetingMessage.textContent;
    } else if (hours >= 12 && hours < 18) {
        greetingMessage.textContent = "Buenas tardes, " + greetingMessage.textContent;
    } else {
        greetingMessage.textContent = "Buenas noches, " + greetingMessage.textContent;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#datepicker", {
        locale: 'es',  // Configuración para español
        enableTime: false,
        dateFormat: "j \\d\\e F \\d\\e\\l Y",
        onChange: function(selectedDates, dateStr, instance) {
            document.getElementById("current-date").textContent = dateStr;
        }
    });

    document.getElementById("calendar-icon").addEventListener("click", function() {
        document.getElementById("datepicker").click();
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var ctx = document.getElementById('userActivityChart').getContext('2d');
    var dataUrl = '/api/user_activity/'; 


    fetch(dataUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
 
        var hoursPerDay = data.seconds_per_day.map(seconds => seconds / 3600);

        var maxYValue = Math.max(...hoursPerDay.map(Math.ceil));

 
        var userActivityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datasets: [{
                    label: 'Horas trabajadas por día',
                    data: hoursPerDay, 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(199, 199, 199, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(159, 159, 159, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: maxYValue,
                        stepSize: 1,
                        title: {
                            display: true,
                            text: 'Horas'
                        },
                        ticks: {
                            callback: function(value) {
                                if (value % 1 === 0) {
                                    return value;
                                }
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false 
                    },
                    title: {
                        display: true, 
                        text: 'Horas trabajadas por día', 
                        padding: {
                            top: 10,
                            bottom: 30
                        },
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let totalHours = Math.floor(tooltipItem.parsed.y);
                                let totalMinutes = Math.floor((tooltipItem.parsed.y - totalHours) * 60);
                                return totalHours + ' hora(s) ' + totalMinutes + ' minuto(s)';
                            }
                        }
                    }
                }
            }
            
        });
    })
    .catch(function(error) {
        console.error('Error al obtener datos del usuario:', error);
    });
});


