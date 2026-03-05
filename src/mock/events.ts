import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';

/**
 * Event data service.
 *
 * This file intentionally mirrors an API module shape so we can replace
 * mock-data reads with real HTTP calls later without changing store consumers.
 */
export const getEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return eventsData;
};

export const getEventById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return eventsData.find(e => e.id === id);
};

export const getCities = async () => citiesData;
export const getCategories = async () => categoriesData;
export const getOrganizers = async () => organizersData;

export const createEvent = async (event: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { ...event, id: crypto.randomUUID() };
};
