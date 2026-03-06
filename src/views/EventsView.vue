<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SlidersHorizontal, Search } from 'lucide-vue-next';
import EventCard from '../components/events/EventCard.vue';
import { useEventStore, type DateRange, type SortType } from '../store/eventStore';

const store = useEventStore();
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const showMobileFilters = ref(false);

const searchKeyword = computed({
  get: () => store.filters.keyword,
  set: (value: string) => store.setFilter('keyword', value),
});

const searchCity = computed({
  get: () => store.filters.city,
  set: (value: string) => store.setFilter('city', value),
});

const sortBy = computed({
  get: () => store.sortBy,
  set: (value: SortType) => store.setSortBy(value),
});

const hasActiveFilters = computed(() => {
  const { category, city, dateRange, isFree, keyword } = store.filters;
  return category.length > 0 || Boolean(city) || dateRange !== 'all' || isFree || Boolean(keyword.trim());
});

const cityName = (cityId: string) => {
  const city = store.cities.find((item) => item.id === cityId);
  if (!city) {
    return cityId;
  }
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const categoryName = (categoryId: string) => {
  const category = store.categories.find((item) => item.id === categoryId);
  if (!category) {
    return categoryId;
  }
  if (locale.value === 'ar') return category.name_ar;
  if (locale.value === 'ku') return category.name_ku;
  return category.name_en;
};

const toggleCategory = (categoryId: string, checked: boolean) => {
  const selected = new Set(store.filters.category);
  if (checked) {
    selected.add(categoryId);
  } else {
    selected.delete(categoryId);
  }
  store.setFilter('category', Array.from(selected));
};

const applyQueryFilters = () => {
  const category = route.query.category;
  const city = route.query.city;
  const keyword = route.query.q;

  if (typeof category === 'string' && category.trim()) {
    const match = store.categories.find((item) => {
      const search = category.trim().toLowerCase();
      return (
        item.id.toLowerCase() === search ||
        item.name_en.toLowerCase() === search ||
        item.name_ar.toLowerCase() === search ||
        item.name_ku.toLowerCase() === search
      );
    });
    store.setFilter('category', match ? [match.id] : [category.trim().toLowerCase()]);
  }

  if (typeof city === 'string' && city.trim()) {
    store.setFilter('city', city.trim().toLowerCase());
  }

  if (typeof keyword === 'string') {
    store.setFilter('keyword', keyword);
  }
};

watch(
  () => store.filters,
  (filters) => {
    router.replace({
      query: {
        category: filters.category[0] || undefined,
        city: filters.city || undefined,
        q: filters.keyword || undefined,
      },
    });
  },
  { deep: true },
);

onMounted(async () => {
  if (store.events.length === 0) {
    await store.loadEvents();
  }
  applyQueryFilters();
});
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF5] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold text-[#1E3A5F]">{{ t('events.title') }}</h1>
        <button
          class="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white"
          @click="showMobileFilters = !showMobileFilters"
        >
          <SlidersHorizontal :size="16" />
          {{ t('events.filters') }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
        <aside :class="['space-y-4', showMobileFilters ? 'block' : 'hidden md:block']">
          <div class="bg-white rounded-xl border border-slate-200 p-4 space-y-5">
            <div>
              <h2 class="font-semibold text-[#1E3A5F] mb-2">{{ t('filters.category') }}</h2>
              <div class="space-y-2">
                <label
                  v-for="category in store.categories"
                  :key="category.id"
                  class="flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    :checked="store.filters.category.includes(category.id)"
                    @change="toggleCategory(category.id, ($event.target as HTMLInputElement).checked)"
                  />
                  <span>{{ categoryName(category.id) }}</span>
                </label>
              </div>
            </div>

            <div>
              <h2 class="font-semibold text-[#1E3A5F] mb-2">{{ t('filters.city') }}</h2>
              <select
                :value="store.filters.city"
                class="w-full border border-slate-300 rounded-lg px-3 py-2"
                @change="store.setFilter('city', ($event.target as HTMLSelectElement).value)"
              >
                <option value="">{{ t('filters.all') }}</option>
                <option v-for="city in store.cities" :key="city.id" :value="city.id">{{ cityName(city.id) }}</option>
              </select>
            </div>

            <div>
              <h2 class="font-semibold text-[#1E3A5F] mb-2">{{ t('events.dateRange') }}</h2>
              <label class="flex items-center gap-2 text-sm mb-2">
                <input
                  type="radio"
                  name="dateRange"
                  :checked="store.filters.dateRange === 'all'"
                  @change="store.setFilter('dateRange', 'all' as DateRange)"
                />
                {{ t('events.allDates') }}
              </label>
              <label class="flex items-center gap-2 text-sm mb-2">
                <input
                  type="radio"
                  name="dateRange"
                  :checked="store.filters.dateRange === 'week'"
                  @change="store.setFilter('dateRange', 'week' as DateRange)"
                />
                {{ t('events.thisWeek') }}
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="dateRange"
                  :checked="store.filters.dateRange === 'month'"
                  @change="store.setFilter('dateRange', 'month' as DateRange)"
                />
                {{ t('events.thisMonth') }}
              </label>
            </div>

            <label class="flex items-center justify-between gap-4">
              <span class="text-sm">{{ t('events.freeOnly') }}</span>
              <input
                type="checkbox"
                :checked="store.filters.isFree"
                @change="store.setFilter('isFree', ($event.target as HTMLInputElement).checked)"
              />
            </label>

            <button
              v-if="hasActiveFilters"
              class="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              @click="store.clearFilters()"
            >
              {{ t('events.clear_filters') }}
            </button>
          </div>
        </aside>

        <section>
          <div class="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row gap-3">
            <div class="relative flex-1">
              <Search class="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
              <input
                v-model="searchKeyword"
                :placeholder="t('filters.search')"
                class="w-full border border-slate-300 rounded-lg py-2 ps-9 pe-3"
              />
            </div>
            <select v-model="searchCity" class="border border-slate-300 rounded-lg px-3 py-2 md:w-52">
              <option value="">{{ t('filters.city') }} ({{ t('filters.all') }})</option>
              <option v-for="city in store.cities" :key="city.id" :value="city.id">{{ cityName(city.id) }}</option>
            </select>
            <select v-model="sortBy" class="border border-slate-300 rounded-lg px-3 py-2 md:w-44">
              <option value="newest">{{ t('events.sortNewest') }}</option>
              <option value="soonest">{{ t('events.sortSoonest') }}</option>
              <option value="az">{{ t('events.sortAz') }}</option>
            </select>
          </div>

          <p class="text-slate-600 mb-4">{{ t('events.found', { count: store.filteredEvents.length }) }}</p>

          <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <div v-for="idx in 6" :key="idx" class="h-72 rounded-xl bg-slate-200 animate-pulse" />
          </div>

          <div v-else-if="store.filteredEvents.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <EventCard v-for="event in store.filteredEvents" :key="event.id" :event="event" />
          </div>

          <div v-else class="bg-white rounded-xl border border-dashed border-slate-300 py-20 px-6 text-center">
            <div class="text-6xl mb-3">🗓️</div>
            <h3 class="text-2xl font-bold text-[#1E3A5F] mb-2">{{ t('events.noEvents') }}</h3>
            <button
              class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              @click="store.clearFilters()"
            >
              {{ t('events.clear_filters') }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
