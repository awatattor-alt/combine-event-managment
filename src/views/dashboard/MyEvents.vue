<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../../store/eventStore';
import { Edit2, Trash2, ExternalLink, Plus } from 'lucide-vue-next';

/**
 * Event organizer dashboard page listing managed events.
 */
const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();

const getCityName = (cityId: string) => {
  const city = store.cities.find(c => c.id === cityId);
  if (!city) return cityId;
  if (locale.value === 'ar') return city.nameAr;
  if (locale.value === 'ku') return city.nameKu;
  return city.name;
};

const handleDelete = (id: string) => {
  if (confirm(locale.value === 'en' ? 'Are you sure you want to delete this event?' : (locale.value === 'ar' ? 'هل أنت متأكد أنك تريد حذف هذه الفعالية؟' : 'ئایا دڵنیایت دەتەوێت ئەم چالاکییە بسڕیتەوە؟'))) {
    store.deleteEvent(id);
  }
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ t.dashboard.myEvents }}</h1>
        <p class="text-slate-500">{{ locale === 'en' ? 'Manage and monitor your active and past events.' : (locale === 'ar' ? 'إدارة ومراقبة فعالياتك النشطة والسابقة.' : 'بەڕێوەبردن و چاودێریکردنی چالاکییە چالاک و ڕابردووەکانت.') }}</p>
      </div>
      <router-link 
        to="/dashboard/create-event"
        class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10"
      >
        <Plus :size="20" /> {{ locale === 'en' ? 'Create New' : (locale === 'ar' ? 'إنشاء جديد' : 'دروستکردنی نوێ') }}
      </router-link>
    </div>

    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
            <tr>
              <th class="px-6 py-4">{{ t.dashboard.table.event }}</th>
              <th class="px-6 py-4">{{ t.dashboard.table.date }}</th>
              <th class="px-6 py-4">{{ t.dashboard.table.status }}</th>
              <th class="px-6 py-4">{{ t.dashboard.table.tickets }}</th>
              <th class="px-6 py-4 text-right">{{ t.dashboard.table.actions }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="event in store.events" :key="event.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <img :src="event.image" class="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p class="font-bold text-slate-900">{{ event.title }}</p>
                    <p class="text-xs text-slate-500">{{ getCityName(event.city) }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ new Date(event.date).toLocaleDateString(locale === 'ar' ? 'ar-IQ' : 'en-GB') }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase">{{ locale === 'en' ? 'Published' : (locale === 'ar' ? 'منشور' : 'بڵاوکراوەتەوە') }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ Math.floor(Math.random() * 100) }} / {{ event.ticketAvailability }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <router-link :to="`/dashboard/edit-event/${event.id}`" class="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                    <Edit2 :size="18" />
                  </router-link>
                  <button @click="handleDelete(event.id)" class="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 :size="18" />
                  </button>
                  <router-link :to="`/events/${event.id}`" class="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink :size="18" />
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
