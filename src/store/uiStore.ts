import { defineStore } from 'pinia';

type ToastType = 'success' | 'error';

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
}

const defaultToast: ToastState = {
  show: false,
  message: '',
  type: 'success',
};

export const useUIStore = defineStore('ui', {
  state: () => ({
    isGlobalLoading: false,
    isMobileMenuOpen: false,
    toast: { ...defaultToast } as ToastState,
  }),
  actions: {
    setGlobalLoading(value: boolean) {
      this.isGlobalLoading = value;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    showToast(message: string, type: ToastType = 'success') {
      this.toast = {
        show: true,
        message,
        type,
      };
    },
    hideToast() {
      this.toast.show = false;
    },
    resetUIState() {
      this.isGlobalLoading = false;
      this.isMobileMenuOpen = false;
      this.toast = { ...defaultToast };
    },
  },
});
