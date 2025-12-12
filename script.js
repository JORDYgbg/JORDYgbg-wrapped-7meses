document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('datos.json');
    const data = await response.json();

    // Calcular días juntos
    const startDate = new Date(data.fecha_inicio);
    const currentDate = new Date('2025-12-12'); // Fecha actual
    const daysTogether = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('dias-juntos').textContent = `Días juntos: ${daysTogether} (¡y contando en el mundo virtual!)`;

    // Canción principal
    document.getElementById('cancion-principal').textContent = data.cancion_principal;

    // Renderizar meses
    const mesesSection = document.getElementById('meses-section');
    data.meses.forEach(mes => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mes-card';
        card.innerHTML = `
            <img src="${mes.foto}" alt="Foto Mes ${mes.mes}" class="img-portada">
            <h3>Mes ${mes.mes}: ${mes.titulo}</h3>
            <p>Canción dedicada: ${mes.cancion_dedicada}</p>
            <ul>${mes.momentos.map(m => `<li>${m}</li>`).join('')}</ul>
        `;
        mesesSection.appendChild(card);
    });

    // Renderizar juegos
    const juegosSection = document.getElementById('juegos-section');
    data.juegos_top.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'col-md-4 juego-card';
        card.innerHTML = `
            <img src="${juego.portada}" alt="${juego.nombre}" class="img-portada">
            <h4>${juego.nombre}</h4>
            <p>${juego.stats}</p>
        `;
        juegosSection.appendChild(card);
    });

    // Renderizar top momentos
    const topMomentos = document.getElementById('top-momentos');
    data.top_momentos.forEach(momento => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = momento;
        topMomentos.appendChild(li);
    });
});
