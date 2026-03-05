import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as any[],
    cities: [] as any[],
    categories: [] as any[],
    loading: false,
    error: null as string | null,
    searchQuery: '',
    selectedCity: '',
    selectedCategory: '',
    selectedSort: 'date-asc',
  }),
  getters: {
    filteredEvents: (state) => {
      const query = state.searchQuery.trim().toLowerCase();
      const filtered = state.events.filter((event) => {
        const matchesSearch =
          !query ||
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query);
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });

      const sorted = [...filtered];
      switch (state.selectedSort) {
        case 'date-desc':
          sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
        case 'price-asc':
          sorted.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'price-desc':
          sorted.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case 'title-asc':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      }

      return sorted;
    }
  },
  actions: {
    async fetchInitialData() {
      this.loading = true;
      try {
        const [events, cities, categories] = await Promise.all([
          eventApi.getEvents(),
          eventApi.getCities(),
          eventApi.getCategories()
        ]);
        this.events = events;
        this.cities = cities;
        this.categories = categories;
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
        return newEvent;
      } catch (err: any) {
        this.error = err.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    updateEvent(updatedEvent: any) {
      const index = this.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = { ...updatedEvent };
        return true;
      }
      return false;
    },
    deleteEvent(id: string) {
      this.events = this.events.filter(e => e.id !== id);
    }
  }
});
