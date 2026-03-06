import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EventsView from '../views/EventsView.vue';
import EventDetailView from '../views/EventDetailView.vue';
import MapView from '../views/MapView.vue';
import DashboardLayout from '../views/dashboard/DashboardLayout.vue';
import DashboardOverview from '../views/dashboard/Overview.vue';
import MyEvents from '../views/dashboard/MyEvents.vue';
import CreateEvent from '../views/dashboard/CreateEvent.vue';
import EditEvent from '../views/dashboard/EditEvent.vue';
import Admin from '../views/Admin.vue';

import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';
import Checkout from '../views/Checkout.vue';
import MyTickets from '../views/MyTickets.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/events', name: 'Events', component: EventsView },
  { path: '/events/:id', name: 'EventDetails', component: EventDetailView },
  { path: '/map', name: 'Map', component: MapView },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/checkout/:id', name: 'Checkout', component: Checkout },
  { path: '/tickets', name: 'MyTickets', component: MyTickets },
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
