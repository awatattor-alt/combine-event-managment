<template>
  <transition name="toast">
    <div v-if="show" class="fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl">
      <div :class="['w-2 h-2 rounded-full', type === 'success' ? 'bg-emerald-400' : 'bg-red-400']"></div>
      <p class="text-sm font-medium">{{ message }}</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

/**
 * Global toast notification component.
 */
const props = defineProps<{
  message: string;
  show: boolean;
  type?: 'success' | 'error';
}>();

const emit = defineEmits(['close']);

watch(() => props.show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      emit('close');
    }, 3000);
  }
});
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
