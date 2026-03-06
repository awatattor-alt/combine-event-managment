<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore, type EventItem } from '@/store/eventStore';
import { useAuthStore } from '@/stores/authStore';
import EventForm from '@/components/events/EventForm.vue';
import { useToast } from '@/composables/useToast';

const router = useRouter();
const { t, locale } = useI18n();
const eventStore = useEventStore();
const authStore = useAuthStore();
const { showToast } = useToast();

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
  const city = eventStore.cities.find((item) => item.id === payload.city);
  eventStore.createEvent({
    title_en: payload.title_en ?? '',
    title_ar: payload.title_ar ?? payload.title_en ?? '',
    title_ku: payload.title_ku ?? payload.title_en ?? '',
    description_en: payload.description_en ?? '',
    description_ar: payload.description_ar ?? payload.description_en ?? '',
    description_ku: payload.description_ku ?? payload.description_en ?? '',
    date: payload.date ?? '',
    time: payload.time ?? '',
    city: payload.city ?? '',
    governorate: city?.name_en ?? payload.city ?? '',
    category: payload.category ?? '',
    image_url: payload.image_url ?? 'https://picsum.photos/seed/new-event/800/400',
    organizer_name: authStore.currentUser?.name ?? payload.organizer_name ?? 'Organizer',
    organizer_id: authStore.currentUser?.organizer_id ?? 'org1',
    price: payload.is_free ? 0 : payload.price ?? 0,
    is_free: payload.is_free ?? true,
    status: 'upcoming',
  });

  showToast(t('dashboard.toast.created'), 'success');
  void router.push('/dashboard/events');
};
</script>

<template>
  <section class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-2xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.create_event') }}</h1>
    <EventForm :categories="categoryOptions" :cities="cityOptions" :submit-label="t('dashboard.form.submit_create')" @submit="submit" />
  </section>
</template>
