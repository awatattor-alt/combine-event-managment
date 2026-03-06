<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/composables/useToast';

const { t } = useI18n();
const authStore = useAuthStore();
const { showToast } = useToast();

const displayName = ref(authStore.currentUser?.name ?? '');

watch(
  () => authStore.currentUser?.name,
  (newValue) => {
    displayName.value = newValue ?? '';
  }
);

const saveName = (): void => {
  if (!authStore.currentUser) return;
  authStore.currentUser.name = displayName.value.trim() || authStore.currentUser.name;
  showToast(t('dashboard.toast.profile_saved'), 'success');
};
</script>

<template>
  <div class="mx-auto max-w-xl rounded-xl border border-slate-200 p-5">
    <div class="mb-5 flex items-center gap-4">
      <img
        :src="authStore.currentUser?.avatar_url || 'https://i.pravatar.cc/120?img=7'"
        :alt="authStore.currentUser?.name"
        class="h-16 w-16 rounded-full object-cover"
      />
      <div>
        <p class="font-semibold text-[#1E3A5F]">{{ authStore.currentUser?.name }}</p>
        <p class="text-sm text-slate-500">{{ authStore.currentUser?.email }}</p>
        <span class="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {{ authStore.currentUser?.role }}
        </span>
      </div>
    </div>

    <label class="text-sm font-medium text-slate-700">
      {{ t('dashboard.profile.display_name') }}
      <input v-model="displayName" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
    </label>

    <button
      type="button"
      class="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
      @click="saveName"
    >
      {{ t('dashboard.profile.save') }}
    </button>
  </div>
</template>
