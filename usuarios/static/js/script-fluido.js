document.getElementById('delete_fluidos_button').addEventListener('click', function (event) {
    var confirmed = confirm('¿Está seguro de que desea eliminar los fluidos seleccionados?');
    if (!confirmed) {
      event.preventDefault();
    }
  });
  document.getElementById('delete_fluidos_button').addEventListener('click', function (event) {
    var confirmed = confirm('¿Está seguro de que desea eliminar los fluidos seleccionados?');
    if (!confirmed) {
      event.preventDefault();
    }
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
  function goBack() {
    window.history.back();
  }