<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Toast from './components/Toast.vue';
import { useEventStore } from './store/eventStore';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ku from './locales/ku.json';

const locale = ref(localStorage.getItem('locale') || 'en');
const translations = { en, ar, ku };
const eventStore = useEventStore();

const t = computed(() => translations[locale.value as keyof typeof translations]);

const toast = ref({ show: false, message: '', type: 'success' as 'success' | 'error' });
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { show: true, message, type };
};

const applyDocumentDirection = (lang: string) => {
  const direction = (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = lang;
};

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
};

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

provide('t', t);
provide('locale', locale);
provide('setLocale', setLocale);
provide('showToast', showToast);

watch(locale, (lang) => {
  applyDocumentDirection(lang);
});

onMounted(async () => {
  applyDocumentDirection(locale.value);
  await eventStore.fetchInitialData();
});
</script>

<template>
  <div :class="['min-h-screen', (locale === 'ar' || locale === 'ku') ? 'font-arabic' : '']">
    <Navbar v-if="!isDashboard" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Toast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
