/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'media.draintart.gallery'
            },
            {
                protocol: "https",
                hostname: "media-draint-art-ams3.ams3.digitaloceanspaces.com"
            }
        ]
    }
};

export default nextConfig;
