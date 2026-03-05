<script setup lang="ts">
import { inject, ref } from 'vue';

const locale = inject<any>('locale');

const offices = [
  { city: { en: 'Baghdad', ar: 'بغداد', ku: 'بەغدا' }, email: 'baghdad@iraqcompass.demo', phone: '+964 700 111 2233' },
  { city: { en: 'Erbil', ar: 'أربيل', ku: 'هەولێر' }, email: 'erbil@iraqcompass.demo', phone: '+964 750 222 3344' },
  { city: { en: 'Basra', ar: 'البصرة', ku: 'بەسرە' }, email: 'basra@iraqcompass.demo', phone: '+964 780 333 4455' },
];

const form = ref({ name: '', email: '', message: '' });
const submitted = ref(false);

const localize = (text: { en: string; ar: string; ku: string }) => text[locale.value as 'en' | 'ar' | 'ku'] || text.en;

const submitForm = () => {
  submitted.value = true;
  form.value = { name: '', email: '', message: '' };
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10">
    <section class="bg-white border border-slate-200 rounded-3xl p-8">
      <h1 class="text-3xl font-black text-slate-900 mb-3">{{ locale === 'en' ? 'Contact Us' : (locale === 'ar' ? 'اتصل بنا' : 'پەیوەندیمان پێوە بکە') }}</h1>
      <p class="text-slate-500 mb-6">{{ locale === 'en' ? 'We usually reply within one business day. This form uses mock submission for now.' : (locale === 'ar' ? 'نرد عادة خلال يوم عمل واحد. هذا النموذج يستخدم إرسالاً تجريبياً حالياً.' : 'زۆرجار لە ماوەی ڕۆژێکی کاری وەڵام دەدەینەوە. ئەم فۆڕمە لە ئێستادا ناردنی ساختە بەکاردەهێنێت.') }}</p>

      <form class="space-y-4" @submit.prevent="submitForm">
        <input v-model="form.name" required class="w-full px-4 py-3 bg-slate-50 rounded-xl" :placeholder="locale === 'en' ? 'Your name' : (locale === 'ar' ? 'اسمك' : 'ناوت')" />
        <input v-model="form.email" type="email" required class="w-full px-4 py-3 bg-slate-50 rounded-xl" placeholder="name@example.com" />
        <textarea v-model="form.message" required rows="5" class="w-full px-4 py-3 bg-slate-50 rounded-xl" :placeholder="locale === 'en' ? 'Tell us how we can help' : (locale === 'ar' ? 'أخبرنا كيف يمكننا المساعدة' : 'پێمان بڵێ چۆن یارمەتیت بدەین')" />
        <button class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl">{{ locale === 'en' ? 'Send Message' : (locale === 'ar' ? 'إرسال الرسالة' : 'ناردنی نامە') }}</button>
      </form>

      <p v-if="submitted" class="mt-4 text-emerald-700 text-sm font-medium">{{ locale === 'en' ? 'Mock message submitted successfully.' : (locale === 'ar' ? 'تم إرسال الرسالة التجريبية بنجاح.' : 'نامەی ساختە بە سەرکەوتوویی نێردرا.') }}</p>
    </section>

    <section class="space-y-4">
      <article v-for="office in offices" :key="office.email" class="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 class="text-xl font-bold text-slate-900 mb-2">{{ localize(office.city) }} Office</h2>
        <p class="text-slate-600">{{ office.email }}</p>
        <p class="text-slate-600">{{ office.phone }}</p>
      </article>
    </section>
  </div>
</template>
