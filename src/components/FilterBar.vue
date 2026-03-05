<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import { Search, MapPin, Tag, ArrowUpDown } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();
</script>

<template>
  <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
    <div class="relative flex-1 w-full">
      <Search class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
      <input 
        v-model="store.searchQuery"
        type="text" 
        :placeholder="t.filters.search"
        :class="[
          'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all',
          locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
        ]"
      />
    </div>
    
    <div class="flex gap-4 w-full md:w-auto">
      <div class="relative flex-1 md:w-48">
        <MapPin class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <select 
          v-model="store.selectedCity"
          :class="[
            'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer',
            locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
          ]"
        >
          <option value="">{{ t.filters.city }} ({{ t.filters.all }})</option>
          <option v-for="city in store.cities" :key="city.id" :value="city.id">
            {{ locale === 'en' ? city.name : (locale === 'ar' ? city.nameAr : city.nameKu) }}
          </option>
        </select>
      </div>
      
      <div class="relative flex-1 md:w-48">
        <Tag class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <select 
          v-model="store.selectedCategory"
          :class="[
            'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer',
            locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
          ]"
        >
          <option value="">{{ t.filters.category }} ({{ t.filters.all }})</option>
          <option v-for="cat in store.categories" :key="cat.id" :value="cat.id">
            {{ locale === 'en' ? cat.name : (locale === 'ar' ? cat.nameAr : cat.nameKu) }}
          </option>
        </select>
      </div>

      <div class="relative flex-1 md:w-52">
        <ArrowUpDown class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <select
          v-model="store.selectedSort"
          :class="[
            'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer',
            locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
          ]"
        >
          <option value="date-asc">{{ locale === 'en' ? 'Date (Soonest)' : (locale === 'ar' ? 'التاريخ (الأقرب)' : 'بەروار (نزیکترین)') }}</option>
          <option value="date-desc">{{ locale === 'en' ? 'Date (Latest)' : (locale === 'ar' ? 'التاريخ (الأحدث)' : 'بەروار (دواترین)') }}</option>
          <option value="price-asc">{{ locale === 'en' ? 'Price (Low to High)' : (locale === 'ar' ? 'السعر (من الأقل إلى الأعلى)' : 'نرخ (لە نزم بۆ بەرز)') }}</option>
          <option value="price-desc">{{ locale === 'en' ? 'Price (High to Low)' : (locale === 'ar' ? 'السعر (من الأعلى إلى الأقل)' : 'نرخ (لە بەرز بۆ نزم)') }}</option>
          <option value="title-asc">{{ locale === 'en' ? 'Title (A-Z)' : (locale === 'ar' ? 'العنوان (أ-ي)' : 'ناونیشان (A-Z)') }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
