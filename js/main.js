let arrayPeli = [];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista');
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
   
    function toggleListaVisibility() {
        contenedor.classList.toggle('d-none');
    }

    btnBuscar.addEventListener('click', () => {
        const terminoBusqueda = inputBuscar.value.trim();
        const peliculasFiltradas = filtrarPeli(arrayPeli, terminoBusqueda);
        mostrar(peliculasFiltradas);
        toggleListaVisibility();
    });


    const lista = document.getElementById('lista');
    lista.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasLista'));
        offcanvas.show();
      }
    });
    lista.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasLista'));
  
      const index = Array.from(lista.children).indexOf(event.target);
      const movie = arrayPeli[index];

      const genreNames = movie.genres.map(genre => genre.name).join('-');

      const offcanvasBody = document.querySelector('#offcanvasLista .offcanvas-body');
      offcanvasBody.innerHTML = `
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        <p>${genreNames}</p>
      `;

      const dropdownButtonBody = document.querySelector('.dropdown-menu');
      dropdownButtonBody.innerHTML = `
        <li>Year: ${movie.release_date}</li>
        <li>Runtime: ${movie.runtime}</li>
        <li>Budget: ${movie.budget}</li>
        <li>Revenue: ${movie.revenue}</li>
      `
      offcanvas.show();
      dropdownButtonBody.show();
    }
  });
  


    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            arrayPeli = data;
            mostrar(arrayPeli);
        })
        .catch(error => {
            console.error('Hubo un error al cargar los datos:', error);
        });
});

// Filtrar
function filtrarPeli(array, terminoBusqueda) {
    return array.filter(movie => movie.title.toLowerCase().includes(terminoBusqueda.toLowerCase()));
}


// Mostrar elementos
function mostrar(data) {
    const contenedor = document.getElementById('lista');
    contenedor.innerHTML = '';

    data.forEach(movie => {
        let fila = document.createElement('li'); 
        let nombre = document.createElement('span'); 
        let tagLine = document.createElement('div'); 
        let voto = document.createElement('div'); 
        voto.setAttribute("id", "votospan");
        tagLine.setAttribute ("id", "tagcolor");
        nombre.innerHTML = movie.title;
        tagLine.innerHTML = movie.tagline;
        voto.innerHTML = votoAEstrellas(movie.vote_average);

        fila.appendChild(nombre);
        fila.appendChild(tagLine);
        fila.appendChild(voto);

        contenedor.appendChild(fila);
    });
}

// Puntuación
function votoAEstrellas(puntuacion) {
  if (puntuacion < 1 || puntuacion > 10) {
      return "Puntuación fuera de rango";
  }
  const estrellasCompletas = Math.round(puntuacion/2);
  const estrellasVacias = 5 - estrellasCompletas; 
  const filledStars = '★'.repeat(estrellasCompletas);
  const emptyStars = '☆'.repeat(estrellasVacias);
  const stars = filledStars + emptyStars;
  return stars;
}