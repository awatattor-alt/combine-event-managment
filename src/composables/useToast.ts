import { readonly, ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

const toastState = ref<ToastState>({
  visible: false,
  message: '',
  type: 'info',
});

let dismissTimeout: ReturnType<typeof setTimeout> | undefined;

export const useToast = () => {
  const showToast = (message: string, type: ToastType = 'info') => {
    toastState.value = {
      visible: true,
      message,
      type,
    };

    if (dismissTimeout) {
      clearTimeout(dismissTimeout);
    }

    dismissTimeout = setTimeout(() => {
      toastState.value.visible = false;
    }, 3000);
  };

  const hideToast = () => {
    toastState.value.visible = false;
  };

  return {
    toast: readonly(toastState),
    showToast,
    hideToast,
  };
};
