// Tiempo Malasia 2026
// Datos meteorológicos en tiempo real


const destinosTiempo = [

{
nombre: "✈️ Kuala Lumpur",
lat: 2.7456,
lon: 101.7072
},

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



async function cargarTiempo() {


for (const destino of destinosTiempo) {


const url = 
`https://api.open-meteo.com/v1/forecast?latitude=${destino.lat}&longitude=${destino.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FKuala_Lumpur`;



try {


const respuesta = await fetch(url);


const datos = await respuesta.json();



console.log(destino.nombre, datos.current);



} catch(error) {


console.error(
"Error cargando tiempo:",
destino.nombre,
error
);


}


}


}



cargarTiempo();
