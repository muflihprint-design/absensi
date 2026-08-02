// UBAH NAMA CACHE INI SETIAP KALI ANDA MELAKUKAN PEMBARUAN PADA HTML/CSS/JS
// Contoh: v1, v2, v3, dst.
const CACHE_NAME = 'absensi-cache-v2'; 

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install Service Worker & Simpan Cache Baru
self.addEventListener('install', event => {
  // skipWaiting() memaksa service worker baru untuk langsung aktif 
  // tanpa menunggu aplikasi ditutup
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker & Hapus Cache Lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Jika nama cache tidak sama dengan versi terbaru, HAPUS!
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch/Load Web
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Gunakan cache jika ada, kalau tidak ambil dari internet
        return response || fetch(event.request);
      })
  );
});
