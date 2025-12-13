let current = 0;
const pages = [];

// Navegación
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
  document.getElementById('progress').style.width = (current / (pages.length - 1) * 100) + '%';
}

document.getElementById('next-btn').addEventListener('click', nextPage);
document.getElementById('prev-btn').addEventListener('click', prevPage);
document.querySelector('.start-btn').addEventListener('click', nextPage);

// Mute/Unmute música
const music = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');
muteBtn.addEventListener('click', () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? '🔇' : '🔊';
});

// Carga datos
fetch('datos.json')
  .then(r => r.json())
  .then(data => {
    const inicio = new Date(data.fecha_inicio);
    const hoy = new Date();
    const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
    document.getElementById('dias-juntos').innerText = `${dias} días juntos y contando… ❤️`;

    document.getElementById('cancion-principal').innerText = data.cancion_principal;

    pages.push(document.querySelector('.page.active'));

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

    const juegosGrid = document.getElementById('juegos-grid');
    data.juegos_top.forEach(juego => {
      juegosGrid.innerHTML += `
        <div class="game-card">
          <img src="img/${juego.portada.split('/').pop()}" alt="${juego.nombre}">
          <h3>${juego.nombre}</h3>
          <p>${juego.stats}</p>
        </div>
      `;
    });
    pages.push(document.querySelector('#juegos'));

    const momentosGrid = document.getElementById('momentos-grid');
    data.top_momentos.forEach((m, i) => {
      momentosGrid.innerHTML += `<p class="moment big">#${i+1} ${m}</p>`;
    });
    pages.push(document.querySelector('#final'));

    updateNav();
  });

// Partículas optimizadas
particlesJS('particles-js', {
  particles: {
    number: { value: 45 },
    color: { value: ['#c792ea', '#8be9fd', '#ff79c6'] },
    shape: { type: 'square' },
    opacity: { value: 0.5 },
    size: { value: 4 },
    move: { enable: true, speed: 1.2 }
  },
  interactivity: { events: { onhover: { enable: true, mode: 'repulse' } } },
  retina_detect: true
});
