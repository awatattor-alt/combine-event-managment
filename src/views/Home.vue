<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
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
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-emerald-50 -z-10">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-200/20 blur-3xl rounded-full"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-8 animate-bounce">
          <Sparkles :size="16" />
          {{ locale === 'en' ? 'Explore Iraq Like Never Before' : (locale === 'ar' ? 'استكشف العراق كما لم تفعل من قبل' : 'عێراق بگەڕێ وەک هەرگیز پێشتر نەتکردووە') }}
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
          {{ t.hero.title }}
        </h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {{ t.hero.subtitle }}
        </p>
        
        <div class="max-w-4xl mx-auto">
          <FilterBar />
        </div>
      </div>
    </section>

    <!-- Featured Events -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="flex justify-between items-end mb-10">
        <div>
          <h2 class="text-3xl font-bold text-slate-900 mb-2">{{ locale === 'en' ? 'Featured Events' : (locale === 'ar' ? 'الفعاليات المميزة' : 'چالاکییە دیارەکان') }}</h2>
          <p class="text-slate-500">{{ locale === 'en' ? 'Handpicked experiences you shouldn\'t miss' : (locale === 'ar' ? 'تجارب مختارة بعناية لا ينبغي أن تفوتها' : 'ئەزموونی هەڵبژێردراو کە نابێت لەدەستی بدەیت') }}</p>
        </div>
        <router-link to="/events" class="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
          {{ locale === 'en' ? 'View all events' : (locale === 'ar' ? 'عرض كل الفعاليات' : 'بینینی هەموو چالاکییەکان') }} <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <EventCard v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </section>

    <!-- Cities Grid -->
    <section class="bg-slate-900 py-24 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">{{ locale === 'en' ? 'Explore by City' : (locale === 'ar' ? 'استكشف حسب المدينة' : 'گەڕان بەپێی شار') }}</h2>
          <p class="text-slate-400">{{ locale === 'en' ? 'Discover events in every corner of Iraq' : (locale === 'ar' ? 'اكتشف الفعاليات في كل ركن من أركان العراق' : 'چالاکییەکان لە هەموو سووچێکی عێراق بدۆزەرەوە') }}</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div 
            v-for="city in store.cities.slice(0, 12)" 
            :key="city.id"
            class="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
          >
            <img 
              :src="`https://picsum.photos/seed/${city.id}/400/400`" 
              class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4">
              <p class="text-sm font-bold">{{ getCityName(city) }}</p>
              <p class="text-xs text-slate-300">{{ Math.floor(Math.random() * 20) + 5 }} {{ locale === 'en' ? 'events' : (locale === 'ar' ? 'فعالية' : 'چالاکی') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
