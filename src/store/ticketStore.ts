import { defineStore } from 'pinia';
import * as ticketApi from '../mock/tickets';

export const useTicketStore = defineStore('tickets', {
  state: () => ({
    tickets: [] as any[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUserTickets(userId: string) {
      this.loading = true;
      try {
        this.tickets = await ticketApi.getUserTickets(userId);
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async buyTickets(purchaseData: any) {
      this.loading = true;
      try {
        const ticket = await ticketApi.purchaseTickets(purchaseData);
        this.tickets.push(ticket);
        return ticket;
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});
