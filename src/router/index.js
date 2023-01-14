import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../components/AuthView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: AuthView
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: '/'
    },
    {
      path: '/user-cabinet',
      name: 'user-cabinet',
      component: () => import('../components/UserCabinetView.vue')
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/PageNotFound.vue') 
    },
  ]
})

router.beforeEach((to, from, next) => {
  
  if ((to.name !== 'login' && to.name !== 'NotFound') && !localStorage.accessToken) next({ name: 'login' })
  else next()
})

export default router
