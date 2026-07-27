// Tiempo Malasia 2026
// Datos meteorológicos en tiempo real


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
nombre: "🎨 Georgetown",
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



function interpretarTiempo(codigo) {


const estados = {

0:"☀️ Despejado",

1:"🌤️ Principalmente despejado",

2:"⛅ Parcialmente nublado",

3:"☁️ Nublado",

45:"🌫️ Niebla",

51:"🌦️ Llovizna",

61:"🌧️ Lluvia",

63:"🌧️ Lluvia moderada",

65:"🌧️ Lluvia intensa",

80:"🌦️ Chubascos",

81:"🌧️ Chubascos moderados",

82:"⛈️ Chubascos fuertes",

95:"⛈️ Tormenta"

};


return estados[codigo] || "🌦️ Variable";

}




async function cargarTiempo(){


const contenedor = document.getElementById("lista-tiempo");


if(!contenedor) return;



contenedor.innerHTML="";



for(const destino of destinosTiempo){


const url =

`https://api.open-meteo.com/v1/forecast?latitude=${destino.lat}&longitude=${destino.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FKuala_Lumpur`;



try{


const respuesta = await fetch(url);

const datos = await respuesta.json();



const actual = datos.current;



contenedor.innerHTML += `


<div class="weather-card">


<h3>${destino.nombre}</h3>


<p>

🌡️ ${Math.round(actual.temperature_2m)} ºC

<br>

${interpretarTiempo(actual.weather_code)}

<br>

💨 Viento: ${Math.round(actual.wind_speed_10m)} km/h

</p>


</div>


`;



}

catch(error){


contenedor.innerHTML += `

<p>

❌ No disponible: ${destino.nombre}

</p>

`;


}


}



const ahora = new Date();


const etiqueta = document.getElementById("actualizacion-tiempo");


if(etiqueta){

etiqueta.innerHTML =
"Última actualización: "
+
ahora.toLocaleTimeString("es-ES",
{
hour:"2-digit",
minute:"2-digit"
});

}


}



cargarTiempo();
