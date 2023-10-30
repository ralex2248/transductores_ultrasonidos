document.getElementById("logoutSpan").addEventListener("click", function() {
    window.location.href = logoutUrl;
});

if (document.cookie.replace(/(?:(?:^|.*;\s*)dark-mode\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "enabled") {
    document.body.classList.add("dark-mode");
    // Update the toggle button
    var button = document.getElementById("dark-mode-toggle");
    button.innerHTML = ' Modo Claro';
    button.classList.add("dark-mode-button");
}

// Toggle dark mode
document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    var body = document.body;
    var button = document.getElementById("dark-mode-toggle");
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        document.cookie = "dark-mode=disabled; path=/";
        // Update the toggle button
        button.innerHTML = ' Modo Oscuro';
        button.classList.remove("dark-mode-button");
    } else {
        body.classList.add("dark-mode");
        document.cookie = "dark-mode=enabled; path=/";
        // Update the toggle button
        button.innerHTML = ' Modo Claro';
        button.classList.add("dark-mode-button");
    }
});

