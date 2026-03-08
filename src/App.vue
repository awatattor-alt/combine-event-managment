<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import Toast from './components/Toast.vue';
import { useEventStore } from './store/eventStore';

const { locale, t } = useI18n();
const storedLocale = useLocalStorage('locale', 'en');
const eventStore = useEventStore();

const toast = ref<{ show: boolean; message: string; type: 'success' | 'error' }>({ 
  show: false, 
  message: '', 
  type: 'success' 
});

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { show: true, message, type };
};

const setLocale = (newLocale: string) => {
  storedLocale.value = newLocale;
  locale.value = newLocale;
  document.documentElement.dir = (newLocale === 'ar' || newLocale === 'ku') ? 'rtl' : 'ltr';
  document.documentElement.lang = newLocale;
};

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

// Provide for legacy components or those not yet refactored
provide('t', t);
provide('locale', locale);
provide('setLocale', setLocale);
provide('showToast', showToast);

onMounted(async () => {
  // Sync i18n locale with localStorage
  locale.value = storedLocale.value;
  document.documentElement.dir = (locale.value === 'ar' || locale.value === 'ku') ? 'rtl' : 'ltr';
  document.documentElement.lang = locale.value;
  await eventStore.fetchInitialData();
});

watch(storedLocale, (newVal) => {
  locale.value = newVal;
  document.documentElement.dir = (newVal === 'ar' || newVal === 'ku') ? 'rtl' : 'ltr';
  document.documentElement.lang = newVal;
});
</script>

<template>
  <div :class="['min-h-screen bg-[var(--color-bg)] font-sans']">
    <Navbar v-if="!isDashboard" />
    <main :class="{ 'pb-20': !isDashboard }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer v-if="!isDashboard" />
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
