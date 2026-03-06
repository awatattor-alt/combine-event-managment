<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Calendar, MapPin, LayoutDashboard, Globe, Compass, Menu, X, ChevronDown } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const { t, locale } = useI18n();
const setLocale = inject<(value: string) => void>('setLocale');
const router = useRouter();
const authStore = useAuthStore();

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const showUserMenu = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navItems = computed(() => {
  const items = [
    { name: t('nav.home'), path: '/', icon: Globe },
    { name: t('nav.events'), path: '/events', icon: Calendar },
    { name: t('nav.map'), path: '/map', icon: MapPin },
  ];

  if (authStore.currentUser?.role === 'organizer') {
    items.push({ name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard });
  }


  return items;
});

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'ar', name: 'AR' },
  { code: 'ku', name: 'KU' },
];

const closeMenu = (): void => {
  isMenuOpen.value = false;
};

const handleLogout = (): void => {
  authStore.logout();
  closeMenu();
};
</script>

<template>
  <nav :class="['sticky top-0 z-50 transition-all duration-300', isScrolled ? 'bg-[#1E3A5F] shadow-xl' : 'bg-[#1E3A5F]']">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2 text-xl font-bold text-white" @click="closeMenu">
            <Compass class="text-amber-500" :size="28" />
            <span class="tracking-tight">Iraq Compass</span>
          </router-link>

          <div class="hidden md:flex gap-6">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
              active-class="text-amber-500 font-bold"
            >
              <component :is="item.icon" :size="18" />
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden sm:flex bg-white/10 p-1 rounded-lg">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="setLocale?.(lang.code)"
              :class="[
                'px-3 py-1 text-xs font-bold rounded-md transition-all',
                locale === lang.code ? 'bg-amber-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
              ]"
            >
              {{ lang.name }}
            </button>
          </div>

          <div class="flex items-center gap-3 md:border-l md:border-white/10 md:pl-6">
            <template v-if="authStore.isLoggedIn">
              <div class="relative">
                <button
                  class="flex items-center gap-2 p-1 pr-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                  @click="showUserMenu = !showUserMenu"
                >
                  <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {{ authStore.currentUser?.name.charAt(0) }}
                  </div>
                  <span class="text-sm font-bold text-white hidden lg:block">{{ authStore.currentUser?.name }}</span>
                  <ChevronDown class="h-4 w-4 text-white/70" />
                </button>

                <div
                  v-if="showUserMenu"
                  class="absolute end-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                >
                  <router-link to="/dashboard" class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" @click="showUserMenu = false">
                    {{ t('nav.dashboard') }}
                  </router-link>
                  <button @click="handleLogout" class="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    {{ t('nav.logout') }}
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="hidden md:flex items-center gap-4">
                <router-link to="/login" class="text-sm font-bold text-white/80 hover:text-white transition-colors">
                  {{ t('nav.login') }}
                </router-link>
                <router-link to="/register" class="px-5 py-2 bg-amber-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-amber-900/20 hover:bg-amber-600 transition-all">
                  {{ t('nav.register') }}
                </router-link>
              </div>
            </template>

            <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-white/80 hover:text-white transition-colors">
              <Menu v-if="!isMenuOpen" :size="24" />
              <X v-else :size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-[#1E3A5F] border-t border-white/10 pb-6">
      <div class="px-4 pt-4 space-y-2">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="closeMenu"
          class="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          active-class="bg-amber-500/10 text-amber-500 font-bold"
        >
          <component :is="item.icon" :size="20" />
          {{ item.name }}
        </router-link>

        <div v-if="!authStore.isLoggedIn" class="grid grid-cols-2 gap-3 px-4 pt-4 border-t border-white/10 mt-4">
          <router-link to="/login" @click="closeMenu" class="flex items-center justify-center py-3 text-sm font-bold text-white bg-white/10 rounded-lg">
            {{ t('nav.login') }}
          </router-link>
          <router-link to="/register" @click="closeMenu" class="flex items-center justify-center py-3 text-sm font-bold text-white bg-amber-500 rounded-lg">
            {{ t('nav.register') }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
