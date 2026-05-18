const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com'],
  },
  sassOptions: {
    // additionalData: "/styles/Partials/index"
    includePaths: [path.join(__dirname, "styles/Partials/index")]
  }
}


module.exports = nextConfig
