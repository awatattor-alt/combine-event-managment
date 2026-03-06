import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';
import type { EventItem } from '@/store/eventStore';

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const getEvents = async (): Promise<EventItem[]> => {
  await wait(500);
  return eventsData as EventItem[];
};

export const getEventById = async (id: string): Promise<EventItem | undefined> => {
  await wait(300);
  return (eventsData as EventItem[]).find((event) => event.id === id);
};

export const getCities = async () => citiesData;
export const getCategories = async () => categoriesData;
export const getOrganizers = async () => organizersData;

export const createEvent = async (event: Omit<EventItem, 'id'>): Promise<EventItem> => {
  await wait(800);
  return { ...event, id: Math.random().toString(36).slice(2, 11) };
};
