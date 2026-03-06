import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';
import type { CreateEventPayload, EventItem, LocalizedLabel, Organizer } from '../types/models';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getEvents = async (): Promise<EventItem[]> => {
  await delay(500);
  return eventsData as EventItem[];
};

export const getEventById = async (id: string): Promise<EventItem | undefined> => {
  await delay(300);
  return (eventsData as EventItem[]).find(event => event.id === id);
};

export const getCities = async (): Promise<LocalizedLabel[]> => citiesData as LocalizedLabel[];

export const getCategories = async (): Promise<LocalizedLabel[]> => categoriesData as LocalizedLabel[];

export const getOrganizers = async (): Promise<Organizer[]> => organizersData as Organizer[];

export const createEvent = async (event: CreateEventPayload): Promise<EventItem> => {
  await delay(800);
  return {
    ...event,
    organizerId: event.organizerId ?? 'org1',
    id: crypto.randomUUID(),
  };
};
