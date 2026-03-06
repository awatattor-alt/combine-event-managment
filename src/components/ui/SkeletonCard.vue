<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
  }>(),
  {
    className: 'h-40 w-full',
  }
);
</script>

<template>
  <div :class="['animate-pulse rounded-xl bg-slate-200/80', className]" />
</template>
