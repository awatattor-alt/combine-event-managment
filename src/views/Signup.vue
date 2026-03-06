<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { Mail, Lock, User, UserPlus, ArrowRight, AlertCircle, Shield } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const showToast = inject<any>('showToast');
const router = useRouter();
const userStore = useUserStore();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('user');
const isLoading = ref(false);
const error = ref('');

const handleSignup = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = locale.value === 'en' ? 'Please fill in all fields' : (locale.value === 'ar' ? 'يرجى ملء جميع الحقول' : 'تکایە هەموو خانەکان پڕ بکەرەوە');
    return;
  }

  isLoading.value = true;
  error.value = '';
  
  try {
    await userStore.signup({ 
      name: name.value, 
      email: email.value, 
      password: password.value,
      role: role.value 
    });
    showToast(locale.value === 'en' ? 'Account created successfully!' : (locale.value === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'هەژمارەکە بە سەرکەوتوویی دروستکرا!'));
    router.push('/');
  } catch (err: any) {
    error.value = err.message || 'Signup failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF5] flex items-center justify-center p-4 py-20">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-10">
        <div class="w-20 h-20 bg-amber-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-900/20">
          <UserPlus class="text-white" :size="32" />
        </div>
        <h1 class="text-3xl font-bold text-[#1E3A5F] mb-2">{{ locale === 'en' ? 'Join Iraq Compass' : (locale === 'ar' ? 'انضم إلى بوصلة العراق' : 'ببە بە ئەندام لە عێراق کۆمپاس') }}</h1>
        <p class="text-slate-500">{{ locale === 'en' ? 'Start exploring and booking events' : (locale === 'ar' ? 'ابدأ في استكشاف وحجز الفعاليات' : 'دەست بکە بە گەڕان و حیجزکردنی چالاکییەکان') }}</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-slate-100">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-100">
            <AlertCircle :size="18" />
            {{ error }}
          </div>

          <!-- Role Switcher -->
          <div class="flex p-1 bg-slate-50 rounded-2xl mb-8">
            <button 
              type="button"
              @click="role = 'user'"
              :class="[
                'flex-1 py-3 text-sm font-bold rounded-xl transition-all',
                role === 'user' ? 'bg-white text-[#1E3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'
              ]"
            >
              {{ locale === 'en' ? 'Attendee' : (locale === 'ar' ? 'حضور' : 'بەشداربوو') }}
            </button>
            <button 
              type="button"
              @click="role = 'organizer'"
              :class="[
                'flex-1 py-3 text-sm font-bold rounded-xl transition-all',
                role === 'organizer' ? 'bg-white text-[#1E3A5F] shadow-sm' : 'text-slate-400 hover:text-slate-600'
              ]"
            >
              {{ locale === 'en' ? 'Organizer' : (locale === 'ar' ? 'منظم' : 'ڕێکخەر') }}
            </button>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">{{ locale === 'en' ? 'Full Name' : (locale === 'ar' ? 'الاسم الكامل' : 'ناوی تەواو') }}</label>
            <div class="relative group">
              <User class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="20" />
              <input 
                v-model="name"
                type="text" 
                placeholder="Awat Attor"
                :class="[
                  'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all font-medium',
                  locale === 'en' ? 'pl-14 pr-4' : 'pr-14 pl-4'
                ]"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">{{ locale === 'en' ? 'Email Address' : (locale === 'ar' ? 'البريد الإلكتروني' : 'ناونیشانی ئیمەیڵ') }}</label>
            <div class="relative group">
              <Mail class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="20" />
              <input 
                v-model="email"
                type="email" 
                placeholder="awat@example.com"
                :class="[
                  'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all font-medium',
                  locale === 'en' ? 'pl-14 pr-4' : 'pr-14 pl-4'
                ]"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">{{ locale === 'en' ? 'Password' : (locale === 'ar' ? 'كلمة المرور' : 'وشەی نهێنی') }}</label>
            <div class="relative group">
              <Lock class="absolute inset-inline-start-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" :size="20" />
              <input 
                v-model="password"
                type="password" 
                placeholder="••••••••"
                :class="[
                  'w-full py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all font-medium',
                  locale === 'en' ? 'pl-14 pr-4' : 'pr-14 pl-4'
                ]"
              />
            </div>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full py-5 bg-[#1E3A5F] text-white font-bold rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-[#2a4d7d] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
          >
            <span v-if="isLoading">{{ t.common.loading }}</span>
            <template v-else>
              {{ locale === 'en' ? 'Create Account' : (locale === 'ar' ? 'إنشاء حساب' : 'دروستکردنی هەژمار') }}
              <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
            </template>
          </button>
        </form>

        <div class="mt-10 pt-10 border-t border-slate-50 text-center">
          <p class="text-slate-500 text-sm">
            {{ locale === 'en' ? 'Already have an account?' : (locale === 'ar' ? 'لديك حساب بالفعل؟' : 'پێشتر هەژمارت دروستکردووە؟') }}
            <router-link to="/login" class="text-amber-600 font-bold hover:text-amber-700 ml-1">
              {{ t.nav.login }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
