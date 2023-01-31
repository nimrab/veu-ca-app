import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
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
  routes
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
