<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Compass, Menu, X } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const { t, locale } = useI18n();
const setLocale = inject<(value: string) => void>('setLocale');
const authStore = useAuthStore();
const isMenuOpen = ref(false);

const navItems = computed(() => {
  if (!authStore.isAuthenticated) {
    return [
      { label: t('nav.home'), to: '/' },
      { label: t('nav.events'), to: '/events' },
      { label: t('nav.login'), to: '/login' },
      { label: t('nav.register'), to: '/register' },
    ];
  }

  return [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.events'), to: '/events' },
    { label: t('nav.dashboard'), to: '/dashboard/events' },
    { label: t('nav.profile'), to: '/profile' },
  ];
});

const logout = () => {
  authStore.logout();
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="sticky top-0 z-40 border-b border-white/10 bg-[#1E3A5F]">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <router-link to="/" class="flex items-center gap-2 text-white">
        <Compass class="text-amber-500" :size="24" />
        <span class="font-bold">Iraq Compass</span>
      </router-link>

      <div class="hidden items-center gap-4 md:flex">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm text-white/80 transition hover:text-white"
          active-class="font-semibold text-amber-400"
        >
          {{ item.label }}
        </router-link>
        <button v-if="authStore.isAuthenticated" class="text-sm text-red-200" @click="logout">{{ t('nav.logout') }}</button>
      </div>

      <div class="hidden gap-1 rounded bg-white/10 p-1 sm:flex">
        <button
          v-for="lang in ['en', 'ar', 'ku']"
          :key="lang"
          class="rounded px-2 py-1 text-xs font-semibold"
          :class="locale === lang ? 'bg-amber-500 text-white' : 'text-white/70'"
          @click="setLocale?.(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <button class="md:hidden text-white" @click="isMenuOpen = !isMenuOpen">
        <Menu v-if="!isMenuOpen" :size="22" />
        <X v-else :size="22" />
      </button>
    </div>

    <div v-if="isMenuOpen" class="space-y-2 border-t border-white/10 px-4 py-3 md:hidden">
      <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="block text-white/80" @click="isMenuOpen = false">
        {{ item.label }}
      </router-link>
      <button v-if="authStore.isAuthenticated" class="text-red-200" @click="logout">{{ t('nav.logout') }}</button>
    </div>
  </nav>
</template>
