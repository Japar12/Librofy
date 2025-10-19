import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "books.google.com" },
      { protocol: "http", hostname: "books.google.com" }, // ← tambahkan http juga
      { protocol: "https", hostname: "books.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "books.googleapis.com" },
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "www.gutenberg.org" },
      { protocol: "https", hostname: "www.gutenberg.net.au" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
