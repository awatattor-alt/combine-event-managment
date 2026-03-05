<script setup lang="ts">
import { inject, ref, computed, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { Calendar, MapPin, X } from 'lucide-vue-next';
import { useEventStore } from '../store/eventStore';
import { useFilterStore } from '../store/filterStore';
import EventCard from '../components/EventCard.vue';
import FilterBar from '../components/FilterBar.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import EventList from '../components/EventList.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseModal from '../components/BaseModal.vue';
import { paginate } from '../utils/pagination';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();
const filterStore = useFilterStore();

const perPage = 8;
const currentPage = ref(1);
const selectedEvent = ref<any | null>(null);

watch(
  () => [store.searchQuery, store.selectedCity, store.selectedCategory, store.selectedSort],
  () => {
    currentPage.value = 1;
  }
);
const showInfoModal = ref(false);

const paginatedEvents = computed(() => paginate(store.filteredEvents, currentPage.value, perPage));
const hasMore = computed(() => paginatedEvents.value.length < store.filteredEvents.length);

const loadMore = () => {
  currentPage.value++;
};

const clearAllFilters = () => {
  store.searchQuery = '';
  store.selectedCity = '';
  store.selectedCategory = '';
  store.selectedSort = 'date-asc';
};

const getCityName = (cityId: string) => {
  const city = store.cities.find((c: any) => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
const clearFilters = () => {
  store.searchQuery = '';
  store.selectedCity = '';
  store.selectedCategory = '';
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-4xl font-bold text-slate-900">{{ t.nav.events }}</h1>
      <BaseButton variant="secondary" @click="showInfoModal = true">{{ t.common.mockData }}</BaseButton>
    </div>

    <div class="mb-8">
      <FilterBar />
    </div>

    <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <SkeletonLoader v-for="i in 8" :key="i" className="h-64 w-full" />
    </div>

    <div v-else-if="paginatedEvents.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <EventCard v-for="event in paginatedEvents" :key="event.id" :event="event" @open-preview="selectedEvent = $event" />
      </div>

      <div v-if="hasMore" class="mt-16 text-center">
        <button
          @click="loadMore"
          class="px-8 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-white hover:shadow-md transition-all"
        >
          {{ locale === 'en' ? 'Load More Events' : (locale === 'ar' ? 'تحميل المزيد من الفعاليات' : 'بارکردنی چالاکیی زیاتر') }}
        </button>
      <EventList :events="paginatedEvents" columns="four" />
      <div v-if="hasMore" class="mt-16 text-center">
        <BaseButton variant="secondary" size="lg" @click="loadMore">{{ t.common.loadMore }}</BaseButton>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">{{ t.common.noResults }}</h3>
      <p class="text-slate-500">{{ locale === 'en' ? 'Try adjusting your filters or search query' : (locale === 'ar' ? 'حاول تعديل الفلاتر أو استعلام البحث' : 'هەوڵ بدە فلتەرەکان یان گەڕانەکەت بگۆڕیت') }}</p>
      <button 
        @click="clearAllFilters"
      <button
        @click="filterStore.resetFilters()"
        class="mt-6 px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl"
      >
        {{ locale === 'en' ? 'Clear all filters' : (locale === 'ar' ? 'مسح كل الفلاتر' : 'پاککردنەوەی هەموو فلتەرەکان') }}
      </button>
      <p class="text-slate-500">{{ t.common.tryFilters }}</p>
      <BaseButton class="mt-6" @click="clearFilters">{{ t.common.clearFilters }}</BaseButton>
    </div>

    <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60" @click="selectedEvent = null"></div>
      <div class="relative w-full max-w-2xl rounded-3xl bg-white overflow-hidden shadow-2xl">
        <img :src="selectedEvent.image" :alt="selectedEvent.title" class="h-64 w-full object-cover" referrerPolicy="no-referrer" />
        <button class="absolute top-4 right-4 rounded-full bg-white/90 p-2" @click="selectedEvent = null">
          <X :size="18" />
        </button>

        <div class="p-6">
          <h3 class="text-2xl font-bold text-slate-900">{{ selectedEvent.title }}</h3>
          <p class="mt-3 text-slate-600">{{ selectedEvent.description }}</p>

          <div class="mt-4 space-y-2 text-sm text-slate-600">
            <p class="flex items-center gap-2"><Calendar :size="16" class="text-emerald-600" /> {{ formatDate(selectedEvent.date) }}</p>
            <p class="flex items-center gap-2"><MapPin :size="16" class="text-emerald-600" /> {{ selectedEvent.venue }}, {{ getCityName(selectedEvent.city) }}</p>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <span class="text-xl font-bold text-slate-900">{{ selectedEvent.price === 0 ? t.event.free : `${selectedEvent.price.toLocaleString()} IQD` }}</span>
            <RouterLink :to="`/events/${selectedEvent.id}`" class="px-5 py-2 bg-emerald-600 text-white rounded-xl font-semibold">
              {{ t.event.getTickets }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <BaseModal :open="showInfoModal" :title="t.common.mockData" @close="showInfoModal = false">
      <p class="text-slate-600">{{ t.common.mockDataDescription }}</p>
    </BaseModal>
  </div>
</template>
