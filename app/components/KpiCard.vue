<template>
  <div
    class="w-full bg-black/20 rounded-xl p-6 text-white min-w-[200px] shadow-lg flex flex-col items-start relative overflow-hidden group"
    :style="cardStyle"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="text-white/80 uppercase font-light text-sm mb-2">{{ title }}</div>
    <div class="text-3xl font-bold mb-2">{{ formatNumber(value) }}</div>
    <div
      :class="[
      'flex items-center gap-1 text-base',
      isPositiveComputed ? 'text-green-400' : 'text-red-400'
      ]"
      :style="{ opacity: props.change === 0 ? 0 : 1 }"
    >
      <span>{{ isPositiveComputed ? '+' : '-' }} {{ absChange }}%</span>
      <span class="text-[0.95em] opacity-80">{{ changeDesc }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  value: number
  change: number
  changeDesc: string
}>()

const highlight = ref({ x: 50, y: 50, show: false })

function onMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  highlight.value.x = ((e.clientX - rect.left) / rect.width) * 100
  highlight.value.y = ((e.clientY - rect.top) / rect.height) * 100
  highlight.value.show = true
}

function onMouseLeave() {
  highlight.value.show = false
}
function formatNumber(num: number): string {
  return new Intl.NumberFormat('da-DK').format(num);
}

const cardStyle = computed(() => {
  if (!highlight.value.show) return {}
  return {
    '--glass-x': `${highlight.value.x}%`,
    '--glass-y': `${highlight.value.y}%`,
  }
})

// Compute positivity from the change number
const isPositiveComputed = computed(() => props.change >= 0)
const absChange = computed(() => Math.abs(props.change))
</script>


<style scoped>
.group:hover::before, .group:focus::before {
    opacity: 1;
}
.group::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s;
    /* Reduced radius from 600px to 200px for a more concentrated effect */
    background: radial-gradient(200px circle at var(--glass-x,50%) var(--glass-y,50%), rgba(255,255,255,0.10), transparent 70%);
    z-index: 1;
}
</style>


