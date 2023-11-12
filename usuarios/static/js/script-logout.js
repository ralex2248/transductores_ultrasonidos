document.getElementById("logoutSpan").addEventListener("click", function() {
    window.location.href = logoutUrl;
});

let inactivityTimeout;
const inactivityDuration = 3600000; 

function resetInactivityTimer() {
    console.log('Inactivity timer reset.');
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        console.log('Session timeout. Redirecting to login.');
        window.location.href = '/login/';
    }, inactivityDuration);
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

resetInactivityTimer();













