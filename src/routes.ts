import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];

const components = import.meta.globEager('./components/ui/**/*.vue');
const pages = import.meta.globEager('./pages/**/*.vue');
const stories = import.meta.globEager('./stories/**/*.vue');

// Import all Component, Page, & Story Modules via Glob Imports (Vite Only)
const routeComponents = {
  components,
  pages,
  stories,
};

export { components, routes, routeComponents };
