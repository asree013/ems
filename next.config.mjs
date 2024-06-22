import withPWAInit from '@ducanh2912/next-pwa';
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
};
withPWAInit({
  dest: "public",
  
})

export default withPWAInit(nextConfig)

// export default nextConfig;
