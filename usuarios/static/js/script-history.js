
document.getElementById('delete_fluidos_button').addEventListener('click', function (event) {
    // Check if at least one checkbox is selected
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Por favor, seleccione al menos un experimento para eliminar.');
        event.preventDefault();
        return; // Stop the function if no checkboxes are selected
    }

    // Ask for confirmation if at least one checkbox is selected
    var confirmed = confirm('¿Está seguro de que desea eliminar los experimentos seleccionados?');
    if (!confirmed) {
        // Remove the event.preventDefault() here, so the form will be submitted if the user cancels the confirmation
    }
});




  document.addEventListener('DOMContentLoaded', function() {
    const favCheckbox = document.getElementById('favs_checkbox');

    // Verificar el valor actual de 'favoritos' en la consulta y establecer el estado del checkbox.
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('favoritos') === 'true') {
        favCheckbox.checked = true;
    } else {
        favCheckbox.checked = false;
    }

    favCheckbox.addEventListener('change', function() {
        if (this.checked) {
            window.location.href = window.location.pathname + '?favoritos=true';
        } else {
            window.location.href = window.location.pathname;
        }
    });
});

document.getElementById('clearSearchButton').addEventListener('click', function () {
    document.getElementById('search').value = ''; // Borra el contenido del campo de búsqueda
    document.getElementById('delete_fluidos_form').submit(); // Envía el formulario para "Ver Todo"
});
document.getElementById('search').addEventListener('input', function () {
    // Muestra el botón "X" si el campo de búsqueda tiene contenido
    const clearSearchButton = document.getElementById('clearSearchButton');
    clearSearchButton.style.display = this.value.length ? 'block' : 'none';
});
  


