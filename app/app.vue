<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' }
  ]
})
</script>

<template>
  <div class="w-full flex items-center justify-center my-8">
    <NuxtPage/>
  </div>
</template>