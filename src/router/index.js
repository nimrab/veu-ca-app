import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/RequestView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue'),
    meta: {
      layout: 'auth',
      authRequired: false,
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {

    const isAuthRequired = to.meta.authRequired
    const isAuthenticated = !!store.getters["auth/isAuthenticated"]

    if (isAuthRequired && isAuthenticated) {
      next()
    } else if (isAuthRequired && !isAuthenticated) {
      next('/auth?message=auth')
    } else {
      next()
    }
  }
)

export default router
