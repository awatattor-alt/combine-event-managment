<script setup lang="ts">
const modelValue = defineModel<string>({ default: '' });
defineProps<{ placeholder: string }>();
</script>

<template>
  <input
    v-model="modelValue"
    type="search"
    :placeholder="placeholder"
    class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500"
  />
</template>
