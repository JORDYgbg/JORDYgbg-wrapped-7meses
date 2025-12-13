/* RESET Y FONDOS */
:root {
    --color-primary: #B39CD0; /* Lila suave */
    --color-secondary: #4B0082; /* Púrpura profundo */
    --color-text: #EAEAEA; /* Gris muy claro */
    --color-bg-box: rgba(30, 30, 45, 0.9); /* Fondo de caja oscuro y semi-transparente (Discord-like) */
    --font-title: 'Lora', serif; 
    /* La fuente del iPhone es -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; */
    --font-body: 'Poppins', var(--font-ios); 
    --font-ios: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-body);
    color: var(--color-text);
    /* Fondo Universo Lila: Degradado + Imagen sutil de estrellas */
    background: linear-gradient(135deg, var(--color-secondary) 0%, #151525 60%, var(--color-primary) 100%);
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden; /* Evitar scroll horizontal durante la transición */
}

/* CONTENEDOR PRINCIPAL */
#wrapped-container {
    position: relative;
    width: 100%;
    max-width: 900px; /* Estilo profesional, no ocupa toda la pantalla */
    height: 600px;
    padding: 20px;
}

/* DISEÑO DE LA CAJA (DISCORD CHECKPOINT) */
.checkpoint-box {
    background: var(--color-bg-box);
    border: 1px solid rgba(179, 156, 208, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    padding: 40px;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}

/* TIPOGRAFÍA */
.section-tag {
    font-size: 0.8rem;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 10px;
}

.slide-title {
    font-family: var(--font-title);
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    color: var(--color-primary);
    margin-bottom: 30px;
}

/* BLOQUES DE DATOS (PROFESIONAL) */
.data-block {
    background: rgba(0, 0, 0, 0.2);
    padding: 15px;
    margin: 15px 0;
    border-radius: 6px;
    border-left: 4px solid var(--color-primary);
}

.data-label {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 5px;
}

.data-value {
    font-size: 2rem;
    font-weight: 600;
    color: white;
}

.caption, .note {
    font-size: 0.9rem;
    margin-top: 20px;
    opacity: 0.8;
}

/* LISTA DE MOMENTOS */
.moment-list {
    list-style: none;
    text-align: left;
    margin: 30px auto;
    max-width: 80%;
}

.moment-list li {
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border-left: 3px solid var(--color-primary);
}

.moment-date {
    font-weight: 600;
    color: var(--color-primary);
    margin-right: 10px;
}

/* MANIFIESTO FINAL */
.manifesto-quote {
    font-family: var(--font-title);
    font-style: italic;
    font-size: 1.2rem;
    padding: 20px;
    border-left: 5px solid var(--color-primary);
    margin: 30px 0;
    line-height: 1.6;
    text-align: left;
}

.signature {
    text-align: right;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-primary);
}

.error-title {
    color: #FF6961; /* Rojo sutil para ERROR 404 */
}

/* NAVEGACIÓN Y ANIMACIONES */
.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out; /* Animación "Super Bonita" */
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(100%); /* Inicialmente fuera de vista a la derecha */
}

.slide.active-slide {
    opacity: 1;
    pointer-events: all;
    transform: translateX(0); /* Posición central */
}

/* ANIMACIÓN PARA DESLIZAR (Atrás) */
.slide.prev-slide {
    transform: translateX(-100%);
}


/* BOTONES DE NAVEGACIÓN (FLECHAS) */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    font-size: 2rem;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 100;
    transition: background 0.3s, color 0.3s, transform 0.3s;
    line-height: 1;
}

.nav-btn:hover {
    background: var(--color-primary);
    color: #1a1a2e; /* Color oscuro */
    transform: translateY(-50%) scale(1.1);
}

#prev-btn {
    left: 10px;
}

#next-btn {
    right: 10px;
}

/* Estado deshabilitado */
.nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%) scale(1);
    background: rgba(0, 0, 0, 0.4);
    color: var(--color-primary);
}

/* AUDIO */
.wrapped-audio {
    margin-top: 20px;
    width: 80%;
    max-width: 300px;
    filter: invert(1) hue-rotate(270deg); /* Para darle un tono púrpura/lila */
}
