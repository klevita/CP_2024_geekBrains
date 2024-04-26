import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'User' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('pages/IndexPage.vue')
      }
    ]
  },
  {
    path: '',
    redirect: { name: 'User' },
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '/login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/MissingPage.vue')
      }
    ]
  }
]

export default routes
