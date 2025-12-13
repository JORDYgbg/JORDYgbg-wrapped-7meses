/* ========================================================== */
/* WRAPPED 2025: PROYECTO BILATERAL - STYLE SHEET V5.0 */
/* ESTILO: CHECKPOINT DISCORD + UNIVERSO LILA PROFESIONAL */
/* ========================================================== */

/* ---------------------------------------------------------- */
/* 1. VARIABLES GLOBALES Y RESET */
/* ---------------------------------------------------------- */
:root {
    --color-primary: #D1B3FF;       /* Lila/Púrpura Brillante (Acento) */
    --color-secondary: #5C3A8A;     /* Púrpura Profundo */
    --color-bg-deep: #12091B;       /* Fondo ultra oscuro (Base del Universo) */
    --color-bg-box: rgba(22, 10, 35, 0.98); /* Caja casi opaca (Efecto Checkpoint) */
    --color-text: #F0F0F5;          /* Blanco ligeramente grisáceo */
    --color-error: #FF6961;         /* Rojo de Error (para 404) */
    
    --font-title: 'Lora', serif; 
    --font-ios: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --font-body: 'Poppins', var(--font-ios); 
    --transition-duration: 0.9s; /* Animación más suave */
    --box-border-radius: 18px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-body);
    color: var(--color-text);
    background-color: var(--color-bg-deep);
    
    /* FONDO UNIVERSO LILA PROFUNDO (Múltiples capas para efecto 3D) */
    background-image: 
        /* Partículas finas/Estrellas Distantes */
        radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
        /* Nebulosa Principal Lila */
        radial-gradient(circle at 10% 80%, var(--color-secondary) 1%, transparent 30%),
        /* Nebulosa Secundaria Púrpura */
        radial-gradient(circle at 90% 20%, rgba(209, 179, 255, 0.1) 1%, transparent 40%);
    background-size: 50px 50px, cover, cover;
    background-attachment: fixed;
    
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden; 
}

/* ---------------------------------------------------------- */
/* 2. CONTENEDOR PRINCIPAL Y SLIDES */
/* ---------------------------------------------------------- */
#wrapped-container {
    position: relative;
    width: 100%;
    max-width: 95vw; 
    height: 90vh;
    padding: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    visibility: hidden; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* Animación de Transición de Élite */
    transition: opacity var(--transition-duration) ease-in-out, 
                transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94); 
    transform: translateX(100%) scale(0.95); 
}

.slide.active-slide {
    opacity: 1;
    pointer-events: all;
    visibility: visible;
    transform: translateX(0) scale(1); 
}

/* Animaciones de Salida/Entrada */
.slide.leaving-prev {
    opacity: 0;
    transform: translateX(-100%) scale(0.95); 
}
.slide.leaving-next {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
}
.slide.entering-prev {
    transform: translateX(-100%) scale(0.95);
    visibility: visible;
}


/* ---------------------------------------------------------- */
/* 3. ESTILO CHECKPOINT BOX (PROFESIONAL) */
/* ---------------------------------------------------------- */
.checkpoint-box {
    background: var(--color-bg-box);
    border: 1px solid rgba(209, 179, 255, 0.3);
    border-radius: var(--box-border-radius);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8); /* Sombra intensa para profundidad */
    padding: 60px 80px;
    text-align: center;
    width: 90%; 
    max-width: 900px;
    margin: 0 auto;
    backdrop-filter: blur(5px); /* Efecto de cristal esmerilado sutil */
    transition: all 0.5s ease-out; 
}

.full-size {
    max-width: 950px;
    padding: 80px 100px;
}
.wide-box {
    max-width: 850px;
}

/* ---------------------------------------------------------- */
/* 4. TIPOGRAFÍA Y CONTENIDO */
/* ---------------------------------------------------------- */
.section-tag {
    font-size: 0.9rem;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 15px;
    font-weight: 600;
}

