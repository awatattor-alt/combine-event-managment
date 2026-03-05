<script setup lang="ts">
import { ref, provide, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ku from './locales/ku.json';

const locale = ref(localStorage.getItem('locale') || 'en');
const translations = { en, ar, ku };

const t = computed(() => translations[locale.value as keyof typeof translations]);

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  document.dir = (newLocale === 'ar' || newLocale === 'ku') ? 'rtl' : 'ltr';
};

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

provide('t', t);
provide('locale', locale);
provide('setLocale', setLocale);

onMounted(() => {
  document.dir = (locale.value === 'ar' || locale.value === 'ku') ? 'rtl' : 'ltr';
});
</script>

<template>
  <div :class="['min-h-screen bg-slate-50 font-sans', (locale === 'ar' || locale === 'ku') ? 'font-arabic' : '']">
    <Navbar v-if="!isDashboard" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');

.font-arabic {
  font-family: 'Noto Sans Arabic', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
