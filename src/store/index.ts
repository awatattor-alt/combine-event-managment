import { defineStore } from 'pinia';
import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import venuesData from '../mock-data/venues.json';
import organizersData from '../mock-data/organizers.json';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: eventsData,
    cities: citiesData,
    categories: categoriesData,
    venues: venuesData,
    organizers: organizersData,
    searchQuery: '',
    selectedCity: '',
    selectedCategory: '',
  }),
  getters: {
    filteredEvents: (state) => {
      return state.events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCity = !state.selectedCity || event.city === state.selectedCity;
        const matchesCategory = !state.selectedCategory || event.category === state.selectedCategory;
        return matchesSearch && matchesCity && matchesCategory;
      });
    }
  },
  actions: {
    addEvent(event: any) {
      this.events.push({ ...event, id: Date.now().toString() });
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
