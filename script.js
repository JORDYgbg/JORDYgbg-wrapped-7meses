let current = 0;
const pages = [];

// Inicializar estrellas
window.addEventListener('load', () => {
  initStars();
});

// Crear fondo de galaxia con estrellas
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const stars = [];
  const starCount = 150;
  
  // Crear estrellas
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      vx: Math.random() * 0.3 - 0.15,
      vy: Math.random() * 0.3 - 0.15
    });
  }
  
  const colors = [
    'rgba(167, 139, 250, ',
    'rgba(236, 72, 153, ',
    'rgba(139, 92, 246, ',
    'rgba(255, 255, 255, '
  ];
  
  function animate() {
    // Fondo gradiente
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, '#1a0b2e');
    gradient.addColorStop(0.5, '#16051a');
    gradient.addColorStop(1, '#0a0118');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar estrellas
    stars.forEach(star => {
      star.opacity += star.twinkleSpeed;
      if (star.opacity > 1 || star.opacity < 0.3) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      
      star.x += star.vx;
      star.y += star.vy;
      
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      const colorIndex = Math.floor(Math.random() * colors.length);
      ctx.fillStyle = colors[colorIndex] + star.opacity + ')';
      ctx.fill();
      
      if (star.opacity > 0.7) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIndex] + (star.opacity * 0.3) + ')';
        ctx.fill();
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Funciones del reproductor
function togglePlay() {
  const music = document.getElementById('bg-music');
  const playIcon = document.getElementById('play-icon');
  
  if (music.paused) {
    music.play();
    playIcon.textContent = '⏸';
  } else {
    music.pause();
    playIcon.textContent = '▶';
  }
}

function changeVolume(value) {
  const music = document.getElementById('bg-music');
  const volumeValue = document.getElementById('volume-value');
  
  music.volume = value / 100;
  volumeValue.textContent = value + '%';
}

// Iniciar checkpoint
function startCheckpoint() {
  const music = document.getElementById('bg-music');
  music.volume = 0.2;
  music.play().catch(() => {
    document.getElementById('play-icon').textContent = '▶';
  });
  nextPage();
}

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

document.getElementById('next-btn').onclick = nextPage;
document.getElementById('prev-btn').onclick = prevPage;

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// Cargar datos
fetch('datos.json')
  .then(r => r.json())
  .then(data => {
    // Calcular días juntos
    const inicio = new Date(data.fecha_inicio);
    const hoy = new Date();
    const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
    document.getElementById('dias-juntos').innerText = `${dias} días juntos y contando... ❤️`;

    // Canción principal
    document.getElementById('cancion-principal').innerText = data.cancion_principal;

    // Agregar página inicial
    pages.push(document.querySelector('.page.active'));

    // Crear páginas de meses
    const mesesContainer = document.getElementById('meses-container');
    data.meses.forEach(mes => {
      const page = document.createElement('section');
      page.className = 'page';
      page.innerHTML = `
        <div class="card">
          <h1 class="title">Mes ${mes.mes}</h1>
          <h2 class="subtitle">${mes.titulo}</h2>
          <div class="text-card">
            <h3>🎵 Canción dedicada</h3>
            <p class="song-name">${mes.cancion_dedicada}</p>
            <div style="margin-top: 2rem;">
              ${mes.momentos.map(m => `<p class="moment">• ${m}</p>`).join('')}
            </div>
          </div>
        </div>
      `;
      mesesContainer.appendChild(page);
      pages.push(page);
    });

    // Crear grid de juegos
    const juegosGrid = document.getElementById('juegos-grid');
    data.juegos_top.forEach(juego => {
      const div = document.createElement('div');
      div.className = 'game-card';
      div.innerHTML = `
        <img src="img/${juego.portada.split('/').pop()}" alt="${juego.nombre}">
        <h3>${juego.nombre}</h3>
        <p>${juego.stats}</p>
      `;
      juegosGrid.appendChild(div);
    });
    pages.push(document.getElementById('juegos-page'));

    // Crear lista de momentos
    const momentosGrid = document.getElementById('momentos-grid');
    data.top_momentos.forEach((m, i) => {
      const p = document.createElement('p');
      p.className = 'moment';
      p.textContent = `#${i + 1} ${m}`;
      momentosGrid.appendChild(p);
    });
    pages.push(document.getElementById('final-page'));

    updateNav();
  })
  .catch(err => {
    console.error('Error cargando datos:', err);
  });
