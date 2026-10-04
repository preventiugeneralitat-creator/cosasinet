const CACHE_NAME = 'tecnicos-inet-v1';

// Al instalar, omitir espera para activarse de inmediato
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Reclamar el control de los clientes inmediatamente
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Estrategia Network-First: Siempre intenta ir a la red primero
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Devuelve el contenido recién descargado de internet
        return networkResponse;
      })
      .catch(() => {
        // Solo si no hay internet en absoluto busca en la caché
        return caches.match(event.request);
      })
  );
});