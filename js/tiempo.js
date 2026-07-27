/*
====================================
Tiempo Malasia 2026
Previsión meteorológica diaria
====================================
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


const contenedor =
document.getElementById("lista-tiempo");



if(!contenedor){

return;

}



contenedor.innerHTML =
"🌦️ Cargando previsión...";



let html="";



for(const destino of destinosTiempo){



try{


const url =

`https://api.open-meteo.com/v1/forecast?latitude=${destino.lat}&longitude=${destino.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKuala_Lumpur`;



const respuesta =
await fetch(url);



const datos =
await respuesta.json();



html += crearTarjetaPrevision(
destino,
datos.daily
);



}


catch(error){



html += `

<div class="weather-card">

<h3>${destino.nombre}</h3>

<p>
❌ No disponible
</p>

</div>

`;


}



}



contenedor.innerHTML =

`

<p id="actualizacion">

Última actualización:
${new Date().toLocaleTimeString(
"es-ES",
{
hour:"2-digit",
minute:"2-digit"
}
)}

</p>


${html}

`;



}


// =====================================
// Crear tarjetas de previsión
// =====================================


function crearTarjetaPrevision(destino, diaria){



const fecha =
new Date(diaria.time[0])
.toLocaleDateString(
"es-ES",
{
day:"2-digit",
month:"2-digit"
}
);



const estado =
obtenerEstadoTiempo(
diaria.weather_code[0]
);



let recomendacion = "";



if(destino.nombre.includes("Taman Negara")){


recomendacion =

`
<br>

💡 Revisar:

<br>

🌉 Canopy Walk

<br>

🌙 Night Walk

`;

}




if(destino.nombre.includes("Perhentian")){


recomendacion =

`
<br>

💡 Especial atención:

<br>

🌊 Estado del mar

<br>

🚤 Traslado en barco

`;

}




if(destino.nombre.includes("Cameron")){


recomendacion =

`
<br>

💡 Atención:

<br>

🌫️ Niebla

<br>

🌧️ Lluvia en montaña

`;

}




return `


<div class="weather-card">


<h3>

${destino.nombre}

</h3>


<p>

📅 Próximo día:

<strong>
${fecha}
</strong>

</p>


<p>

🌡️ Máxima:

<strong>
${diaria.temperature_2m_max[0]} ºC
</strong>


<br>


🌡️ Mínima:

<strong>
${diaria.temperature_2m_min[0]} ºC
</strong>

</p>



<p>

${estado}

</p>



<p>

🌧️ Probabilidad lluvia:

<strong>
${diaria.precipitation_probability_max[0]}%
</strong>

</p>



${recomendacion}



</div>


`;

}







// =====================================
// Traducción meteorológica
// =====================================


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
// =====================================
// Alertas inteligentes
// =====================================


function generarAlertas(){

const caja =
document.getElementById("alertas-tiempo");


if(!caja){

return;

}


caja.innerHTML =

`

🌦️ La previsión ayuda a decidir:

<br><br>

🌿 Taman Negara:
revisar Canopy Walk y Night Walk.

<br><br>

🌊 Perhentian:
revisar estado del mar antes del barco.

<br><br>

🚗 Trayectos largos:
comprobar lluvia y visibilidad.

`;

}




// Iniciar aplicación


cargarTiempo();
