import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';
import type { CreateEventPayload, EventItem, LocalizedLabel, Organizer } from '../types/models';

interface EventState {
  events: EventItem[];
  cities: LocalizedLabel[];
  categories: LocalizedLabel[];
  organizers: Organizer[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCity: string;
  selectedCategory: string;
}

export const useEventStore = defineStore('events', {
  state: (): EventState => ({
    events: [],
    cities: [],
    categories: [],
    organizers: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCity: '',
    selectedCategory: '',
  }),
  getters: {
    filteredEvents: (state): EventItem[] => {
      return state.events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });
    },
    getOrganizerById: (state) => (organizerId: string): Organizer | undefined => {
      return state.organizers.find((organizer) => organizer.id === organizerId);
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
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load events';
      } finally {
        this.loading = false;
      }
    },

    async addEvent(event: CreateEventPayload) {
      this.loading = true;
      this.error = null;

      try {
        const newEvent = await eventApi.createEvent(event);
        this.events.push(newEvent);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create event';
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
  },
});
