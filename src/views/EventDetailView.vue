<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Calendar, Clock3, MapPin, Building2, Share2, ArrowLeft } from 'lucide-vue-next';
import EventCard from '../components/events/EventCard.vue';
import NotFound from '../components/NotFound.vue';
import { useEventStore } from '../store/eventStore';

const route = useRoute();
const router = useRouter();
const store = useEventStore();
const { t, locale } = useI18n();
const showToast = inject<(message: string, type?: 'success' | 'error') => void>('showToast');

const notFound = ref(false);

const event = computed(() => {
  const id = String(route.params.id);
  return store.getEventById(id);
});

const organizer = computed(() => {
  if (!event.value) return undefined;
  return store.organizers.find((item) => item.id === event.value?.organizer_id);
});

const relatedEvents = computed(() => {
  if (!event.value) return [];
  return store.events
    .filter((item) => item.category === event.value?.category && item.id !== event.value?.id)
    .slice(0, 3);
});

const localizedTitle = computed(() => {
  if (!event.value) return '';
  if (locale.value === 'ar') return event.value.title_ar;
  if (locale.value === 'ku') return event.value.title_ku;
  return event.value.title_en;
});

const localizedDescription = computed(() => {
  if (!event.value) return '';
  if (locale.value === 'ar') return event.value.description_ar;
  if (locale.value === 'ku') return event.value.description_ku;
  return event.value.description_en;
});

const cityName = computed(() => {
  if (!event.value) return '';
  const city = store.cities.find((item) => item.id === event.value?.city);
  if (!city) return event.value.city;
  if (locale.value === 'ar') return city.name_ar;
  if (locale.value === 'ku') return city.name_ku;
  return city.name_en;
});

const category = computed(() => {
  if (!event.value) return undefined;
  return store.categories.find((item) => item.id === event.value?.category);
});

const categoryName = computed(() => {
  if (!category.value) return '';
  if (locale.value === 'ar') return category.value.name_ar;
  if (locale.value === 'ku') return category.value.name_ku;
  return category.value.name_en;
});

const formattedDate = computed(() => {
  if (!event.value) return '';
  return new Date(event.value.date).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'ar-IQ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const shareLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast?.(t('event.linkCopied'), 'success');
  } catch (_error) {
    showToast?.(t('common.error'), 'error');
  }
};

onMounted(async () => {
  if (store.events.length === 0) {
    await store.loadEvents();
  }
  notFound.value = !event.value;
});
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF5] pb-12">
    <NotFound
      v-if="notFound"
      :title="t('event.notFoundTitle')"
      :message="t('event.notFoundDescription')"
      :button-text="t('common.back')"
      @back="router.back()"
    />

    <div v-else-if="event" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button class="mb-4 inline-flex items-center gap-2 text-[#1E3A5F]" @click="router.back()">
        <ArrowLeft :size="16" />
        {{ t('event.backToEvents') }}
      </button>

      <img :src="event.image_url" :alt="localizedTitle" class="w-full h-[320px] md:h-[420px] object-cover rounded-xl" referrerPolicy="no-referrer" />

      <div class="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3">{{ localizedTitle }}</h1>
            <div class="flex items-center gap-3">
              <img
                :src="organizer?.avatar_url || `https://picsum.photos/seed/${event.organizer_id}/120/120`"
                class="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span class="text-slate-700">{{ organizer?.name || event.organizer_name }}</span>
            </div>
          </div>

          <button
            class="inline-flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50"
            @click="shareLink"
          >
            <Share2 :size="16" />
            {{ t('common.share') }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 text-slate-700">
          <p class="inline-flex items-center gap-2"><Calendar :size="16" />{{ formattedDate }}</p>
          <p class="inline-flex items-center gap-2"><Clock3 :size="16" />{{ event.time }}</p>
          <p class="inline-flex items-center gap-2"><MapPin :size="16" />{{ cityName }}</p>
          <p class="inline-flex items-center gap-2"><Building2 :size="16" />{{ event.governorate }}</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span class="px-3 py-1 rounded-full text-white text-sm" :style="{ backgroundColor: category?.color || '#D97706' }">{{ categoryName }}</span>
          <span v-if="event.is_free" class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">{{ t('event.free') }}</span>
          <span v-else class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{{ event.price.toLocaleString() }} IQD</span>
        </div>

        <p class="text-slate-700 leading-7">{{ localizedDescription }}</p>
      </div>

      <div v-if="relatedEvents.length > 0" class="mt-8">
        <h2 class="text-2xl font-semibold text-[#1E3A5F] mb-4">{{ t('event.related') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <EventCard v-for="related in relatedEvents" :key="related.id" :event="related" />
        </div>
      </div>
    </div>
  </div>
</template>
