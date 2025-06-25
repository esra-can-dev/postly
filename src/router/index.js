import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users',
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/users/:id',
      name: 'user-detail',
      component: () => import('../views/UserDetailView.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
})

export default router
