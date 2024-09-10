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
  }
};

export default withPWAInit({
  dest: "public",
  // Disable PWA in development mode
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: "/~offline",
    data: "/_next/data/fallback.json",
    image: "/fallback.webp",
    audio: "/fallback.mp3",
    video: "/fallback.mp4",
    font: "/fallback-font.woff2",
  },
  
  workbox: {
    debug: process.env.NODE_ENV === 'development',
    strategies: [
      {
        strategyName: 'NetworkFirst',
        options: {
          ignoreVary: true,
        },
      },
    ],
  },
})(nextConfig);
