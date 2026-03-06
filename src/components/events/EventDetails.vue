<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EventItem } from '@/store/eventStore';

type LocalizedLookup = Record<string, string>;

const props = defineProps<{
  event: EventItem;
  cityName: string;
  categoryName: string;
}>();

const { locale } = useI18n();

const title = computed(() => {
  if (locale.value === 'ar') return props.event.title_ar;
  if (locale.value === 'ku') return props.event.title_ku;
  return props.event.title_en;
});

const description = computed(() => {
  if (locale.value === 'ar') return props.event.description_ar;
  if (locale.value === 'ku') return props.event.description_ku;
  return props.event.description_en;
});
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <img :src="event.image_url" :alt="title" class="h-64 w-full object-cover" />
    <div class="space-y-4 p-6">
      <h1 class="text-2xl font-bold text-[#1E3A5F]">{{ title }}</h1>
      <p class="text-slate-600">{{ description }}</p>
      <div class="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
        <p><strong>Category:</strong> {{ categoryName }}</p>
        <p><strong>City:</strong> {{ cityName }}</p>
        <p><strong>Date:</strong> {{ event.date }}</p>
        <p><strong>Time:</strong> {{ event.time }}</p>
        <p><strong>Organizer:</strong> {{ event.organizer_name }}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in event.tags || []" :key="tag" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">#{{ tag }}</span>
      </div>
    </div>
  </article>
</template>
