// Obtiene el contenedor de todas las slides
const slidesWrapper = document.getElementById('slides-wrapper');
// Obtiene todas las secciones de slide
const slides = document.querySelectorAll('.slide');
// Obtiene el indicador de página
const pageIndicator = document.getElementById('page-indicator');

let currentSlide = 0; // Índice de la slide actual

/**
 * Función para avanzar a la siguiente diapositiva.
 */
function nextSlide() {
    // Si no es la última slide, avanzamos
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlide();
    }
    // Si es la última, el botón de la última slide recarga la página (Ver HTML)
}

/**
 * Función para actualizar la vista (mover el contenedor).
 */
function updateSlide() {
    // Calcula la posición para mover el contenedor horizontalmente
    const offset = -currentSlide * 100;
    slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Actualiza el indicador de página
    pageIndicator.textContent = `${currentSlide + 1}/${slides.length}`;
}

// Inicializa el indicador de página al cargar la web
document.addEventListener('DOMContentLoaded', () => {
    updateSlide(); 
});
