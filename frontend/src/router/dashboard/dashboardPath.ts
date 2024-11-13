export const dashboardPaths = [{
  path: "/dashboard",
  name: "Dashboard",
  component: () => import('@/views/dashboard/dashboardPage.vue'),
  meta: { requiresAuth: true },
}]