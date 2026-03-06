import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';
import type { EventItem } from '../store/eventStore';

const simulateDelay = (duration = 300) => new Promise((resolve) => setTimeout(resolve, duration));

export const getEvents = async () => {
  await simulateDelay(500);
  return eventsData;
};

export const getEventById = async (id: string) => {
  await simulateDelay();
  return eventsData.find((event) => event.id === id);
};

export const getCities = async () => citiesData;
export const getCategories = async () => categoriesData;
export const getOrganizers = async () => organizersData;

export const createEvent = async (event: Omit<EventItem, 'id'>) => {
  await simulateDelay(800);
  return { ...event, id: Math.random().toString(36).slice(2, 11) };
};
