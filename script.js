// La función que lee los datos y los procesa
async function cargarWrapped() {
    try {
        const response = await fetch('data_relacion.json');
        const data = await response.json();

        // 1. CÁLCULO DE DÍAS JUNTOS
        const fechaInicio = new Date(data.metadata_wrapped.fecha_inicio_relacion);
        const hoy = new Date();
        const diffTiempo = hoy.getTime() - fechaInicio.getTime();
        const diasJuntos = Math.floor(diffTiempo / (1000 * 3600 * 24));
        data.estadisticas_generales.dias_juntos = diasJuntos; 
        
        // 2. ENCONTRAR JUEGO TOP
        const topJuego = data.top_juegos.sort((a, b) => b.sesiones - a.sesiones)[0];

        // 3. GENERAR EL HTML Y MOSTRAR
        mostrarResultados(data, topJuego);

    } catch (error) {
        console.error("Error al cargar o procesar los datos:", error);
        document.getElementById('loading-message').textContent = "Error: No se pudieron cargar los datos del JSON.";
    }
}

// La función que inyecta los datos calculados en el HTML
function mostrarResultados(data, topJuego) {
    const contenedor = document.getElementById('wrapped-container');
    contenedor.innerHTML = ''; // Limpiar el mensaje de carga

    // Generar la diapositiva 1: DÍAS JUNTOS
    contenedor.innerHTML += `
        <div class="slide intro">
            <p class="small-text">¡Gracias por estos...</p>
            <h1 class="main-number">${data.estadisticas_generales.dias_juntos}</h1>
            <p class="large-text">DÍAS JUNTOS</p>
            <p class="small-text">${data.metadata_wrapped.descripcion}</p>
        </div>
    `;
    
    // Generar la diapositiva 2: CANCIONES
    contenedor.innerHTML += `
        <div class="slide songs-slide">
            <h2>🎶 Tu Impacto Musical 🎶</h2>
            <p>Me dedicaste **${data.estadisticas_generales.promesa_cumplida.valor} canciones**.</p>
            <div class="song-card">
                <p>Canción que más me recuerda a ti:</p>
                <h3>${data.cancion_mas_representativa.titulo}</h3>
                <p>De: ${data.cancion_mas_representativa.artista}</p>
            </div>
        </div>
    `;

    // Generar la diapositiva 3: JUEGOS
    contenedor.innerHTML += `
        <div class="slide games-slide">
            <h2>🎮 ¡Nuestro Juego TOP! 🎮</h2>
            <img class="game-cover" src="${topJuego.ruta_portada}" alt="${topJuego.nombre}">
            <h3>${topJuego.nombre}</h3>
            <p>Con ${topJuego.sesiones} sesiones y ${topJuego.horas_estimadas} horas estimadas de risas y victorias.</p>
        </div>
    `;

    // Generar la diapositiva 4: MOMENTO TOP
    contenedor.innerHTML += `
        <div class="slide moment-slide">
            <h2>⭐ El Hito del Año ⭐</h2>
            <p class="moment-date">${data.top_momentos[0].fecha}</p>
            <h3 class="moment-title">${data.top_momentos[0].titulo}</h3>
            <p class="moment-description">"${data.top_momentos[0].descripcion}"</p>
        </div>
    `;
}

// Iniciar el proceso
cargarWrapped();
