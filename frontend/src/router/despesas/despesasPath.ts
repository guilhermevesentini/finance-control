export const despesasPaths = [{
  path: "/Despesas",
  name: "Despesas",
  redirect: '/Despesas/overview',
  component: () => import('@/views/despesas/DespesasBase.vue'),
  meta: { requiresAuth: true },
  children: [
    {
      path: "/Despesas/overview",
      name: "Overview",
      component: () => import('@/views/despesas/views/overview/DespesasOverview.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Despesas/lista",
      name: "Lista de Despesas",
      component: () => import('@/views/despesas/views/lista/DespesasPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/Despesas/config",
      name: "Configuração",
      component: () => import('@/views/despesas/views/config/DespesasConfig.vue'),
      meta: { requiresAuth: true },
    },
  ]
}]