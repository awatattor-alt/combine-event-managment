import { defineStore } from 'pinia';
import * as eventApi from '../mock/events';

export interface EventItem {
  id: string;
  title_en: string;
  title_ar: string;
  title_ku: string;
  description_en: string;
  description_ar: string;
  description_ku: string;
  date: string;
  time: string;
  city: string;
  governorate: string;
  category: string;
  image_url: string;
  organizer_name: string;
  organizer_id: string;
  price: number;
  is_free: boolean;
  status: 'upcoming' | 'past';
}

interface CityItem {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  region: string;
}

interface CategoryItem {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  icon: string;
  color: string;
}

interface OrganizerItem {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  bio_en: string;
  bio_ar: string;
  bio_ku: string;
  events_count: number;
}

interface EventState {
  events: EventItem[];
  cities: CityItem[];
  categories: CategoryItem[];
  organizers: OrganizerItem[];
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
        const query = state.searchQuery.toLowerCase();
        const matchesSearch =
          !query ||
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
    },
  },
  actions: {
    async fetchInitialData() {
      this.loading = true;
      try {
        const [events, cities, categories, organizers] = await Promise.all([
          eventApi.getEvents(),
          eventApi.getCities(),
          eventApi.getCategories(),
          eventApi.getOrganizers(),
        ]);
        this.events = events as EventItem[];
        this.cities = cities as CityItem[];
        this.categories = categories as CategoryItem[];
        this.organizers = organizers as OrganizerItem[];
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
    getEventById(id: string): EventItem | undefined {
      return this.events.find((event) => event.id === id);
    },
    addEvent(event: EventItem) {
      this.events.push(event);
    },
    updateEvent(updatedEvent: EventItem) {
      const index = this.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
      }
    },
    deleteEvent(id: string) {
      this.events = this.events.filter((event) => event.id !== id);
    },
  },
});
