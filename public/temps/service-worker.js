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

// public/service-worker.js
self.addEventListener('activate', event => {
  const cacheWhitelist = ['my-cache'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
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
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        if (response.status === 401) {
          // จัดการกรณีที่ตอบสนองด้วยรหัสสถานะ 401
        }
        return response;
      });
    })
  );
});
