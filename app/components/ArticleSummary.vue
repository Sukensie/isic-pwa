
<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/en'

interface Props {
  url: string
  title: string
  publish_time: string
  bullet_points: string[]
  tags: string[]
  text: string
  sentiment?: number
}

const props = defineProps<Props>()

// Static mapping of domain to website name and root
const websiteMap: Record<string, { name: string; root: string }> = {
  'example.com': { name: 'Example News', root: 'https://example.com' },
  'techcrunch.com': { name: 'TechCrunch', root: 'https://techcrunch.com' },
  'nytimes.com': { name: 'New York Times', root: 'https://nytimes.com' },
  'bbc.com': { name: 'BBC', root: 'https://bbc.com' },
  'borsen.dk': { name: 'Børsen', root: 'borsen.dk' },
  // Add more as needed
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\\./, '')
  } catch {
    return ''
  }
}

const domain = computed(() => extractDomain(props.url))
const websiteInfo = computed(() => websiteMap[domain.value] || { name: domain.value, root: `https://${domain.value}` })


dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('en')

function timeAgo(dateString: string): string {
  const date = dayjs(dateString)
  const now = dayjs()
  const diffDays = now.diff(date, 'day')
  if (diffDays < 7) {
    return date.fromNow()
  } else {
    return date.format('LL') // e.g., "June 7, 2024"
  }
}

const publishedAgo = computed(() => timeAgo(props.publish_time))
</script>

<template>
  <article class="bg-black/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-slate-700/50 transition-colors">
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 text-sm text-white/80 mb-2">
          <span>{{ websiteInfo.name }}</span>
          <span>•</span>
          <span>{{ websiteInfo.root }}</span>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          {{ title }}
        </h3>
        <p class="text-sm text-white/60">{{ publishedAgo }}</p>
      </div>
      
      <div class="flex gap-2 flex-wrap justify-end">
        <span
          v-for="tag in tags"
          :key="tag"
          class="px-3 py-1.5 bg-white/20 border-1 border-white/30 text-white/80 text-xs rounded-full whitespace-nowrap capitalize"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Key Points -->
    <ul class="space-y-3 mb-6">
      <li
        v-for="(point, index) in bullet_points"
        :key="index"
        class="flex gap-3 text-white items-center"
      >
        <Icon name="heroicons:arrow-right-16-solid" class="text-green-400 flex-shrink-0" />
        <span class="text-sm leading-relaxed">{{ point }}</span>
      </li>
    </ul>

    <!-- View Full Article Button -->
    <div class="flex">
      <a :href="url" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-black/30 text-white text-sm rounded-lg transition-colors">
        <span>View Full Article</span>
        <Icon name="heroicons:arrow-right-16-solid" class="text-lg" />
      </a>
    </div>
  </article>
</template>
