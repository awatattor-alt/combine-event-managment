<script setup lang="ts">
import { provide, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import Toast from './components/ui/Toast.vue';
import { useEventStore } from './store/eventStore';
import { useToast } from './composables/useToast';

const { locale, t } = useI18n();
const storedLocale = useLocalStorage('locale', 'en');
const eventStore = useEventStore();
const { toast, showToast, hideToast } = useToast();

const setLocale = (newLocale: string) => {
  storedLocale.value = newLocale;
  locale.value = newLocale;
  document.documentElement.dir = newLocale === 'ar' || newLocale === 'ku' ? 'rtl' : 'ltr';
  document.documentElement.lang = newLocale;
};

const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));

provide('t', t);
provide('locale', locale);
provide('setLocale', setLocale);
provide('showToast', showToast);

onMounted(async () => {
  locale.value = storedLocale.value;
  document.documentElement.dir = locale.value === 'ar' || locale.value === 'ku' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale.value;
  await eventStore.fetchInitialData();
});

watch(storedLocale, (newValue) => {
  locale.value = newValue;
  document.documentElement.dir = newValue === 'ar' || newValue === 'ku' ? 'rtl' : 'ltr';
  document.documentElement.lang = newValue;
});
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg)] font-sans">
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
      :visible="toast.visible"
      :message="toast.message"
      :type="toast.type"
      @close="hideToast"
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
