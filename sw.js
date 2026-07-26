const CACHE_NAME = "malasia-2026-v1";

const FILES_TO_CACHE = [
  "/malasia-2026/",
  "/malasia-2026/index.html",
  "/malasia-2026/itinerario.html",
  "/malasia-2026/reservas.html",
  "/malasia-2026/manifest.json",

  "/malasia-2026/css/style.css",

  "/malasia-2026/img/icons/icon-192.png",
  "/malasia-2026/img/icons/icon-512.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});


self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
