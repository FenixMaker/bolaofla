self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/escudos/notification-icon.png'
  });
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('bolaov1').then(cache => cache.addAll([
      '/',
      '/index.html',
      '/escudos/flamengo.svg',
      '/escudos/adversario.svg',
      '/src/main.jsx'
    ]))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});