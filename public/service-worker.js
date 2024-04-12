// service-worker.js

const CACHE_NAME = 'mi-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico', // Asegúrate de incluir el favicon si lo tienes
  // Archivos generados por CRA
  '/static/css/main.*.css',
  '/static/js/main.*.js',
  '/static/js/0.*.chunk.js', // Pueden haber varios archivos con nombres diferentes
  '/static/js/*.chunk.js', // Otros archivos de chunk de JavaScript generados
  // Otros recursos estáticos (imágenes, fuentes, etc.)
  '/static/media/logo.*.svg',
  // Agrega aquí otros archivos estáticos que quieras cachear
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
