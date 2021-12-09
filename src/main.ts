import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { routes, routeComponents } from './routes';
import store from './store';
import dynamicRoutes from '@/utils/dynamicRoutes';
import './assets/css/tailwind.css';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

dynamicRoutes(routeComponents, app, router, store);

const navItems = router.getRoutes();
app.provide('nav-items', navItems);

app.use(router).use(store).mount('#app');
