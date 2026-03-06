<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useEventStore, type EventItem } from '@/store/eventStore';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/composables/useToast';

const { t, locale } = useI18n();
const router = useRouter();
const eventStore = useEventStore();
const authStore = useAuthStore();
const { showToast } = useToast();

const organizerId = computed(() => authStore.currentUser?.organizer_id ?? '1');

const myEvents = computed(() =>
  eventStore.events.filter((event) => event.organizer_id === organizerId.value)
);

const localizedTitle = (event: EventItem): string => {
  if (locale.value === 'ar') return event.title_ar || event.title_en;
  if (locale.value === 'ku') return event.title_ku || event.title_en;
  return event.title_en;
};

const localizedCategory = (categoryId: string): string => {
  const category = eventStore.categories.find((item) => item.id === categoryId);
  if (!category) return categoryId;
  if (locale.value === 'ar') return category.name_ar;
  if (locale.value === 'ku') return category.name_ku;
  return category.name_en;
};

const localizedCity = (cityId: string): string => {
  const city = eventStore.cities.find((item) => item.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const removeEvent = (id: string): void => {
  const confirmed = window.confirm(t('dashboard.confirm_delete'));
  if (!confirmed) return;

  eventStore.deleteEvent(id);
  showToast(t('dashboard.toast.deleted'), 'success');
};
</script>

<template>
  <div>
    <div class="mb-5 flex items-center justify-between">
      <h1 class="text-xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.my_events') }}</h1>
      <button
        type="button"
        class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        @click="router.push('/dashboard/create')"
      >
        {{ t('dashboard.empty.cta') }}
      </button>
    </div>

    <div v-if="myEvents.length" class="overflow-x-auto rounded-xl border border-slate-200">
      <table class="min-w-full text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.title') }}</th>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.date') }}</th>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.city') }}</th>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.category') }}</th>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.status') }}</th>
            <th class="px-3 py-3 text-start">{{ t('dashboard.table.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="event in myEvents" :key="event.id" class="bg-white">
            <td class="px-3 py-3">{{ localizedTitle(event) }}</td>
            <td class="px-3 py-3">{{ event.date }}</td>
            <td class="px-3 py-3">{{ localizedCity(event.city) }}</td>
            <td class="px-3 py-3">{{ localizedCategory(event.category) }}</td>
            <td class="px-3 py-3">
              <span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                {{ t(`dashboard.status.${event.status}`) }}
              </span>
            </td>
            <td class="px-3 py-3">
              <div class="flex gap-2">
                <button
                  type="button"
                  class="rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold"
                  @click="router.push(`/dashboard/edit/${event.id}`)"
                >
                  {{ t('common.edit') }}
                </button>
                <button
                  type="button"
                  class="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-700"
                  @click="removeEvent(event.id)"
                >
                  {{ t('common.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="rounded-xl border border-dashed border-slate-300 p-10 text-center">
      <p class="mb-4 text-slate-600">{{ t('dashboard.empty.message') }}</p>
      <button
        type="button"
        class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        @click="router.push('/dashboard/create')"
      >
        {{ t('dashboard.empty.cta') }}
      </button>
    </div>
  </div>
</template>
