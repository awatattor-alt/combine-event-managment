<script setup lang="ts">
import EventCard from './EventCard.vue';

defineProps<{
  events: any[];
  columns?: 'two' | 'three' | 'four';
}>();
</script>

<template>
  <div :class="[
    'grid gap-8',
    columns === 'two' ? 'grid-cols-1 md:grid-cols-2' : '',
    columns === 'three' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : '',
    columns === 'four' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : ''
  ]">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
