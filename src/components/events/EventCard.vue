<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, MapPin, ArrowRight } from 'lucide-vue-next';

import { useEventStore, type EventItem } from '../../store/eventStore';

const props = defineProps<{
  event: EventItem;
}>();

const t = inject<(key: string) => string>('t');
const locale = inject<Ref<string>>('locale');
const router = useRouter();
const store = useEventStore();

const activeLocale = computed(() => locale?.value ?? 'en');

const getCategoryName = (catId: string): string => {
  const cat = store.categories.find((item) => item.id === catId);
  if (!cat) return catId;
  if (activeLocale.value === 'ar') return cat.name_ar;
  if (activeLocale.value === 'ku') return cat.name_ku;
  return cat.name_en;
};

const getCityName = (cityId: string): string => {
  const city = store.cities.find((item) => item.id === cityId);
  if (!city) return cityId;
  if (activeLocale.value === 'ar') return city.name_ar;
  if (activeLocale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const getTitle = computed(() => {
  if (activeLocale.value === 'ar') return props.event.title_ar;
  if (activeLocale.value === 'ku') return props.event.title_ku;
  return props.event.title_en;
});

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString(activeLocale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
</script>

<template>
  <div
    class="group cursor-pointer overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/10"
    @click="router.push('/events/' + event.id)"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="event.image_url"
        :alt="getTitle"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-inline-start-4 top-4">
        <span
          class="rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
          :style="{ backgroundColor: store.categories.find((c) => c.id === event.category)?.color || '#D97706' }"
        >
          {{ getCategoryName(event.category) }}
        </span>
      </div>
      <div v-if="event.is_free" class="absolute inset-inline-end-4 top-4">
        <span class="rounded-lg bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          {{ t?.('event.free') }}
        </span>
      </div>
    </div>

    <div class="p-6">
      <h3 class="mb-3 line-clamp-1 text-xl font-bold text-[#1E3A5F] transition-colors group-hover:text-amber-600">
        {{ getTitle }}
      </h3>

      <div class="mb-6 space-y-3">
        <div class="flex items-center gap-3 text-sm text-slate-500">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-amber-500">
            <Calendar :size="16" />
          </div>
          {{ formatDate(event.date) }}
        </div>
        <div class="flex items-center gap-3 text-sm text-slate-500">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-amber-500">
            <MapPin :size="16" />
          </div>
          {{ getCityName(event.city) }}
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-slate-50 pt-5">
        <div class="flex flex-col">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t?.('event.price') }}</span>
          <span class="text-lg font-bold text-[#1E3A5F]">
            {{ event.price === 0 ? t?.('event.free') : `${event.price.toLocaleString()} IQD` }}
          </span>
        </div>
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#1E3A5F] transition-all group-hover:bg-amber-500 group-hover:text-white">
          <ArrowRight :size="20" :class="activeLocale !== 'en' ? 'rotate-180' : ''" />
        </div>
      </div>
    </div>
  </div>
</template>
