<template>
  <div class="animate-pulse bg-slate-200 rounded-xl" :class="className"></div>
</template>

<script setup lang="ts">
/**
 * Simple skeleton placeholder block.
 */
defineProps<{
  className?: string;
}>();
</script>
