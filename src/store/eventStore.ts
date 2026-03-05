import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  date: string;
  image: string;
  organizerId: string;
  ticketAvailability: number;
  price: number;
}

interface CityItem {
  id: string;
  name: string;
  nameAr: string;
  nameKu: string;
}

interface CategoryItem {
  id: string;
  name: string;
  nameAr: string;
  nameKu: string;
}

interface OrganizerItem {
  id: string;
  name: string;
  description: string;
}

interface EventFilters {
  searchQuery: string;
  selectedCity: string;
  selectedCategory: string;
}

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as EventItem[],
    cities: [] as CityItem[],
    categories: [] as CategoryItem[],
    organizers: [] as OrganizerItem[],
    loading: false,
    error: null as string | null,
    searchQuery: '',
    selectedCity: '',
    selectedCategory: '',
  }),
  getters: {
    filteredEvents: (state) => {
      return state.events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });
    }
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
    async addEvent(event: Omit<EventItem, 'id'>) {
      this.loading = true;
      this.error = null;
      try {
        const newEvent = await eventApi.createEvent(event);
        this.events.push(newEvent);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    updateEvent(updatedEvent: EventItem) {
      const index = this.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) this.events[index] = updatedEvent;
    },
    deleteEvent(id: string) {
      this.events = this.events.filter((event) => event.id !== id);
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCity = '';
      this.selectedCategory = '';
    },
    setFilters(filters: Partial<EventFilters>) {
      this.searchQuery = filters.searchQuery ?? this.searchQuery;
      this.selectedCity = filters.selectedCity ?? this.selectedCity;
      this.selectedCategory = filters.selectedCategory ?? this.selectedCategory;
    }
  }
});
