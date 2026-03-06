import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
    { path: '/events', name: 'Events', component: () => import('@/views/Events.vue') },
    { path: '/events/:id', name: 'EventDetails', component: () => import('@/views/EventDetails.vue') },
    { path: '/login', name: 'Login', component: () => import('@/views/auth/LoginView.vue') },
    { path: '/register', name: 'Register', component: () => import('@/views/auth/RegisterView.vue') },
    { path: '/profile', name: 'Profile', component: () => import('@/views/dashboard/ProfileView.vue'), meta: { requiresAuth: true } },
    { path: '/about', name: 'About', component: () => import('@/views/AboutView.vue') },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard/events' },
        { path: 'events', name: 'DashboardMyEvents', component: () => import('@/views/dashboard/MyEventsView.vue') },
        { path: 'create', name: 'DashboardCreateEvent', component: () => import('@/views/dashboard/CreateEventView.vue') },
        { path: 'edit/:id', name: 'DashboardEditEvent', component: () => import('@/views/dashboard/EditEventView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login';
  }

  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return '/';
  }

  return true;
});

export default router;
