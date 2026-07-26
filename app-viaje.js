const hoy = new Date();

const inicioViaje = new Date("2026-08-10");
const finViaje = new Date("2026-08-29");

const tarjeta = document.getElementById("today-card");

if (tarjeta) {

  let contenido = "";

  if (hoy < inicioViaje) {

    const dias = Math.ceil(
      (inicioViaje - hoy) / (1000 * 60 * 60 * 24)
    );

    contenido = `
      <h2>🇲🇾 Próxima aventura</h2>
      <h3>Malasia 2026</h3>
      <p>📅 Faltan ${dias} días para el viaje</p>
      <p>✈️ Llegada: 10 agosto 2026</p>
      <p>📍 Primera parada: Malaca</p>
    `;

  } else if (hoy <= finViaje) {

    const etapa = viaje.find(item => {
      return hoy >= new Date(item.inicio) &&
             hoy < new Date(item.fin);
    });

      contenido = `
      <h2>📍 Hoy estamos en...</h2>

      <h3>${etapa.icono} ${etapa.lugar}</h3>

      <p>🏨 ${etapa.hotel}</p>

      <p>⭐ ${etapa.plan}</p>

      <p>➡️ Próximo:
      <br>
      ${etapa.siguiente}
    </p>
    `;

  } else {

    contenido = `
      <h2>✨ Viaje completado</h2>
      <h3>Malasia 2026</h3>
      <p>📸 Guarda tus recuerdos de esta aventura</p>
      <p>🇲🇾 10 - 29 agosto 2026</p>
    `;

  }

  tarjeta.innerHTML = contenido;
}
