import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as any[],
    cities: [] as any[],
    categories: [] as any[],
    organizers: [] as any[],
    loading: false,
    error: null as string | null,
    searchQuery: '',
    selectedCity: '',
    selectedCategory: '',
    sortBy: 'date'
  }),
  getters: {
    filteredEvents: (state) => {
      const filtered = state.events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });

      if (state.sortBy === 'price') return [...filtered].sort((a, b) => a.price - b.price);
      return [...filtered].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    }
  },
  actions: {
    async fetchInitialData() {
      this.loading = true;
      this.error = null;
      try {
        const [events, cities, categories, organizers] = await Promise.all([eventApi.getEvents(), eventApi.getCities(), eventApi.getCategories(), eventApi.getOrganizers()]);
        this.events = events;
        this.cities = cities;
        this.categories = categories;
        this.organizers = organizers;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    setFilters(payload: { query?: string; city?: string; category?: string; sortBy?: string }) {
      this.searchQuery = payload.query ?? this.searchQuery;
      this.selectedCity = payload.city ?? this.selectedCity;
      this.selectedCategory = payload.category ?? this.selectedCategory;
      this.sortBy = payload.sortBy ?? this.sortBy;
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCity = '';
      this.selectedCategory = '';
      this.sortBy = 'date';
    },
    async addEvent(event: any) {
      this.loading = true;
      try {
        const newEvent = await eventApi.createEvent(event);
        this.events.push(newEvent);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    updateEvent(updatedEvent: any) {
      const index = this.events.findIndex((e) => e.id === updatedEvent.id);
      if (index !== -1) this.events[index] = updatedEvent;
    },
    deleteEvent(id: string) {
      this.events = this.events.filter((e) => e.id !== id);
    }
  }
});
