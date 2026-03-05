<script setup lang="ts">
import { provide, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Toast from './components/Toast.vue';
import { useEventStore } from './store/eventStore';
import { useUIStore } from './store/uiStore';
import { useLanguageStore } from './store/languageStore';

const eventStore = useEventStore();
const t = computed(() => translations[locale.value as keyof typeof translations]);
const uiStore = useUIStore();
const languageStore = useLanguageStore();

const t = languageStore.t;
const locale = languageStore.locale;

const setLocale = (newLocale: string) => {
  languageStore.setLocale(newLocale as 'en' | 'ar' | 'ku');
};

const setLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  document.dir = ['ar', 'ku'].includes(newLocale) ? 'rtl' : 'ltr';
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  uiStore.showToast(message, type);
};

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

provide('t', t);
provide('locale', locale);
provide('setLocale', setLocale);
provide('showToast', showToast);

onMounted(async () => {
  document.dir = ['ar', 'ku'].includes(locale.value) ? 'rtl' : 'ltr';
  await eventStore.fetchInitialData();
});
</script>

<template>
  <div :class="['min-h-screen bg-slate-50 font-sans', languageStore.isRTL ? 'font-arabic' : '']">
    <Navbar v-if="!isDashboard" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Toast
      :show="uiStore.toast.show"
      :message="uiStore.toast.message"
      :type="uiStore.toast.type"
      @close="uiStore.hideToast"
    />
    <Footer v-if="!isDashboard" />
    <Toast :show="toast.show" :message="toast.message" :type="toast.type" @close="toast.show = false" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
.font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.font-arabic { font-family: 'Noto Sans Arabic', sans-serif; }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }

.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
