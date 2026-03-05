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
        this.events.unshift(newEvent);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
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
