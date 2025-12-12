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
      <div v-if="showAddButton" class="mt-2">
        <div class="relative">
          <input
            v-model="addInputValue"
            type="text"
            :placeholder="addButtonText"
            class="flex-1 w-full pr-10 px-3 py-2 rounded-lg border-2 border-dashed border-slate-400/50 bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none focus:border-white/30 text-sm"
            @keyup.enter="handleAdd"
          >
          <button
            v-if="addInputValue && addInputValue.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Add"
            @click="handleAdd"
          >
            <Icon name="lucide:check" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface FilterItem {
  id?: string | number
  name: string
  active?: boolean
  trend?: number
}
 withDefaults(defineProps<{
  title: string
  items: FilterItem[]
  showAddButton?: boolean
  addButtonText?: string
}>(), {
  showAddButton: true,
  addButtonText: 'Add Item'
})

const emit = defineEmits<{
  add: [value: string]
  delete: [id: string | number]
}>()

const addInputValue = ref('')

function handleAdd() {
  if (addInputValue.value && addInputValue.value.trim()) {
    emit('add', addInputValue.value.trim())
    addInputValue.value = ''
  }
}
</script>