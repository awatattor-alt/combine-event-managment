<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import { Calendar, MapPin, LayoutDashboard, ShieldCheck, Ticket, Menu, X } from 'lucide-vue-next';
import { useUserStore } from '../store/userStore';

const t = inject<any>('t');
const locale = inject<any>('locale');
const setLocale = inject<any>('setLocale');
const userStore = useUserStore();
const open = ref(false);

const navItems = computed(() => {
  const items = [
    { name: t.value.nav.home, path: '/', icon: Calendar },
    { name: t.value.nav.events, path: '/events', icon: Calendar },
    { name: t.value.nav.map, path: '/map', icon: MapPin },
  ];

  if (userStore.isOrganizer || userStore.isAdmin) {
    items.push({ name: t.value.nav.dashboard, path: '/dashboard', icon: LayoutDashboard });
  }

  if (userStore.isAdmin) {
    items.push({ name: t.value.nav.admin, path: '/admin', icon: ShieldCheck });
  }

  return items;
});

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ku', name: 'Kurdî' },
];
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center gap-6">
          <router-link to="/" class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Iraq Compass
          </router-link>

          <div class="hidden lg:flex gap-5">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
              active-class="text-emerald-600"
            >
              <component :is="item.icon" :size="18" />
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <div class="hidden sm:flex bg-slate-100 p-1 rounded-lg">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="setLocale(lang.code)"
              :class="[
                'px-3 py-1 text-xs font-medium rounded-md transition-all',
                locale === lang.code ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              ]"
            >
              {{ lang.name }}
            </button>
          </div>

          <div class="flex items-center gap-3 border-l border-slate-200 pl-4">
            <template v-if="userStore.isAuthenticated">
              <router-link to="/tickets" class="p-2 text-slate-600 hover:text-emerald-600 transition-colors relative" :title="t.nav.tickets">
                <Ticket :size="20" />
              </router-link>
              <router-link to="/profile" class="flex items-center gap-2 p-1 pr-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all">
                <div class="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {{ userStore.user?.name.charAt(0) }}
                </div>
                <span class="text-sm font-bold text-slate-700 hidden lg:block">{{ userStore.user?.name }}</span>
              </router-link>
            </template>
            <template v-else>
              <router-link to="/login" class="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                {{ t.auth.signIn }}
              </router-link>
              <router-link to="/signup" class="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all">
                {{ t.auth.joinNow }}
              </router-link>
            </template>
          </div>
        </div>

        <button class="md:hidden text-slate-600" @click="open = !open" :aria-label="t.nav.menu">
          <Menu v-if="!open" :size="22" />
          <X v-else :size="22" />
        </button>
      </div>

      <div v-if="open" class="md:hidden py-4 border-t border-slate-100 space-y-3">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="block text-sm font-medium text-slate-700" @click="open = false">
          {{ item.name }}
        </router-link>
        <div class="flex gap-2 pt-2">
          <button v-for="lang in languages" :key="lang.code" @click="setLocale(lang.code)" class="px-2 py-1 rounded bg-slate-100 text-xs">
            {{ lang.name }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
