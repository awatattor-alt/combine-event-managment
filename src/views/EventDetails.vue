<script setup lang="ts">
import { inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../store/eventStore';
import { useUserStore } from '../store/userStore';
import { Calendar, MapPin, User, Share2, Heart, Ticket } from 'lucide-vue-next';

/**
 * Event details page with event metadata, reservation entrypoint, and related events.
 */

const route = useRoute();
const router = useRouter();
const store = useEventStore();
const userStore = useUserStore();
const t = inject<any>('t');
const locale = inject<any>('locale');

const event = computed(() => store.events.find(e => e.id === route.params.id));
const organizer = computed(() => {
  const currentEvent = event.value;
  if (!currentEvent) return null;
  return store.organizers.find((organizerItem) => organizerItem.id === currentEvent.organizerId);
});

const relatedEvents = computed(() => {
  const currentEvent = event.value;
  if (!currentEvent) return [];
  return store.events
    .filter(e => e.category === currentEvent.category && e.id !== currentEvent.id)
    .slice(0, 3);
});

const getCategoryName = (catId: string) => {
  const cat = store.categories.find(c => c.id === catId);
  if (!cat) return catId;
  if (locale.value === 'ar') return cat.nameAr;
  if (locale.value === 'ku') return cat.nameKu;
  return cat.name;
};

const getCityName = (cityId: string) => {
  const city = store.cities.find(c => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const handleReserve = () => {
  if (!event.value) return;
  if (!userStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  router.push(`/checkout/${event.value.id}`);
};
</script>

<template>
  <div v-if="event" class="pb-20">
    <!-- Hero Header -->
    <div class="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img 
        :src="event.image" 
        class="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
      
      <div class="absolute bottom-0 inset-inline-start-0 w-full p-8 md:p-16">
        <div class="max-w-7xl mx-auto">
          <div class="flex gap-2 mb-4">
            <span class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase">
              {{ getCategoryName(event.category) }}
            </span>
            <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase">
              {{ getCityName(event.city) }}
            </span>
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {{ event.title }}
          </h1>
          
          <div class="flex flex-wrap gap-6 text-white/90">
            <div class="flex items-center gap-2">
              <Calendar :size="20" class="text-emerald-400" />
              {{ formatDate(event.date) }}
            </div>
            <div class="flex items-center gap-2">
              <MapPin :size="20" class="text-emerald-400" />
              {{ event.venue }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">{{ locale === 'en' ? 'About this event' : (locale === 'ar' ? 'عن هذه الفعالية' : 'دەربارەی ئەم چالاکییە') }}</h2>
            <p class="text-slate-600 leading-relaxed whitespace-pre-line">
              {{ event.description }}
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">{{ locale === 'en' ? 'Location' : (locale === 'ar' ? 'الموقع' : 'شوێن') }}</h2>
            <div class="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
              <div class="text-center">
                <MapPin :size="48" class="mx-auto mb-4 opacity-20" />
                <p>{{ locale === 'en' ? 'Interactive Map Placeholder' : (locale === 'ar' ? 'مكان الخريطة التفاعلية' : 'شوێنی نەخشەی کارلێکەر') }}</p>
                <p class="text-sm">{{ event.venue }}, {{ getCityName(event.city) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <div class="mb-6">
              <p class="text-slate-500 text-sm mb-1">{{ t.event.price }}</p>
              <p class="text-3xl font-black text-slate-900">
                {{ event.price === 0 ? t.event.free : `${event.price.toLocaleString()} IQD` }}
              </p>
            </div>

            <button 
              @click="handleReserve"
              class="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10"
            >
              <Ticket :size="20" />
              {{ t.event.getTickets }}
            </button>

            <div class="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <User :size="20" class="text-slate-500" />
                  </div>
                  <div>
                    <p class="text-xs text-slate-500">{{ t.event.organizer }}</p>
                    <p class="text-sm font-bold text-slate-900">{{ organizer?.name || 'Unknown Organizer' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">{{ t.event.availability }}</span>
                <span class="font-bold text-emerald-600">{{ event.ticketAvailability }} {{ t.event.ticketsLeft }}</span>
              </div>
            </div>

            <div class="flex gap-4 mt-8">
              <button class="flex-1 py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 transition-colors">
                <Share2 :size="18" /> {{ locale === 'en' ? 'Share' : (locale === 'ar' ? 'مشاركة' : 'هاوبەشکردن') }}
              </button>
              <button class="flex-1 py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 transition-colors">
                <Heart :size="18" /> {{ locale === 'en' ? 'Save' : (locale === 'ar' ? 'حفظ' : 'پاشەکەوتکردن') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Events -->
      <div v-if="relatedEvents.length > 0" class="mt-20">
        <h2 class="text-3xl font-bold text-slate-900 mb-8">{{ t.event.related }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="relEvent in relatedEvents" :key="relEvent.id" class="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
            <router-link :to="`/events/${relEvent.id}`">
              <img :src="relEvent.image" class="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
              <div class="p-4">
                <h4 class="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{{ relEvent.title }}</h4>
                <p class="text-sm text-slate-500 mt-1">{{ getCityName(relEvent.city) }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
