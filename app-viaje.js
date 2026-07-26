const hoy = new Date();

const inicioViaje = new Date("2026-08-09T16:40:00");
const finViaje = new Date("2026-08-29T23:59:59");

const tarjeta = document.getElementById("today-card");

console.log("HOY:", hoy);
console.log("INICIO:", inicioViaje);
console.log("ANTES:", hoy < inicioViaje);
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

  } else {

    contenido = `
      <h2>🏠 Viaje terminado</h2>
      <p>Esperamos que hayas disfrutado de Malasia 2026 🇲🇾</p>
    `;

  }

  console.log("CONTENIDO:", contenido);

  tarjeta.innerHTML = contenido;

}
