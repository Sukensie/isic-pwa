<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
// Add any global logic or imports here if needed
</script>

<template>
  <div class="w-full flex items-center justify-center my-8">
    <NuxtPage/>
  </div>
</template>