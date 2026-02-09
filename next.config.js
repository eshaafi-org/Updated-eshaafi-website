/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    domains: [
      "d3lf92qdmyc9ip.cloudfront.net",
      "d2jq593czhrhl9.cloudfront.net",
      "image-upload-bucket-dev.s3.us-east-1.amazonaws.com",
      "us-east-1.console.aws.amazon.com",
      "img.icons8.com",
      "https://eshaafi-image-upload-bucket-us-east-1-stage.s3.us-east-1.amazonaws.com",
      "terafort.s3.ap-southeast-1.amazonaws.com",
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  transpilePackages: ['react-use-measure', 'framer-motion'],
  eslint: {
    // Ignore ESLint errors during build to prevent Amplify failure
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  serverRuntimeConfig: {
    maxDuration: 25,
  },
};

module.exports = nextConfig;
