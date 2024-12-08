import fs from 'fs';
import path from 'path';
import withPWAInit from '@ducanh2912/next-pwa';

const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (isServer) {
      const fallbackDir = path.resolve('public', '_next', 'data');
      const fallbackFile = path.join(fallbackDir, 'fallback.json');

      // สร้างโฟลเดอร์และไฟล์ fallback.json ถ้ายังไม่มี
      if (!fs.existsSync(fallbackFile)) {
        fs.mkdirSync(fallbackDir, { recursive: true });
        fs.writeFileSync(fallbackFile, JSON.stringify({ message: 'Fallback content' }));
      }
    }

    return config;
  },
};

// export default withPWAInit({
//   dest: "public",
//   disable: process.env.NODE_ENV === 'development', // ปิดการทำงาน PWA ในโหมด development
//   fallbacks: {
//     document: '/~offline', // หน้า fallback HTML เมื่อไม่มีการเชื่อมต่อ
//   },
//   pwa: {
//     start_url: '/', // หน้าเริ่มต้น
//     scope: '/', // ขอบเขตของ PWA
//     display: 'standalone', // ให้เปิดแบบ Fullscreen
//     background_color: '#ffffff',
//     theme_color: '#000000',
//     icons: [
//       {
//         src: '/icons/icon-192x192.png',
//         sizes: '192x192',
//         type: 'image/png',
//       },
//       {
//         src: '/icons/icon-512x512.png',
//         sizes: '512x512',
//         type: 'image/png',
//       },
//     ],
//   },
//   workbox: {
//     runtimeCaching: [
//       {
//         urlPattern: /~offline/, // เพิ่มการแคชหน้า fallback
//         handler: 'CacheFirst',
//         options: {
//           cacheName: 'offline-html',
//         },
//       },
//       {
//         urlPattern: /.*\.(?:js|css|html)/, // แคชไฟล์ JS, CSS, HTML
//         handler: 'StaleWhileRevalidate',
//         options: {
//           cacheName: 'static-resources',
//         },
//       },
//       {
//         urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)/, // แคชไฟล์รูปภาพ
//         handler: 'CacheFirst',
//         options: {
//           cacheName: 'image-cache',
//           expiration: {
//             maxEntries: 50,
//             maxAgeSeconds: 60 * 60 * 24 * 30, // อายุ 30 วัน
//           },
//         },
//       },
//     ],
//   },
// })(nextConfig);

export default nextConfig