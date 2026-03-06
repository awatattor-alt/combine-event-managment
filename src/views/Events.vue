<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/events/EventCard.vue';
import FilterBar from '../components/FilterBar.vue';
import SkeletonCard from '@/components/ui/SkeletonCard.vue';
import { Search, RotateCcw } from 'lucide-vue-next';

const { t } = useI18n();
const store = useEventStore();

const perPage = 6;
const currentPage = ref(1);

onMounted(() => {
  document.title = 'Browse Events — Iraq Compass';
});

const paginatedEvents = computed(() => {
  const end = currentPage.value * perPage;
  return store.filteredEvents.slice(0, end);
});

const hasMore = computed(() => paginatedEvents.value.length < store.filteredEvents.length);

const loadMore = () => {
  currentPage.value += 1;
};

watch([() => store.searchQuery, () => store.selectedCity, () => store.selectedCategory], () => {
  currentPage.value = 1;
});

const clearFilters = () => {
  store.searchQuery = '';
  store.selectedCity = '';
  store.selectedCategory = '';
};
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-[#FFFBF5] pb-24">
    <div class="bg-[#1E3A5F] pb-28 pt-16">
      <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {{ t('events.explore_title') }}
        </h1>
        <p class="mx-auto mb-12 max-w-2xl text-lg text-white/70">
          {{ t('events.explore_subtitle') }}
        </p>

        <div class="relative z-10 mx-auto -mb-36 max-w-4xl">
          <FilterBar />
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <p class="font-medium text-slate-500">
          {{ t('events.showing') }}
          <span class="font-bold text-[#1E3A5F]">{{ store.filteredEvents.length }}</span>
          {{ t('nav.events') }}
        </p>
      </div>

      <div v-if="store.loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard v-for="i in 6" :key="i" class-name="h-[420px]" />
      </div>

      <div v-else-if="paginatedEvents.length > 0">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <EventCard v-for="event in paginatedEvents" :key="event.id" :event="event" />
        </div>

        <div v-if="hasMore" class="mt-16 text-center">
          <button
            class="rounded-xl border border-slate-200 bg-white px-10 py-4 font-bold text-[#1E3A5F] transition-all hover:-translate-y-1 hover:shadow-xl"
            @click="loadMore"
          >
            {{ t('events.load_more') }}
          </button>
        </div>
      </div>

      <div v-else class="rounded-3xl border border-dashed border-slate-200 bg-white py-24 text-center">
        <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-300">
          <Search :size="48" />
        </div>
        <h3 class="mb-2 text-2xl font-bold text-[#1E3A5F]">{{ t('common.noResults') }}</h3>
        <p class="mx-auto mb-8 max-w-md text-slate-500">
          {{ t('events.no_results_subtitle') }}
        </p>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-3 font-bold text-white shadow-lg shadow-amber-900/20 transition-all hover:bg-amber-600"
          @click="clearFilters"
        >
          <RotateCcw :size="18" />
          {{ t('events.clear_filters') }}
        </button>
      </div>
    </div>
  </div>
</template>
