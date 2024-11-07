export const despesasPaths = [{
  path: "/despesas",
  name: "Despesas",
  component: () => import('@/views/pages/despesas/DespesasPage.vue'),
  meta: { requiresAuth: true },
},
{
  path: "/Despesas/Adicionar_Despesa",
  name: "Adicionar Despesa",
  component: () => import('@/views/pages/despesas/views/adicionar/AdicionarDespesa.vue'),
  meta: { requiresAuth: true },
},
{
  path: "/Despesas/Editar_Despesa/:id/:despesaId",
  name: "Editar Despesa",
  component: () => import('@/views/pages/despesas/views/editar/EditarDespesa.vue'),
  meta: { requiresAuth: true },
}]