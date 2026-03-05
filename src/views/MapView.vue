<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store';
import { MapPin } from 'lucide-vue-next';

const store = useEventStore();
const t = inject<any>('t');
const locale = inject<any>('locale');

const getCityName = (city: any) => {
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};
</script>

<template>
  <div class="h-[calc(100vh-64px)] relative overflow-hidden">
    <!-- Map Placeholder -->
    <div class="absolute inset-0 bg-slate-100 flex items-center justify-center">
      <div class="text-center max-w-md px-4">
        <MapPin :size="64" class="mx-auto mb-6 text-emerald-600 opacity-20 animate-pulse" />
        <h2 class="text-2xl font-bold text-slate-900 mb-4">{{ locale === 'en' ? 'Interactive Map View' : (locale === 'ar' ? 'عرض الخريطة التفاعلية' : 'نەخشەی کارلێکەر') }}</h2>
        <p class="text-slate-500 mb-8">
          {{ locale === 'en' ? 'Explore events geographically across Iraq. In a production environment, this would integrate with Google Maps or Mapbox.' : (locale === 'ar' ? 'استكشف الفعاليات جغرافياً في جميع أنحاء العراق. في بيئة الإنتاج، سيتم دمج هذا مع خرائط جوجل أو ماب بوكس.' : 'چالاکییەکان بە شێوەیەکی جوگرافی لە سەرانسەری عێراقدا بگەڕێ. لە ژینگەی بەرهەمهێناندا، ئەمە لەگەڵ نەخشەی گووگڵ یان ماب بۆکس یەکدەخرێت.') }}
        </p>
        
        <div class="grid grid-cols-3 gap-4">
          <div v-for="city in store.cities.slice(0, 6)" :key="city.id" class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-xs font-bold text-emerald-600">{{ getCityName(city) }}</p>
            <p class="text-lg font-black text-slate-900">{{ Math.floor(Math.random() * 10) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Overlay -->
    <div class="absolute top-8 inset-inline-start-8 w-96 max-h-[calc(100%-64px)] bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
      <div class="p-6 border-b border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 mb-4">{{ locale === 'en' ? 'Events Near You' : (locale === 'ar' ? 'فعاليات بالقرب منك' : 'چالاکییەکانی نزیکت') }}</h3>
        <div class="flex gap-2">
          <input type="text" :placeholder="locale === 'en' ? 'Search location...' : (locale === 'ar' ? 'البحث عن موقع...' : 'گەڕان بۆ شوێن...')" class="flex-1 px-4 py-2 bg-slate-50 border-none rounded-xl text-sm" />
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div 
          v-for="event in store.events" 
          :key="event.id"
          class="p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div class="flex gap-4">
            <img :src="event.image" class="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div>
              <h4 class="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{{ event.title }}</h4>
              <p class="text-xs text-slate-500">{{ event.venue }}</p>
              <p class="text-xs font-bold text-emerald-600 mt-1">{{ event.price === 0 ? t.event.free : `${event.price} IQD` }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
