document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    /**
     * Actualiza la visibilidad de las diapositivas y el estado de los botones.
     * @param {number} newIndex - El índice de la diapositiva a mostrar.
     * @param {string} direction - 'next' o 'prev' para la animación.
     */
    function updateSlide(newIndex, direction) {
        // 1. Desactivar el slide actual y aplicar la clase de salida
        const oldSlide = slides[currentSlideIndex];
        oldSlide.classList.remove('active-slide');
        oldSlide.classList.add(direction === 'next' ? 'prev-slide' : 'next-slide'); // Usamos 'next-slide' temporalmente para la animación inversa.
        
        // 2. Actualizar el índice
        currentSlideIndex = newIndex;

        // 3. Activar el nuevo slide y remover clases de animación
        const newSlide = slides[currentSlideIndex];
        
        // Timeout para permitir que el CSS registre la clase de salida antes de resetear
        setTimeout(() => {
            slides.forEach(slide => {
                slide.classList.remove('prev-slide', 'next-slide'); 
            });
            // La nueva diapositiva tiene que empezar desde la dirección opuesta
            newSlide.classList.add(direction === 'next' ? 'next-slide' : 'prev-slide');
            
            // Forzar reflow/repaint para que la transición funcione
            void newSlide.offsetWidth; 

            newSlide.classList.remove('prev-slide', 'next-slide'); // Remover clase de inicio
            newSlide.classList.add('active-slide');

            updateButtonStates();
        }, 50); // Pequeño retraso para asegurar la animación

        // Manejar el audio para la diapositiva de música (si existe)
        if (oldSlide.querySelector('.wrapped-audio')) {
            oldSlide.querySelector('.wrapped-audio').pause();
        }
    }

    /**
     * Habilita o deshabilita los botones de navegación.
     */
    function updateButtonStates() {
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    }

    // Inicializar la primera diapositiva
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
