const withImages = require('next-images')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = withImages({
  webpack(config) {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        navigateFallback: '/index',
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    )
    return config
  },

  webpackDevMiddleware(config) {
    config.watchOptions = {
      ignored: [/\.git\//, /\.next\//, /node_modules/],
    }
    return config
  },
})
