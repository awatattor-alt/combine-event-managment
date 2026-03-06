<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '../store/userStore';
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-vue-next';

const { t, locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = t('auth.fill_fields');
    return;
  }

  isLoading.value = true;
  error.value = '';
  
  try {
    await userStore.login({ email: email.value, password: password.value });
    // Toast is handled globally or via store if needed, but for now we'll just redirect
    router.push('/');
  } catch (err: any) {
    error.value = err.message || t('auth.invalid_credentials');
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
        <div class="w-20 h-20 bg-[#1E3A5F] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/20">
          <LogIn class="text-amber-500" :size="32" />
        </div>
        <h1 class="text-3xl font-bold text-[#1E3A5F] mb-2">{{ t('nav.login') }}</h1>
        <p class="text-slate-500">{{ t('auth.welcome_back') }}</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-slate-100">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-100">
            <AlertCircle :size="18" />
            {{ error }}
          </div>

          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">{{ t('auth.email_label') }}</label>
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
            <div class="flex justify-between items-center px-4">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ t('auth.password_label') }}</label>
              <a href="#" class="text-xs font-bold text-amber-600 hover:text-amber-700">{{ t('auth.forgot_password') }}</a>
            </div>
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
            <span v-if="isLoading">{{ t('common.loading') }}</span>
            <template v-else>
              {{ t('nav.login') }}
              <ArrowRight :size="20" :class="locale !== 'en' ? 'rotate-180' : ''" />
            </template>
          </button>
        </form>

        <div class="mt-10 pt-10 border-t border-slate-50 text-center">
          <p class="text-slate-500 text-sm">
            {{ t('auth.no_account') }}
            <router-link to="/signup" class="text-amber-600 font-bold hover:text-amber-700 ml-1">
              {{ t('auth.create_account') }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
