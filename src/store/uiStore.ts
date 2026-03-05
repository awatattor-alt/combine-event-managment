import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    quickViewEventId: '' as string | null,
    sidebarOpen: false,
    globalLoading: false
  }),
  actions: {
    openQuickView(id: string) {
      this.quickViewEventId = id;
    },
    closeQuickView() {
      this.quickViewEventId = null;
    }
  }
});
