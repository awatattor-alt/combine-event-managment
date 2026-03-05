import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';

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
  return { ...event, id: Math.random().toString(36).substr(2, 9) };
};
