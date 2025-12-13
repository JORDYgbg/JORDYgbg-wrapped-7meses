document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioPlayer = document.getElementById('wrapped-audio-player'); // Nuevo
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // INICIAR MÚSICA AL CARGAR
    function startMusic() {
        audioPlayer.volume = 0.5; // Volumen medio para no ser molesto
        audioPlayer.play().catch(error => {
            console.warn("Autoplay falló. Por favor, inicia la música manualmente desde el reproductor superior derecho.");
            // Podrías mostrar un mensaje temporal en la pantalla si lo deseas
        });
    }

    // Ya no necesitamos manejar audio por diapositiva, solo iniciarlo una vez.
    
    function updateSlide(newIndex, direction) {
        // ... (misma lógica de animación de la V2.0) ...
        const oldSlide = slides[currentSlideIndex];
        const newSlide = slides[newIndex];
        
        // 1. Aplica la animación de SALIDA al slide actual
        oldSlide.classList.remove('active-slide');
        oldSlide.classList.add(direction === 'next' ? 'leaving-prev' : 'leaving-next');

        // 2. Prepara la animación de ENTRADA al nuevo slide
        newSlide.classList.add(direction === 'next' ? 'leaving-next' : 'entering-prev');
        
        setTimeout(() => {
            slides.forEach(s => s.classList.remove('leaving-prev', 'leaving-next', 'entering-prev'));
            newSlide.classList.add('active-slide');
            currentSlideIndex = newIndex;
            updateButtonStates();
        }, 50); 
    }

    function updateButtonStates() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    // Inicializar
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.classList.remove('active-slide');
        }
    });

    updateButtonStates();
    startMusic(); // Intento de autoplay

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides - 1) {
            updateSlide(currentSlideIndex + 1, 'next');
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            updateSlide(currentSlideIndex - 1, 'prev');
        }
    });
});
