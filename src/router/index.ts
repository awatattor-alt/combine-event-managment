import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import EventDetails from '../views/EventDetails.vue';
import MapView from '../views/MapView.vue';
import DashboardLayout from '../views/dashboard/DashboardLayout.vue';
import DashboardOverview from '../views/dashboard/Overview.vue';
import MyEvents from '../views/dashboard/MyEvents.vue';
import CreateEvent from '../views/dashboard/CreateEvent.vue';
import EditEvent from '../views/dashboard/EditEvent.vue';
import Admin from '../views/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/events', name: 'Events', component: Events },
  { path: '/events/:id', name: 'EventDetails', component: EventDetails },
  { path: '/map', name: 'Map', component: MapView },
  { 
    path: '/dashboard', 
    component: DashboardLayout,
    children: [
      { path: '', name: 'DashboardOverview', component: DashboardOverview },
      { path: 'my-events', name: 'MyEvents', component: MyEvents },
      { path: 'create-event', name: 'CreateEvent', component: CreateEvent },
      { path: 'edit-event/:id', name: 'EditEvent', component: EditEvent },
    ]
  },
  { path: '/admin', name: 'Admin', component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
