<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/events/EventCard.vue';
import FilterBar from '../components/FilterBar.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import { Search, RotateCcw } from 'lucide-vue-next';

const { t, locale } = useI18n();
const store = useEventStore();

const perPage = 8;
const currentPage = ref(1);

const paginatedEvents = computed(() => {
  const start = 0;
  const end = currentPage.value * perPage;
  return store.filteredEvents.slice(start, end);
});

const hasMore = computed(() => {
  return paginatedEvents.value.length < store.filteredEvents.length;
});

const loadMore = () => {
  currentPage.value++;
};

// Reset pagination when filters change
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
  <div class="min-h-screen bg-[#FFFBF5] pb-24">
    <!-- Header -->
    <div class="bg-[#1E3A5F] pt-16 pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          {{ t('events.explore_title') }}
        </h1>
        <p class="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
          {{ t('events.explore_subtitle') }}
        </p>
        
        <div class="max-w-4xl mx-auto -mb-40 relative z-10">
          <FilterBar />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <!-- Results Count -->
      <div class="flex justify-between items-center mb-8">
        <p class="text-slate-500 font-medium">
          {{ t('events.showing') }} 
          <span class="text-[#1E3A5F] font-bold">{{ store.filteredEvents.length }}</span> 
          {{ t('nav.events') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <LoadingSkeleton v-for="i in 8" :key="i" type="card" />
      </div>

      <!-- Events Grid -->
      <div v-else-if="paginatedEvents.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <EventCard v-for="event in paginatedEvents" :key="event.id" :event="event" />
        </div>
        
        <!-- Load More -->
        <div v-if="hasMore" class="mt-16 text-center">
          <button 
            @click="loadMore"
            class="px-10 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-[#1E3A5F] hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {{ t('events.load_more') }}
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <Search :size="48" />
        </div>
        <h3 class="text-2xl font-bold text-[#1E3A5F] mb-2">{{ t('common.noResults') }}</h3>
        <p class="text-slate-500 max-w-md mx-auto mb-8">
          {{ t('events.no_results_subtitle') }}
        </p>
        <button 
          @click="clearFilters"
          class="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-900/20"
        >
          <RotateCcw :size="18" />
          {{ t('events.clear_filters') }}
        </button>
      </div>
    </div>
  </div>
</template>
