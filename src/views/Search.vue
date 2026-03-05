<script setup lang="ts">
import { computed, inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import FilterBar from '../components/FilterBar.vue';
import EventCard from '../components/EventCard.vue';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const quickFilters = [
  { id: 'today', label: { en: 'Today', ar: 'اليوم', ku: 'ئەمڕۆ' }, count: 4 },
  { id: 'weekend', label: { en: 'This Weekend', ar: 'نهاية هذا الأسبوع', ku: 'ئەم کۆتایی هەفتەیە' }, count: 8 },
  { id: 'free', label: { en: 'Free Events', ar: 'فعاليات مجانية', ku: 'چالاکییە خۆڕایییەکان' }, count: 5 },
];

const localized = (item: { en: string; ar: string; ku: string }) => item[locale.value as 'en' | 'ar' | 'ku'] || item.en;

const highlightedResults = computed(() => store.filteredEvents.slice(0, 6));
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <header class="space-y-4">
      <h1 class="text-4xl font-extrabold text-slate-900">{{ locale === 'en' ? 'Search & Filter Events' : (locale === 'ar' ? 'البحث وتصفية الفعاليات' : 'گەڕان و فلتەرکردنی چالاکییەکان') }}</h1>
      <p class="text-slate-500 max-w-3xl">{{ locale === 'en' ? 'Use keywords, categories, and locations to discover experiences tailored for you.' : (locale === 'ar' ? 'استخدم الكلمات المفتاحية والفئات والمواقع لاكتشاف تجارب تناسبك.' : 'وشە کلیلییەکان، پۆلەکان و شوێنەکان بەکاربهێنە بۆ دۆزینەوەی ئەزموونە گونجاوەکان بۆ خۆت.') }}</p>
      <FilterBar />
    </header>

    <section>
      <h2 class="text-xl font-bold text-slate-900 mb-4">{{ locale === 'en' ? 'Quick Filters' : (locale === 'ar' ? 'فلاتر سريعة' : 'فلتەری خێرا') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          v-for="filter in quickFilters"
          :key="filter.id"
          class="bg-white border border-slate-200 p-4 rounded-2xl text-left hover:border-emerald-500 hover:shadow-sm transition"
        >
          <p class="text-sm text-slate-500">{{ localized(filter.label) }}</p>
          <p class="text-2xl font-black text-slate-900">{{ filter.count }}</p>
        </button>
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-slate-900">{{ t.nav.events }}</h2>
        <router-link to="/events" class="text-emerald-600 font-bold">{{ locale === 'en' ? 'Open full listing' : (locale === 'ar' ? 'فتح القائمة الكاملة' : 'کردنەوەی لیستی تەواو') }}</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard v-for="event in highlightedResults" :key="event.id" :event="event" />
      </div>
    </section>
  </div>
</template>
