import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';
import { useFilterStore } from './filterStore';

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
  }),
  getters: {
    filteredEvents: (state) => {
      const filters = useFilterStore();
      return state.events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesCity = !filters.selectedCity || event.city === filters.selectedCity;
        const matchesCategory = !filters.selectedCategory || event.category === filters.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });
    },
  },
  actions: {
    async fetchInitialData() {
      this.loading = true;
      this.error = null;
      try {
        const [events, cities, categories, organizers] = await Promise.all([
          eventApi.getEvents(),
          eventApi.getCities(),
          eventApi.getCategories(),
          eventApi.getOrganizers(),
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
    async fetchEvents() {
      this.loading = true;
      this.error = null;
      try {
        this.events = await eventApi.getEvents();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchEventById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        return await eventApi.getEventById(id);
      } catch (err: any) {
        this.error = err.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    async addEvent(event: any) {
      this.loading = true;
      this.error = null;
      try {
        const newEvent = await eventApi.createEvent(event);
        this.events.push(newEvent);
        return newEvent;
        this.events.unshift(newEvent);
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
    async updateEvent(updatedEvent: any) {
      this.loading = true;
      this.error = null;
      try {
        const event = await eventApi.updateEvent(updatedEvent);
        const index = this.events.findIndex((item) => item.id === event.id);
        if (index !== -1) this.events[index] = event;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async deleteEvent(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await eventApi.deleteEvent(id);
        this.events = this.events.filter((event) => event.id !== id);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    resetEventsState() {
      this.events = [];
      this.cities = [];
      this.categories = [];
      this.loading = false;
      this.error = null;
      this.organizers = [];
      useFilterStore().resetFilters();
    },
  },
});
