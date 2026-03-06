import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Events from '../views/Events.vue';
import Search from '../views/Search.vue';
import EventDetails from '../views/EventDetails.vue';
import MapView from '../views/MapView.vue';
import Contact from '../views/Contact.vue';
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
import { useUserStore } from '../store/userStore';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/events', name: 'Events', component: Events },
  { path: '/search', name: 'Search', component: Search },
  { path: '/events/:id', name: 'EventDetails', component: EventDetails },
  { path: '/events/create', name: 'EventCreation', component: CreateEvent, meta: { requiresAuth: true, requiresOrganizer: true } },
  { path: '/map', name: 'Map', component: MapView },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: Signup, meta: { requiresGuest: true } },
  { path: '/signup', name: 'Signup', component: Signup, meta: { requiresGuest: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/checkout/:id', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'MyTickets', component: MyTickets, meta: { requiresAuth: true } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, requiresOrganizer: true },
    children: [
      { path: '', name: 'DashboardOverview', component: DashboardOverview },
      { path: 'my-events', name: 'MyEvents', component: MyEvents },
      { path: 'create-event', name: 'CreateEvent', component: CreateEvent },
      { path: 'edit-event/:id', name: 'EditEvent', component: EditEvent },
    ]
  },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const placeholderLoggedIn = localStorage.getItem('mockLoggedIn') === 'true';
  const placeholderRole = localStorage.getItem('mockRole');

  const isAuthenticated = userStore.isAuthenticated || placeholderLoggedIn;
  const role = userStore.user?.role || placeholderRole;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return { path: '/dashboard' };
  }

  if (to.meta.requiresOrganizer && role !== 'organizer' && role !== 'admin') {
    return { path: '/' };
  }

  if (to.meta.requiresAdmin && role !== 'admin') {
    return { path: '/' };
  }

  return true;
});

export default router;
