import fs from 'fs';
import path from 'path';
import withPWAInit from '@ducanh2912/next-pwa';

// const nextConfig = {
//   output: 'standalone',
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       const fallbackDir = path.resolve('public', '_next', 'data');
//       const fallbackFile = path.join(fallbackDir, 'fallback.json');

//       // สร้างโฟลเดอร์และไฟล์ fallback.json ถ้ายังไม่มี
//       if (!fs.existsSync(fallbackFile)) {
//         fs.mkdirSync(fallbackDir, { recursive: true });
//         fs.writeFileSync(fallbackFile, JSON.stringify({ message: 'Fallback content' }));
//       }
//     }

//     return config;
//   },
// };

// export default withPWAInit({
//   dest: "public",
//   // Disable PWA in development mode
//   disable: process.env.NODE_ENV === 'development',
//   fallbacks: {
//     document: "/~offline",  // Fallback เมื่อไม่มีการเชื่อมต่อ
//     data: "/_next/data/fallback.json",  // ใช้ fallback data เมื่อออฟไลน์
//     image: "/fallback.webp",  // รูปภาพ fallback
//     audio: "/fallback.mp3",  // เสียง fallback
//     video: "/fallback.mp4",  // วิดีโอ fallback
//     font: "/fallback-font.woff2",  // ฟอนต์ fallback
//   },

//   workbox: {
//     debug: process.env.NODE_ENV === 'development',
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,  // จับทุก request ที่เป็น HTTP หรือ HTTPS
//         handler: 'NetworkFirst',  // ดึงจากเครือข่ายก่อน ถ้าออฟไลน์ใช้แคชแทน
//         options: {
//           cacheName: 'http-cache',
//           expiration: {
//             maxEntries: 200,  // เก็บสูงสุด 200 entries
//             maxAgeSeconds: 60 * 60 * 24 * 30,  // อายุแคช 30 วัน
//           },
//         },
//       },
//       {
//         urlPattern: /.*\.css$/,  // จับไฟล์ .css
//         handler: 'StaleWhileRevalidate',  // ใช้แคชเป็นหลัก แต่โหลดใหม่จากเครือข่าย
//         options: {
//           cacheName: 'css-cache',
//           expiration: {
//             maxAgeSeconds: 60 * 60 * 24 * 30,  // อายุแคช 30 วัน
//           },
//         },
//       },
//       {
//         urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,  // จับไฟล์รูปภาพ
//         handler: 'CacheFirst',  // ใช้แคชเป็นหลัก
//         options: {
//           cacheName: 'image-cache',
//           expiration: {
//             maxEntries: 100,  // เก็บสูงสุด 100 รูป
//             maxAgeSeconds: 60 * 60 * 24 * 30,  // อายุแคช 30 วัน
//           },
//         },
//       },
//     ],
//   },
// })(nextConfig);

export default {
  dest: "public",
  env: {
    NEXT_PUBLIC_BASE_LOCAL: process.env.NEXT_PUBLIC_BASE_LOCAL
  }
}
