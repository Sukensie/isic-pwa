import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  app: {
    baseURL: '/isic-pwa/',
  },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    [
      '@vite-pwa/nuxt',
      {
        registerType: 'autoUpdate',
      }
    ]
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: ['recompensable-marth-unpridefully.ngrok-free.dev']
    }
  },
})