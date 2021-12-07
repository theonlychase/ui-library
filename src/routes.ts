import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    component: () => import('@/pages/Dashboard/Dashboard.vue'),
    name: 'Dashboard',
    path: '/',
    meta: {
      static: true,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/NotFound/NotFound.vue'),
    meta: {
      static: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

export default routes;
