<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin } from 'lucide-vue-next';
import { useEventStore, type EventItem } from '@/store/eventStore';

const { t, locale } = useI18n();
const store = useEventStore();

const localizedCityName = (cityId: string): string => {
  const city = store.cities.find((item) => item.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const localizedTitle = (event: EventItem): string => {
  if (locale.value === 'ar') return event.title_ar;
  if (locale.value === 'ku') return event.title_ku;
  return event.title_en;
};

const localizedMapHeading = computed(() => {
  if (locale.value === 'ar') return 'عرض الخريطة التفاعلية';
  if (locale.value === 'ku') return 'نەخشەی کارلێکەر';
  return 'Interactive Map View';
});
</script>

<template>
  <div class="relative h-[calc(100vh-64px)] overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center bg-slate-100">
      <div class="max-w-md px-4 text-center">
        <MapPin :size="64" class="mx-auto mb-6 animate-pulse text-emerald-600 opacity-20" />
        <h2 class="mb-4 text-2xl font-bold text-slate-900">{{ localizedMapHeading }}</h2>
        <p class="mb-8 text-slate-500">{{ t('map.placeholder') }}</p>

        <div class="grid grid-cols-3 gap-4">
          <div v-for="city in store.cities.slice(0, 6)" :key="city.id" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p class="text-xs font-bold text-emerald-600">{{ localizedCityName(city.id) }}</p>
            <p class="text-lg font-black text-slate-900">{{ Math.floor(Math.random() * 10) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute inset-inline-start-8 top-8 flex max-h-[calc(100%-64px)] w-96 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-md">
      <div class="border-b border-slate-100 p-6">
        <h3 class="mb-4 text-xl font-bold text-slate-900">{{ t('map.events_near_you') }}</h3>
        <div class="flex gap-2">
          <input type="text" :placeholder="t('map.search_location')" class="flex-1 rounded-xl border-none bg-slate-50 px-4 py-2 text-sm" />
        </div>
      </div>

      <div class="flex-1 space-y-4 overflow-y-auto p-4">
        <div
          v-for="event in store.events"
          :key="event.id"
          class="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:border-emerald-200"
        >
          <div class="flex gap-4">
            <img :src="event.image_url" class="h-16 w-16 rounded-xl object-cover" referrerPolicy="no-referrer" :alt="localizedTitle(event)" />
            <div>
              <h4 class="font-bold text-slate-900 transition-colors group-hover:text-emerald-600">{{ localizedTitle(event) }}</h4>
              <p class="text-xs text-slate-500">{{ localizedCityName(event.city) }}</p>
              <p class="mt-1 text-xs font-bold text-emerald-600">
                {{ event.price === 0 ? t('event.free') : `${event.price} IQD` }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
