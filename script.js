document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Función para manejar el audio
    function handleAudio(newIndex, oldIndex) {
        const oldAudio = slides[oldIndex]?.querySelector('.wrapped-audio');
        const newAudio = slides[newIndex]?.querySelector('.wrapped-audio');

        if (oldAudio) {
            oldAudio.pause();
            oldAudio.currentTime = 0; // Reiniciar
        }

        // Si la diapositiva es la de música (índice 3), reproducir automáticamente
        if (newIndex === 3 && newAudio) {
            newAudio.play().catch(error => {
                console.warn("Autoplay falló (navegador lo bloqueó). El usuario debe interactuar.", error);
            });
        }
    }

    /**
     * Actualiza la visibilidad de las diapositivas con animación.
     * @param {number} newIndex - El índice de la diapositiva a mostrar.
     * @param {string} direction - 'next' o 'prev' para la animación.
     */
    function updateSlide(newIndex, direction) {
        const oldSlide = slides[currentSlideIndex];
        const newSlide = slides[newIndex];
        const oldIndex = currentSlideIndex;

        handleAudio(newIndex, oldIndex);

        // 1. Aplica la animación de SALIDA al slide actual
        oldSlide.classList.remove('active-slide');
        oldSlide.classList.add(direction === 'next' ? 'leaving-prev' : 'leaving-next');

        // 2. Prepara la animación de ENTRADA al nuevo slide
        newSlide.classList.add(direction === 'next' ? 'leaving-next' : 'entering-prev');
        
        // 3. Permite que el CSS termine la animación de salida/preparación
        setTimeout(() => {
            // Limpia todas las clases de transición de todos los slides
            slides.forEach(s => s.classList.remove('leaving-prev', 'leaving-next', 'entering-prev'));

            // Establece el nuevo slide como activo
            newSlide.classList.add('active-slide');
            currentSlideIndex = newIndex;
            updateButtonStates();
        }, 50); // Pequeño delay para asegurar la ejecución del CSS
    }

    /**
     * Habilita o deshabilita los botones de navegación.
     */
    function updateButtonStates() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    // Inicializar: asegurarse de que solo el primero sea visible
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.classList.remove('active-slide');
        }
    });

    updateButtonStates();

    // Event Listeners para la navegación
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
