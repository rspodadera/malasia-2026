const hoy = new Date("2026-08-11T12:00:00");

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
      <p>⏳ Faltan ${dias} días para el viaje</p>
      <p>✈️ Llegada: 10 agosto 2026</p>
      <p>📍 Primera parada: Malaca</p>
    `;

  } else if (hoy <= finViaje) {

    contenido = `
      <h2>📍 Estamos de viaje</h2>
      <h3>Malasia 2026</h3>
      <p>Hoy es ${hoy.toLocaleDateString()}</p>
      <p>🏝️ Disfrutando del itinerario</p>
    `;

  } else {

    contenido = `
      <h2>✨ Viaje completado</h2>
      <h3>Malasia 2026</h3>
      <p>Guarda tus recuerdos de esta aventura</p>
    `;

  }

  tarjeta.innerHTML = contenido;

}
