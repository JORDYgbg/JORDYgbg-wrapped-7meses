document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('datos.json');
  const data = await res.json();

  // Días juntos
  const inicio = new Date(data.fecha_inicio);
  const hoy = new Date('2025-12-12');
  const dias = Math.floor((hoy - inicio) / (1000*60*60*24));
  document.getElementById('dias-juntos').textContent = `${dias} días conquistando el mundo virtual ♡`;

  // Canción principal
  document.getElementById('cancion-principal').textContent = data.cancion_principal;

  // Slider meses con indicadores e img (usa portadas de juegos como placeholder)
  const slider = document.getElementById('meses-slider');
  const indicators = document.getElementById('meses-indicators');
  const juegosPortadas = data.juegos_top.map(j => j.portada); // Reusa portadas para meses
  data.meses.forEach((mes, i) => {
    const active = i === 0 ? 'active' : '';
    const imgSrc = mes.foto || juegosPortadas[i % juegosPortadas.length]; // Placeholder si no hay foto
    slider.innerHTML += `
      <div class="carousel-item ${active}">
        <div class="mes-card">
          <img src="${imgSrc}" alt="Momento Mes ${mes.mes}">
          <h3>Mes ${mes.mes}</h3>
          <h4>${mes.titulo}</h4>
          <p><i class="fa-solid fa-music"></i> Canción: ${mes.cancion_dedicada}</p>
          <ul class="text-start mt-3">
            ${mes.momentos.map(m => `<li><i class="fa-solid fa-star"></i> ${m}</li>`).join('')}
          </ul>
        </div>
      </div>`;
    indicators.innerHTML += `<button type="button" data-bs-target="#meses-carousel" data-bs-slide-to="${i}" class="${active ? 'active' : ''}"></button>`;
  });

  // Juegos
  const juegosSec = document.getElementById('juegos-section');
  data.juegos_top.forEach(juego => {
    juegosSec.innerHTML += `
      <div class="col-lg-4 col-md-6">
        <div class="juego-card" data-aos="zoom-in">
          <img src="${juego.portada}" alt="${juego.nombre}">
          <h4>${juego.nombre}</h4>
          <p><i class="fa-solid fa-trophy"></i> ${juego.stats}</p>
        </div>
      </div>`;
  });

  // Top momentos
  const topSec = document.getElementById('top-momentos');
  data.top_momentos.forEach((m, i) => {
    topSec.innerHTML += `<div class="momento" data-aos="fade-up" data-aos-delay="${i*150}">#${i+1} ${m}</div>`;
  });
});
