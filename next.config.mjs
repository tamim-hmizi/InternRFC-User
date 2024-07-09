/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "w3.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
