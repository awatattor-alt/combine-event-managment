<template>
  <div class="animate-pulse bg-slate-200 rounded-xl" :class="className"></div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string;
}>();
</script>
