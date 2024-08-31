import { config } from 'dotenv';
import JavaScriptObfuscator from 'webpack-obfuscator';

config(); // This loads the .env file

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos-by-wocsol.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new JavaScriptObfuscator(
          {
            rotateStringArray: true,
            stringArray: true,
            stringArrayThreshold: 0.75,
            // Add other options as needed
          },
          []
        )
      );
    }

    return config;
  },
};

export default nextConfig;
