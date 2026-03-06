<script setup lang="ts">
import { inject, computed } from 'vue';
import { Calendar, MapPin, User } from 'lucide-vue-next';

import { useEventStore } from '../store/eventStore';

const props = defineProps<{
  event: any;
}>();

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const getCategoryName = (catId: string) => {
  const cat = store.categories.find((c: any) => c.id === catId);
  if (!cat) return catId;
  if (locale.value === 'ar') return cat.name_ar;
  if (locale.value === 'ku') return cat.name_ku;
  return cat.name_en;
};

const getCityName = (cityId: string) => {
  const city = store.cities.find((c: any) => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const getTitle = computed(() => {
  if (locale.value === 'ar') return props.event.title_ar;
  if (locale.value === 'ku') return props.event.title_ku;
  return props.event.title_en;
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<template>
  <div class="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500">
    <div class="relative aspect-[4/3] overflow-hidden">
      <img 
        :src="event.image_url" 
        :alt="getTitle"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div class="absolute top-4 inset-inline-start-4">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-700 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
          {{ getCategoryName(event.category) }}
        </span>
      </div>
      <div v-if="event.is_free" class="absolute top-4 inset-inline-end-4">
        <span class="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-sm">
          {{ t.event.free }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-[#1E3A5F] mb-3 line-clamp-1 group-hover:text-amber-600 transition-colors">
        {{ getTitle }}
      </h3>
      
      <div class="space-y-3 mb-6">
        <div class="flex items-center gap-3 text-slate-500 text-sm">
          <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-amber-500">
            <Calendar :size="16" />
          </div>
          {{ formatDate(event.date) }}
        </div>
        <div class="flex items-center gap-3 text-slate-500 text-sm">
          <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-amber-500">
            <MapPin :size="16" />
          </div>
          {{ getCityName(event.city) }}
        </div>
      </div>
      
      <div class="flex items-center justify-between pt-5 border-t border-slate-50">
        <div class="flex flex-col">
          <span class="text-xs text-slate-400 uppercase font-bold tracking-wider">{{ t.event.price }}</span>
          <span class="text-lg font-bold text-[#1E3A5F]">
            {{ event.price === 0 ? t.event.free : `${event.price.toLocaleString()} IQD` }}
          </span>
        </div>
        <router-link 
          :to="`/events/${event.id}`"
          class="px-6 py-3 bg-[#1E3A5F] text-white text-sm font-bold rounded-xl hover:bg-[#2a4d7d] hover:-translate-y-1 transition-all shadow-lg shadow-blue-900/10"
        >
          {{ t.event.getTickets }}
        </router-link>
      </div>
    </div>
  </div>
</template>
