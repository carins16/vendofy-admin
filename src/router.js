import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/views/Sign_in'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    }
  ]
})
