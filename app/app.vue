<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/isic-pwa/manifest.webmanifest' },
    { rel: 'icon', href: '/isic-pwa/favicon.ico' }
  ],
  meta: [
    { name: 'theme-color', content: '#3c393c' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'ISIC' }
  ]
})
// Add any global logic or imports here if needed
</script>

<template>
  <div class="w-full flex items-center justify-center my-8">
    <NuxtPage/>
  </div>
</template>