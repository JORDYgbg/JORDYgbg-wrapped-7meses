// Variables globales
let currentSlide = 0;
const totalSlides = 9; // 9 slides después de la pantalla de inicio
let starsInitialized = false;

// Inicializar canvas de estrellas cuando cargue la página
window.addEventListener('load', () => {
    initStars();
});

// Función para crear estrellas animadas
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array de estrellas
    const stars = [];
    const starCount = 200;
    
    // Crear estrellas
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    // Colores de estrellas (tonos lilas y rosas)
    const colors = [
        'rgba(167, 139, 250, ',  // Lila
        'rgba(240, 171, 252, ',  // Rosa claro
        'rgba(236, 72, 153, ',   // Rosa fuerte
        'rgba(255, 255, 255, '   // Blanco
    ];
    
    // Animar estrellas
    function animate() {
        // Fondo con gradiente
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width
        );
        gradient.addColorStop(0, '#1a0b2e');
        gradient.addColorStop(0.5, '#16051a');
        gradient.addColorStop(1, '#0a0118');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar y animar estrellas
        stars.forEach(star => {
            // Actualizar opacidad (efecto de parpadeo)
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }
            
            // Mover estrella
            star.x += star.vx;
            star.y += star.vy;
            
            // Reaparecer en el otro lado
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
            
            // Dibujar estrella
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            const colorIndex = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIndex] + Math.max(0.3, star.opacity) + ')';
            ctx.fill();
            
            // Añadir brillo
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
    starsInitialized = true;
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Función para abrir el sobre
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('open-btn');
    const startBtn = document.getElementById('start-btn');
    
    envelope.classList.add('open');
    openBtn.style.display = 'none';
    
    setTimeout(() => {
        startBtn.style.display = 'inline-block';
        startBtn.style.animation = 'bounce 1s infinite';
    }, 1500);
}

// Función para iniciar el wrapped
function startWrapped() {
    // Ocultar pantalla de inicio
    document.getElementById('start-screen').classList.remove('active');
    
    // Mostrar navegación
    document.getElementById('navigation').style.display = 'flex';
    
    // Mostrar reproductor de música
    document.getElementById('music-player').style.display = 'block';
    
    // Reproducir música
    const music = document.getElementById('background-music');
    music.volume = 0.2; // Volumen al 20%
    
    // Intentar reproducir con interacción del usuario
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Música reproduciéndose');
            document.getElementById('play-icon').textContent = '⏸️';
        }).catch(error => {
            console.log('Autoplay bloqueado, usa el botón play');
            document.getElementById('play-icon').textContent = '▶️';
            // Mostrar alerta sutil
            setTimeout(() => {
                if (music.paused) {
                    alert('🎵 Haz click en el botón ▶️ arriba para escuchar la música 😊');
                }
            }, 1000);
        });
    }
    
    // Mostrar primer slide
    showSlide(1);
    
    // Crear dots de navegación
    createDots();
}

// Función para pausar/reproducir música
function togglePlay() {
    const music = document.getElementById('background-music');
    const playIcon = document.getElementById('play-icon');
    
    if (music.paused) {
        music.play();
        playIcon.textContent = '⏸️';
    } else {
        music.pause();
        playIcon.textContent = '▶️';
    }
}

// Función para cambiar volumen
function changeVolume(value) {
    const music = document.getElementById('background-music');
    const volumeText = document.getElementById('volume-text');
    
    music.volume = value / 100;
    volumeText.textContent = value + '%';
}

// Crear puntos de navegación
function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
}

// Mostrar slide específico
function showSlide(slideNumber) {
    // Ocultar todos los slides
    const allSlides = document.querySelectorAll('.screen');
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Mostrar el slide actual
    const currentSlideElement = document.getElementById(`slide-${slideNumber}`);
    if (currentSlideElement) {
        setTimeout(() => {
            currentSlideElement.classList.add('active');
        }, 50);
    }
    
    // Actualizar dots
    updateDots(slideNumber - 1);
    
    // Actualizar botones
    updateButtons(slideNumber);
    
    currentSlide = slideNumber;
}

// Actualizar indicadores de navegación
function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Actualizar estado de botones
function updateButtons(slideNumber) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Deshabilitar botón anterior en el primer slide
    if (slideNumber === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // Deshabilitar botón siguiente en el último slide
    if (slideNumber === totalSlides) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

// Siguiente slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

// Slide anterior
function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Navegación con swipe en móvil
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe izquierda - siguiente
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe derecha - anterior
        prevSlide();
    }
}
