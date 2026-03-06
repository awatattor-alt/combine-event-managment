<template>
  <transition name="toast">
    <div v-if="show" class="fixed bottom-8 inset-inline-end-8 z-[200] flex items-center gap-4 px-6 py-5 bg-[#1E3A5F] text-white rounded-[2rem] shadow-2xl shadow-blue-900/40 border border-white/10 backdrop-blur-md">
      <div :class="['w-10 h-10 rounded-xl flex items-center justify-center shrink-0', type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400']">
        <CheckCircle v-if="type === 'success'" :size="20" />
        <AlertCircle v-else :size="20" />
      </div>
      <p class="text-sm font-bold tracking-tight">{{ message }}</p>
      <button @click="$emit('close')" class="ml-4 text-white/40 hover:text-white transition-colors">
        <X :size="18" />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next';

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
    }, 4000);
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
