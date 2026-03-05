<script setup lang="ts">
import { inject } from 'vue';
import { useUserStore } from '../store/userStore';
import { User, Mail, Shield, LogOut, Settings } from 'lucide-vue-next';

/**
 * User profile page.
 */
const t = inject<any>('t');
const locale = inject<any>('locale');
const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  window.location.href = '/';
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="h-32 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
      <div class="px-8 pb-8">
        <div class="relative flex justify-between items-end -mt-12 mb-8">
          <div class="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
            <div class="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
              <User :size="48" />
            </div>
          </div>
          <button class="px-6 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Settings :size="18" /> {{ locale === 'en' ? 'Edit Profile' : (locale === 'ar' ? 'تعديل الملف الشخصي' : 'دەستکاری پرۆفایل') }}
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-slate-900">{{ userStore.user?.name }}</h1>
            <p class="text-slate-500">{{ userStore.user?.role === 'admin' ? 'Administrator' : (userStore.user?.role === 'organizer' ? 'Event Organizer' : 'Member') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Mail :size="20" />
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</p>
                <p class="text-slate-900 font-medium">{{ userStore.user?.email }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                <Shield :size="20" />
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider">Account Status</p>
                <p class="text-emerald-600 font-bold">Verified</p>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-slate-100">
            <button 
              @click="handleLogout"
              class="flex items-center gap-2 text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
            >
              <LogOut :size="20" /> {{ t.common.signOut }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
