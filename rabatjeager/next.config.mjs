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
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/api/:path*"
                        : "/api/",
            },
        ];
    },
};

export default nextConfig;