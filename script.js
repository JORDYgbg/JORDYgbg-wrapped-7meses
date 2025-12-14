let current = 0;
const pages = [];

// Meses personalizados
const mesesData = [
  {
    mes: "Mayo",
    numero: 1,
    titulo: "El principio de todo",
    descripcion: "Aquí es donde todo comenzó, y gracias a Dios comenzó.",
    cancion: "Es por ti de Juanes",
    momentos: [
      "Aquí nos dimos cuenta que éramos nocturnos.",
      "Aquí nos dimos cuenta que éramos compatibles."
    ]
  },
  {
    mes: "Junio",
    numero: 2,
    titulo: "Felicidad",
    cancion: "Nuestros Horarios de Ferraz",
    momentos: [
      "Empezó la etapa del enamoramiento como mejor podía empezar.",
      "Eres perfecta."
    ]
  },
  {
    mes: "Julio",
    numero: 3,
    titulo: "¿Perfección?",
    cancion: "Pensé en ti de Jaze",
    momentos: [
      "No tienes cosas malas dios mío.",
      "La madurez que muestras no es digna de alguien que aparentemente es imperfecto."
    ]
  },
  {
    mes: "Agosto",
    numero: 4,
    titulo: "¿Sobrevivimos?",
    cancion: "La Serenata de Dani Ribba",
    momentos: [
      "Supuestamente aquí terminaba la etapa del enamoramiento, y yo estoy más enamorado que nunca.",
      "Pese a los pequeños conflictos, gracias por quedarte mi amorcito."
    ]
  },
  {
    mes: "Septiembre",
    numero: 5,
    titulo: "Tranquilidad",
    cancion: "September de Earth, Wind & Fire",
    momentos: [
      "La tranquilidad que tengo desde septiembre es hasta rara.",
      "Me das paz, confío en ti."
    ]
  },
  {
    mes: "Octubre",
    numero: 6,
    titulo: "Felicidad",
    cancion: "How Deep is Your Love de Bee Gees",
    momentos: [
      "Soy muy feliz a tu lado.",
      "Gracias por ser mi viewer más fiel."
    ]
  },
  {
    mes: "Noviembre",
    numero: 7,
    titulo: "Amor",
    cancion: "Esto es Amor de Mon Laferte",
    momentos: [
      "Por ti conocí canciones más chills, para poder dedicarte o recomendarte algo que te guste muuuucho.",
      "Te amo."
    ]
  },
  {
    mes: "Diciembre",
    numero: 8,
    titulo: "Eternidad",
    cancion: "Cama y Mesa de Roberto Carlos",
    momentos: [
      "\"Eternidad\" no es porque sí, es porque quiero que duremos juntos eso sabes.",
      "\"Mariana\". Que lindo nombre dios mío."
    ]
  }
];

const juegosData = [
  { nombre: "Minecraft", imagen: "minecraft.png", descripcion: "Aquí nos enamoramos realmente" },
  { nombre: "Valorant", imagen: "valorant.jpg", descripcion: "Aquí nos conocimos y gustamos" },
  { nombre: "The Forest", imagen: "forest.jpg", descripcion: "Aquí ya somos esposos JASIDJIASDJAI" },
  { nombre: "Party Club", imagen: "party.jpg", descripcion: "Aquí me enamoré demasiado de ti mi amorcito preciosito muchito amito" },
  { nombre: "Roblox", imagen: "roblox.jpg", descripcion: "Aquí me enseñaste a ser rata" }
];

const momentosTop = [
  "Cuando hiciste una J y una M con florecitas en el Minecraft",
  "Cuando me declaré en Rave, qué noche",
  "Cuando hablábamos en tu refrigerador en el Minecraft ISJDIAJDIA",
  "Cuando te di un besito en el camino en Minecraft",
  "Cuando hiciste un ace y en mi mente dije DIOS MIO CASEMONOS"
];

// Inicializar
window.addEventListener('load', () => {
  initStars();
  loadContent();
});

// Crear fondo de galaxia
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const stars = [];
  const starCount = 150;
  
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
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, '#1a0b2e');
    gradient.addColorStop(0.5, '#16051a');
    gradient.addColorStop(1, '#0a0118');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
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

