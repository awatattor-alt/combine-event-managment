<template>
  <div class="flex items-center justify-center gap-2 mt-12">
    <button 
      @click="emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
    >
      <ChevronLeft :size="20" />
    </button>
    
    <div class="flex gap-1">
      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="emit('page-change', page)"
        :class="[
          'w-10 h-10 rounded-xl text-sm font-bold transition-all',
          currentPage === page ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-600 hover:bg-slate-100'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button 
      @click="emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
    >
      <ChevronRight :size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['page-change']);
</script>
