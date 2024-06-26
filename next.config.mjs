import withPWAInit from '@ducanh2912/next-pwa';

const nextConfig = {
  output: 'standalone',
};

export default withPWAInit({
  dest: "public",
  fallbacks: {
    document: "/~offline",
    data: "/fallback.json",
    image: "/fallback.webp",
    audio: "/fallback.mp3",
    video: "/fallback.mp4",
    font: "/fallback-font.woff2",
  },
  workbox: {
    debug: true,
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
