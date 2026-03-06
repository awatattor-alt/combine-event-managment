<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '@/store/eventStore';
import EventList from '@/components/events/EventList.vue';
import EventSearch from '@/components/events/EventSearch.vue';
import EventFilters from '@/components/events/EventFilters.vue';
import LoadingState from '@/components/LoadingState.vue';
import ErrorState from '@/components/ErrorState.vue';

const { locale, t } = useI18n();
const route = useRoute();
const eventStore = useEventStore();

onMounted(async () => {
  await eventStore.fetchInitialData();
  document.title = 'Browse Events — Iraq Compass';

  const query = route.query;
  eventStore.searchQuery = String(query.q ?? '');
  eventStore.selectedCity = String(query.city ?? '');
  eventStore.selectedCategory = String(query.category ?? '');
});

const cityOptions = computed(() =>
  eventStore.cities.map((city) => ({
    id: city.id,
    label: locale.value === 'ar' ? city.name_ar : locale.value === 'ku' ? city.name_ku : city.name_en,
  }))
);

const categoryOptions = computed(() =>
  eventStore.categories.map((category) => ({
    id: category.id,
    label:
      locale.value === 'ar' ? category.name_ar : locale.value === 'ku' ? category.name_ku : category.name_en,
  }))
);

const clearFilters = () => {
  eventStore.resetFilters();
};

watch(
  () => route.query,
  (query) => {
    if (query.q) eventStore.searchQuery = String(query.q);
    if (query.city) eventStore.selectedCity = String(query.city);
    if (query.category) eventStore.selectedCategory = String(query.category);
  }
);
</script>

<template>
  <section class="mx-auto min-h-screen max-w-7xl space-y-5 px-4 pb-20 pt-10 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-[#1E3A5F]">{{ t('events.title') }}</h1>

    <EventSearch v-model="eventStore.searchQuery" :placeholder="t('filters.search')" />
    <EventFilters
      v-model:city="eventStore.selectedCity"
      v-model:category="eventStore.selectedCategory"
      v-model:date="eventStore.selectedDate"
      v-model:sort="eventStore.sortBy"
      :cities="cityOptions"
      :categories="categoryOptions"
    />

    <div class="flex justify-end">
      <button type="button" class="text-sm font-semibold text-amber-700" @click="clearFilters">{{ t('events.clear_filters') }}</button>
    </div>

    <LoadingState v-if="eventStore.loading" />
    <ErrorState v-else-if="eventStore.error" :message="eventStore.error" />
    <EventList v-else :events="eventStore.filteredEvents" />
  </section>
</template>
