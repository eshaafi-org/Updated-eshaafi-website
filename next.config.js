/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      // Cache optimized images served by Next.js image optimizer
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            // Cache optimized image responses for 30 days (adjustable)
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Match any path under /_next/image (covers some deployments)
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
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
  output: 'standalone',   
};

module.exports = nextConfig;
