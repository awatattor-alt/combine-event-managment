<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Compass, Eye, EyeOff } from 'lucide-vue-next';
import ErrorState from '@/components/ErrorState.vue';
import { useAuthStore } from '@/stores/authStore';

const { t, locale } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const isRtl = computed(() => locale.value === 'ar' || locale.value === 'ku');

const handleLogin = async (): Promise<void> => {
  loading.value = true;
  error.value = '';

  const result = await authStore.login(email.value, password.value);

  if (!result.success) {
    error.value = result.error ?? 'auth.invalid_credentials';
    loading.value = false;
    return;
  }

  if (authStore.currentUser?.role === 'organizer') {
    await router.push('/dashboard');
  } else {
    await router.push('/');
  }

  loading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4">
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-slate-100">
      <div class="text-center mb-6">
        <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1E3A5F]">
          <Compass class="h-7 w-7 text-amber-500" />
        </div>
        <h1 class="text-2xl font-bold text-[#1E3A5F]">{{ t('auth.login') }}</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.email_label') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
          />
        </div>

        <div>
          <label for="password" class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.password_label') }}</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
            />
            <button
              type="button"
              class="absolute inset-y-0 end-0 px-3 text-slate-500"
              :aria-label="showPassword ? t('auth.hide_password') : t('auth.show_password')"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>

        <ErrorState v-if="error" :message="t(error)" />

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700 disabled:opacity-70"
        >
          <span
            v-if="loading"
            class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          <span>{{ t('auth.login') }}</span>
        </button>
      </form>

      <p class="mt-4 text-center text-xs text-slate-500">{{ t('auth.demo_hint') }}</p>

      <div class="mt-6 text-center text-sm text-slate-600">
        {{ t('auth.no_account') }}
        <router-link
          to="/register"
          class="font-semibold text-amber-700"
          :class="isRtl ? 'mr-1' : 'ml-1'"
        >
          {{ t('auth.register_link') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
