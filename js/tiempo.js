/*
  Tiempo Malasia 2026
  Datos meteorológicos en tiempo real
*/

const destinosTiempo = [

{
nombre:"🏮 Malaca",
lat:2.1896,
lon:102.2501
},

{
nombre:"🌿 Taman Negara",
lat:4.3833,
lon:102.4167
},

{
nombre:"⛰️ Cameron Highlands",
lat:4.4721,
lon:101.3801
},

{
nombre:"🎨 Georgetown · Penang",
lat:5.4141,
lon:100.3288
},

{
nombre:"🌴 Tok Aman Bali",
lat:6.1025,
lon:102.4015
},

{
nombre:"🏝️ Perhentian",
lat:5.9167,
lon:102.7333
},

{
nombre:"🌊 Kuantan",
lat:3.8077,
lon:103.3260
},

{
nombre:"🏙️ Kuala Lumpur",
lat:3.1390,
lon:101.6869
}

];



async function cargarTiempo(){

const contenedor=document.getElementById("lista-tiempo");

if(!contenedor){
return;
}


contenedor.innerHTML="🌦️ Actualizando condiciones meteorológicas...";



let html="";


for(const destino of destinosTiempo){


try{


const url =
`https://api.open-meteo.com/v1/forecast?latitude=${destino.lat}&longitude=${destino.lon}&current=temperature_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&timezone=Asia%2FKuala_Lumpur`;


const respuesta=await fetch(url);


const datos=await respuesta.json();


const temperatura=
datos.current.temperature_2m;


const viento=
datos.current.wind_speed_10m;


const codigo=
datos.current.weather_code;


const lluvia=
datos.hourly.precipitation_probability[0];


html += crearTarjetaTiempo(
destino.nombre,
temperatura,
viento,
lluvia,
codigo
);


}catch(error){


html += crearTarjetaTiempo(
destino.nombre,
"--",
"--",
"--",
0
);


}


}



contenedor.innerHTML=
`
<p class="actualizacion">
Última actualización: ${new Date().toLocaleTimeString("es-ES",
{
hour:"2-digit",
minute:"2-digit"
})}
</p>

${html}

`;



generarAlertas();

}
// Crear tarjeta de cada destino

function crearTarjetaTiempo(
nombre,
temperatura,
viento,
lluvia,
codigo
){


const estado = obtenerEstadoTiempo(codigo);



let recomendacion="";


if(nombre.includes("Taman Negara")){


recomendacion=
`
<br>
💡 Revisar antes de:
<br>
🌉 Canopy Walk
<br>
🌙 Night Walk
`;

}


if(nombre.includes("Perhentian")){


recomendacion=
`
<br>
💡 Especial atención:
<br>
🌊 Estado del mar
<br>
🚤 Traslados en barco
`;

}



return `

<div class="tiempo-card">


<h3>${nombre}</h3>


<p>

🌡️ Temperatura:
<strong>${temperatura} ºC</strong>

</p>


<p>

${estado}

</p>


<p>

💨 Viento:
${viento} km/h

</p>


<p>

🌧️ Probabilidad lluvia:
<strong>${lluvia}%</strong>

</p>


${recomendacion}


</div>

`;

}





// Traducción del código meteorológico


function obtenerEstadoTiempo(codigo){


if(codigo===0){

return "☀️ Despejado";

}


if(codigo===1 || codigo===2){

return "🌤️ Parcialmente nublado";

}


if(codigo===3){

return "☁️ Nublado";

}


if(codigo>=51 && codigo<=67){

return "🌧️ Lluvia";

}


if(codigo>=80 && codigo<=82){

return "🌦️ Chubascos";

}


if(codigo>=95){

return "⛈️ Tormenta";

}


return "🌥️ Variable";


}
// Alertas inteligentes según condiciones

function generarAlertas(){


const caja =
document.getElementById("alertas-tiempo");


if(!caja){

return;

}



let alertas=[];



// Aquí dejamos preparado el sistema.
// En futuras mejoras podremos añadir
// avisos automáticos por lluvia,
// viento o tormentas.



if(alertas.length===0){


caja.innerHTML=
`
✅ Sin alertas meteorológicas importantes actualmente.
`;



}else{


caja.innerHTML=
`
⚠️ <strong>Revisar:</strong>

<br><br>

${alertas.join("<br>")}

`;

}



}




// Iniciar carga

cargarTiempo();
