let currentSlide = 0;
const totalSlides = 6; // 6 slides después de la pantalla de inicio

function startWrapped() {
    // Ocultar pantalla de inicio
    document.getElementById('start-screen').classList.remove('active');
    
    // Mostrar navegación
    document.getElementById('navigation').style.display = 'flex';
    
    // Mostrar primer slide
    showSlide(1);
    
    // Crear dots de navegación
    createDots();
}

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

function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

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
