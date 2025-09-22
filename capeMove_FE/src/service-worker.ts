self.addEventListener('install', (event: any) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: any) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open('api-fallback').then((cache: any) =>
        fetch(event.request)
          .then((res: any) => {
            cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => cache.match(event.request))
      )
    );
  }
});
