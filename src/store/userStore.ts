import { defineStore } from 'pinia';
import * as userApi from '../mock/users';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isOrganizer: (state) => state.user?.role === 'organizer',
  },
  actions: {
    async login(credentials: any) {
      this.loading = true;
      this.error = null;
      try {
        const user = await userApi.login(credentials);
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('mockLoggedIn', 'true');
        localStorage.setItem('mockRole', user.role);
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async signup(userData: any) {
      this.loading = true;
      this.error = null;
      try {
        const user = await userApi.signup(userData);
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('mockLoggedIn', 'true');
        localStorage.setItem('mockRole', user.role);
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('mockLoggedIn');
      localStorage.removeItem('mockRole');
    }
  }
});
