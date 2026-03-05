<script setup lang="ts">
import { inject, ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';

const locale = inject<any>('locale');
const submitted = ref(false);
const form = ref({ name: '', email: '', message: '' });

const submit = () => {
  submitted.value = true;
  setTimeout(() => {
    form.value = { name: '', email: '', message: '' };
  }, 200);
};
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-8">{{ locale === 'en' ? 'Contact Us' : (locale === 'ar' ? 'تواصل معنا' : 'پەیوەندیمان پێوە بکە') }}</h1>
    <form @submit.prevent="submit" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <input v-model="form.name" required class="w-full rounded-xl bg-slate-50 px-4 py-3" :placeholder="locale === 'en' ? 'Your name' : 'Name'" />
      <input v-model="form.email" required type="email" class="w-full rounded-xl bg-slate-50 px-4 py-3" :placeholder="locale === 'en' ? 'Email' : 'Email'" />
      <textarea v-model="form.message" required rows="5" class="w-full rounded-xl bg-slate-50 px-4 py-3" :placeholder="locale === 'en' ? 'Message' : 'Message'" />
      <BaseButton type="submit">{{ locale === 'en' ? 'Send message' : (locale === 'ar' ? 'إرسال الرسالة' : 'ناردنی نامە') }}</BaseButton>
      <p v-if="submitted" class="text-emerald-600 text-sm">{{ locale === 'en' ? 'Message sent (mock).' : (locale === 'ar' ? 'تم إرسال الرسالة (وهمي).' : 'نامە نێردرا (ساختە).') }}</p>
    </form>
  </div>
</template>
