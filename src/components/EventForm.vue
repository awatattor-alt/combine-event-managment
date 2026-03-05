<script setup lang="ts">
import { inject } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  modelValue: any;
  categories: any[];
  cities: any[];
  submitLabel: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>();

const t = inject<any>('t');
const locale = inject<any>('locale');

const updateField = (field: string, value: any) => emit('update:modelValue', { ...props.modelValue, [field]: value });
const onInput = (field: string, e: Event) => updateField(field, (e.target as HTMLInputElement).value);
const onTextArea = (field: string, e: Event) => updateField(field, (e.target as HTMLTextAreaElement).value);
const onSelect = (field: string, e: Event) => updateField(field, (e.target as HTMLSelectElement).value);
const onNumber = (field: string, e: Event) => updateField(field, Number((e.target as HTMLInputElement).value));

const getLocalizedName = (item: any) => {
  if (locale.value === 'ar') return item.nameAr;
  if (locale.value === 'ku') return item.nameKu;
  return item.name;
};
</script>

<template>
  <form @submit.prevent="emit('submit')" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.title }}</label>
        <input :value="modelValue.title" @input="onInput('title', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" required />
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.description }}</label>
        <textarea :value="modelValue.description" @input="onTextArea('description', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" rows="4" required />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.category }}</label>
        <select :value="modelValue.category" @change="onSelect('category', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ getLocalizedName(cat) }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.city }}</label>
        <select :value="modelValue.city" @change="onSelect('city', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl">
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ getLocalizedName(city) }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.venue }}</label>
        <input :value="modelValue.venue" @input="onInput('venue', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" required />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.dateTime }}</label>
        <input type="datetime-local" :value="modelValue.date" @input="onInput('date', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" required />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.price }}</label>
        <input type="number" :value="modelValue.price" @input="onNumber('price', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" required />
      </div>
      <div>
        <label class="block text-sm font-semibold mb-2 text-slate-700">{{ t.dashboard.form.totalTickets }}</label>
        <input type="number" :value="modelValue.ticketAvailability" @input="onNumber('ticketAvailability', $event)" class="w-full px-4 py-3 bg-slate-50 rounded-xl" required />
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <BaseButton variant="ghost" @click="emit('cancel')">{{ t.common.cancel }}</BaseButton>
      <BaseButton type="submit">{{ submitLabel }}</BaseButton>
    </div>
  </form>
</template>
