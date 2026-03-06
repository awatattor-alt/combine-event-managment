import { defineStore } from 'pinia';
import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';

export type DateRange = 'all' | 'week' | 'month';
export type SortType = 'newest' | 'soonest' | 'az';

export interface EventType {
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
  status: string;
}

export interface CityType {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  region: string;
}

export interface CategoryType {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  icon: string;
  color: string;
}

export interface OrganizerType {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  bio_en: string;
  bio_ar: string;
  bio_ku: string;
  events_count: number;
}

export interface Filters {
  category: string[];
  city: string;
  dateRange: DateRange;
  isFree: boolean;
  keyword: string;
}

const defaultFilters = (): Filters => ({
  category: [],
  city: '',
  dateRange: 'all',
  isFree: false,
  keyword: '',
});

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as EventType[],
    cities: [] as CityType[],
    categories: [] as CategoryType[],
    organizers: [] as OrganizerType[],
    loading: false,
    error: null as string | null,
    filters: defaultFilters(),
    sortBy: 'newest' as SortType,
  }),
  getters: {
    filteredEvents: (state): EventType[] => {
      const now = new Date();
      const weekEnd = new Date(now);
      weekEnd.setDate(now.getDate() + 7);
      const monthEnd = new Date(now);
      monthEnd.setDate(now.getDate() + 30);
      const keyword = state.filters.keyword.trim().toLowerCase();

      const filtered = state.events.filter((event) => {
        const eventDate = new Date(event.date);
        const matchesCategory =
          state.filters.category.length === 0 || state.filters.category.includes(event.category);
        const matchesCity = !state.filters.city || event.city === state.filters.city;
        const matchesFree = !state.filters.isFree || event.is_free;
        const matchesKeyword =
          !keyword ||
          event.title_en.toLowerCase().includes(keyword) ||
          event.title_ar.toLowerCase().includes(keyword) ||
          event.title_ku.toLowerCase().includes(keyword) ||
          event.description_en.toLowerCase().includes(keyword) ||
          event.description_ar.toLowerCase().includes(keyword) ||
          event.description_ku.toLowerCase().includes(keyword);

        const matchesDateRange =
          state.filters.dateRange === 'all' ||
          (state.filters.dateRange === 'week' && eventDate >= now && eventDate <= weekEnd) ||
          (state.filters.dateRange === 'month' && eventDate >= now && eventDate <= monthEnd);

        return matchesCategory && matchesCity && matchesFree && matchesKeyword && matchesDateRange;
      });

      return filtered.sort((a, b) => {
        if (state.sortBy === 'az') {
          return a.title_en.localeCompare(b.title_en);
        }

        const aDate = new Date(`${a.date}T${a.time}`);
        const bDate = new Date(`${b.date}T${b.time}`);
        if (state.sortBy === 'soonest') {
          return aDate.getTime() - bDate.getTime();
        }

        return bDate.getTime() - aDate.getTime();
      });
    },
    getEventById: (state) => {
      return (id: string): EventType | undefined => state.events.find((event) => event.id === id);
    },
    searchQuery: (state): string => state.filters.keyword,
    selectedCity: (state): string => state.filters.city,
    selectedCategory: (state): string => state.filters.category[0] ?? '',
  },
  actions: {
    async loadEvents() {
      this.loading = true;
      try {
        this.events = eventsData as EventType[];
        this.cities = citiesData as CityType[];
        this.categories = categoriesData as CategoryType[];
        this.organizers = organizersData as OrganizerType[];
        this.error = null;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load events';
      } finally {
        this.loading = false;
      }
    },
    async fetchInitialData() {
      await this.loadEvents();
    },
    setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
      this.filters[key] = value;
    },
    clearFilters() {
      this.filters = defaultFilters();
    },
    setSortBy(value: SortType) {
      this.sortBy = value;
    },
    setSearchQuery(value: string) {
      this.setFilter('keyword', value);
    },
    setSelectedCity(value: string) {
      this.setFilter('city', value);
    },
    setSelectedCategory(value: string) {
      this.setFilter('category', value ? [value] : []);
    },
    async addEvent(event: EventType) {
      this.events.push(event);
    },
    updateEvent(updatedEvent: EventType) {
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
