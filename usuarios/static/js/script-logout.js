document.getElementById("logoutSpan").addEventListener("click", function() {
    window.location.href = logoutUrl;
});

let inactivityTimeout;
const inactivityDuration = 5400000;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        window.location.href = '/logout/'; 
    }, inactivityDuration);
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);


resetInactivityTimer();












