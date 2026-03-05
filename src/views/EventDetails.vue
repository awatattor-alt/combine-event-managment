<script setup lang="ts">
import { inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../store/eventStore';
import { useUserStore } from '../store/userStore';
import { Calendar, MapPin, User, Share2, Heart, Ticket } from 'lucide-vue-next';
import { formatDate, formatIQDCurrency } from '../utils/format';
import { getLocalizedValue } from '../utils/language';

const route = useRoute();
const router = useRouter();
const store = useEventStore();
const userStore = useUserStore();
const t = inject<any>('t');
const locale = inject<any>('locale');

const event = computed(() => store.events.find((e) => e.id === route.params.id));
const organizer = computed(() => {
  const currentEvent = event.value;
  if (!currentEvent) return null;
  return store.organizers.find((o: any) => o.id === currentEvent.organizerId);
});

const relatedEvents = computed(() => {
  if (!event.value) return [];
  return store.events.filter((e) => e.category === event.value.category && e.id !== event.value.id).slice(0, 3);
});

const getCategoryName = (catId: string) => {
  const cat = store.categories.find((c: any) => c.id === catId);
  return getLocalizedValue(cat, locale.value) || catId;
};

const getCityName = (cityId: string) => {
  const city = store.cities.find((c: any) => c.id === cityId);
  return getLocalizedValue(city, locale.value) || cityId;
};

const handleReserve = () => {
  if (!userStore.isAuthenticated) return router.push('/login');
  if (!event.value) return;
  router.push(`/checkout/${event.value.id}`);
};
</script>

<template>
  <div v-if="store.loading" class="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">{{ t.common.loading }}</div>
  <div v-else-if="store.error" class="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">{{ store.error }}</div>
  <div v-else-if="!event" class="max-w-7xl mx-auto px-4 py-20 text-center">
    <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ locale === 'en' ? 'Event not found' : (locale === 'ar' ? 'الفعالية غير موجودة' : 'چالاکی نەدۆزرایەوە') }}</h2>
    <router-link to="/events" class="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold">{{ t.nav.events }}</router-link>
  </div>

  <div v-else class="pb-20">
    <div class="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img :src="event.image" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
      <div class="absolute bottom-0 inset-inline-start-0 w-full p-8 md:p-16">
        <div class="max-w-7xl mx-auto">
          <div class="flex gap-2 mb-4">
            <span class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase">{{ getCategoryName(event.category) }}</span>
            <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase">{{ getCityName(event.city) }}</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">{{ event.title }}</h1>
          <div class="flex flex-wrap gap-6 text-white/90">
            <div class="flex items-center gap-2"><Calendar :size="20" class="text-emerald-400" />{{ formatDate(event.date, locale.value, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</div>
            <div class="flex items-center gap-2"><MapPin :size="20" class="text-emerald-400" />{{ event.venue }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">{{ locale === 'en' ? 'About this event' : (locale === 'ar' ? 'عن هذه الفعالية' : 'دەربارەی ئەم چالاکییە') }}</h2>
            <p class="text-slate-600 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <div class="mb-6">
              <p class="text-slate-500 text-sm mb-1">{{ t.event.price }}</p>
              <p class="text-3xl font-black text-slate-900">{{ event.price === 0 ? t.event.free : formatIQDCurrency(event.price, locale.value) }}</p>
            </div>
            <button @click="handleReserve" class="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl"><Ticket :size="20" class="inline mr-2" />{{ t.event.getTickets }}</button>
            <div class="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div class="flex items-center gap-3"><User :size="20" class="text-slate-500" /><p class="text-sm font-bold text-slate-900">{{ organizer?.name || 'Unknown Organizer' }}</p></div>
              <div class="flex items-center justify-between text-sm"><span class="text-slate-500">{{ t.event.availability }}</span><span class="font-bold text-emerald-600">{{ event.ticketAvailability }} {{ t.event.ticketsLeft }}</span></div>
            </div>
            <div class="flex gap-4 mt-8">
              <button class="flex-1 py-3 border border-slate-200 rounded-xl"><Share2 :size="18" class="inline mr-1" />Share</button>
              <button class="flex-1 py-3 border border-slate-200 rounded-xl"><Heart :size="18" class="inline mr-1" />Save</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="relatedEvents.length > 0" class="mt-20">
        <h2 class="text-3xl font-bold text-slate-900 mb-8">{{ t.event.related }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="relEvent in relatedEvents" :key="relEvent.id" class="group bg-white rounded-2xl overflow-hidden border border-slate-200">
            <router-link :to="`/events/${relEvent.id}`"><img :src="relEvent.image" class="w-full aspect-video object-cover" referrerPolicy="no-referrer" /><div class="p-4"><h4 class="font-bold text-slate-900">{{ relEvent.title }}</h4><p class="text-sm text-slate-500 mt-1">{{ getCityName(relEvent.city) }}</p></div></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
