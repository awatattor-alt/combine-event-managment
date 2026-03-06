<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { EventItem } from '@/store/eventStore';

interface OptionItem {
  id: string;
  label: string;
}

const props = defineProps<{
  modelValue?: Partial<EventItem>;
  categories: OptionItem[];
  cities: OptionItem[];
  submitLabel: string;
}>();

const emit = defineEmits<{
  submit: [payload: Partial<EventItem>];
}>();

const form = reactive<Partial<EventItem>>({
  title_en: '',
  title_ar: '',
  title_ku: '',
  description_en: '',
  description_ar: '',
  description_ku: '',
  category: '',
  city: '',
  date: '',
  time: '',
  image_url: '',
  organizer_name: '',
  is_free: true,
  price: 0,
});

watch(
  () => props.modelValue,
  (value) => Object.assign(form, value ?? {}),
  { immediate: true }
);

const onSubmit = () => {
  emit('submit', form);
};
</script>

<template>
  <form class="space-y-3" @submit.prevent="onSubmit">
    <input v-model="form.title_en" placeholder="Title (EN)" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
    <textarea v-model="form.description_en" placeholder="Description (EN)" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
    <div class="grid gap-3 md:grid-cols-2">
      <select v-model="form.category" class="rounded-lg border border-slate-300 px-3 py-2">
        <option value="">Select category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.label }}</option>
      </select>
      <select v-model="form.city" class="rounded-lg border border-slate-300 px-3 py-2">
        <option value="">Select city</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.label }}</option>
      </select>
    </div>
    <div class="grid gap-3 md:grid-cols-2">
      <input v-model="form.date" type="date" class="rounded-lg border border-slate-300 px-3 py-2" />
      <input v-model="form.time" type="time" class="rounded-lg border border-slate-300 px-3 py-2" />
    </div>
    <input v-model="form.organizer_name" placeholder="Organizer" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
    <input v-model="form.image_url" placeholder="Image URL" class="w-full rounded-lg border border-slate-300 px-3 py-2" />
    <button type="submit" class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">{{ submitLabel }}</button>
  </form>
</template>
