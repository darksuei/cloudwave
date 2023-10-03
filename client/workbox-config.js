module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{html,js,css,png,jpg,svg}"],
  swDest: "build/service-worker.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:html|js|css|png|jpg|svg)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "NetworkFirst",
      options: {
        cacheName: "google-fonts",
      },
    },
  ],
};
