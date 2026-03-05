import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: localStorage.getItem('locale') || 'en'
  }),
  actions: {
    setLocale(newLocale: string) {
      this.locale = newLocale;
      localStorage.setItem('locale', newLocale);
      document.dir = ['ar', 'ku'].includes(newLocale) ? 'rtl' : 'ltr';
    }
  }
import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import ku from '../locales/ku.json';

const translations = { en, ar, ku };
type Locale = keyof typeof translations;

export const useLanguageStore = defineStore('language', () => {
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'en');

  const t = computed(() => translations[locale.value]);
  const isRTL = computed(() => locale.value === 'ar' || locale.value === 'ku');

  const setLocale = (newLocale: Locale) => {
    locale.value = newLocale;
  };

  const resetLanguage = () => {
    locale.value = 'en';
  };

  watch(
    locale,
    (newLocale) => {
      localStorage.setItem('locale', newLocale);
      document.dir = newLocale === 'ar' || newLocale === 'ku' ? 'rtl' : 'ltr';
    },
    { immediate: true },
  );

  return {
    locale,
    t,
    isRTL,
    setLocale,
    resetLanguage,
  };
});
