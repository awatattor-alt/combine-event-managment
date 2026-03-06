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
  }),
  getters: {
    filteredEvents: (state) => {
      return state.events.filter(event => {
        const query = state.searchQuery.toLowerCase();
        const matchesSearch = !query || 
          event.title_en?.toLowerCase().includes(query) || 
          event.title_ar?.toLowerCase().includes(query) || 
          event.title_ku?.toLowerCase().includes(query) ||
          event.description_en?.toLowerCase().includes(query) ||
          event.description_ar?.toLowerCase().includes(query) ||
          event.description_ku?.toLowerCase().includes(query);
          
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });
    }
  },
  actions: {
    async fetchInitialData() {
      this.loading = true;
      try {
        const [events, cities, categories, organizers] = await Promise.all([
          eventApi.getEvents(),
          eventApi.getCities(),
          eventApi.getCategories(),
          eventApi.getOrganizers()
        ]);
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
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) this.events[index] = updatedEvent;
    },
    deleteEvent(id: string) {
      this.events = this.events.filter(e => e.id !== id);
    }
  }
});
