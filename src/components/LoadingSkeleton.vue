<script setup lang="ts">
defineProps<{
  type?: 'card' | 'text' | 'circle';
  className?: string;
}>();
</script>

<template>
  <div v-if="type === 'card'" class="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse">
    <div class="aspect-[4/3] bg-slate-200"></div>
    <div class="p-6 space-y-4">
      <div class="h-6 bg-slate-200 rounded-lg w-3/4"></div>
      <div class="space-y-2">
        <div class="h-4 bg-slate-100 rounded w-1/2"></div>
        <div class="h-4 bg-slate-100 rounded w-2/3"></div>
      </div>
      <div class="pt-4 border-t border-slate-50 flex justify-between items-center">
        <div class="h-8 bg-slate-200 rounded-lg w-20"></div>
        <div class="h-10 bg-slate-200 rounded-xl w-28"></div>
      </div>
    </div>
  </div>
  
  <div v-else-if="type === 'circle'" :class="['bg-slate-200 animate-pulse rounded-full', className]"></div>
  
  <div v-else :class="['bg-slate-200 animate-pulse rounded-lg', className]"></div>
</template>
