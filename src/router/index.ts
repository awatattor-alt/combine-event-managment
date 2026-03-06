import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Events from '../views/Events.vue';
import EventDetails from '../views/EventDetails.vue';
import MapView from '../views/MapView.vue';
import DashboardLayout from '../views/dashboard/DashboardLayout.vue';
import DashboardOverview from '../views/dashboard/Overview.vue';
import MyEvents from '../views/dashboard/MyEvents.vue';
import CreateEvent from '../views/dashboard/CreateEvent.vue';
import EditEvent from '../views/dashboard/EditEvent.vue';
import Admin from '../views/Admin.vue';

import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import Profile from '../views/Profile.vue';
import Checkout from '../views/Checkout.vue';
import MyTickets from '../views/MyTickets.vue';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/events', name: 'Events', component: Events },
  { path: '/events/:id', name: 'EventDetails', component: EventDetails },
  { path: '/map', name: 'Map', component: MapView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/signup', redirect: '/register' },
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
    ],
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

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const needsAuth = to.path === '/dashboard' || to.path.startsWith('/dashboard/');

  if (needsAuth && !authStore.isLoggedIn) {
    return '/login';
  }

  if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
    return '/';
  }

  return true;
});

export default router;
