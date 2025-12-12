// Variables globales
let currentSlide = 0;
const totalSlides = 9;
let starsInitialized = false;
let musicPlayed = false; // para cumplir con la política de autoplay

// Inicializar estrellas
window.addEventListener('load', () => {
    initStars();
});

// === ESTRELLAS (sin cambios) ===
function initStars() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 200;

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

    const colors = [
        'rgba(167, 139, 250, ',
        'rgba(240, 171, 252, ',
        'rgba(236, 72, 153, ',
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
            if (star.opacity > 1 || star.opacity < 0) star.twinkleSpeed = -star.twinkleSpeed;

            star.x += star.vx;
            star.y += star.vy;
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            const colorIndex = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIndex] + Math.max(0.3, star.opacity) + ')';
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

// === MÚSICA AUTOMÁTICA después del primer clic/tap ===
function playBackgroundMusic() {
    if (musicPlayed) return;
    
    const music = document.getElementById('background-music');
    music.volume = 0.2; // ≈20%
    music.play().catch(() => {
        // Si falla el autoplay, no hacemos nada (es normal en algunos móviles)
    });
    musicPlayed = true;
}

// Activar música con cualquier interacción del usuario
document.body.addEventListener('click', playBackgroundMusic, { once: true });
document.body.addEventListener('touchstart', playBackgroundMusic, { once: true });

// === RESTO DE FUNCIONES (sin cambios importantes) ===
function pickUpLetter() {
    const letterFloor = document.getElementById('letter-floor');
    const openedLetter = document.getElementById('opened-letter');
    
    letterFloor.style.transition = 'all 0.6s ease';
    letterFloor.style.transform = 'scale(0.5) translateY(-100px)';
    letterFloor.style.opacity = '0';
    
    setTimeout(() => {
        letterFloor.style.display = 'none';
        openedLetter.style.display = 'block';
    }, 600);
}

function startWrapped() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('navigation').style.display = 'flex';
    showSlide(1);
    createDots();
}

function createDots() {
    const container = document.getElementById('dots-container');
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        container.appendChild(dot);
    }
}

function showSlide(n) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const slide = document.getElementById('slide-' + n);
    if (slide) slide.classList.add('active');

    updateDots(n - 1);
    updateButtons(n);
    currentSlide = n;
}

function updateDots(index) {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function updateButtons(n) {
    document.getElementById('prev-btn').disabled = n === 1;
    document.getElementById('next-btn').disabled = n === totalSlides;
}

function nextSlide() {
    if (currentSlide < totalSlides) showSlide(currentSlide + 1);
}

function prevSlide() {
    if (currentSlide > 1) showSlide(currentSlide - 1);
}

// Navegación con teclado y swipe
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
document.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});
