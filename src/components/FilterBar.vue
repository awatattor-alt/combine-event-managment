<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import { useFilterStore } from '../store/filterStore';
import { Search, MapPin, Tag } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const eventStore = useEventStore();
const filterStore = useFilterStore();
</script>

<template>
  <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
    <div class="relative flex-1 w-full">
      <Search class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
      <input
        v-model="filterStore.searchQuery"
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
          v-model="filterStore.selectedCity"
          :class="[
            'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer',
            locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
          ]"
        >
          <option value="">{{ t.filters.city }} ({{ t.filters.all }})</option>
          <option v-for="city in eventStore.cities" :key="city.id" :value="city.id">
            {{ locale === 'en' ? city.name : (locale === 'ar' ? city.nameAr : city.nameKu) }}
          </option>
        </select>
      </div>

      <div class="relative flex-1 md:w-48">
        <Tag class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <select
          v-model="filterStore.selectedCategory"
          :class="[
            'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer',
            locale === 'en' ? 'pl-10 pr-4' : 'pr-10 pl-4'
          ]"
        >
          <option value="">{{ t.filters.category }} ({{ t.filters.all }})</option>
          <option v-for="cat in eventStore.categories" :key="cat.id" :value="cat.id">
            {{ locale === 'en' ? cat.name : (locale === 'ar' ? cat.nameAr : cat.nameKu) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
