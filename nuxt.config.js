const pkg = require('./package')
const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}

function markdownRoutes(root, prefix = '', index = true) {
  const files = glob.sync(path.join(root, './**')).filter(file => path.extname(file) == '.md')
  return files.map(file => {
    const slug = file.substr(root.length).split('.').slice(0, -1).join('.')
    return prefix + slug + '/'
  })
}

module.exports = {
  mode: 'universal',
  env: {
    buildVersion: process.env.BUILD_VERSION || 'dev',
    imaginaryUrl: 'https://media.larsson.gg/',
    imaginaryEnabledUrl: false
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'larsson.gg',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: ''
  },

  /*
  ** Router configuration
  */
  router: {
    linkActiveClass: 'is-active',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'markdown',
        path: '/:slug*',
        component: resolve(__dirname, `./pages/markdown/_slug.vue`)
      })
    }
  },

  /*
  ** Generate
  */
  generate: {
    routes: markdownRoutes(path.join(__dirname, './static/markdown'))
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Node
      config.node = {
        fs: 'empty'
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }

      // PurgeCSS
      if (!ctx.isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ["vue"]
              }
            ],
            whitelist: ['html', 'body', 'nuxt-progress']
          })
        )
      }
    }
  }
}
