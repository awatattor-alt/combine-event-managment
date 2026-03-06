<script setup lang="ts">
import { inject } from 'vue';
import { useEventStore } from '../store/eventStore';
import { Shield, Users, AlertCircle, CheckCircle, XCircle } from 'lucide-vue-next';

/**
 * Admin moderation dashboard page.
 */
const store = useEventStore();
const t = inject<any>('t');
const locale = inject<any>('locale');

const adminStats = [
  { label: locale.value === 'en' ? 'Total Users' : (locale.value === 'ar' ? 'إجمالي المستخدمين' : 'کۆی بەکارهێنەران'), value: '1,452', icon: Users, color: 'text-blue-600' },
  { label: locale.value === 'en' ? 'Pending Events' : (locale.value === 'ar' ? 'فعاليات قيد الانتظار' : 'چالاکییە چاوەڕوانکراوەکان'), value: '8', icon: AlertCircle, color: 'text-amber-600' },
  { label: locale.value === 'en' ? 'Active Events' : (locale.value === 'ar' ? 'فعاليات نشطة' : 'چالاکییە چالاکەکان'), value: '124', icon: CheckCircle, color: 'text-emerald-600' },
];
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex items-center gap-4 mb-10">
      <div class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
        <Shield :size="24" />
      </div>
      <div>
        <h1 class="text-4xl font-bold text-slate-900">{{ locale === 'en' ? 'Admin Portal' : (locale === 'ar' ? 'بوابة المسؤول' : 'پۆرتالی ئەدمین') }}</h1>
        <p class="text-slate-500">{{ locale === 'en' ? 'System-wide management and moderation' : (locale === 'ar' ? 'الإدارة والاعتدال على مستوى النظام' : 'بەڕێوەبردن و میانڕەوی لەسەر ئاستی سیستم') }}</p>
      </div>
    </div>

    <!-- Admin Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div v-for="stat in adminStats" :key="stat.label" class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <component :is="stat.icon" :size="24" :class="stat.color" />
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ locale === 'en' ? 'Live' : (locale === 'ar' ? 'مباشر' : 'ڕاستەوخۆ') }}</span>
        </div>
        <p class="text-3xl font-black text-slate-900 mb-1">{{ stat.value }}</p>
        <p class="text-sm text-slate-500">{{ stat.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Pending Approvals -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100">
          <h3 class="text-xl font-bold text-slate-900">{{ locale === 'en' ? 'Pending Approvals' : (locale === 'ar' ? 'الموافقات المعلقة' : 'ڕەزامەندییە چاوەڕوانکراوەکان') }}</h3>
        </div>
        <div class="divide-y divide-slate-100">
          <div v-for="i in 4" :key="i" class="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-slate-100 rounded-xl"></div>
              <div>
                <p class="font-bold text-slate-900">{{ locale === 'en' ? `New Event Request #${i}` : (locale === 'ar' ? `طلب فعالية جديد #${i}` : `داواکاری چالاکی نوێ #${i}`) }}</p>
                <p class="text-xs text-slate-500">{{ locale === 'en' ? `Submitted by Organizer ${i}` : (locale === 'ar' ? `تم التقديم بواسطة المنظم ${i}` : `نێردراوە لەلایەن ڕێکخەر ${i}`) }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><CheckCircle :size="20" /></button>
              <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><XCircle :size="20" /></button>
            </div>
          </div>
        </div>
      </div>

      <!-- User Management -->
      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100">
          <h3 class="text-xl font-bold text-slate-900">{{ locale === 'en' ? 'Recent Users' : (locale === 'ar' ? 'المستخدمون الجدد' : 'بەکارهێنەرە نوێیەکان') }}</h3>
        </div>
        <div class="divide-y divide-slate-100">
          <div v-for="i in 4" :key="i" class="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                U{{ i }}
              </div>
              <div>
                <p class="font-bold text-slate-900">{{ locale === 'en' ? `User Name ${i}` : (locale === 'ar' ? `اسم المستخدم ${i}` : `ناوی بەکارهێنەر ${i}`) }}</p>
                <p class="text-xs text-slate-500">user{{ i }}@example.com</p>
              </div>
            </div>
            <span class="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">{{ locale === 'en' ? 'User' : (locale === 'ar' ? 'مستخدم' : 'بەکارهێنەر') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- System Logs -->
    <div class="mt-8 bg-slate-900 text-slate-300 p-8 rounded-3xl font-mono text-xs overflow-hidden">
      <div class="flex items-center gap-2 mb-4 text-emerald-400">
        <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span class="font-bold uppercase tracking-widest">{{ locale === 'en' ? 'System Logs' : (locale === 'ar' ? 'سجلات النظام' : 'تۆمارەکانی سیستم') }}</span>
      </div>
      <div class="space-y-1">
        <p><span class="text-slate-500">[2026-03-05 10:52:03]</span> INFO: System boot sequence complete.</p>
        <p><span class="text-slate-500">[2026-03-05 10:55:12]</span> WARN: High traffic detected from Baghdad region.</p>
        <p><span class="text-slate-500">[2026-03-05 11:02:45]</span> INFO: New organizer 'Kurdistan Tech Hub' verified.</p>
        <p><span class="text-slate-500">[2026-03-05 11:15:00]</span> SUCCESS: Database backup completed (1.2GB).</p>
        <p><span class="text-slate-500">[2026-03-05 11:20:10]</span> ERROR: Failed login attempt from IP 192.168.1.45.</p>
      </div>
    </div>
  </div>
</template>
