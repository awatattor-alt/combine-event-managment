<script setup lang="ts">
import { inject } from 'vue';
import { LayoutDashboard, PlusCircle, List, Settings, LogOut } from 'lucide-vue-next';

const t = inject<any>('t');
const locale = inject<any>('locale');
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
      <div class="p-8">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-black text-xl">I</span>
          </div>
          <span class="text-xl font-black text-slate-900 tracking-tighter">Compass</span>
        </router-link>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <router-link 
          to="/dashboard" 
          class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          active-class="bg-emerald-50 !text-emerald-600 font-bold"
          exact
        >
          <LayoutDashboard :size="20" />
          {{ t.dashboard.overview }}
        </router-link>
        <router-link 
          to="/dashboard/my-events" 
          class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          active-class="bg-emerald-50 !text-emerald-600 font-bold"
        >
          <List :size="20" />
          {{ t.dashboard.myEvents }}
        </router-link>
        <router-link 
          to="/dashboard/create-event" 
          class="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
          active-class="bg-emerald-50 !text-emerald-600 font-bold"
        >
          <PlusCircle :size="20" />
          {{ t.dashboard.createEvent }}
        </router-link>
      </nav>

      <div class="p-4 border-t border-slate-100">
        <button class="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
          <LogOut :size="20" />
          {{ t.common.signOut }}
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <header class="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <h2 class="font-bold text-slate-900">{{ locale.value === 'en' ? 'Organizer Portal' : (locale.value === 'ar' ? 'بوابة المنظم' : 'پۆرتالی ڕێکخەر') }}</h2>
        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-slate-900">Cultural Hub IQ</p>
            <p class="text-xs text-slate-500">{{ locale.value === 'en' ? 'Organizer Account' : (locale.value === 'ar' ? 'حساب المنظم' : 'هەژماری ڕێکخەر') }}</p>
          </div>
          <div class="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm"></div>
        </div>
      </header>

      <div class="p-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
