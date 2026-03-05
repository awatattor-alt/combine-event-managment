import eventsData from '../mock-data/events.json';
import citiesData from '../mock-data/cities.json';
import categoriesData from '../mock-data/categories.json';
import organizersData from '../mock-data/organizers.json';

const mockEvents = [...eventsData];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getEvents = async () => {
  await delay(500);
  return [...mockEvents];
};

export const getEventById = async (id: string) => {
  await delay(300);
  return mockEvents.find((event) => event.id === id) || null;
};

export const getCities = async () => {
  await delay(250);
  return citiesData;
};

export const getCategories = async () => {
  await delay(250);
  return categoriesData;
};

export const createEvent = async (event: any) => {
  await delay(800);
  const createdEvent = { ...event, id: Math.random().toString(36).slice(2, 11) };
  mockEvents.unshift(createdEvent);
  return createdEvent;
};

export const updateEvent = async (updatedEvent: any) => {
  await delay(500);
  const index = mockEvents.findIndex((event) => event.id === updatedEvent.id);
  if (index === -1) {
    throw new Error('Event not found');
  }

  mockEvents[index] = { ...mockEvents[index], ...updatedEvent };
  return mockEvents[index];
};

export const deleteEvent = async (id: string) => {
  await delay(400);
  const index = mockEvents.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new Error('Event not found');
  }

  mockEvents.splice(index, 1);
  return id;
};

export const getOrganizers = async () => {
  await delay(250);
  return organizersData;
};
