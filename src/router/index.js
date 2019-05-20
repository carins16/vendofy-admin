import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import AuthGuard from './auth-guard'
import SignIn from '@/views/Sign_in'
import Dashboard from '@/views/Dashboard'
import Products from '@/views/Products'
import Customers from '@/views/Customers'
import Sales from '@/views/Sales'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        if (store.getters.getAuthUser) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: AuthGuard
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        beforeEnter: AuthGuard
    },
    {
        path: '/customers',
        name: 'customers',
        component: Customers,
        beforeEnter: AuthGuard
    },
    {
        path: '/sales',
        name: 'sales',
        component: Sales,
        beforeEnter: AuthGuard
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        beforeEnter: AuthGuard
    },
  ]
})
