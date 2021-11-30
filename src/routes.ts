import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    component: () => import('@/pages/Dashboard.vue'),
    name: 'Dashboard',
    path: '/',
  },
];

export default routes;
