import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store';
import dynamicRoutes from '@/utils/dynamicRoutes';
import './assets/css/tailwind.css';
const components = import.meta.globEager('./components/ui/**/*.vue');
const stories = import.meta.globEager('./stories/**/*.vue');

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

dynamicRoutes(components, stories, app, router);

const navItems = router.getRoutes();
app.provide('nav-items', navItems);

app.use(router).use(store).mount('#app');
