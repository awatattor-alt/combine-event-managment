<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../../store';
import { ArrowLeft, Upload } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();
const route = useRoute();
const router = useRouter();

const event = ref<any>(null);

const getCategoryName = (cat: any) => {
  if (locale.value === 'ar') return cat.nameAr;
  if (locale.value === 'ku') return cat.nameKu;
  return cat.name;
};

const getCityName = (city: any) => {
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

onMounted(() => {
  const found = store.events.find(e => e.id === route.params.id);
  if (found) {
    event.value = { ...found };
  } else {
    router.push('/dashboard/my-events');
  }
});

const handleSubmit = () => {
  store.updateEvent(event.value);
  router.push('/dashboard/my-events');
};
</script>

<template>
  <div v-if="event" class="max-w-4xl">
    <div class="mb-10">
      <router-link to="/dashboard/my-events" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-4">
        <ArrowLeft :size="16" /> {{ locale === 'en' ? 'Back to Events' : (locale === 'ar' ? 'العودة إلى الفعاليات' : 'گەڕانەوە بۆ چالاکییەکان') }}
      </router-link>
      <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ locale === 'en' ? 'Edit Event' : (locale === 'ar' ? 'تعديل الفعالية' : 'دەستکاریکردنی چالاکی') }}</h1>
      <p class="text-slate-500">{{ locale === 'en' ? 'Update the details for your event.' : (locale === 'ar' ? 'تحديث تفاصيل فعاليتك.' : 'زانیارییەکانی چالاکییەکەت نوێ بکەرەوە.') }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Info -->
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{{ locale === 'en' ? 'Basic Information' : (locale === 'ar' ? 'معلومات أساسية' : 'زانیاری بنەڕەتی') }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ locale === 'en' ? 'Event Title' : (locale === 'ar' ? 'عنوان الفعالية' : 'ناونیشانی چالاکی') }}</label>
            <input v-model="event.title" type="text" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500" />
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ t.event.description }}</label>
            <textarea v-model="event.description" rows="4" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ t.filters.category }}</label>
            <select v-model="event.category" class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500">
              <option v-for="cat in store.categories" :key="cat.id" :value="cat.id">{{ getCategoryName(cat) }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ t.filters.city }}</label>
            <select v-model="event.city" class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500">
              <option v-for="city in store.cities" :key="city.id" :value="city.id">{{ getCityName(city) }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Logistics -->
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 class="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{{ locale === 'en' ? 'Logistics & Pricing' : (locale === 'ar' ? 'الخدمات اللوجستية والتسعير' : 'لۆجستی و نرخاندن') }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ locale === 'en' ? 'Venue Name' : (locale === 'ar' ? 'اسم المكان' : 'ناوی شوێن') }}</label>
            <input v-model="event.venue" type="text" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ locale === 'en' ? 'Date & Time' : (locale === 'ar' ? 'التاريخ والوقت' : 'ڕێکەوت و کات') }}</label>
            <input v-model="event.date" type="datetime-local" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ locale === 'en' ? 'Ticket Price (IQD)' : (locale === 'ar' ? 'سعر التذكرة (دينار عراقي)' : 'نرخی تیکت (دینار)') }}</label>
            <input v-model="event.price" type="number" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">{{ locale === 'en' ? 'Total Tickets Available' : (locale === 'ar' ? 'إجمالي التذاكر المتاحة' : 'کۆی تیکتە بەردەستەکان') }}</label>
            <input v-model="event.ticketAvailability" type="number" required class="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button type="button" @click="router.back()" class="px-8 py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all">
          {{ t.common.cancel }}
        </button>
        <button type="submit" class="px-12 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all">
          {{ t.common.saveChanges }}
        </button>
      </div>
    </form>
  </div>
</template>
