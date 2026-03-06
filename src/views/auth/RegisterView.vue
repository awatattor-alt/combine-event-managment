<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore, type UserRole } from '@/stores/authStore';

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type ToastType = 'success' | 'error';
type ShowToastFn = (message: string, type?: ToastType) => void;

const { t, locale } = useI18n();
const authStore = useAuthStore();
const showToast = inject<ShowToastFn>('showToast');

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref<UserRole>('user');
const loading = ref(false);
const errors = ref<RegisterErrors>({});

const isRtl = computed(() => locale.value === 'ar' || locale.value === 'ku');
const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

const validateForm = (): boolean => {
  const nextErrors: RegisterErrors = {};

  if (!name.value.trim()) {
    nextErrors.name = 'auth.validation.required';
  }

  if (!email.value.trim()) {
    nextErrors.email = 'auth.validation.required';
  } else if (!emailPattern.test(email.value.trim())) {
    nextErrors.email = 'auth.validation.invalid_email';
  }

  if (!password.value) {
    nextErrors.password = 'auth.validation.required';
  }

  if (!confirmPassword.value) {
    nextErrors.confirmPassword = 'auth.validation.required';
  } else if (confirmPassword.value !== password.value) {
    nextErrors.confirmPassword = 'auth.validation.password_mismatch';
  }

  errors.value = nextErrors;
  return Object.keys(nextErrors).length === 0;
};

const handleRegister = async (): Promise<void> => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  const result = await authStore.register(
    name.value.trim(),
    email.value.trim(),
    password.value,
    role.value
  );

  if (!result.success) {
    showToast?.(t(result.error ?? 'auth.signup_failed'), 'error');
    loading.value = false;
    return;
  }

  showToast?.(t('auth.signup_success'), 'success');
  loading.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-slate-100">
      <h1 class="mb-6 text-center text-2xl font-bold text-[#1E3A5F]">{{ t('auth.register') }}</h1>

      <form class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.full_name') }}</label>
          <input v-model="name" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none" />
          <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ t(errors.name) }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.email_label') }}</label>
          <input v-model="email" type="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none" />
          <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ t(errors.email) }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.password_label') }}</label>
          <input v-model="password" type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none" />
          <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ t(errors.password) }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.confirm_password') }}</label>
          <input v-model="confirmPassword" type="password" class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-amber-600 focus:outline-none" />
          <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-600">{{ t(errors.confirmPassword) }}</p>
        </div>

        <div>
          <p class="mb-2 text-sm font-medium text-slate-700">{{ t('auth.role_label') }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="rounded-lg border px-3 py-2 text-sm font-medium"
              :class="role === 'user' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-slate-300 text-slate-700'"
              @click="role = 'user'"
            >
              {{ t('auth.attendee') }}
            </button>
            <button
              type="button"
              class="rounded-lg border px-3 py-2 text-sm font-medium"
              :class="role === 'organizer' ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-slate-300 text-slate-700'"
              @click="role = 'organizer'"
            >
              {{ t('auth.organizer') }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700 disabled:opacity-70"
        >
          <span>{{ loading ? t('common.loading') : t('auth.register') }}</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-slate-600">
        {{ t('auth.already_account') }}
        <router-link to="/login" class="font-semibold text-amber-700" :class="isRtl ? 'mr-1' : 'ml-1'">
          {{ t('auth.login_link') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
