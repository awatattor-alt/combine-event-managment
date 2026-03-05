<script setup lang="ts">
import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, MapPin, LayoutDashboard, ShieldCheck, Globe } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const setLocale = inject<any>('setLocale');
const router = useRouter();

const navItems = computed(() => [
  { name: t.value.nav.home, path: '/', icon: Globe },
  { name: t.value.nav.events, path: '/events', icon: Calendar },
  { name: t.value.nav.map, path: '/map', icon: MapPin },
  { name: t.value.nav.dashboard, path: '/dashboard', icon: LayoutDashboard },
  { name: t.value.nav.admin, path: '/admin', icon: ShieldCheck },
]);

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'ku', name: 'Kurdî' },
];
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center gap-8">
          <router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Iraq Compass
          </router-link>
          
          <div class="hidden md:flex gap-6">
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

        <div class="flex items-center gap-4">
          <div class="flex bg-slate-100 p-1 rounded-lg">
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
        </div>
      </div>
    </div>
  </nav>
</template>
