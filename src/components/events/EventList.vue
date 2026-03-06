<script setup lang="ts">
import type { EventItem } from '@/store/eventStore';
import EventCard from './EventCard.vue';
import EmptyState from '@/components/EmptyState.vue';

defineProps<{ events: EventItem[] }>();
</script>

<template>
  <div v-if="events.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <EmptyState
    v-else
    title="No events found"
    message="Try adjusting search keywords or filters to discover more events."
    icon="🔎"
  />
</template>
