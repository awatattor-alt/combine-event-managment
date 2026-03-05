<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value });
    router.push('/');
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
    <div class="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LogIn :size="32" />
        </div>
        <h1 class="text-3xl font-bold text-slate-900">{{ locale === 'en' ? 'Welcome Back' : (locale === 'ar' ? 'مرحباً بعودتك' : 'بەخێربێیتەوە') }}</h1>
        <p class="text-slate-500 mt-2">{{ locale === 'en' ? 'Sign in to your account' : (locale === 'ar' ? 'تسجيل الدخول إلى حسابك' : 'بچۆ ژوورەوە بۆ هەژمارەکەت') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div v-if="error" class="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {{ error }}
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-700 block">{{ locale === 'en' ? 'Email Address' : (locale === 'ar' ? 'البريد الإلكتروني' : 'ناونیشانی ئیمەیڵ') }}</label>
          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
            <input 
              v-model="email"
              type="email" 
              required 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-slate-700 block">{{ locale === 'en' ? 'Password' : (locale === 'ar' ? 'كلمة المرور' : 'وشەی نهێنی') }}</label>
          <div class="relative">
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
            <input 
              v-model="password"
              type="password" 
              required 
              class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="userStore.loading"
          class="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          <span v-if="userStore.loading">{{ t.common.loading }}</span>
          <template v-else>
            {{ locale === 'en' ? 'Sign In' : (locale === 'ar' ? 'تسجيل الدخول' : 'چوونە ژوورەوە') }}
            <ArrowRight :size="18" />
          </template>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-slate-500 text-sm">
          {{ locale === 'en' ? "Don't have an account?" : (locale === 'ar' ? 'ليس لديك حساب؟' : 'هەژمارت نییە؟') }}
          <router-link to="/signup" class="text-emerald-600 font-bold hover:underline ml-1">
            {{ locale === 'en' ? 'Create Account' : (locale === 'ar' ? 'إنشاء حساب' : 'دروستکردنی هەژمار') }}
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
