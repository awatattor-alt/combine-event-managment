<script setup lang="ts">
import { onMounted, inject } from 'vue';
import { useTicketStore } from '../store/ticketStore';
import { useUserStore } from '../store/userStore';
import { Ticket, Calendar, MapPin, QrCode } from 'lucide-vue-next';
import EmptyState from '../components/EmptyState.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';

const t = inject<any>('t');
const locale = inject<any>('locale');
const ticketStore = useTicketStore();
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.user) {
    await ticketStore.fetchUserTickets(userStore.user.id);
  }
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(locale.value === 'ar' ? 'ar-IQ' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ locale === 'en' ? 'My Tickets' : (locale === 'ar' ? 'تذاكري' : 'تیکتەکانم') }}</h1>
      <p class="text-slate-500">{{ locale === 'en' ? 'Manage your upcoming event experiences' : (locale === 'ar' ? 'إدارة تجارب فعالياتك القادمة' : 'بەڕێوەبردنی ئەزموونەکانی چالاکی داهاتووت') }}</p>
    </div>

    <div v-if="ticketStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SkeletonLoader v-for="i in 4" :key="i" className="h-48 w-full" />
    </div>

    <div v-else-if="ticketStore.tickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="ticket in ticketStore.tickets" :key="ticket.id" class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
        <div class="sm:w-1/3 h-48 sm:h-auto relative">
          <img :src="ticket.event?.image" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div class="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div class="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-slate-900 text-lg leading-tight">{{ ticket.event?.title }}</h3>
              <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">
                {{ ticket.status }}
              </span>
            </div>
            
            <div class="space-y-2 mt-4">
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <Calendar :size="14" class="text-emerald-500" />
                {{ formatDate(ticket.event?.date) }}
              </div>
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <MapPin :size="14" class="text-emerald-500" />
                {{ ticket.event?.venue }}, {{ ticket.event?.city }}
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-dashed border-slate-200 flex justify-between items-center">
            <div>
              <p class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Order ID</p>
              <p class="text-sm font-mono text-slate-900">#{{ ticket.id.toUpperCase() }}</p>
            </div>
            <button class="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
              <QrCode :size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <EmptyState 
      v-else 
      :title="locale === 'en' ? 'No Tickets Yet' : (locale === 'ar' ? 'لا توجد تذاكر بعد' : 'هێشتا تیکت نییە')"
      :message="locale === 'en' ? 'You haven\'t purchased any tickets yet. Explore events and join the community!' : (locale === 'ar' ? 'لم تقم بشراء أي تذاكر بعد. استكشف الفعاليات وانضم إلى المجتمع!' : 'هێشتا هیچ تیکتێکت نەکڕیوە. چالاکییەکان بگەڕێ و ببە بە ئەندام لە کۆمەڵگەکە!')"
      icon="🎟️"
    >
      <template #action>
        <router-link to="/events" class="mt-8 inline-block px-8 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20">
          {{ locale === 'en' ? 'Browse Events' : (locale === 'ar' ? 'تصفح الفعاليات' : 'گەڕان بەناو چالاکییەکاندا') }}
        </router-link>
      </template>
    </EmptyState>
  </div>
</template>
