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
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  block?: boolean;
  disabled?: boolean;
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  block: false,
  disabled: false,
});

const classes = computed(() => {
  const base = 'rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/10',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return [base, variants[props.variant], sizes[props.size], props.block ? 'w-full' : ''];
});
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled">
    <slot />
  </button>
</template>