// Sonidos
function playClickSound() {
  const clickSound = document.getElementById('click-sound');
  clickSound.currentTime = 0;
  clickSound.volume = 0.3;
  clickSound.play().catch(() => {});
}

function playTransitionSound() {
  const transitionSound = document.getElementById('transition-sound');
  transitionSound.currentTime = 0;
  transitionSound.volume = 0.2;
  transitionSound.play().catch(() => {});
}

// Reproductor
function togglePlayer() {
  const player = document.getElementById('music-player');
  player.classList.toggle('collapsed');
  playClickSound();
}

function togglePlay() {
  const music = document.getElementById('bg-music');
  const playIcon = document.getElementById('play-icon');
  
  if (music.paused) {
    music.play();
    playIcon.className = 'fas fa-pause';
  } else {
    music.pause();
    playIcon.className = 'fas fa-play';
  }
  playClickSound();
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
  music.play().then(() => {
    document.getElementById('play-icon').className = 'fas fa-pause';
  }).catch(() => {
    document.getElementById('play-icon').className = 'fas fa-play';
  });
  playClickSound();
  setTimeout(() => {
    nextPage();
  }, 300);
}

// Navegación
function nextPage() {
  if (current >= pages.length - 1) return;
  
  playTransitionSound();
  pages[current].classList.remove('active');
  current++;
  pages[current].classList.add('active');
  updateNav();
}

function prevPage() {
  if (current <= 0) return;
  
  playTransitionSound();
  pages[current].classList.remove('active');
  current--;
  pages[current].classList.add('active');
  updateNav();
}

function updateNav() {
  document.getElementById('prev-btn').disabled = current === 0;
  document.getElementById('next-btn').disabled = current === pages.length - 1;
  document.getElementById('progress').style.width = (current / (pages.length - 1) * 100) + '%';
  
  const nextBtn = document.getElementById('next-float-btn');
  if (current > 0 && current < pages.length - 1) {
    nextBtn.classList.add('show');
  } else {
    nextBtn.classList.remove('show');
  }
}

document.getElementById('next-btn').onclick = nextPage;
document.getElementById('prev-btn').onclick = prevPage;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// Cargar contenido
function loadContent() {
  const inicio = new Date('2024-05-11');
  const hoy = new Date();
  const dias = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
  document.getElementById('dias-juntos').innerHTML = `${dias} días juntos y contando... <i class="fas fa-heart"></i>`;

  document.getElementById('cancion-principal').innerText = "Virtual Insanity – Jamiroquai (la versión lo-fi que siempre me ponías a las 4 a.m.)";

  pages.push(document.querySelector('.page.active'));

  const mesesContainer = document.getElementById('meses-container');
  mesesData.forEach(mes => {
    const page = document.createElement('section');
    page.className = 'page';
    page.innerHTML = `
      <div class="card">
        <h1 class="title">${mes.mes}</h1>
        <h2 class="subtitle">${mes.titulo}</h2>
        <p class="moment">${mes.descripcion || ''}</p>
        <div class="text-card">
          <h3><i class="fas fa-music"></i> Canción que me suena a ${mes.mes}</h3>
          <p class="song-name">${mes.cancion}</p>
          <div style="margin-top: 2rem;">
            ${mes.momentos.map(m => `<p class="moment">• ${m}</p>`).join('')}
          </div>
        </div>
      </div>
    `;
    mesesContainer.appendChild(page);
    pages.push(page);
  });

  const juegosGrid = document.getElementById('juegos-grid');
  juegosData.forEach(juego => {
    const div = document.createElement('div');
    div.className = 'game-card';
    div.innerHTML = `
      <img src="img/${juego.imagen}" alt="${juego.nombre}">
      <h3>${juego.nombre}</h3>
      <p>${juego.descripcion}</p>
    `;
    juegosGrid.appendChild(div);
  });
  pages.push(document.getElementById('juegos-page'));

  const momentosGrid = document.getElementById('momentos-grid');
  momentosTop.forEach((m, i) => {
    const p = document.createElement('p');
    p.className = 'moment';
    p.textContent = `#${i + 1} ${m}`;
    momentosGrid.appendChild(p);
  });
  pages.push(document.getElementById('momentos-page'));
  
  pages.push(document.getElementById('final-page'));

  updateNav();
}
