// public/service-worker.js

self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles/main.css',
          // เพิ่มไฟล์อื่น ๆ ที่ต้องการแคช
        ]);
      })
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== 'my-cache') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  