// script.js
// JS mejorado: Fetch al JSON, cálculo de días, top juego por horas, generación de slides con HTML dinámico.
// Animaciones: Fade-in secuencial para cada slide.
// Audio: Reproduce al click en botón, pausa automática si sales del slide (opcional).
// Error handling amigable.

async function cargarWrapped() {
    try {
        const response = await fetch('data_relacion.json');
        if (!response.ok) throw new Error('JSON no cargado');
        const data = await response.json();

        // Cálculo de días (desde 2024-05-16 a fecha actual)
        const fechaInicio = new Date(data.metadata_wrapped.fecha_inicio_relacion);
        const hoy = new Date();
        const diffTiempo = hoy.getTime() - fechaInicio.getTime();
        const diasJuntos = Math.floor(diffTiempo / (1000 * 3600 * 24));
        data.estadisticas_generales.dias_juntos = diasJuntos;

        // Top juego (ordenado por horas)
        const topJuego = data.top_juegos.sort((a, b) => b.horas_estimadas - a.horas_estimadas)[0];

        mostrarResultados(data, topJuego);

    } catch (error) {
        console.error(error);
        document.getElementById('loading-message').innerHTML = "💔 Error al cargar. Verifica el JSON o conexión. 💔";
    }
}

function mostrarResultados(data, topJuego) {
    const contenedor = document.getElementById('wrapped-container');
    contenedor.innerHTML = '';

    // Slide 1: Intro y Días
    contenedor.innerHTML += `
        <div class="slide intro-slide fade-in">
            <h2 class="slide-title">${data.metadata_wrapped.titulo}</h2>
            <p class="small-text">Desde el 16 de mayo...</p>
            <h1 class="main-number">${data.estadisticas_generales.dias_juntos}</h1>
            <p class="large-text">DÍAS JUNTOS</p>
            <p class="small-text">${data.metadata_wrapped.descripcion}</p>
        </div>
    `;

    // Slide 2: Mundo Virtual (stats extra)
    contenedor.innerHTML += `
        <div class="slide virtual-slide fade-in">
            <h2 class="slide-title">🌐 Nuestro Universo Digital 🌐</h2>
            <p class="stat-item">Horas en videollamadas: <span class="highlight">${data.estadisticas_generales.horas_videollamadas}</span></p>
            <p class="stat-item">Mensajes: <span class="highlight">${data.estadisticas_generales.mensajes_enviados}</span></p>
            <p class="stat-item">Emojis top: ${data.estadisticas_generales.emojis_favoritos.map(e => `<span class="emoji">${e}</span>`).join(' ')}</p>
            <p class="stat-item">Videollamadas épicas: <span class="highlight">${data.datos_virtuales_extra.videollamadas_epicas}</span></p>
            <p class="stat-item">Películas juntas: <span class="highlight">${data.datos_virtuales_extra.peliculas_vistas_juntos}</span></p>
        </div>
    `;

    // Slide 3: Top Juego
    contenedor.innerHTML += `
        <div class="slide games-slide fade-in">
            <h2 class="slide-title">🎮 Juego Favorito 🎮</h2>
            <img class="game-cover" src="${topJuego.ruta_portada}" alt="${topJuego.nombre}">
            <h3 class="game-title">${topJuego.nombre}</h3>
            <p class="game-stats">${topJuego.sesiones} sesiones · ~${topJuego.horas_estimadas} hrs</p>
            <p class="small-text">Rol: <strong>${topJuego.rol_favorito}</strong></p>
        </div>
    `;

    // Slide 4: Canciones Dedicadas
    let cancionesHTML = data.canciones_dedicadas.map(c => `
        <div class="song-item">
            <p class="mes">${c.mes}</p>
            <h4>${c.titulo} - ${c.artista}</h4>
            <p class="small-text">${c.contexto}</p>
        </div>
    `).join('');
    contenedor.innerHTML += `
        <div class="slide songs-slide fade-in">
            <h2 class="slide-title">🎵 Dedicatorias Musicales 🎵</h2>
            <p class="small-text">Una por mes en estos días juntos</p>
            <h1 class="main-number">${data.estadisticas_generales.canciones_dedicadas_total.valor}</h1>
            <p class="large-text">CANCIONES</p>
            <div class="songs-list">${cancionesHTML}</div>
        </div>
    `;

    // Slide 5: Canción Representativa
    contenedor.innerHTML += `
        <div class="slide rep-song-slide fade-in">
            <h2 class="slide-title">La Canción que Más Suena a Ti</h2>
            <h3 class="song-title">${data.cancion_mas_representativa.titulo}</h3>
            <p class="small-text">${data.cancion_mas_representativa.artista}</p>
            <p class="quote">"${data.cancion_mas_representativa.razon}"</p>
            <button id="play-audio" class="play-btn">▶️ Escuchar</button>
        </div>
    `;

    // Slide 6: Top Momentos
    let momentosHTML = data.top_momentos.map(m => `
        <div class="moment-item">
            <p class="fecha">${m.fecha}</p>
            <h4>${m.titulo}</h4>
            <blockquote>${m.descripcion}</blockquote>
        </div>
    `).join('');
    contenedor.innerHTML += `
        <div class="slide moments-slide fade-in">
            <h2 class="slide-title">⭐ Momentos Inolvidables ⭐</h2>
            <div class="moments-list">${momentosHTML}</div>
        </div>
    `;

    // Animaciones
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, idx) => {
        setTimeout(() => slide.classList.add('visible'), idx * 800);
    });

    // Audio control
    document.getElementById('play-audio').addEventListener('click', () => {
        const audio = document.getElementById('background-audio');
        audio.play();
    });
}

// Iniciar
window.onload = cargarWrapped;
