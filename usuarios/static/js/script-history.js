document.getElementById('delete_fluidos_button').addEventListener('click', function (event) {
    var confirmed = confirm('¿Está seguro de que desea eliminar los experimentos seleccionados?');
    if (!confirmed) {
      event.preventDefault();
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
