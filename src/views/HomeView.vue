<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/events/EventCard.vue';
import { ArrowRight, Sparkles, MapPin, Search, ChevronRight } from 'lucide-vue-next';
import * as Icons from 'lucide-vue-next';

const { t, locale } = useI18n();
const store = useEventStore();
const router = useRouter();

onMounted(() => {
  document.title = 'Iraq Compass — Discover Events Across Iraq';
});

const searchQuery = ref('');
const selectedCity = ref('');

const featuredEvents = computed(() => {
  return [...store.events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);
});

const handleSearch = () => {
  router.push({
    path: '/events',
    query: {
      city: selectedCity.value || undefined,
      q: searchQuery.value || undefined
    }
  });
};

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
  <div class="pb-24">
    <!-- Hero Section -->
    <section class="relative min-h-[65vh] flex items-center pt-20 overflow-hidden bg-[#1E3A5F]">
      <!-- Iraq Map Overlay -->
      <div class="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 800 800" class="w-full h-full max-w-4xl text-white fill-current">
          <path d="M400 100 L500 200 L550 400 L500 600 L400 700 L300 600 L250 400 L300 200 Z" /> <!-- Simplified Iraq Shape -->
        </svg>
      </div>
      
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#1E3A5F] to-[#92400E] -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-amber-400 rounded-full text-sm font-bold mb-8 border border-white/10">
            <Sparkles :size="16" />
            {{ t('home.discover_best') }}
          </div>
          <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            {{ t('home.hero_title') }}
          </h1>
          <p class="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            {{ t('home.hero_subtitle') }}
          </p>
          
          <!-- Search Bar -->
          <div class="bg-white p-2 rounded-[2rem] shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <div class="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-e border-slate-100 py-2 md:py-0">
              <Search :size="20" class="text-slate-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                :placeholder="t('filters.search')"
                class="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium"
                @keyup.enter="handleSearch"
              />
            </div>
            <div class="flex-1 flex items-center px-4 gap-3 py-2 md:py-0">
              <MapPin :size="20" class="text-slate-400" />
              <select 
                v-model="selectedCity"
                class="w-full bg-transparent border-none focus:ring-0 text-slate-700 font-medium appearance-none cursor-pointer"
              >
                <option value="">{{ t('filters.city') }}</option>
                <option v-for="city in store.cities" :key="city.id" :value="city.id">
                  {{ getCityName(city) }}
                </option>
              </select>
            </div>
            <button 
              @click="handleSearch"
              class="bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-amber-900/20"
            >
              {{ locale === 'en' ? 'Search' : (locale === 'ar' ? 'بحث' : 'گەڕان') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid (Horizontal Scroll) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
      <div class="flex overflow-x-auto gap-4 pb-8 scrollbar-hide no-scrollbar">
        <router-link 
          v-for="cat in store.categories" 
          :key="cat.id"
          :to="`/events?category=${cat.id}`"
          class="flex-shrink-0 flex items-center gap-4 p-4 pr-8 bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-amber-200 transition-all group"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
            :style="{ backgroundColor: cat.color + '20', color: cat.color }"
          >
            <component :is="getIcon(cat.icon)" :size="24" />
          </div>
          <span class="font-bold text-[#1E3A5F] whitespace-nowrap">{{ getCategoryName(cat) }}</span>
        </router-link>
      </div>
    </section>

    <!-- Featured Events -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-bold text-[#1E3A5F] mb-2">{{ locale === 'en' ? 'Upcoming Events' : (locale === 'ar' ? 'الفعاليات القادمة' : 'چالاکییەکانی داهاتوو') }}</h2>
          <p class="text-slate-500">{{ t('home.featured_subtitle') }}</p>
        </div>
        <router-link to="/events" class="hidden sm:flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all">
          {{ t('home.view_all') }}
          <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EventCard v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>

      <div class="mt-12 text-center sm:hidden">
        <router-link to="/events" class="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-[#1E3A5F] font-bold rounded-2xl">
          {{ t('home.view_all') }}
          <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
        </router-link>
      </div>
    </section>

    <!-- Governorates Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
      <div class="bg-white rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -mr-32 -mt-32"></div>
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4 text-center">
            {{ t('home.all_governorates') }}
          </h2>
          <p class="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            {{ t('home.governorates_subtitle') }}
          </p>
          
          <div class="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar justify-start md:justify-center">
            <router-link 
              v-for="city in store.cities" 
              :key="city.id"
              :to="`/events?city=${city.id}`"
              class="flex-shrink-0 px-6 py-3 bg-slate-50 hover:bg-amber-500 hover:text-white rounded-xl text-sm font-bold text-[#1E3A5F] transition-all whitespace-nowrap"
            >
              {{ getCityName(city) }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
