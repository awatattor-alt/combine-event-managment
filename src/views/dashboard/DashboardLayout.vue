<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore';

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

onMounted(() => {
  document.title = 'Dashboard — Iraq Compass';
});

const tabs = [
  { to: '/dashboard/events', label: 'dashboard.tabs.my_events' },
  { to: '/dashboard/create', label: 'dashboard.tabs.create_event' },
  { to: '/profile', label: 'dashboard.tabs.profile' },
];

const isActive = (path: string) => route.path === path;
const welcomeName = computed(() => authStore.currentUser?.name ?? 'Organizer');
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 class="text-xl font-bold text-[#1E3A5F]">{{ t('dashboard.title') }}</h1>
          <p class="text-sm text-slate-500">{{ t('dashboard.welcome_back', { name: welcomeName }) }}</p>
        </div>
        <nav class="flex flex-wrap gap-2">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            class="rounded-lg px-3 py-2 text-sm font-medium"
            :class="isActive(tab.to) ? 'bg-[#1E3A5F] text-white' : 'bg-slate-100 text-slate-700'"
          >
            {{ t(tab.label) }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
