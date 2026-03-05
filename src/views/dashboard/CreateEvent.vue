<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useEventStore } from '../../store/eventStore';
import { ArrowLeft } from 'lucide-vue-next';
import EventForm from '../../components/EventForm.vue';

const t = inject<any>('t');
const locale = inject<any>('locale');
const store = useEventStore();
const router = useRouter();

const event = ref({
  title: '',
  description: '',
  category: 'cat1',
  city: 'baghdad',
  venue: '',
  date: '',
  price: 0,
  ticketAvailability: 100,
  image: 'https://picsum.photos/seed/new/800/600'
});

const handleSubmit = () => {
  store.addEvent(event.value);
  router.push('/dashboard/my-events');
};
</script>

<template>
  <div class="max-w-4xl">
    <div class="mb-10">
      <router-link to="/dashboard/my-events" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-4">
        <ArrowLeft :size="16" /> {{ locale === 'en' ? 'Back to Events' : (locale === 'ar' ? 'العودة إلى الفعاليات' : 'گەڕانەوە بۆ چالاکییەکان') }}
      </router-link>
      <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ t.dashboard.createEvent }}</h1>
      <p class="text-slate-500">{{ t.dashboard.formIntro }}</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <EventForm
        v-model="event"
        :categories="store.categories"
        :cities="store.cities"
        :submit-label="t.common.publish"
        @submit="handleSubmit"
        @cancel="router.back()"
      />
    </div>
  </div>
</template>
