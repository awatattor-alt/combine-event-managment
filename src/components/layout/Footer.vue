<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Compass, Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next';

const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-[#111827] pb-8 pt-16 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 grid grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <div class="mb-4 flex items-center gap-2 text-2xl font-bold">
            <Compass class="text-amber-500" :size="32" />
            <span>Iraq Compass</span>
          </div>
          <p class="mb-6 text-sm leading-relaxed text-white/60">{{ t('about.description') }}</p>
          <div class="flex gap-4">
            <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-all hover:bg-amber-500"><Facebook :size="20" /></div>
            <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-all hover:bg-amber-500"><Twitter :size="20" /></div>
            <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-all hover:bg-amber-500"><Instagram :size="20" /></div>
            <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-all hover:bg-amber-500"><Youtube :size="20" /></div>
          </div>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-bold">{{ t('common.filter') }}</h4>
          <ul class="space-y-4 text-sm text-white/60">
            <li><router-link to="/" class="transition-colors hover:text-amber-500">{{ t('nav.home') }}</router-link></li>
            <li><router-link to="/events" class="transition-colors hover:text-amber-500">{{ t('nav.events') }}</router-link></li>
            <li><router-link to="/about" class="transition-colors hover:text-amber-500">{{ t('footer.about') }}</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-bold">{{ t('filters.category') }}</h4>
          <ul class="space-y-4 text-sm text-white/60">
            <li><router-link to="/events?category=music" class="transition-colors hover:text-amber-500">Music</router-link></li>
            <li><router-link to="/events?category=tech" class="transition-colors hover:text-amber-500">Technology</router-link></li>
            <li><router-link to="/events?category=culture" class="transition-colors hover:text-amber-500">Culture</router-link></li>
            <li><router-link to="/events?category=food" class="transition-colors hover:text-amber-500">Food</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 text-lg font-bold">Contact</h4>
          <ul class="space-y-4 text-sm text-white/60">
            <li><span class="text-amber-500">Email:</span> hello@iraqcompass.com</li>
            <li><span class="text-amber-500">Phone:</span> +964 770 000 0000</li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
        <p>© {{ currentYear }} Iraq Compass. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
