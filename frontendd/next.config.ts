
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://684cb2bf840a.ngrok-free.app', // <-- poné acá TU URL de ngrok
      },
    ];
  },
};

module.exports = nextConfig;


export default nextConfig;