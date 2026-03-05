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
});
