import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from './middleware/auth-middleware'

import NProgress from 'nprogress/nprogress.js'

// Main layout variations
import LayoutSimple from '@/layouts/variations/Simple.vue'
import LayoutBackend from '@/layouts/variations/Backend.vue'

// My Views
const Login = () => import('@/views/auth/LoginView.vue')
const Dashboard = () => import('@/views/pages/DashboardView.vue')
const Error404View = () => import('@/views/errors/Error404View.vue')

const PostIndexView = () => import('@/views/pages/post/indexView.vue')
const PostShowView = () => import('@/views/pages/post/showView.vue')

// Set all routes
const routes = [
  {
    path: '/',
    component: LayoutBackend,

    children: [
      {
        path: '',
        redirect: { name: 'dashboard' }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
    ]
  },

  {
    path: '/login',
    component: LayoutSimple,
    children: [
      {
        path: '',
        name: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/posts',
    component: LayoutBackend,
    children: [
      {
        path: '',
        name: 'posts.index',
        component: PostIndexView
      },
      {
        path: ':slug',
        name: 'posts.show',
        component: PostShowView,

      },
    ]
  },
  {
    // path: "*",
    path: '/:pathMatch(.*)*',
    name: 'error-404',
    component: Error404View
  }
]

// Create Router
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
  routes
})

router.beforeEach(authMiddleware)

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false })

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})
/*eslint-enable no-unused-vars*/

export default router
