<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useEventStore, type EventItem } from '@/store/eventStore';
import { useAuthStore } from '@/stores/authStore';
import LoadingState from '@/components/LoadingState.vue';
import EmptyState from '@/components/EmptyState.vue';
import ErrorState from '@/components/ErrorState.vue';

const { t, locale } = useI18n();
const router = useRouter();
const eventStore = useEventStore();
const authStore = useAuthStore();

const organizerId = computed(() => authStore.currentUser?.organizer_id ?? 'org1');
const myEvents = computed(() => eventStore.events.filter((event) => event.organizer_id === organizerId.value));

const title = (event: EventItem): string => {
  if (locale.value === 'ar') return event.title_ar;
  if (locale.value === 'ku') return event.title_ku;
  return event.title_en;
};
</script>

<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-[#1E3A5F]">{{ t('dashboard.tabs.my_events') }}</h1>
      <button class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white" @click="router.push('/dashboard/create')">
        {{ t('dashboard.empty.cta') }}
      </button>
    </div>

    <LoadingState v-if="eventStore.loading" />
    <ErrorState v-else-if="eventStore.error" :message="eventStore.error" />

    <div v-else-if="myEvents.length" class="space-y-3">
      <article v-for="event in myEvents" :key="event.id" class="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
        <div>
          <p class="font-semibold text-[#1E3A5F]">{{ title(event) }}</p>
          <p class="text-sm text-slate-500">{{ event.date }} • {{ event.time }}</p>
        </div>
        <div class="flex gap-2">
          <button class="rounded-md border border-slate-200 px-3 py-1 text-sm" @click="router.push(`/dashboard/edit/${event.id}`)">{{ t('common.edit') }}</button>
          <button class="rounded-md border border-red-200 px-3 py-1 text-sm text-red-700" @click="eventStore.deleteEvent(event.id)">{{ t('common.delete') }}</button>
        </div>
      </article>
    </div>

    <EmptyState v-else :title="t('dashboard.empty.message')" :message="t('dashboard.empty.cta')" icon="📅" />
  </section>
</template>
