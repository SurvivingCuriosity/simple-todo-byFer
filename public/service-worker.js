// service-worker.js

const CACHE_NAME = 'mi-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // '/favicon/favicon.ico', // Asegúrate de incluir el favicon si lo tienes
  // Archivos generados por CRA
  // '/static/css/main.*.css',
  // '/static/js/main.*.js',
  // Otros recursos estáticos (imágenes, fuentes, etc.)
  // '/static/media/export_icon.*.svg',
  // '/static/media/icono_ajustes.*.svg',
  // '/static/media/icono_anadir_disabled.*.svg',
  // '/static/media/icono_anadir_enabled.*.svg',
  // '/static/media/icono_borrar_rojo.*.svg',
  // '/static/media/icono_editar.*.svg',
  // '/static/media/icono_expandir_gris.*.svg',
  // '/static/media/icono_guardar.*.svg',
  // '/static/media/import_icon.*.svg',
  // '/static/media/export_icon.*.svg',
  // '/static/media/moon_icon.*.svg',
  // '/static/media/sun_icon.*.svg',
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
