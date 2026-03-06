<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

onMounted(() => {
  document.title = '404 — Iraq Compass';
});
</script>

<template>
  <section class="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
    <p class="mb-2 text-sm font-bold uppercase tracking-widest text-amber-600">{{ t('notFound.title') }}</p>
    <h1 class="mb-4 text-5xl font-extrabold text-[#1E3A5F] sm:text-6xl">{{ t('notFound.title') }}</h1>
    <p class="mb-8 max-w-xl text-lg text-slate-600">{{ t('notFound.description') }}</p>
    <RouterLink
      to="/"
      class="inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-all hover:bg-amber-700"
    >
      {{ t('notFound.goHome') }}
    </RouterLink>
  </section>
</template>
