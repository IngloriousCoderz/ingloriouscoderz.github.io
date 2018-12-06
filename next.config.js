const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')
const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withPurgeCSS = require('next-purgecss')
const withOptimizedImages = require('next-optimized-images')
const withNextein = require('nextein/config').default
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

dotenvLoad()
const withNextEnv = nextEnv()

module.exports = withPlugins(
  [withNextEnv, withCSS, withPurgeCSS, withOptimizedImages, withNextein],
  {
    exportPathMap: defaultPathMap => ({
      // ...defaultPathMap,
      '/why': { page: '/why' },
      '/who': { page: '/who' },
      '/who/consultant': { page: '/who/consultant' },
      '/who/tech-lead': { page: '/who/tech-lead' },
      '/who/mentor': { page: '/who/mentor' },
      '/who/teacher': { page: '/who/teacher' },
      '/what': { page: '/what' },
      '/what/code': { page: '/what/code' },
      '/what/speak': { page: '/what/speak' },
      '/what/volunteer': { page: '/what/volunteer' },
      '/what/community': { page: '/what/community' },
      '/how': { page: '/how' },
      '/when': { page: '/when' },
      '/where': { page: '/where' },
      '/how-much': { page: '/how-much' },
      '/logo': { page: '/logo' },
      '/blog': { page: '/blog' },
    }),

    webpack(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })

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
  },
)
