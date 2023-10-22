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

