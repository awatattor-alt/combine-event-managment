<script setup lang="ts">
defineProps<{ show: boolean; title?: string }>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <button class="absolute inset-0 bg-slate-900/50" @click="emit('close')" aria-label="Close modal" />
    <div class="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 class="text-lg font-bold text-slate-900">{{ title }}</h3>
        <button @click="emit('close')" class="text-slate-500 hover:text-slate-800">✕</button>
      </div>
      <div class="p-5">
        <slot />
      </div>
    </div>
  </div>
</template>
