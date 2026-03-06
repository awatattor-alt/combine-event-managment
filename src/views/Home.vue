<script setup lang="ts">
import { inject, computed } from 'vue';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/EventCard.vue';
import { ArrowRight, Sparkles, MapPin, Calendar, Users, ChevronRight } from 'lucide-vue-next';
import * as Icons from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const featuredEvents = computed(() => store.events.slice(0, 3));

const getCategoryName = (category: any) => {
  if (locale.value === 'ar') return category.name_ar;
  if (locale.value === 'ku') return category.name_ku;
  return category.name_en;
};

const getCityName = (city: any) => {
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const getIcon = (iconName: string) => {
  return (Icons as any)[iconName] || Icons.HelpCircle;
};
</script>

<template>
  <div class="space-y-24 pb-24">
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center pt-16 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-[#FFFBF5] -z-10">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-100/30 to-transparent"></div>
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/20 blur-3xl rounded-full"></div>
        <div class="absolute bottom-0 right-0 w-1/3 h-1/2 bg-emerald-100/20 blur-3xl rounded-full"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-left" :dir="locale === 'en' ? 'ltr' : 'rtl'">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold mb-8">
              <Sparkles :size="16" />
              {{ locale === 'en' ? 'Discover Iraq\'s Best Events' : (locale === 'ar' ? 'اكتشف أفضل الفعاليات في العراق' : 'باشترین چالاکییەکانی عێراق بدۆزەرەوە') }}
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold text-[#1E3A5F] mb-6 tracking-tight leading-[1.1]">
              {{ t.hero.title }}
            </h1>
            <p class="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              {{ t.hero.subtitle }}
            </p>
            
            <div class="flex flex-wrap gap-4">
              <router-link to="/events" class="px-8 py-4 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-900/20 hover:bg-amber-600 hover:-translate-y-1 transition-all flex items-center gap-2">
                {{ locale === 'en' ? 'Explore Events' : (locale === 'ar' ? 'استكشف الفعاليات' : 'گەڕان بەدوای چالاکییەکان') }}
                <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </router-link>
              <router-link to="/map" class="px-8 py-4 bg-white text-[#1E3A5F] font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2">
                <MapPin :size="20" />
                {{ locale === 'en' ? 'View Map' : (locale === 'ar' ? 'عرض الخريطة' : 'بینینی نەخشە') }}
              </router-link>
            </div>

            <div class="mt-12 flex items-center gap-6">
              <div class="flex -space-x-3">
                <img v-for="i in 4" :key="i" :src="`https://picsum.photos/seed/user${i}/100/100`" class="w-10 h-10 rounded-full border-2 border-white object-cover" referrerPolicy="no-referrer" />
              </div>
              <p class="text-sm text-slate-500 font-medium">
                <span class="text-[#1E3A5F] font-bold">10,000+</span> 
                {{ locale === 'en' ? 'users already joined' : (locale === 'ar' ? 'مستخدم انضموا بالفعل' : 'بەکارهێنەر پێشتر پەیوەندییان کردووە') }}
              </p>
            </div>
          </div>

          <div class="relative hidden lg:block">
            <div class="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/seed/iraq-hero/800/1000" class="w-full h-auto object-cover" alt="Iraq Events" referrerPolicy="no-referrer" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/60 to-transparent"></div>
              <div class="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <p class="text-white font-bold text-lg mb-1">Baghdad International Fair</p>
                <p class="text-white/80 text-sm flex items-center gap-2"><Calendar :size="14" /> April 15, 2026</p>
              </div>
            </div>
            <!-- Decorative dots -->
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-[#1E3A5F] mb-4">{{ locale === 'en' ? 'Browse by Category' : (locale === 'ar' ? 'تصفح حسب الفئة' : 'گەڕان بەپێی کۆمەڵە') }}</h2>
        <div class="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <router-link 
          v-for="cat in store.categories" 
          :key="cat.id"
          :to="`/events?category=${cat.id}`"
          class="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all text-center"
        >
          <div 
            class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
            :style="{ backgroundColor: cat.color + '20', color: cat.color }"
          >
            <component :is="getIcon(cat.icon)" :size="32" />
          </div>
          <h3 class="font-bold text-[#1E3A5F] group-hover:text-amber-600 transition-colors">{{ getCategoryName(cat) }}</h3>
          <p class="text-xs text-slate-400 mt-2">12+ {{ locale === 'en' ? 'Events' : (locale === 'ar' ? 'فعالية' : 'چالاکی') }}</p>
        </router-link>
      </div>
    </section>

    <!-- Featured Events -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold text-[#1E3A5F] mb-2">{{ locale === 'en' ? 'Featured Events' : (locale === 'ar' ? 'الفعاليات المميزة' : 'چالاکییە دیارەکان') }}</h2>
          <p class="text-slate-500">{{ locale === 'en' ? 'Handpicked experiences you shouldn\'t miss' : (locale === 'ar' ? 'تجارب مختارة بعناية لا ينبغي أن تفوتها' : 'ئەزموونی هەڵبژێردراو کە نابێت لەدەستی بدەیت') }}</p>
        </div>
        <router-link to="/events" class="hidden sm:flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all">
          {{ locale === 'en' ? 'View All' : (locale === 'ar' ? 'عرض الكل' : 'بینینی هەموو') }}
          <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <EventCard v-slot="{ event }" v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </section>

    <!-- Cities Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[#1E3A5F] rounded-[3rem] overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent pointer-events-none"></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div class="p-12 lg:p-20 text-white relative z-10">
            <h2 class="text-4xl font-bold mb-6 leading-tight">
              {{ locale === 'en' ? 'Events in all 18 Governorates' : (locale === 'ar' ? 'فعاليات في جميع المحافظات الـ 18' : 'چالاکییەکان لە هەر ١٨ پارێزگاکەدا') }}
            </h2>
            <p class="text-white/70 text-lg mb-10">
              {{ locale === 'en' ? 'From the mountains of Dohuk to the marshes of Basra, discover what\'s happening in your city.' : (locale === 'ar' ? 'من جبال دهوك إلى أهوار البصرة ، اكتشف ما يحدث في مدينتك.' : 'لە چیاکانی دهۆکەوە تا زۆنگاوەکانی بەسرە، ئەوەی لە شارەکەتدا ڕوودەدات بدۆزەرەوە.') }}
            </p>
            <div class="flex flex-wrap gap-3">
              <router-link 
                v-for="city in store.cities.slice(0, 6)" 
                :key="city.id"
                :to="`/events?city=${city.id}`"
                class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all"
              >
                {{ getCityName(city) }}
              </router-link>
              <router-link to="/events" class="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-bold flex items-center gap-2">
                {{ locale === 'en' ? 'View All Cities' : (locale === 'ar' ? 'عرض كل المدن' : 'بینینی هەموو شارەکان') }}
                <ChevronRight :size="16" />
              </router-link>
            </div>
          </div>
          <div class="hidden lg:block h-full min-h-[400px]">
            <img src="https://picsum.photos/seed/iraq-cities/1000/800" class="w-full h-full object-cover" alt="Iraq Cities" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
