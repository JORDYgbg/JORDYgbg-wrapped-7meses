// La función principal asíncrona para cargar los datos
async function cargarWrapped() {
    try {
        // 1. Cargar el archivo JSON
        const response = await fetch('data_relacion.json');
        const data = await response.json();

        // 2. PROCESAMIENTO DE DATOS

        // Calcular Días Juntos
        const fechaInicio = new Date(data.metadata_wrapped.fecha_inicio_relacion);
        const hoy = new Date();
        const diffTiempo = hoy.getTime() - fechaInicio.getTime();
        const diasJuntos = Math.floor(diffTiempo / (1000 * 3600 * 24));
        data.estadisticas_generales.dias_juntos = diasJuntos; 
        
        // Encontrar el Juego Top (el que tiene más horas estimadas)
        const topJuego = data.top_juegos.sort((a, b) => b.horas_estimadas - a.horas_estimadas)[0];

        // 3. GENERAR LA PRESENTACIÓN
        mostrarResultados(data, topJuego);

    } catch (error) {
        console.error("Error al cargar o procesar los datos:", error);
        document.getElementById('loading-message').textContent = "💔 Error: No se pudieron cargar los datos. Revisa el archivo JSON.";
    }
}

// Función para inyectar los datos calculados en el HTML
function mostrarResultados(data, topJuego) {
    const contenedor = document.getElementById('wrapped-container');
    contenedor.innerHTML = ''; // Limpiamos el mensaje de carga

    // --- DIAPOSITIVA 1: INTRO Y DÍAS JUNTOS ---
    contenedor.innerHTML += `
        <div class="slide intro-slide">
            <h2 class="slide-title">${data.metadata_wrapped.titulo}</h2>
            <p class="small-text">Llevamos juntos...</p>
            <h1 class="main-number">${data.estadisticas_generales.dias_juntos}</h1>
            <p class="large-text">DÍAS</p>
            <p class="small-text">${data.metadata_wrapped.descripcion}</p>
        </div>
    `;
    
    // --- DIAPOSITIVA 2: TOP JUEGOS ---
    contenedor.innerHTML += `
        <div class="slide games-slide">
            <h2 class="slide-title">🎮 Nuestro Juego TOP 1 🎮</h2>
            <img class="game-cover" src="${topJuego.ruta_portada}" alt="${topJuego.nombre}">
            <h3 class="game-title">${topJuego.nombre}</h3>
            <p class="game-stats">Jugado por ${topJuego.sesiones} sesiones (~${topJuego.horas_estimadas} horas).</p>
            <p class="small-text">Tu rol fue: **${topJuego.rol_favorito}**</p>
        </div>
    `;

    // --- DIAPOSITIVA 3: CANCIONES DEDICADAS ---
    contenedor.innerHTML += `
        <div class="slide songs-slide">
            <h2 class="slide-title">🎵 Un Compromiso Musical 🎵</h2>
            <p class="small-text">En ${data.estadisticas_generales.dias_juntos} días me dedicaste...</p>
            <h1 class="main-number">${data.estadisticas_generales.canciones_dedicadas_total.valor}</h1>
            <p class="large-text">${data.estadisticas_generales.canciones_dedicadas_total.unidad}</p>
            
            <div class="song-card">
                <p>La Canción que más me recuerda a ti:</p>
                <h3 class="song-title">${data.cancion_mas_representativa.titulo}</h3>
                <p class="small-text">De: ${data.cancion_mas_representativa.artista}</p>
            </div>
        </div>
    `;
    
    // --- DIAPOSITIVA 4: MOMENTO TOP ---
    const topMomento = data.top_momentos[0];
    contenedor.innerHTML += `
        <div class="slide moment-slide">
            <h2 class="slide-title">⭐ El Hito del Año ⭐</h2>
            <p class="small-text">${topMomento.fecha}</p>
            <h3 class="moment-title">${topMomento.titulo}</h3>
            <blockquote class="moment-quote">"${topMomento.descripcion}"</blockquote>
        </div>
    `;
}

// Iniciar la carga al cargar la página
cargarWrapped();
