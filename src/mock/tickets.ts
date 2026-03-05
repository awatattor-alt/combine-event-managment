import eventsData from '../mock-data/events.json';

const mockTickets = [
  {
    id: 't1',
    eventId: '1',
    userId: 'u1',
    purchaseDate: '2024-03-01T10:00:00Z',
    quantity: 2,
    totalPrice: 50000,
    status: 'valid'
  }
];

export const getUserTickets = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockTickets.filter(t => t.userId === userId).map(t => ({
    ...t,
    event: eventsData.find(e => e.id === t.eventId)
  }));
};

export const purchaseTickets = async (purchaseData: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    ...purchaseData,
    id: 't' + Math.random().toString(36).substr(2, 5),
    purchaseDate: new Date().toISOString(),
    status: 'valid'
  };
};
