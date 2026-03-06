<script setup lang="ts">
import type { EventItem } from '@/store/eventStore';

interface FilterOption {
  id: string;
  label: string;
}

defineProps<{
  cities: FilterOption[];
  categories: FilterOption[];
}>();

const city = defineModel<string>('city', { default: '' });
const category = defineModel<string>('category', { default: '' });
const date = defineModel<string>('date', { default: '' });
const sort = defineModel<'date' | 'popularity' | 'recent'>('sort', { default: 'date' });

const sortOptions: { value: 'date' | 'popularity' | 'recent'; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'recent', label: 'Recent' },
];
</script>

<template>
  <div class="grid gap-3 md:grid-cols-4">
    <select v-model="city" class="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">
      <option value="">All cities</option>
      <option v-for="item in cities" :key="item.id" :value="item.id">{{ item.label }}</option>
    </select>

    <select v-model="category" class="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">
      <option value="">All categories</option>
      <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.label }}</option>
    </select>

    <input v-model="date" type="date" class="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm" />

    <select v-model="sort" class="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>
