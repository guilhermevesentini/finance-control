import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/Login/logar/LoginPage.vue'
import ResgistrarUsuario from '@/views/Login/registrar/ResgistrarUsuario.vue';
import BaseLayout from '@/views/Layout/BaseLayout.vue';
import { isAuthenticated } from '@/views/Login/auth';
import { dashboardPaths } from './dashboard/dashboardPath';
import { despesasPaths } from './despesas/despesasPath';

const routes: Array<RouteRecordRaw> = [
  { path: '/login', component: Login },
  { path: '/novoUsuario', component: ResgistrarUsuario },
  { 
    path: '/', 
    redirect: '/login',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      ...dashboardPaths,
      ...despesasPaths
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router
