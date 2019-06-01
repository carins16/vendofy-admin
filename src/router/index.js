import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import AuthGuard from './auth-guard'
import SignIn from '@/views/Sign_in'
import Dashboard from '@/views/Dashboard'
import Products from '@/views/Products'
import Customers from '@/views/Customers'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/sign_in',
      name: 'VENDOFY',
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
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: AuthGuard
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        beforeEnter: AuthGuard
    },
    {
        path: '/customers',
        name: 'Customers',
        component: Customers,
        beforeEnter: AuthGuard
    },
    {
        path: '/sales',
        name: 'Sales',
        beforeEnter: AuthGuard
    }
  ]
})
