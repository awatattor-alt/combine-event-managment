<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore, type EventItem } from '@/store/eventStore';
import EventForm from '@/components/events/EventForm.vue';
import ErrorState from '@/components/ErrorState.vue';
import { useToast } from '@/composables/useToast';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const eventStore = useEventStore();
const { showToast } = useToast();

const event = computed(() => eventStore.getEventById(String(route.params.id)));

const categoryOptions = computed(() =>
  eventStore.categories.map((category) => ({
    id: category.id,
    label:
      locale.value === 'ar' ? category.name_ar : locale.value === 'ku' ? category.name_ku : category.name_en,
  }))
);

const cityOptions = computed(() =>
  eventStore.cities.map((city) => ({
    id: city.id,
    label: locale.value === 'ar' ? city.name_ar : locale.value === 'ku' ? city.name_ku : city.name_en,
  }))
);

const submit = (payload: Partial<EventItem>) => {
  if (!event.value) return;

  eventStore.updateEvent({ ...event.value, ...payload, price: payload.is_free ? 0 : payload.price ?? 0 });
  showToast(t('dashboard.toast.updated'), 'success');
  void router.push('/dashboard/events');
};
</script>

<template>
  <section class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.edit_event') }}</h1>
    <EventForm
      v-if="event"
      :model-value="event"
      :categories="categoryOptions"
      :cities="cityOptions"
      :submit-label="t('common.save')"
      @submit="submit"
    />
    <ErrorState v-else :message="t('dashboard.event_not_found')" />
  </section>
</template>
