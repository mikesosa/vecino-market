import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "@mapbox/rehype-prism";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "images.unsplash.com",
      "clownfish-app-5jmtx.ondigitalocean.app",
      "clownfish-app-5jmtx.ondigitalocean.apphttps",
      "vecino-market-strapi-s3-bucket.s3.amazonaws.com",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
