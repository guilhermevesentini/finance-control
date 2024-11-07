export const dashboardPaths = [{
  path: "/dashboard",
  name: "Dashboard",
  component: () => import('@/views/pages/dashboard/dashboardPage.vue'),
  meta: { requiresAuth: true },
}]