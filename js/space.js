document.addEventListener("DOMContentLoaded", () => {

const btnBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', async () => {

  const query = inputBuscar.value.trim();
  if (!query) {
    alert('Por favor, ingresa un término de búsqueda.');
    return;
  }

  try {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
    const data = await response.json();
    const items = data.collection.items;
    if (items.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    items.forEach(item => {
      const imageData = item.data[0];
      const imageLink = item.links ? item.links[0].href : '';
      const title = imageData.title;
      const description = imageData.description || 'No hay descripción disponible';
      const date = new Date(imageData.date_created).toLocaleDateString();
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
      card.innerHTML = `
        <img src="${imageLink}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
        </div>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    contenedor.innerHTML = '<p>Hubo un error al realizar la búsqueda. Inténtalo de nuevo más tarde.</p>';
    console.error('Error en la búsqueda:', error);
  }
});
    });