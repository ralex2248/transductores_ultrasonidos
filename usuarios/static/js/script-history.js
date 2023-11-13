

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
  


document.addEventListener('DOMContentLoaded', function() {
    const favCheckbox = document.getElementById('favs_checkbox');
    const ordenSelect = document.querySelector('select[name="orden"]');
    const form = document.getElementById('ordenForm');

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const favoritosParam = urlParams.get('favoritos');
    const ordenParam = urlParams.get('orden') || 'fecha_desc'; // Valor por defecto

    // Establecer el estado del checkbox de favoritos y la selección del orden
    favCheckbox.checked = favoritosParam === 'true';
    ordenSelect.value = ordenParam;

    // Manejar el cambio en el checkbox de favoritos
    favCheckbox.addEventListener('change', function() {
        updateURLWithParams();
    });

    // Manejar el cambio en el select de orden
    ordenSelect.addEventListener('change', function() {
        updateURLWithParams();
    });

    function updateURLWithParams() {
        const currentUrl = new URL(window.location.href);
        const favCheckboxState = favCheckbox.checked ? 'true' : 'false';
        const selectedOrder = ordenSelect.value;

        currentUrl.searchParams.set('favoritos', favCheckboxState);
        currentUrl.searchParams.set('orden', selectedOrder);

        window.location.href = currentUrl.href;
    }
    

    document.getElementById('delete_fluidos_button').addEventListener('click', function (event) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Por favor, seleccione al menos un experimento para eliminar.');
        event.preventDefault();
        return;
    }

    var confirmed = confirm('¿Está seguro de que desea eliminar los experimentos seleccionados?');
    if (!confirmed) {
    }
});
document.getElementById('compareButton').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length <= 1 ) {
        alert('Por favor, seleccione al menos dos experimento para comparar.');
        event.preventDefault();
        return;
    } else {
      document.getElementById('delete_fluidos_form').action = "{% url 'comparar_experimentos' %}";
      document.getElementById('delete_fluidos_form').submit();
    }
  });
 });

  