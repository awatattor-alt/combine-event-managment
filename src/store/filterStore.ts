import { defineStore } from 'pinia';

export interface EventFilters {
  searchQuery: string;
  selectedCity: string;
  selectedCategory: string;
}

const defaultFilters: EventFilters = {
  searchQuery: '',
  selectedCity: '',
  selectedCategory: '',
};

export const useFilterStore = defineStore('filters', {
  state: (): EventFilters => ({
    ...defaultFilters,
  }),
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    setSelectedCity(cityId: string) {
      this.selectedCity = cityId;
    },
    setSelectedCategory(categoryId: string) {
      this.selectedCategory = categoryId;
    },
    updateFilters(filters: Partial<EventFilters>) {
      Object.assign(this, filters);
    },
    resetFilters() {
      Object.assign(this, defaultFilters);
    },
  },
});
