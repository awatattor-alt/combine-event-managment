<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

onMounted(() => {
  document.title = 'About — Iraq Compass';
});
</script>

<template>
  <section class="mx-auto min-h-[70vh] max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <h1 class="mb-5 text-3xl font-extrabold text-[#1E3A5F] sm:text-4xl">
        {{ t('about.title') }}
      </h1>
      <p class="mb-4 text-lg leading-relaxed text-slate-700">
        {{ t('about.description') }}
      </p>
      <p class="text-base leading-relaxed text-slate-600">
        {{ t('about.mission') }}
      </p>
    </div>
  </section>
</template>
