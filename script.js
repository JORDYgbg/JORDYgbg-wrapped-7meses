let current = 0;
const pages = [];

function nextPage() {
  if (current >= pages.length - 1) return;
  pages[current].classList.remove('active');
  current++;
  pages[current].classList.add('active');
  updateNav();
}

function prevPage() {
  if (current <= 0) return;
  pages[current].classList.remove('active');
  current--;
  pages[current].classList.add('active');
  updateNav();
}

function updateNav() {
  document.getElementById('prev-btn').disabled = current === 0;
  document.getElementById('next-btn').disabled = current === pages.length - 1;
}

document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);
document.querySelector('.start-btn').addEventListener('click', nextPage);

fetch('datos.json')
  .then(response => response.json())
  .then(data => {
    // Días juntos
    const inicio = new Date(data.fecha_inicio);
    const hoy = new Date();
    const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
    document.getElementById('dias-juntos').innerText = `${dias} días juntos y contando… ❤️`;

    // Canción principal
    document.getElementById('cancion-principal').innerText = data.cancion_principal;

    // Guardar portada
    pages.push(document.querySelector('.page.active'));

    // Generar meses
    const mesesContainer = document.getElementById('meses-container');
    data.meses.forEach(mes => {
      const page = document.createElement('section');
      page.className = 'page';
      page.innerHTML = `
        <div class="card">
          <h1 class="title">Mes ${mes.mes}</h1>
          <h2 class="subtitle">${mes.titulo}</h2>
          <div class="text-block">
            <h3>Canción dedicada</h3>
            <p class="song-name">${mes.cancion_dedicada}</p>
            <div class="moments-list">
              ${mes.momentos.map(m => `<p class="moment">• ${m}</p>`).join('')}
            </div>
          </div>
        </div>
      `;
      mesesContainer.appendChild(page);
      pages.push(page);
    });

    // Juegos
    const juegosGrid = document.getElementById('juegos-grid');
    data.juegos_top.forEach(juego => {
      juegosGrid.innerHTML += `
        <div class="game-card">
          <img src="${juego.portada}" alt="${juego.nombre}">
          <h3>${juego.nombre}</h3>
          <p>${juego.stats}</p>
        </div>
      `;
    });
    pages.push(document.querySelector('#juegos'));

    // Momentos finales
    const momentosGrid = document.getElementById('momentos-grid');
    data.top_momentos.forEach((m, i) => {
      momentosGrid.innerHTML += `<p class="moment big">#${i+1} ${m}</p>`;
    });
    pages.push(document.querySelector('#final'));

    updateNav();
  });

// Partículas optimizadas (cuadraditos ligeros)
particlesJS('particles-js', {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: ['#c792ea', '#8be9fd', '#ff79c6'] },
    shape: { type: 'square' },
    opacity: { value: 0.5, random: true },
    size: { value: 4, random: true },
    move: { enable: true, speed: 1, direction: 'none', random: true, out_mode: 'out' }
  },
  interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } },
  retina_detect: true
});
