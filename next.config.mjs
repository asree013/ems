import withPWAInit from '@ducanh2912/next-pwa';

const nextConfig = {
  output: 'standalone',
};

export default withPWAInit({
  dest: "public",
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
    // This is for /_next/.../.json files.
    data: "/fallback.json",
    // This is for images.
    image: "/fallback.webp",
    // This is for audio files.
    audio: "/fallback.mp3",
    // This is for video files.
    video: "/fallback.mp4",
    // This is for fonts.
    font: "/fallback-font.woff2",
  },
})(nextConfig);
