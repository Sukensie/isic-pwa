<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/isic-pwa/manifest.webmanifest' },
    { rel: 'icon', href: '/isic-pwa/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/isic-pwa/isic_logo-192x192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', href: '/isic-pwa/isic_logo-512x512.png', sizes: '512x512' }
  ],
  meta: [
    { name: 'theme-color', content: '#3c393c' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'ISIC' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' }
  ]
})
// Add any global logic or imports here if needed
</script>

<template>
  <div class="w-full flex items-center justify-center mb-8">
    <NuxtPage/>
  </div>
</template>

<style>
html, body {
  overflow: hidden !important;
  overscroll-behavior: none !important;
  touch-action: none;
  height: 100%;
}
body {
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-top: 1em;
}
</style>