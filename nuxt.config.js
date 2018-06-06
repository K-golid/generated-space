const pkg = require('./package');
const sanityClient = require('@sanity/client');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    script: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.10/p5.js' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: ['@/static/global.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  },

  generate: {
    routes: function() {
      const sanity = sanityClient({
        projectId: '0jzrcm4a',
        dataset: 'production',
        useCdn: true
      });
      return sanity.fetch(`*[_type == "sketch"]{slug}[0...100]`).then(sketches => {
        return sketches.map(sketch => {
          return '/sketch/' + sketch.slug.current;
        });
      });
    }
  }
};
