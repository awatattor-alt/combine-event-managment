export interface LocalizedLabel {
  id: string;
  name: string;
  nameAr: string;
  nameKu: string;
}

export interface Organizer {
  id: string;
  name: string;
  description: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  date: string;
  image: string;
  organizerId: string;
  ticketAvailability: number;
  price: number;
}

export type CreateEventPayload = Omit<EventItem, 'id' | 'organizerId'> & {
  organizerId?: string;
};
