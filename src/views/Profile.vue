<script setup lang="ts">
import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { User, Mail, Shield, LogOut, Settings, Ticket, Heart, ChevronRight } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const showToast = inject<any>('showToast');
const router = useRouter();
const userStore = useUserStore();

const user = computed(() => userStore.user);

const handleLogout = () => {
  userStore.logout();
  showToast(locale.value === 'en' ? 'Logged out successfully' : (locale.value === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'بە سەرکەوتوویی چوویتە دەرەوە'));
  router.push('/');
};

if (!userStore.isAuthenticated) {
  router.push('/login');
}
</script>

<template>
  <div v-if="user" class="min-h-screen bg-[#FFFBF5] pb-24">
    <!-- Profile Header -->
    <div class="bg-[#1E3A5F] pt-20 pb-40">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="relative inline-block mb-6">
          <div class="w-32 h-32 bg-amber-500 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-amber-900/40 border-4 border-white/10">
            {{ user.name.charAt(0) }}
          </div>
          <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-[#1E3A5F]">
            <Shield :size="18" />
          </div>
        </div>
        <h1 class="text-4xl font-extrabold text-white mb-2 tracking-tight">{{ user.name }}</h1>
        <p class="text-white/60 font-medium">{{ user.email }}</p>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sidebar Stats -->
        <div class="space-y-6">
          <div class="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100">
            <div class="text-center">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ locale === 'en' ? 'Account Type' : (locale === 'ar' ? 'نوع الحساب' : 'جۆری هەژمار') }}</p>
              <p class="text-lg font-black text-[#1E3A5F] capitalize">{{ user.role }}</p>
            </div>
            <div class="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
              <div class="text-center">
                <p class="text-2xl font-black text-[#1E3A5F]">12</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Tickets' : (locale === 'ar' ? 'تذاكر' : 'تیکت') }}</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-black text-[#1E3A5F]">5</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Saved' : (locale === 'ar' ? 'محفوظ' : 'پاشەکەوتکراو') }}</p>
              </div>
            </div>
          </div>

          <button 
            @click="handleLogout"
            class="w-full py-5 bg-white text-red-500 font-bold rounded-[2rem] shadow-xl shadow-red-900/5 border border-red-50 hover:bg-red-50 transition-all flex items-center justify-center gap-3"
          >
            <LogOut :size="20" />
            {{ locale === 'en' ? 'Sign Out' : (locale === 'ar' ? 'تسجيل الخروج' : 'چوونە دەرەوە') }}
          </button>
        </div>

        <!-- Main Settings -->
        <div class="md:col-span-2 space-y-6">
          <div class="bg-white rounded-[3rem] p-10 shadow-xl shadow-blue-900/5 border border-slate-100">
            <h2 class="text-2xl font-bold text-[#1E3A5F] mb-8">{{ locale === 'en' ? 'Account Settings' : (locale === 'ar' ? 'إعدادات الحساب' : 'ڕێکخستنەکانی هەژمار') }}</h2>
            
            <div class="space-y-4">
              <button class="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                    <User :size="22" />
                  </div>
                  <div class="text-left">
                    <p class="font-bold text-[#1E3A5F]">{{ locale === 'en' ? 'Personal Information' : (locale === 'ar' ? 'المعلومات الشخصية' : 'زانیاری کەسی') }}</p>
                    <p class="text-xs text-slate-400">{{ locale === 'en' ? 'Update your name and profile' : (locale === 'ar' ? 'تحديث اسمك وملفك الشخصي' : 'ناوی خۆت و پڕۆفایلەکەت نوێ بکەرەوە') }}</p>
                  </div>
                </div>
                <ChevronRight :size="20" class="text-slate-300 group-hover:text-amber-500 transition-all" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </button>

              <button class="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                    <Ticket :size="22" />
                  </div>
                  <div class="text-left">
                    <p class="font-bold text-[#1E3A5F]">{{ locale === 'en' ? 'My Tickets' : (locale === 'ar' ? 'تذاكري' : 'تیکتەکانم') }}</p>
                    <p class="text-xs text-slate-400">{{ locale === 'en' ? 'View and manage your bookings' : (locale === 'ar' ? 'عرض وإدارة حجوزاتك' : 'بینین و بەڕێوەبردنی حیجزەکانت') }}</p>
                  </div>
                </div>
                <ChevronRight :size="20" class="text-slate-300 group-hover:text-blue-500 transition-all" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </button>

              <button class="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
                    <Heart :size="22" />
                  </div>
                  <div class="text-left">
                    <p class="font-bold text-[#1E3A5F]">{{ locale === 'en' ? 'Saved Events' : (locale === 'ar' ? 'الفعاليات المحفوظة' : 'چالاکییە پاشەکەوتکراوەکان') }}</p>
                    <p class="text-xs text-slate-400">{{ locale === 'en' ? 'Events you\'ve bookmarked' : (locale === 'ar' ? 'الفعاليات التي قمت بحفظها' : 'ئەو چالاکییانەی کە پاشەکەوتت کردوون') }}</p>
                  </div>
                </div>
                <ChevronRight :size="20" class="text-slate-300 group-hover:text-pink-500 transition-all" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </button>

              <button class="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-500 shadow-sm">
                    <Settings :size="22" />
                  </div>
                  <div class="text-left">
                    <p class="font-bold text-[#1E3A5F]">{{ locale === 'en' ? 'Preferences' : (locale === 'ar' ? 'التفضيلات' : 'پەسەندکراوەکان') }}</p>
                    <p class="text-xs text-slate-400">{{ locale === 'en' ? 'Language and notification settings' : (locale === 'ar' ? 'إعدادات اللغة والإشعارات' : 'ڕێکخستنەکانی زمان و ئاگادارکردنەوەکان') }}</p>
                  </div>
                </div>
                <ChevronRight :size="20" class="text-slate-300 group-hover:text-slate-500 transition-all" :class="locale !== 'en' ? 'rotate-180' : ''" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
