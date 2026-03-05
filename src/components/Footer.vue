<script setup lang="ts">
import { inject } from 'vue';

const locale = inject<any>('locale');
</script>

<template>
  <footer class="border-t border-slate-200 bg-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-4 justify-between text-sm text-slate-500">
      <p>© {{ new Date().getFullYear() }} Eventiraq. {{ locale === 'en' ? 'All rights reserved.' : (locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'هەموو مافەکان پارێزراون.') }}</p>
      <div class="flex items-center gap-4">
        <router-link to="/contact" class="hover:text-emerald-600">{{ locale === 'en' ? 'Contact' : (locale === 'ar' ? 'تواصل' : 'پەیوەندی') }}</router-link>
        <router-link to="/search" class="hover:text-emerald-600">{{ locale === 'en' ? 'Search' : (locale === 'ar' ? 'گەڕان' : 'گەڕان') }}</router-link>
      </div>
    </div>
  </footer>
</template>
