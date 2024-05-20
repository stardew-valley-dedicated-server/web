// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@vueuse/nuxt'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: {
    enabled: true
  },
  typescript: {
    strict: false
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'only-multiline',
        braceStyle: '1tbs'
      }
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      prefix: 'sd'
    }
  ],
  nitro: {
    experimental: {
      websocket: true
    },
  },
  vite: {
    // server: {
    //   watch: {
    //     usePolling: true,
    //   }
    // }
    build: {
      rollupOptions: {
        external: [
          // Exclude because it breaks the vite build,
          // only here for websocket client code generation
          'sub_modules/asyncapi-generator-template-ts/**',
        ]
      }
    }
  },
  devServer: {
    host: '0.0.0.0'
  }
})
