<template>
  <section>
    <h2 class="text-white font-semibold text-sm uppercase tracking-wide mb-4">
      {{ title }}
    </h2>
    <div class="space-y-2">
      <div
        v-for="item in items"
        :key="item.id || item.name"
        class="flex items-center justify-between w-full text-left px-4 py-3 rounded-lg transition-colors text-white text-sm bg-white/10 hover:bg-white/20 group"
      >
        <span>{{ item.name }}</span>
        <button
          v-if="item.id !== undefined"
          class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500 focus:outline-none cursor-pointer"
          title="Delete"
          @click.stop="$emit('delete', item.id)"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4" />
        </button>
      </div>
      <div class="mt-2">
        <div class="relative w-full">
          <select
            v-model="selectedWebsite"
            class="flex-1 w-full pr-10 px-3 py-2 rounded-lg border-2 border-dashed border-slate-400/50 bg-transparent text-slate-200 focus:outline-none focus:border-slate-400/50 text-sm appearance-none"
            @change="handleAddWebsite"
          >
            <option value="" disabled class="text-slate-400 ">Select website</option>
            <option
              v-for="option in filteredOptions"
              :key="option.id"
              :value="option.name"
              class="text-slate-700 py-2"
            >
              {{ option.name }}
            </option>
          </select>
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="lucide:chevron-down" class="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface FilterItem {
  id?: string | number
  name: string
  active?: boolean
  trend?: number
}
const props = defineProps<{
  title: string
  items: FilterItem[]
  websiteOptions: FilterItem[]
}>()

const emit = defineEmits<{
  add: [value: string]
  delete: [id: string | number]
}>()

const filteredOptions = computed(() =>
  props.websiteOptions.filter(
    o =>
      !props.items.some(i => i.name === o.name)
  )
)
const selectedWebsite = ref('')

function handleAddWebsite() {
  if (selectedWebsite.value) {
    emit('add', selectedWebsite.value)
    selectedWebsite.value = ''
  }
}
</script>