.slide-title {
    font-family: var(--font-title);
    font-size: 3.2rem;
    letter-spacing: -1px;
    color: white;
    text-shadow: 0 0 15px rgba(209, 179, 255, 0.5); /* Brillo más fuerte */
    margin-bottom: 25px;
}
.subtitle {
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--color-primary);
    margin-bottom: 40px;
}

/* Bloques de Data */
.data-block {
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
    border-left: 5px solid var(--color-primary);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
.data-value {
    font-size: 2.8rem;
    font-weight: 700;
}
.caption, .note {
    font-size: 1rem;
    margin-top: 25px;
    opacity: 0.7;
}

/* JUEGOS GRID - MEJORA VISUAL */
.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adaptativo */
    gap: 40px;
    margin-top: 40px;
}
.game-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%; 
    border: 4px solid var(--color-primary);
    box-shadow: 0 0 25px rgba(209, 179, 255, 0.6);
    transition: transform 0.3s ease;
}
.game-item:hover .game-img {
    transform: scale(1.1);
    box-shadow: 0 0 35px var(--color-primary);
}
.game-name {
    margin-top: 15px;
    font-weight: 700;
    color: white;
}
.game-stats {
    font-size: 0.9rem;
    opacity: 0.6;
}

/* LISTA DE MESES */
.month-list {
    list-style: none;
    text-align: left;
    margin: 30px auto;
    max-width: 80%;
}
.month-list li {
    padding: 12px 0;
    border-bottom: 1px solid rgba(209, 179, 255, 0.1);
    font-weight: 300;
    transition: background 0.2s;
}
.month-list li:hover {
    background: rgba(209, 179, 255, 0.05);
}

/* Manifiesto Final */
.manifesto-quote {
    font-family: var(--font-title);
    font-style: italic;
    font-size: 1.4rem;
    padding: 30px;
    border-left: 6px solid var(--color-primary);
    margin: 40px auto;
    line-height: 1.8;
    text-align: left;
    max-width: 90%;
    color: var(--color-text);
}
.signature {
    text-align: right;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-primary);
}
.error-title {
    color: var(--color-error);
    text-shadow: 0 0 10px var(--color-error);
}


/* ---------------------------------------------------------- */
/* 5. NAVEGACIÓN Y REPRODUCTOR FIJO */
/* ---------------------------------------------------------- */

/* NAVEGACIÓN - TOP LEFT */
.nav-controls-top {
    position: fixed; 
    top: 30px;
    left: 30px;
    z-index: 1000;
    display: flex;
    gap: 15px;
}
.nav-btn {
    background: var(--color-bg-box);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    font-size: 1.2rem;
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.nav-btn:hover:not(:disabled) {
    background: var(--color-primary);
    color: var(--color-bg-deep);
    transform: scale(1.1);
    box-shadow: 0 0 20px var(--color-primary);
}

.nav-btn:disabled {
    opacity: 0.2;
    cursor: not-allowed;
}

/* REPRODUCTOR DE MÚSICA FIJO - TOP RIGHT */
.music-controller {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1000;
    background: rgba(30, 30, 45, 0.9);
    padding: 8px 12px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    border: 1px solid var(--color-primary);
}

#audio-title {
    font-size: 0.8rem;
    color: var(--color-primary);
    margin-right: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

#wrapped-audio-player {
    /* Estilización del reproductor nativo */
    width: 220px;
    height: 35px;
    /* Aplicar filtro para que el reproductor combine con el tema lila */
    filter: hue-rotate(240deg) saturate(150%) brightness(1.2) opacity(0.85); 
    transition: filter 0.3s;
}

#wrapped-audio-player::-webkit-media-controls-panel {
    background-color: var(--color-bg-deep); /* Fondo del control más oscuro */
    color: var(--color-primary); /* Color de iconos */
}
/* Estilos para navegadores modernos */
#wrapped-audio-player::-webkit-media-controls-play-button,
#wrapped-audio-player::-webkit-media-controls-current-time-display,
#wrapped-audio-player::-webkit-media-controls-time-remaining-display {
    color: var(--color-primary) !important;
}

/* FIN DEL CÓDIGO CSS (Más de 200 líneas) */
