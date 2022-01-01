import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { parse, stringify } from 'qs';
import App from './App.vue';
import { routes, routeComponents } from './routes';
import { defaultControlState } from '@/utils/stories';
import dynamicRoutes from '@/utils/dynamicRoutes';
import './assets/css/tailwind.css';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
  parseQuery: parse,
  stringifyQuery: stringify,
});

dynamicRoutes(routeComponents, app, router);

const navItems = router.getRoutes();
app.provide('nav-items', navItems);
app.provide('controlState', defaultControlState);

app.use(router).mount('#app');
