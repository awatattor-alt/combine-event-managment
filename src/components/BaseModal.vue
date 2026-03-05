<script setup lang="ts">
defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="emit('close')"></div>
      <div class="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-slate-900">{{ title }}</h3>
          <button class="text-slate-400 hover:text-slate-600" @click="emit('close')">✕</button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>
