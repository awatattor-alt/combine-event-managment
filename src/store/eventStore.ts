import { defineStore } from 'pinia';
import eventsData from '@/mock-data/events.json';
import citiesData from '@/mock-data/cities.json';
import categoriesData from '@/mock-data/categories.json';
import organizersData from '@/mock-data/organizers.json';

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
  tags?: string[];
  popularity?: number;
  created_at?: string;
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
  selectedDate: string;
  sortBy: 'date' | 'popularity' | 'recent';
}

const enrichEvent = (event: EventItem): EventItem => ({
  ...event,
  tags: event.tags ?? [event.category, event.city, event.governorate],
  popularity: event.popularity ?? Math.floor(Math.random() * 1000 + 100),
  created_at: event.created_at ?? `${event.date}T${event.time}:00`,
});

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
    selectedDate: '',
    sortBy: 'date',
  }),
  getters: {
    filteredEvents: (state): EventItem[] => {
      const query = state.searchQuery.toLowerCase().trim();

      const filtered = state.events.filter((event) => {
        const eventDate = event.date;
        const matchesSearch =
          !query ||
          event.title_en.toLowerCase().includes(query) ||
          event.title_ar.toLowerCase().includes(query) ||
          event.title_ku.toLowerCase().includes(query) ||
          event.description_en.toLowerCase().includes(query) ||
          event.description_ar.toLowerCase().includes(query) ||
          event.description_ku.toLowerCase().includes(query) ||
          event.organizer_name.toLowerCase().includes(query) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(query));

        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        const matchesDate = !state.selectedDate || eventDate === state.selectedDate;

        return matchesSearch && matchesCity && matchesCategory && matchesDate;
      });

      return [...filtered].sort((a, b) => {
        if (state.sortBy === 'popularity') {
          return (b.popularity ?? 0) - (a.popularity ?? 0);
        }

        if (state.sortBy === 'recent') {
          return new Date(b.created_at ?? b.date).getTime() - new Date(a.created_at ?? a.date).getTime();
        }

        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    },
  },
  actions: {
    async fetchInitialData() {
      if (this.events.length) return;

      this.loading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.events = (eventsData as EventItem[]).map((event) => enrichEvent(event));
        this.cities = citiesData as CityItem[];
        this.categories = categoriesData as CategoryItem[];
        this.organizers = organizersData as OrganizerItem[];
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
    getEvents(): EventItem[] {
      return this.events;
    },
    getEventById(id: string): EventItem | undefined {
      return this.events.find((event) => event.id === id);
    },
    createEvent(event: Omit<EventItem, 'id'>): EventItem {
      const createdEvent = enrichEvent({
        ...event,
        id: `e${Date.now()}`,
      });
      this.events = [createdEvent, ...this.events];
      return createdEvent;
    },
    updateEvent(updatedEvent: EventItem): EventItem | undefined {
      const index = this.events.findIndex((event) => event.id === updatedEvent.id);
      if (index === -1) return undefined;

      const normalized = enrichEvent(updatedEvent);
      this.events.splice(index, 1, normalized);
      return normalized;
    },
    deleteEvent(id: string): void {
      this.events = this.events.filter((event) => event.id !== id);
    },
    resetFilters(): void {
      this.searchQuery = '';
      this.selectedCity = '';
      this.selectedCategory = '';
      this.selectedDate = '';
      this.sortBy = 'date';
    },
  },
});
