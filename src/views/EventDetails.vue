<script setup lang="ts">
import { ref, inject, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../store/eventStore';
import { useUserStore } from '../store/userStore';
import { Calendar, MapPin, Share2, Heart, Ticket, Info, ArrowLeft, Clock, ShieldCheck, ChevronRight } from 'lucide-vue-next';
import EventCard from '../components/events/EventCard.vue';
import SkeletonCard from '@/components/ui/SkeletonCard.vue';
import type { EventItem } from '@/store/eventStore';

const route = useRoute();
const router = useRouter();
const store = useEventStore();
const userStore = useUserStore();
const { t, locale } = useI18n();

const event = computed(() => store.events.find(e => e.id === route.params.id));
interface OrganizerProfile {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  verified: boolean;
  avatar?: string;
}

const organizer = computed<OrganizerProfile | { name: string } | null>(() => {
  const currentEvent = event.value;
  if (!currentEvent) return null;
  return store.organizers?.find((o) => o.id === currentEvent.organizer_id) || { name: currentEvent.organizer_name };
});

const relatedEvents = computed(() => {
  const currentEvent = event.value;
  if (!currentEvent) return [];
  return store.events
    .filter(e => e.category === currentEvent.category && e.id !== currentEvent.id)
    .slice(0, 3);
});

const isBookmarked = ref(false);
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 350);
});

watch(event, (currentEvent: EventItem | undefined) => {
  if (currentEvent) {
    document.title = `${currentEvent.title_en} — Iraq Compass`;
  }
}, { immediate: true });

const getCategoryName = (catId: string) => {
  const cat = store.categories.find(c => c.id === catId);
  if (!cat) return catId;
  if (locale.value === 'ar') return cat.name_ar;
  if (locale.value === 'ku') return cat.name_ku;
  return cat.name_en;
};

const getCityName = (cityId: string) => {
  const city = store.cities.find(c => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
};

const getTitle = computed(() => {
  if (!event.value) return '';
  if (locale.value === 'ar') return event.value.title_ar;
  if (locale.value === 'ku') return event.value.title_ku;
  return event.value.title_en;
});

const getDescription = computed(() => {
  if (!event.value) return '';
  if (locale.value === 'ar') return event.value.description_ar;
  if (locale.value === 'ku') return event.value.description_ku;
  return event.value.description_en;
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const handleReserve = () => {
  if (!userStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  router.push(`/checkout/${event.value?.id}`);
};

const showToast = inject<(message: string, type?: 'success' | 'error') => void>('showToast')!;

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  showToast(isBookmarked.value ? 'Event saved to bookmarks' : 'Event removed from bookmarks');
};

const shareEvent = () => {
  navigator.clipboard.writeText(window.location.href);
  showToast('Link copied to clipboard!');
};
</script>

<template>
  <div v-if="isLoading" class="mx-auto max-w-7xl px-4 py-20">
    <div class="space-y-8">
      <SkeletonCard class-name="h-12 w-1/2" />
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <SkeletonCard class-name="h-80 w-full" />
          <SkeletonCard class-name="h-60 w-full" />
        </div>
        <div class="space-y-6">
          <SkeletonCard class-name="h-64 w-full" />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="!event" class="mx-auto max-w-7xl px-4 py-20">
    <p class="text-center text-slate-500">{{ t('common.no_results') }}</p>
  </div>

  <div v-else class="pb-24 bg-[#FFFBF5]">
    <!-- Hero Header -->
    <div class="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img :src="event.image_url" class="w-full h-full object-cover" :alt="getTitle" referrerPolicy="no-referrer" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1E3A5F] via-[#1E3A5F]/20 to-transparent"></div>
      
      <div class="absolute top-8 left-0 right-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button @click="router.back()" class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20">
            <ArrowLeft :size="24" :class="locale !== 'en' ? 'rotate-180' : ''" />
          </button>
          <div class="flex gap-3">
            <button @click="shareEvent" class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <Share2 :size="20" />
            </button>
            <button @click="toggleBookmark" class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all" :class="{ 'text-amber-500': isBookmarked }">
              <Heart :size="20" :fill="isBookmarked ? 'currentColor' : 'none'" />
            </button>
          </div>
        </div>
      </div>

      <div class="absolute bottom-12 left-0 right-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest mb-6">
            {{ getCategoryName(event.category) }}
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight max-w-4xl">
            {{ getTitle }}
          </h1>
          <div class="flex flex-wrap gap-6 text-white/80 font-medium">
            <div class="flex items-center gap-2">
              <Calendar :size="20" class="text-amber-500" />
              {{ formatDate(event.date) }}
            </div>
            <div class="flex items-center gap-2">
              <MapPin :size="20" class="text-amber-500" />
              {{ event.venue }}, {{ getCityName(event.city) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-12">
          <!-- Description -->
          <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-slate-100">
            <h2 class="text-2xl font-bold text-[#1E3A5F] mb-6 flex items-center gap-3">
              <Info :size="24" class="text-amber-500" />
              {{ t('event.about') }}
            </h2>
            <div class="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
              <p>{{ getDescription }}</p>
            </div>
            
            <!-- Event Highlights -->
            <div class="mt-12 grid grid-cols-1 gap-6 border-t border-slate-50 pt-12 sm:grid-cols-2">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                  <Clock :size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-[#1E3A5F]">{{ t('event.duration') }}</h4>
                  <p class="text-sm text-slate-500">3-4 Hours</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck :size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-[#1E3A5F]">{{ t('event.safety') }}</h4>
                  <p class="text-sm text-slate-500">{{ t('event.verified') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Events -->
          <div v-if="relatedEvents.length > 0">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-bold text-[#1E3A5F]">{{ t('event.similar') }}</h2>
              <router-link to="/events" class="flex items-center gap-2 font-bold text-amber-600">
                {{ t('home.view_all') }}
                <ChevronRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </router-link>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EventCard v-for="relEvent in relatedEvents" :key="relEvent.id" :event="relEvent" />
            </div>
          </div>
        </div>

        <!-- Right Column (Sidebar) -->
        <div class="space-y-8">
          <!-- Booking Card -->
          <div class="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/10 border border-slate-100 sticky top-24">
            <div class="mb-8">
              <p class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{{ t('event.price') }}</p>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-extrabold text-[#1E3A5F]">
                  {{ event.price === 0 ? t('event.free') : event.price.toLocaleString() }}
                </span>
                <span v-if="event.price > 0" class="text-slate-400 font-bold">IQD</span>
              </div>
            </div>

            <button 
              @click="handleReserve"
              class="w-full py-5 bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-900/20 hover:bg-amber-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mb-6"
            >
              <Ticket :size="24" />
              {{ t('event.getTickets') }}
            </button>

            <p class="text-center text-xs text-slate-400 font-medium">
              {{ t('event.secure_checkout') }}
            </p>

            <div class="mt-8 pt-8 border-t border-slate-50">
              <h4 class="font-bold text-[#1E3A5F] mb-4">{{ t('event.organizer') }}</h4>
              <div class="flex items-center gap-4">
                <img :src="organizer?.avatar || `https://picsum.photos/seed/${event.organizer_id}/100/100`" class="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div>
                  <div class="flex items-center gap-1">
                    <p class="font-bold text-[#1E3A5F]">{{ organizer?.name || event.organizer_name }}</p>
                    <ShieldCheck v-if="organizer?.verified" :size="14" class="text-emerald-500" />
                  </div>
                  <p class="text-xs text-slate-400">154 {{ t('event.hosted') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
