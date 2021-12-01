import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    component: () => import('@/pages/Dashboard.vue'),
    name: 'Dashboard',
    path: '/',
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

export default routes;
