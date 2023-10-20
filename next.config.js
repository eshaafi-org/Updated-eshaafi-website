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
    ], // Add the domain causing the error here
  },
};

module.exports = nextConfig;
