document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('datos.json');
  const data = await res.json();

  // Días juntos
  const inicio = new Date(data.fecha_inicio);
  const hoy = new Date('2025-12-12');
  const dias = Math.floor((hoy - inicio) / (1000*60*60*24));
  document.getElementById('dias-juntos').textContent = `${dias} días de amor a distancia y contando ♡`;

  // Canción principal
  document.getElementById('cancion-principal').textContent = data.cancion_principal;

  // Slider meses
  const slider = document.getElementById('meses-slider');
  data.meses.forEach((mes, i) => {
    const active = i === 0 ? 'active' : '';
    slider.innerHTML += `
      <div class="carousel-item ${active}">
        <div class="mes-card">
          <h3>Mes ${mes.mes}</h3>
          <h4>${mes.titulo}</h4>
          <p><strong>Canción dedicada:</strong> ${mes.cancion_dedicada}</p>
          <ul class="text-start mt-3">
            ${mes.momentos.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>
      </div>`;
  });

  // Juegos
  const juegosSec = document.getElementById('juegos-section');
  data.juegos_top.forEach(juego => {
    juegosSec.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="juego-card" data-aos="zoom-in">
          <img src="${juego.portada}" alt="${juego.nombre}">
          <h4>${juego.nombre}</h4>
          <p>${juego.stats}</p>
        </div>
      </div>`;
  });

  // Top momentos
  const topSec = document.getElementById('top-momentos');
  data.top_momentos.forEach((m, i) => {
    topSec.innerHTML += `<div class="momento" data-aos="fade-up" data-aos-delay="${i*100}">#${i+1} ${m}</div>`;
  });
});
