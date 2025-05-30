/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','auto-wheels.s3.eu-north-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "res.cloudinary.com"
        // You can add these as well 
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: "auto-wheels.s3.eu-north-1.amazonaws.com"
      },
      {
        protocol: 'http',
        hostname: "res.cloudinary.com"
      },
      {
        protocol: 'https',
        hostname: "cdn.pixabay.com"
      },
      {
        protocol: 'http',
        hostname: "placehold.co"
      },
      {
        protocol: 'http',
        hostname: "example.com"
      },
      {
        protocol: 'http',
        hostname: "via.placeholder.com"
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        pathname: '/dcfpazr4b/**'  // Add your cloudinary cloud name path
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com"
        // You can add these as well 
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: 'https',
        hostname: "example.com"
      },
      {
        protocol: 'https',
        hostname: "via.placeholder.com"
      },
      {
        protocol: 'https',
        hostname: 'auto-wheels.s3.amazonaws.com'  // Add your S3 bucket path
      }
    ],
  },
  experimental: {
    turbo: true, // Enables faster build with Turbo
  },
  swcMinify: true, // Faster minification
  async headers() {
    return [
      {
        source: '/(.*)', // Match all routes
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Allow requests from any origin
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' }, // Allow specified HTTP methods
          { key: 'Access-Control-Allow-Headers', value: '*' }, // Allow all headers
        ],
      },
    ];
  },
};


export default nextConfig;
