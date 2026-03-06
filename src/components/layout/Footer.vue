<script setup lang="ts">
import { inject } from 'vue';
import { Compass, Facebook, Twitter, Instagram, Youtube } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-[#111827] text-white pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-2 text-2xl font-bold mb-4">
            <Compass class="text-amber-500" :size="32" />
            <span>Iraq Compass</span>
          </div>
          <p class="text-white/60 text-sm leading-relaxed mb-6">
            {{ locale === 'en' ? 'Your ultimate guide to discovering and experiencing the best events across all 18 governorates of Iraq.' : (locale === 'ar' ? 'دليلك النهائي لاكتشاف وتجربة أفضل الفعاليات في جميع محافظات العراق الـ 18.' : 'ڕێبەری کۆتایی تۆ بۆ دۆزینەوە و ئەزموونکردنی باشترین چالاکییەکان لە سەرانسەری ١٨ پارێزگاکەی عێراق.') }}
          </p>
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all cursor-pointer">
              <Facebook :size="20" />
            </div>
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all cursor-pointer">
              <Twitter :size="20" />
            </div>
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all cursor-pointer">
              <Instagram :size="20" />
            </div>
            <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 transition-all cursor-pointer">
              <Youtube :size="20" />
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ locale === 'en' ? 'Quick Links' : (locale === 'ar' ? 'روابط سريعة' : 'بەستەرە خێراکان') }}</h4>
          <ul class="space-y-4 text-white/60 text-sm">
            <li><router-link to="/" class="hover:text-amber-500 transition-colors">{{ t.nav.home }}</router-link></li>
            <li><router-link to="/events" class="hover:text-amber-500 transition-colors">{{ t.nav.events }}</router-link></li>
            <li><a href="#" class="hover:text-amber-500 transition-colors">{{ locale === 'en' ? 'About Us' : (locale === 'ar' ? 'من نحن' : 'دەربارەی ئێمە') }}</a></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ t.filters.category }}</h4>
          <ul class="space-y-4 text-white/60 text-sm">
            <li><router-link to="/events?category=music" class="hover:text-amber-500 transition-colors">{{ locale === 'en' ? 'Music' : (locale === 'ar' ? 'موسيقى' : 'مۆسیقا') }}</router-link></li>
            <li><router-link to="/events?category=tech" class="hover:text-amber-500 transition-colors">{{ locale === 'en' ? 'Technology' : (locale === 'ar' ? 'تكنولوجيا' : 'تەکنەلۆژیا') }}</router-link></li>
            <li><router-link to="/events?category=culture" class="hover:text-amber-500 transition-colors">{{ locale === 'en' ? 'Culture' : (locale === 'ar' ? 'ثقافة' : 'کولتور') }}</router-link></li>
            <li><router-link to="/events?category=food" class="hover:text-amber-500 transition-colors">{{ locale === 'en' ? 'Food' : (locale === 'ar' ? 'طعام' : 'خواردن') }}</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-lg font-bold mb-6">{{ locale === 'en' ? 'Contact Us' : (locale === 'ar' ? 'اتصل بنا' : 'پەیوەندیمان پێوە بکە') }}</h4>
          <ul class="space-y-4 text-white/60 text-sm">
            <li class="flex items-center gap-3">
              <span class="text-amber-500">Email:</span> hello@iraqcompass.com
            </li>
            <li class="flex items-center gap-3">
              <span class="text-amber-500">Phone:</span> +964 770 000 0000
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
        <p>© 2026 Iraq Compass. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
