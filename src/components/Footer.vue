<script setup lang="ts">
import { inject } from 'vue';

const t = inject<any>('t');
const locale = inject<any>('locale');
</script>

<template>
  <footer class="border-t border-slate-200 bg-white mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold text-slate-900">Iraq Compass</h3>
          <p class="text-sm text-slate-500 mt-3">{{ t.footer.description }}</p>
        </div>
        <div>
          <h4 class="font-semibold text-slate-800 mb-3">{{ t.footer.quickLinks }}</h4>
          <ul class="space-y-2 text-sm text-slate-600">
            <li><router-link to="/">{{ t.nav.home }}</router-link></li>
            <li><router-link to="/events">{{ t.nav.events }}</router-link></li>
            <li><router-link to="/map">{{ t.nav.map }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-slate-800 mb-3">{{ t.footer.contact }}</h4>
          <p class="text-sm text-slate-600">info@iraqcompass.mock</p>
          <p class="text-sm text-slate-600" dir="ltr">+964 700 000 0000</p>
          <p class="text-xs text-slate-400 mt-4">{{ t.footer.mockNotice }}</p>
        </div>
      </div>
      <p class="text-xs text-slate-400 mt-8 border-t border-slate-100 pt-4">
        © 2026 Iraq Compass · {{ locale === 'en' ? 'All rights reserved' : (locale === 'ar' ? 'جميع الحقوق محفوظة' : 'هەموو مافەکان پارێزراون') }}
      </p>
    </div>
  </footer>
</template>
