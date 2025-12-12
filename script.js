// Datos embebidos directamente (así no necesitas fetch ni servidor)
const data = {
    "metadata_wrapped": {
        "titulo": "Nuestro Wrapped: 7 Meses de Amor Digital",
        "descripcion": "Un resumen de nuestros primeros meses, contados por nuestros datos.",
        "fecha_inicio_relacion": "2024-05-16"
    },
    
    "estadisticas_generales": {
        "dias_juntos": 0,
        "canciones_dedicadas_total": {
            "descripcion": "Canciones únicas dedicadas",
            "valor": 7,
            "unidad": "Canciones"
        }
    },
    
    "canciones_dedicadas": [
        { "mes": "Mayo", "titulo": "Título de la Canción 1", "artista": "Artista A", "contexto": "La canción que marcó el inicio de todo." },
        { "mes": "Junio", "titulo": "Título de la Canción 2", "artista": "Artista B", "contexto": "Nuestra primera canción oficial de videollamadas." },
        { "mes": "Julio", "titulo": "Título de la Canción 3", "artista": "Artista C", "contexto": "La que descubrimos juntos a las 3 a.m." },
        { "mes": "Agosto", "titulo": "Título de la Canción 4", "artista": "Artista D", "contexto": "La que suena en el fondo cuando hablamos." },
        { "mes": "Septiembre", "titulo": "Título de la Canción 5", "artista": "Artista E", "contexto": "El himno de nuestra primera mini-pelea." },
        { "mes": "Octubre", "titulo": "Título de la Canción 6", "artista": "Artista F", "contexto": "La que elegimos para el fondo de nuestro chat." },
        { "mes": "Noviembre", "titulo": "Título de la Canción 7", "artista": "Artista Z", "contexto": "La más reciente, un regalo inesperado." }
    ],
    
    "cancion_mas_representativa": {
        "titulo": "Título de Mi Canción 'Ella'",
        "artista": "Artista Favorito",
        "razon": "Cada vez que suena, siento que estás a mi lado. Es nuestro sonido."
    },
    
    "top_juegos": [
        { "nombre": "Valorant", "sesiones": 52, "horas_estimadas": 150, "rol_favorito": "Dualista Agresiva", "ruta_portada": "img/valorant.jpg" },
        { "nombre": "Minecraft", "sesiones": 30, "horas_estimadas": 80, "rol_favorito": "La Maestra Constructora", "ruta_portada": "img/minecraft.png" },
        { "nombre": "The Forest", "sesiones": 10, "horas_estimadas": 40, "rol_favorito": "Nuestra Creadora de Bases Seguras", "ruta_portada": "img/forest.jpg" },
        { "nombre": "Party Game", "sesiones": 15, "horas_estimadas": 15, "rol_favorito": "La que siempre gana en las trivias", "ruta_portada": "img/party.jpg" },
        { "nombre": "Roblox", "sesiones": 5, "horas_estimadas": 5, "rol_favorito": "Solo para las risas", "ruta_portada": "img/roblox.jpg" }
    ],
    
    "top_momentos": [
        { "fecha": "2024-10-05", "titulo": "Nuestro Primer Viaje 'Virtual'", "descripcion": "Cuando usamos el VR para caminar juntos por Venecia. Olvidamos que no estábamos en persona." },
        { "fecha": "2024-06-25", "titulo": "Maratón de Películas de Terror", "descripcion": "La noche que no pudimos dormir después de ver la tercera película y hablamos hasta el amanecer." }
    ]
};

// === AHORA SÍ FUNCIONA SIN SERVIDOR ===
function cargarWrapped() {
    try {
        // Calcular días juntos
        const fechaInicio = new Date(data.metadata_wrapped.fecha_inicio_relacion);
        const hoy = new Date();
        const diffTiempo = hoy.getTime() - fechaInicio.getTime();
        const diasJuntos = Math.floor(diffTiempo / (1000 * 3600 * 24));
        data.estadisticas_generales.dias_juntos = diasJuntos;

        // Top juego
        const topJuego = data.top_juegos.sort((a, b) => b.horas_estimadas - a.horas_estimadas)[0];

        // Mostrar todo
        mostrarResultados(data, topJuego);

        // Quitar mensaje de carga
        document.getElementById('loading-message').style.display = 'none';

    } catch (error) {
        console.error(error);
        document.getElementById('loading-message').textContent = "Error inesperado :(";
    }
}

function mostrarResultados(data, topJuego) {
    const contenedor = document.getElementById('wrapped-container');
    
    contenedor.innerHTML = `
        <div class="slide intro-slide">
            <h2 class="slide-title">${data.metadata_wrapped.titulo}</h2>
            <p class="small-text">Llevamos juntos...</p>
            <h1 class="main-number">${data.estadisticas_generales.dias_juntos}</h1>
            <p class="large-text">DÍAS</p>
            <p class="small-text">${data.metadata_wrapped.descripcion}</p>
        </div>

        <div class="slide games-slide">
            <h2 class="slide-title">Nuestro Juego TOP 1</h2>
            <img class="game-cover" src="${topJuego.ruta_portada}" alt="${topJuego.nombre}">
            <h3 class="game-title">${topJuego.nombre}</h3>
            <p class="game-stats">${topJuego.sesiones} sesiones · ~${topJuego.horas_estimadas} horas</p>
            <p class="small-text">Tu rol: <strong>${topJuego.rol_favorito}</strong></p>
        </div>

        <div class="slide songs-slide">
            <h2 class="slide-title">Un Compromiso Musical</h2>
            <p class="small-text">En estos ${data.estadisticas_generales.dias_juntos} días dedicaste...</p>
            <h1 class="main-number">${data.estadisticas_generales.canciones_dedicadas_total.valor}</h1>
            <p class="large-text">CANCIONES ÚNICAS</p>
            <div class="song-card">
                <p>La que más me representa contigo:</p>
                <h3>${data.cancion_mas_representativa.titulo}</h3>
                <p class="small-text">${data.cancion_mas_representativa.artista}</p>
            </div>
        </div>

        <div class="slide moment-slide">
            <h2 class="slide-title">El Momento del Año</h2>
            <p class="small-text">${data.top_momentos[0].fecha}</p>
            <h3>${data.top_momentos[0].titulo}</h3>
            <blockquote>"${data.top_momentos[0].descripcion}"</blockquote>
        </div>
    `;
}

// Iniciar al cargar
window.onload = cargarWrapped;
