import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filters', {
  state: () => ({
    city: '',
    category: '',
    query: '',
    sortBy: 'date'
  }),
  actions: {
    reset() {
      this.city = '';
      this.category = '';
      this.query = '';
      this.sortBy = 'date';
    }
  }
});
