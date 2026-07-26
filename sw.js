const CACHE_NAME = "malasia-2026-v8";

const FILES_TO_CACHE = [

  // Páginas principales
  "/malasia-2026/",
  "/malasia-2026/index.html",
  "/malasia-2026/itinerario.html",
  "/malasia-2026/reservas.html",
  "/malasia-2026/presupuesto.html",
  "/malasia-2026/consejos.html",
  "/malasia-2026/emergencias.html",
  "/malasia-2026/gastronomia.html",
  "/malasia-2026/compras.html",
  "/malasia-2026/antes-de-salir.html",
  "/malasia-2026/mas.html",
  

  // Destinos
  "/malasia-2026/destinos/malaca.html",
  "/malasia-2026/destinos/taman-negara.html",
  "/malasia-2026/destinos/cameron-highlands.html",
  "/malasia-2026/destinos/george-town.html",
  "/malasia-2026/destinos/perhentian.html",
  "/malasia-2026/destinos/kuala-lumpur.html",

  // CSS
  "/malasia-2026/css/style.css",
  "/malasia-2026/css/mobile.css",
  "/malasia-2026/css/variables.css",

  // JS
  "/malasia-2026/js/app.js",
  "/malasia-2026/app-viaje.js",
  "/malasia-2026/viaje.js",
  
  // Iconos
  "/malasia-2026/img/icons/icon-192.png",
  "/malasia-2026/img/icons/icon-512.png"
];


// Instalar y guardar archivos
self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

});


// Activar nueva versión
self.addEventListener("activate", event => {

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );

});


// Servir desde caché si no hay internet
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
