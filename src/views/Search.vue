<script setup lang="ts">
import { inject, computed } from 'vue';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import FilterBar from '../components/FilterBar.vue';

const locale = inject<any>('locale');
const store = useEventStore();

const resultLabel = computed(() => {
  if (locale.value === 'ar') return `نتائج: ${store.filteredEvents.length}`;
  if (locale.value === 'ku') return `ئەنجامەکان: ${store.filteredEvents.length}`;
  return `Results: ${store.filteredEvents.length}`;
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <h1 class="text-3xl font-bold text-slate-900">{{ locale === 'en' ? 'Search Events' : (locale === 'ar' ? 'البحث في الفعاليات' : 'گەڕان لە چالاکییەکان') }}</h1>
    <FilterBar />
    <p class="text-slate-500">{{ resultLabel }}</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <EventCard v-for="event in store.filteredEvents" :key="event.id" :event="event" />
    </div>
  </div>
</template>
