<script setup lang="ts">
import { inject, ref, computed } from 'vue';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import FilterBar from '../components/FilterBar.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';

/**
 * Events page with searchable/filterable event list and incremental loading.
 */

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const perPage = 8;
const currentPage = ref(1);

const paginatedEvents = computed(() => {
  return store.filteredEvents.slice(0, currentPage.value * perPage);
});

const hasMore = computed(() => {
  return paginatedEvents.value.length < store.filteredEvents.length;
});

const loadMore = () => {
  currentPage.value++;
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ t.nav.events }}</h1>
      <FilterBar />
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <SkeletonLoader v-for="i in 8" :key="i" className="h-64 w-full" />
    </div>

    <div v-else-if="paginatedEvents.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <EventCard v-for="event in paginatedEvents" :key="event.id" :event="event" />
      </div>
      
      <div v-if="hasMore" class="mt-16 text-center">
        <button 
          @click="loadMore"
          class="px-8 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-white hover:shadow-md transition-all"
        >
          {{ locale === 'en' ? 'Load More Events' : (locale === 'ar' ? 'تحميل المزيد من الفعاليات' : 'بارکردنی چالاکیی زیاتر') }}
        </button>
      </div>
    </div>
    
    <div v-else class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">{{ t.common.noResults }}</h3>
      <p class="text-slate-500">{{ locale === 'en' ? 'Try adjusting your filters or search query' : (locale === 'ar' ? 'حاول تعديل الفلاتر أو استعلام البحث' : 'هەوڵ بدە فلتەرەکان یان گەڕانەکەت بگۆڕیت') }}</p>
      <button 
        @click="store.searchQuery = ''; store.selectedCity = ''; store.selectedCategory = ''"
        class="mt-6 px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl"
      >
        {{ locale === 'en' ? 'Clear all filters' : (locale === 'ar' ? 'مسح كل الفلاتر' : 'پاککردنەوەی هەموو فلتەرەکان') }}
      </button>
    </div>
  </div>
</template>
