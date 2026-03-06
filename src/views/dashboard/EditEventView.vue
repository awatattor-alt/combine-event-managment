<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore, type EventItem } from '@/store/eventStore';
import { useToast } from '@/composables/useToast';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const { showToast } = useToast();

interface EventForm {
  title_en: string;
  title_ar: string;
  title_ku: string;
  description_en: string;
  category: string;
  city: string;
  date: string;
  time: string;
  is_free: boolean;
  price: number;
  image_url: string;
}

const form = reactive<EventForm>({
  title_en: '',
  title_ar: '',
  title_ku: '',
  description_en: '',
  category: '',
  city: '',
  date: '',
  time: '',
  is_free: true,
  price: 0,
  image_url: '',
});

const event = computed(() => eventStore.getEventById(String(route.params.id)));

watchEffect(() => {
  if (!event.value) return;
  form.title_en = event.value.title_en;
  form.title_ar = event.value.title_ar;
  form.title_ku = event.value.title_ku;
  form.description_en = event.value.description_en;
  form.category = event.value.category;
  form.city = event.value.city;
  form.date = event.value.date;
  form.time = event.value.time;
  form.is_free = event.value.is_free;
  form.price = event.value.price;
  form.image_url = event.value.image_url;
});

const save = (): void => {
  if (!event.value) return;

  const city = eventStore.cities.find((item) => item.id === form.city);

  const updatedEvent: EventItem = {
    ...event.value,
    title_en: form.title_en,
    title_ar: form.title_ar,
    title_ku: form.title_ku,
    description_en: form.description_en,
    description_ar: form.description_en,
    description_ku: form.description_en,
    category: form.category,
    city: form.city,
    governorate: city?.name_en ?? form.city,
    date: form.date,
    time: form.time,
    is_free: form.is_free,
    price: form.is_free ? 0 : form.price,
    image_url: form.image_url,
  };

  eventStore.updateEvent(updatedEvent);
  showToast(t('dashboard.toast.updated'), 'success');
  void router.push('/dashboard');
};
</script>

<template>
  <div v-if="event" class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.edit_event') }}</h1>
    <form class="space-y-4" @submit.prevent="save">
      <label class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.title_en') }}
        <input v-model="form.title_en" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      <label class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.description_en') }}
        <textarea v-model="form.description_en" rows="4" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>
      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.category') }}
          <select v-model="form.category" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option v-for="category in eventStore.categories" :key="category.id" :value="category.id">{{ category.name_en }}</option>
          </select>
        </label>
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.city') }}
          <select v-model="form.city" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option v-for="city in eventStore.cities" :key="city.id" :value="city.id">{{ city.name_en }}</option>
          </select>
        </label>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.date') }}
          <input v-model="form.date" type="date" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.time') }}
          <input v-model="form.time" type="time" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <div class="flex gap-2">
        <button type="submit" class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">{{ t('common.save') }}</button>
        <button type="button" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold" @click="router.push('/dashboard')">{{ t('common.cancel') }}</button>
      </div>
    </form>
  </div>

  <div v-else class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
    <p class="mb-4 text-sm text-red-700">{{ t('dashboard.event_not_found') }}</p>
    <button type="button" class="rounded-lg bg-white px-4 py-2 text-sm font-semibold" @click="router.push('/dashboard')">
      {{ t('common.back') }}
    </button>
  </div>
</template>
