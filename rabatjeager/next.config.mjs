/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'digitalassets.sallinggroup.com',
                pathname: '/image/upload/**',
            },
        ],
    },
};

export default nextConfig;