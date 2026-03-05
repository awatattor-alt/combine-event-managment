<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed',
      variant === 'secondary' && 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      variant === 'ghost' && 'text-slate-600 hover:bg-slate-100',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
      (!variant || variant === 'primary') && 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/10'
    ]"
  >
    <slot />
  </button>
</template>
