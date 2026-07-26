const hoy = new Date();
const inicioViaje = new Date("2026-08-10");
const finViaje = new Date("2026-08-29");

const tarjeta = document.getElementById("today-card");

console.log(viaje);

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

  const etapa = viaje.find(item => {

    const inicio = new Date(item.inicio + "T00:00:00");
    const fin = new Date(item.fin + "T23:59:59");

    return hoy >= inicio && hoy <= fin;

  });

  if (etapa) {

    contenido = `
      <h2>📍 Hoy estamos en...</h2>
      <h3>${etapa.icono} ${etapa.lugar}</h3>
      <p>🏨 ${etapa.hotel}</p>
      <p>⭐ ${etapa.plan}</p>
      <p>➡️ Próximo: ${etapa.siguiente}</p>
    `;

  } else {

    contenido = `
      <h2>📍 Estamos de viaje</h2>
      <p>No hay etapa encontrada</p>
    `;

  }

  tarjeta.innerHTML = contenido;

  }
}
