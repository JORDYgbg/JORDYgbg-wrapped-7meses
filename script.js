document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioPlayer = document.getElementById('wrapped-audio-player'); 
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // Intenta reproducir inmediatamente (puede fallar en algunos navegadores)
    audioPlayer.volume = 0.5;
    audioPlayer.play().catch(error => {
        // Mensaje silencioso, ya que el usuario puede usar el control
        console.info("Autoplay bloqueado. Por favor, usa el reproductor fijo para iniciar la música.");
    });

    /**
     * Actualiza la visibilidad de las diapositivas con animación.
     */
    function updateSlide(newIndex, direction) {
        const oldSlide = slides[currentSlideIndex];
        const newSlide = slides[newIndex];
        
        // 1. Aplica la animación de SALIDA al slide actual
        oldSlide.classList.remove('active-slide');
        oldSlide.classList.add(direction === 'next' ? 'leaving-prev' : 'leaving-next');

        // 2. Prepara la animación de ENTRADA al nuevo slide y la hace visible
        newSlide.classList.add(direction === 'next' ? 'leaving-next' : 'entering-prev');
        newSlide.style.visibility = 'visible'; // Aseguramos la visibilidad antes de la transición
        
        setTimeout(() => {
            slides.forEach(s => {
                s.classList.remove('leaving-prev', 'leaving-next', 'entering-prev');
                // Oculta completamente los slides que no están activos
                if (s !== newSlide) {
                     s.style.visibility = 'hidden'; 
                }
            });
            
            newSlide.classList.add('active-slide');
            currentSlideIndex = newIndex;
            updateButtonStates();
        }, 50); 
    }

    function updateButtonStates() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    // Inicializar: Solo la primera es activa/visible
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.classList.remove('active-slide');
            slide.style.visibility = 'hidden';
        } else {
            slide.style.visibility = 'visible';
        }
    });

    updateButtonStates();

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
