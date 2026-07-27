// =======================================
// Tiempo Malasia 2026
// Datos meteorológicos en tiempo real
// =======================================


const destinosTiempo = [

{
nombre: "🏮 Malaca",
lat: 2.1896,
lon: 102.2501
},

{
nombre: "🌿 Taman Negara",
lat: 4.3833,
lon: 102.4000
},

{
nombre: "⛰️ Cameron Highlands",
lat: 4.4721,
lon: 101.3768
},

{
nombre: "🎨 Georgetown · Penang",
lat: 5.4141,
lon: 100.3288
},

{
nombre: "🌴 Tok Aman Bali",
lat: 6.1000,
lon: 102.4500
},

{
nombre: "🏝️ Perhentian",
lat: 5.9167,
lon: 102.7167
},

{
nombre: "🌊 Kuantan",
lat: 3.8077,
lon: 103.3260
},

{
nombre: "🏙️ Kuala Lumpur",
lat: 3.1390,
lon: 101.6869
}

];





function describirTiempo(codigo) {


const estados = {

0: "☀️ Despejado",

1: "🌤️ Principalmente despejado",

2: "⛅ Parcialmente nublado",

3: "☁️ Nublado",

45: "🌫️ Niebla",

48: "🌫️ Niebla",

51: "🌦️ Llovizna ligera",

53: "🌦️ Llovizna",

55: "🌧️ Llovizna intensa",

61: "🌧️ Lluvia ligera",

63: "🌧️ Lluvia moderada",

65: "🌧️ Lluvia intensa",

80: "🌦️ Chubascos",

81: "🌧️ Chubascos moderados",

82: "⛈️ Chubascos fuertes",

95: "⛈️ Tormenta",

96: "⛈️ Tormenta con granizo",

99: "⛈️ Tormenta fuerte"

};


return estados[codigo] || "🌦️ Tiempo variable";

}





async function cargarTiempo() {

let datosTiempo = [];
  
const contenedor = document.getElementById("lista-tiempo");


if (!contenedor) return;


contenedor.innerHTML = "";



for (const destino of destinosTiempo) {


const url =

`https://api.open-meteo.com/v1/forecast?latitude=${destino.lat}&longitude=${destino.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FKuala_Lumpur`;



try {


const respuesta = await fetch(url);


const datos = await respuesta.json();



const actual = datos.current;

 datosTiempo.push({

nombre: destino.nombre,

weather_code: actual.weather_code,

wind_speed: actual.wind_speed_10m

});


contenedor.innerHTML += `


<div class="weather-card">


<h3>${destino.nombre}</h3>


<p>

🌡️ Temperatura:
<strong>${Math.round(actual.temperature_2m)} ºC</strong>

<br><br>

${describirTiempo(actual.weather_code)}

<br><br>

💨 Viento:
${Math.round(actual.wind_speed_10m)} km/h

</p>


</div>


`;



}

catch(error) {


contenedor.innerHTML += `


<div class="weather-card">


<h3>${destino.nombre}</h3>


<p>

❌ No disponible

</p>


</div>


`;

}


}



const fecha = new Date();


const etiqueta = document.getElementById("actualizacion-tiempo");


if (etiqueta) {


etiqueta.innerHTML =

"Última actualización: "

+

fecha.toLocaleTimeString(
"es-ES",
{
hour: "2-digit",
minute: "2-digit"
}
);


}



}

function generarAlertas(datosTiempo) {


const caja = document.getElementById("alertas-tiempo");


if (!caja) return;


let alertas = [];



for (const dato of datosTiempo) {


if (dato.weather_code >= 95) {

alertas.push(
"⛈️ Posibles tormentas en " + dato.nombre
);

}


else if (dato.weather_code >= 61) {

alertas.push(
"🌧️ Lluvia prevista en " + dato.nombre
);

}


if (dato.wind_speed >= 30) {

alertas.push(
"💨 Viento fuerte en " + dato.nombre
);

}


}



if (alertas.length === 0) {


caja.innerHTML =

"✅ Sin alertas meteorológicas importantes actualmente.";


}

else {


caja.innerHTML =

"⚠️ <strong>Revisar:</strong><br><br>"

+

alertas.join("<br><br>");

}

generarAlertas(datosTiempo);

}



function generarAlertas(datosTiempo) {


const caja = document.getElementById("alertas-tiempo");


if (!caja) return;


let alertas = [];



for (const dato of datosTiempo) {


if (dato.weather_code >= 95) {

alertas.push(
"⛈️ Posibles tormentas en " + dato.nombre
);

}


else if (dato.weather_code >= 61) {

alertas.push(
"🌧️ Lluvia prevista en " + dato.nombre
);

}


if (dato.wind_speed >= 30) {

alertas.push(
"💨 Viento fuerte en " + dato.nombre
);

}


}



if (alertas.length === 0) {


caja.innerHTML =

"✅ Sin alertas meteorológicas importantes actualmente.";


}

else {


caja.innerHTML =

"⚠️ <strong>Revisar:</strong><br><br>"

+

alertas.join("<br><br>");

}


}



cargarTiempo();
