<template>
  <div class="text-center py-20 px-4">
    <div class="text-6xl mb-6 opacity-20">{{ icon || '🏜️' }}</div>
    <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ title }}</h3>
    <p class="text-slate-500 max-w-md mx-auto">{{ message }}</p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
  icon?: string;
}>();
</script>
