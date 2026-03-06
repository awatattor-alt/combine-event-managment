<script setup lang="ts">
import { ref, inject, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Calendar, MapPin, LayoutDashboard, ShieldCheck, Globe, User, Ticket, Compass, Menu, X } from 'lucide-vue-next';
import { useUserStore } from '../store/userStore';

const t = inject<any>('t');
const locale = inject<any>('locale');
const setLocale = inject<any>('setLocale');
const router = useRouter();
const userStore = useUserStore();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

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
    { name: t.value.nav.home, path: '/', icon: Globe },
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
  { code: 'en', name: 'EN' },
  { code: 'ar', name: 'AR' },
  { code: 'ku', name: 'KU' },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav 
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-[#1E3A5F] shadow-xl' : 'bg-[#1E3A5F]'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2 text-xl font-bold text-white" @click="closeMenu">
            <Compass class="text-amber-500" :size="28" />
            <span class="tracking-tight">Iraq Compass</span>
          </router-link>
          
          <!-- Desktop Nav -->
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

        <!-- Right Side -->
        <div class="flex items-center gap-4">
          <!-- Language Switcher Desktop -->
          <div class="hidden sm:flex bg-white/10 p-1 rounded-lg">
            <button 
              v-for="lang in languages" 
              :key="lang.code"
              @click="setLocale(lang.code)"
              :class="[
                'px-3 py-1 text-xs font-bold rounded-md transition-all',
                locale === lang.code ? 'bg-amber-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
              ]"
            >
              {{ lang.name }}
            </button>
          </div>

          <!-- Auth / Profile -->
          <div class="flex items-center gap-3 md:border-l md:border-white/10 md:pl-6">
            <template v-if="userStore.isAuthenticated">
              <router-link to="/tickets" class="p-2 text-white/80 hover:text-white transition-colors relative" title="My Tickets">
                <Ticket :size="20" />
                <span class="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#1E3A5F]"></span>
              </router-link>
              <router-link to="/profile" class="flex items-center gap-2 p-1 pr-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <div class="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {{ userStore.user?.name.charAt(0) }}
                </div>
                <span class="text-sm font-bold text-white hidden lg:block">{{ userStore.user?.name }}</span>
              </router-link>
            </template>
            <template v-else>
              <div class="hidden md:flex items-center gap-4">
                <router-link to="/login" class="text-sm font-bold text-white/80 hover:text-white transition-colors">
                  {{ t.nav.login }}
                </router-link>
                <router-link to="/signup" class="px-5 py-2 bg-amber-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-900/20 hover:bg-amber-600 transition-all">
                  {{ locale === 'en' ? 'Join Now' : (locale === 'ar' ? 'انضم الآن' : 'ئێستا ببە بە ئەندام') }}
                </router-link>
              </div>
            </template>

            <!-- Mobile Menu Toggle -->
            <button @click="toggleMenu" class="md:hidden p-2 text-white/80 hover:text-white transition-colors">
              <Menu v-if="!isMenuOpen" :size="24" />
              <X v-else :size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
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

          <div class="pt-4 border-t border-white/10 mt-4">
            <div class="flex justify-between items-center px-4 mb-4">
              <span class="text-xs font-bold text-white/40 uppercase tracking-widest">Language</span>
              <div class="flex gap-2">
                <button 
                  v-for="lang in languages" 
                  :key="lang.code"
                  @click="setLocale(lang.code)"
                  :class="[
                    'px-3 py-1 text-xs font-bold rounded-lg transition-all',
                    locale === lang.code ? 'bg-amber-500 text-white' : 'bg-white/5 text-white/60'
                  ]"
                >
                  {{ lang.name }}
                </button>
              </div>
            </div>

            <template v-if="!userStore.isAuthenticated">
              <div class="grid grid-cols-2 gap-3 px-4">
                <router-link to="/login" @click="closeMenu" class="flex items-center justify-center py-3 text-sm font-bold text-white bg-white/10 rounded-xl">
                  {{ t.nav.login }}
                </router-link>
                <router-link to="/signup" @click="closeMenu" class="flex items-center justify-center py-3 text-sm font-bold text-white bg-amber-500 rounded-xl">
                  {{ locale === 'en' ? 'Join' : (locale === 'ar' ? 'انضم' : 'ببە بە ئەندام') }}
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
