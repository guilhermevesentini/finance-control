export const cadastrosPaths = [{
  path: "/cadastros",
  name: "Cadastros",
  component: () => import('@/views/pages/cadastros/CadastrosPage.vue'),
  meta: { requiresAuth: true },
}]