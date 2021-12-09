import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];

// Import all Component, Page, & Story Modules via Glob Imports (Vite Only)
const routeComponents = {
  components: import.meta.globEager('./components/ui/**/*.vue'),
  pages: import.meta.globEager('./pages/**/*.vue'),
  stories: import.meta.globEager('./stories/**/*.vue'),
};

export { routes, routeComponents };
