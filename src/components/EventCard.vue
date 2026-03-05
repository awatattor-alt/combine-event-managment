<script setup lang="ts">
import { inject } from 'vue';
import { Calendar, MapPin, User } from 'lucide-vue-next';

import { useEventStore } from '../store/eventStore';

/**
 * Reusable event preview card.
 */
const props = defineProps<{
  event: any;
}>();

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const getCategoryName = (catId: string) => {
  const cat = store.categories.find((c: any) => c.id === catId);
  if (!cat) return catId;
  if (locale.value === 'ar') return cat.nameAr;
  if (locale.value === 'ku') return cat.nameKu;
  return cat.name;
};

const getCityName = (cityId: string) => {
  const city = store.cities.find((c: any) => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<template>
  <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
    <div class="relative aspect-[4/3] overflow-hidden">
      <img 
        :src="event.image" 
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div class="absolute top-4 inset-inline-start-4">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
          {{ getCategoryName(event.category) }}
        </span>
      </div>
    </div>
    
    <div class="p-5">
      <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
        {{ event.title }}
      </h3>
      
      <div class="space-y-2 mb-4">
        <div class="flex items-center gap-2 text-slate-500 text-sm">
          <Calendar :size="16" class="text-emerald-500" />
          {{ formatDate(event.date) }}
        </div>
        <div class="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin :size="16" class="text-emerald-500" />
          {{ event.venue }}, {{ getCityName(event.city) }}
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-4 border-t border-slate-100">
        <span class="text-lg font-bold text-slate-900">
          {{ event.price === 0 ? t.event.free : `${event.price.toLocaleString()} IQD` }}
        </span>
        <router-link 
          :to="`/events/${event.id}`"
          class="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          {{ t.event.getTickets }}
        </router-link>
      </div>
    </div>
  </div>
</template>
