<script setup lang="ts">
import { inject, ref, computed } from 'vue';
import { useEventStore } from '../store/eventStore';
import FilterBar from '../components/FilterBar.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import EventList from '../components/EventList.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseModal from '../components/BaseModal.vue';
import { paginate } from '../utils/pagination';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const perPage = 8;
const currentPage = ref(1);
const showInfoModal = ref(false);

const paginatedEvents = computed(() => paginate(store.filteredEvents, currentPage.value, perPage));
const hasMore = computed(() => paginatedEvents.value.length < store.filteredEvents.length);

const loadMore = () => {
  currentPage.value++;
};

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
      <EventList :events="paginatedEvents" columns="four" />
      <div v-if="hasMore" class="mt-16 text-center">
        <BaseButton variant="secondary" size="lg" @click="loadMore">{{ t.common.loadMore }}</BaseButton>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-bold text-slate-900 mb-2">{{ t.common.noResults }}</h3>
      <p class="text-slate-500">{{ t.common.tryFilters }}</p>
      <BaseButton class="mt-6" @click="clearFilters">{{ t.common.clearFilters }}</BaseButton>
    </div>

    <BaseModal :open="showInfoModal" :title="t.common.mockData" @close="showInfoModal = false">
      <p class="text-slate-600">{{ t.common.mockDataDescription }}</p>
    </BaseModal>
  </div>
</template>
