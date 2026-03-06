<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '@/store/eventStore';
import EventDetailsPanel from '@/components/events/EventDetails.vue';
import LoadingState from '@/components/LoadingState.vue';
import ErrorState from '@/components/ErrorState.vue';

const route = useRoute();
const { locale } = useI18n();
const eventStore = useEventStore();

onMounted(async () => {
  await eventStore.fetchInitialData();
});

const event = computed(() => eventStore.getEventById(String(route.params.id)));

const cityName = computed(() => {
  const found = eventStore.cities.find((city) => city.id === event.value?.city);
  if (!found) return event.value?.city ?? '';
  if (locale.value === 'ar') return found.name_ar;
  if (locale.value === 'ku') return found.name_ku;
  return found.name_en;
});

const categoryName = computed(() => {
  const found = eventStore.categories.find((category) => category.id === event.value?.category);
  if (!found) return event.value?.category ?? '';
  if (locale.value === 'ar') return found.name_ar;
  if (locale.value === 'ku') return found.name_ku;
  return found.name_en;
});
</script>

<template>
  <section class="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <LoadingState v-if="eventStore.loading" />
    <ErrorState v-else-if="eventStore.error" :message="eventStore.error" />
    <ErrorState v-else-if="!event" message="Event not found" />
    <EventDetailsPanel v-else :event="event" :city-name="cityName" :category-name="categoryName" />
  </section>
</template>
