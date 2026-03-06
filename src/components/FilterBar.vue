<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import { Search, MapPin, Tag, ChevronDown } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();
</script>

<template>
  <div class="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row gap-2 items-center">
    <!-- Search Input -->
    <div class="relative flex-1 w-full group">
      <Search class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="20" />
      <input 
        v-model="store.searchQuery"
        type="text" 
        :placeholder="t.filters.search"
        :class="[
          'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all text-sm font-medium',
          locale === 'en' ? 'pl-14 pr-4' : 'pr-14 pl-4'
        ]"
      />
    </div>
    
    <!-- City Select -->
    <div class="relative w-full md:w-64 group">
      <MapPin class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="18" />
      <select 
        v-model="store.selectedCity"
        :class="[
          'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer text-sm font-medium',
          locale === 'en' ? 'pl-14 pr-10' : 'pr-14 pl-10'
        ]"
      >
        <option value="">{{ t.filters.city }} ({{ t.filters.all }})</option>
        <option v-for="city in store.cities" :key="city.id" :value="city.id">
          {{ locale === 'en' ? city.name_en : (locale === 'ar' ? city.name_ar : city.name_ku) }}
        </option>
      </select>
      <ChevronDown class="absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
    </div>
    
    <!-- Category Select -->
    <div class="relative w-full md:w-64 group">
      <Tag class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="18" />
      <select 
        v-model="store.selectedCategory"
        :class="[
          'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer text-sm font-medium',
          locale === 'en' ? 'pl-14 pr-10' : 'pr-14 pl-10'
        ]"
      >
        <option value="">{{ t.filters.category }} ({{ t.filters.all }})</option>
        <option v-for="cat in store.categories" :key="cat.id" :value="cat.id">
          {{ locale === 'en' ? cat.name_en : (locale === 'ar' ? cat.name_ar : cat.name_ku) }}
        </option>
      </select>
      <ChevronDown class="absolute inset-inline-end-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" :size="16" />
    </div>

    <!-- Search Button (Mobile only or as a visual anchor) -->
    <button class="hidden md:flex items-center justify-center w-14 h-14 bg-[#1E3A5F] text-white rounded-2xl hover:bg-[#2a4d7d] transition-all shrink-0">
      <Search :size="20" />
    </button>
  </div>
</template>
