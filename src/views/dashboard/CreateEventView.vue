<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useEventStore, type EventItem } from '@/store/eventStore';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/composables/useToast';

const { t } = useI18n();
const router = useRouter();
const eventStore = useEventStore();
const authStore = useAuthStore();
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
  image_url: 'https://picsum.photos/seed/myevent/800/400',
});

const today = computed(() => new Date().toISOString().split('T')[0]);

const submit = (): void => {
  if (!form.title_en || !form.category || !form.city || !form.date) {
    showToast(t('dashboard.validation.required'), 'error');
    return;
  }

  const city = eventStore.cities.find((item) => item.id === form.city);

  const newEvent: EventItem = {
    id: `ev-${Date.now()}`,
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
    time: form.time || '10:00',
    is_free: form.is_free,
    price: form.is_free ? 0 : form.price,
    image_url: form.image_url,
    organizer_id: authStore.currentUser?.organizer_id ?? '1',
    organizer_name: authStore.currentUser?.name ?? t('dashboard.organizer'),
    status: 'upcoming',
  };

  eventStore.addEvent(newEvent);
  showToast(t('dashboard.toast.created'), 'success');
  void router.push('/dashboard');
};
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-4 text-xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.create_event') }}</h1>

    <form class="space-y-4" @submit.prevent="submit">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.title_en') }}
          <input v-model="form.title_en" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.title_ar') }}
          <input v-model="form.title_ar" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <label class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.title_ku') }}
        <input v-model="form.title_ku" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>

      <label class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.description_en') }}
        <textarea v-model="form.description_en" rows="4" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.category') }}
          <select v-model="form.category" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option disabled value="">{{ t('dashboard.form.select_category') }}</option>
            <option v-for="category in eventStore.categories" :key="category.id" :value="category.id">
              {{ category.name_en }}
            </option>
          </select>
        </label>

        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.city') }}
          <select v-model="form.city" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
            <option disabled value="">{{ t('dashboard.form.select_city') }}</option>
            <option v-for="city in eventStore.cities" :key="city.id" :value="city.id">
              {{ city.name_en }}
            </option>
          </select>
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.date') }}
          <input v-model="form.date" :min="today" type="date" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label class="text-sm font-medium text-slate-700">
          {{ t('dashboard.form.time') }}
          <input v-model="form.time" type="time" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <label class="flex items-center gap-3 text-sm font-medium text-slate-700">
        <input v-model="form.is_free" type="checkbox" class="h-4 w-4" />
        {{ t('dashboard.form.is_free') }}
      </label>

      <label v-if="!form.is_free" class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.price_iqd') }}
        <input v-model.number="form.price" type="number" min="0" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
      </label>

      <label class="text-sm font-medium text-slate-700">
        {{ t('dashboard.form.image_url') }}
        <input
          v-model="form.image_url"
          type="url"
          :placeholder="t('dashboard.form.image_placeholder')"
          class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </label>

      <button type="submit" class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
        {{ t('dashboard.form.submit_create') }}
      </button>
    </form>
  </div>
</template>
