<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import EventList from '../components/EventList.vue';
import FilterBar from '../components/FilterBar.vue';
import { ArrowRight, Sparkles } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const getCityName = (city: any) => {
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

const featuredEvents = store.events.slice(0, 3);
</script>

<template>
  <div class="pb-20">
    <section class="relative py-16 md:py-20 overflow-hidden">
      <div class="absolute inset-0 bg-emerald-50 -z-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-8">
          <Sparkles :size="16" />
          {{ t.hero.badge }}
        </div>
        <h1 class="text-4xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">{{ t.hero.title }}</h1>
        <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">{{ t.hero.subtitle }}</p>
        <div class="max-w-4xl mx-auto"><FilterBar /></div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-2">{{ t.home.featuredTitle }}</h2>
          <p class="text-slate-500">{{ t.home.featuredSubtitle }}</p>
        </div>
        <router-link to="/events" class="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
          {{ t.home.viewAll }} <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
        </router-link>
      </div>

      <EventList :events="featuredEvents" columns="three" />
    </section>

    <section class="bg-slate-900 py-20 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">{{ t.home.cityTitle }}</h2>
          <p class="text-slate-400">{{ t.home.citySubtitle }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="city in store.cities.slice(0, 12)"
            :key="city.id"
            class="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
          >
            <img :src="`https://picsum.photos/seed/${city.id}/400/400`" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" referrerPolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-sm font-bold">{{ getCityName(city) }}</p>
              <p class="text-xs text-slate-300">{{ Math.floor(Math.random() * 20) + 5 }} {{ t.home.eventsCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
