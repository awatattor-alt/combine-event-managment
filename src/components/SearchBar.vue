<script setup lang="ts">
import { computed, inject } from 'vue';
import { Search } from 'lucide-vue-next';

const model = defineModel<string>({ default: '' });
const t = inject<any>('t');
const locale = inject<any>('locale');

const isEnglish = computed(() => locale?.value === 'en');
</script>

<template>
  <div class="relative w-full">
    <Search class="absolute inset-inline-start-3 top-1/2 -translate-y-1/2 text-slate-400" :size="20" />
    <input
      v-model="model"
      type="text"
      :placeholder="t.filters.search"
      :class="[
        'w-full py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all',
        isEnglish ? 'pl-10 pr-4' : 'pr-10 pl-4'
      ]"
    />
  </div>
</template>
