import withPWAInit from '@ducanh2912/next-pwa';

const nextConfig = {
  output: 'standalone',
};

export default withPWAInit({
  dest: "public",
  // Disable PWA in development mode
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: "/~offline",
    data: "/fallback.json",
    image: "/fallback.webp",
    audio: "/fallback.mp3",
    video: "/fallback.mp4",
    font: "/fallback-font.woff2",
  },
  
  workbox: {
    // Enable debugging for development
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
