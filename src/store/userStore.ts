import { defineStore } from 'pinia';
import * as userApi from '../mock/users';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as any[],
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
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await userApi.getUsers();
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchProfile(userId: string) {
      this.loading = true;
      this.error = null;
      try {
        const profile = await userApi.getProfile(userId);
        if (profile) {
          this.user = profile;
          localStorage.setItem('user', JSON.stringify(profile));
        }
        return profile;
      } catch (err: any) {
        this.error = err.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    async login(credentials: any) {
      this.loading = true;
      this.error = null;
      try {
        const user = await userApi.login(credentials);
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
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
        this.users.push(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err: any) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async updateCurrentUser(payload: any) {
      if (!this.user) return;

      this.loading = true;
      this.error = null;
      try {
        const updated = await userApi.updateUser({ ...this.user, ...payload });
        this.user = updated;
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    resetUserState() {
      this.users = [];
      this.user = null;
      this.loading = false;
      this.error = null;
      localStorage.removeItem('user');
    },
  },
});
