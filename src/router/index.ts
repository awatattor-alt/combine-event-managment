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
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Profile from '../views/Profile.vue';
import Checkout from '../views/Checkout.vue';
import MyTickets from '../views/MyTickets.vue';
import Search from '../views/Search.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/events', name: 'Events', component: Events },
  { path: '/search', name: 'Search', component: Search },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/events/:id', name: 'EventDetails', component: EventDetails },
  { path: '/map', name: 'Map', component: MapView },
  { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/signup', name: 'Signup', component: Signup, meta: { guestOnly: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/checkout/:id', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'MyTickets', component: MyTickets, meta: { requiresAuth: true } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, organizerOnly: true },
    children: [
      { path: '', name: 'DashboardOverview', component: DashboardOverview },
      { path: 'my-events', name: 'MyEvents', component: MyEvents },
      { path: 'create-event', name: 'CreateEvent', component: CreateEvent },
      { path: 'edit-event/:id', name: 'EditEvent', component: EditEvent }
    ]
  },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true, adminOnly: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthed = !!user;

  if (to.meta.requiresAuth && !isAuthed) return '/login';
  if (to.meta.guestOnly && isAuthed) return '/';
  if (to.meta.organizerOnly && !(user?.role === 'organizer' || user?.role === 'admin')) return '/';
  if (to.meta.adminOnly && user?.role !== 'admin') return '/';
  return true;
});

export default router;
