<script setup lang="ts">
const props = defineProps<{ title: string; message?: string; buttonText: string }>();
const emit = defineEmits<{ (e: 'back'): void }>();
</script>

<template>
  <div class="min-h-[50vh] flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg w-full">
      <div class="text-6xl mb-4">🧭</div>
      <h2 class="text-2xl font-bold text-[#1E3A5F] mb-2">{{ props.title }}</h2>
      <p v-if="props.message" class="text-slate-500 mb-6">{{ props.message }}</p>
      <button
        class="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
        @click="emit('back')"
      >
        {{ props.buttonText }}
      </button>
    </div>
  </div>
</template>
