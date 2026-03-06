<script setup lang="ts">
import { computed } from 'vue';
import { CheckCircle2, CircleAlert, Info, X } from 'lucide-vue-next';
import type { ToastType } from '@/composables/useToast';

const props = defineProps<{
  visible: boolean;
  message: string;
  type: ToastType;
}>();

const emit = defineEmits<{
  close: [];
}>();

const toastClass = computed(() => {
  if (props.type === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-900';
  }
  if (props.type === 'error') {
    return 'border-red-200 bg-red-50 text-red-900';
  }

  return 'border-blue-200 bg-blue-50 text-blue-900';
});
</script>

<template>
  <transition name="toast-slide">
    <div
      v-if="visible"
      class="fixed end-4 top-20 z-[120] flex min-w-[260px] max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg"
      :class="toastClass"
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 v-if="type === 'success'" class="h-5 w-5 shrink-0" />
      <CircleAlert v-else-if="type === 'error'" class="h-5 w-5 shrink-0" />
      <Info v-else class="h-5 w-5 shrink-0" />
      <p class="text-sm font-medium">{{ message }}</p>
      <button
        class="ms-auto rounded p-1 opacity-70 transition hover:opacity-100"
        type="button"
        @click="emit('close')"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </transition>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.2s ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
