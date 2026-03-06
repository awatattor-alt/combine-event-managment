<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { LayoutList, PlusCircle, UserRound, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

const tabs = [
  { to: '/dashboard', labelKey: 'dashboard.tabs.my_events', icon: LayoutList },
  { to: '/dashboard/create', labelKey: 'dashboard.tabs.create_event', icon: PlusCircle },
  { to: '/dashboard/profile', labelKey: 'dashboard.tabs.profile', icon: UserRound },
];

const activePath = computed(() => route.path);

const isActive = (path: string): boolean => {
  if (path === '/dashboard') {
    return activePath.value === '/dashboard';
  }
  return activePath.value.startsWith(path);
};
</script>

<template>
  <div class="min-h-screen bg-slate-100 md:flex">
    <aside class="hidden w-60 shrink-0 border-e border-slate-200 bg-slate-50 md:flex md:flex-col">
      <div class="p-4 text-lg font-bold text-[#1E3A5F]">{{ t('dashboard.title') }}</div>
      <nav class="space-y-2 px-3">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
          :class="isActive(tab.to) ? 'bg-white text-[#1E3A5F] shadow-sm' : 'text-slate-600 hover:bg-white'"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          {{ t(tab.labelKey) }}
        </RouterLink>
      </nav>
    </aside>

    <section class="flex min-h-screen flex-1 flex-col">
      <header class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:px-6">
        <p class="text-sm font-semibold text-[#1E3A5F]">
          {{ t('dashboard.welcome_back', { name: authStore.currentUser?.name ?? t('dashboard.organizer') }) }}
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          @click="authStore.logout"
        >
          <LogOut class="h-4 w-4" />
          {{ t('nav.logout') }}
        </button>
      </header>

      <main class="flex-1 bg-white p-4 pb-24 md:p-6 md:pb-6">
        <RouterView />
      </main>
    </section>

    <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-2 md:hidden">
      <div class="grid grid-cols-3 gap-2">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.to"
          :to="tab.to"
          class="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold"
          :class="isActive(tab.to) ? 'bg-amber-50 text-amber-700' : 'text-slate-500'"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          {{ t(tab.labelKey) }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
