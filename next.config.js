/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REDIS_URL: process.env.REDIS_URL,
        VERCEL_URL: process.env.VERCEL_URL
    },
    images: {
        domains: ['avatars.githubusercontent.com', 'platform-lookaside.fbsbx.com']
    },
    reactStrictMode: true
};

module.exports = nextConfig;
