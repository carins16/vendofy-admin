import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products
  },
  state: {
    authUser: JSON.parse(localStorage.getItem('auth')),
    authError: null
  },
  mutations: {
    setAuthUser (state, payload) {
      state.authUser = payload
    },
    setAuthError (state, payload) {
      state.authError = payload
    }
  },
  actions: {
    userAuth ({commit}, payload) {
      // authenticate the vending machine
      firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password
      ).then( res => {
        // store auth in localstorage
        localStorage.setItem('auth', JSON.stringify({ 
          id:     res.user.uid, 
          email:  res.user.email
        }))
      }).catch(err => {
        // set authentication error and return error message
        commit('setAuthError', err)
      })
    },
    onUserAuth ({commit, dispatch}) {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          commit('setAuthUser', { uid: user.uid, email: user.email })
          // fetch products
          dispatch('products/fetchProducts', null, { root: true })
        } else {
          // sign out user
          dispatch('unathenticate')
        }
      })
    },
    unathenticate ({commit}) {
      firebase.auth().signOut().then(() => {
        commit('setAuthUser', null)
        localStorage.removeItem('auth')
      }).catch(error => {
        console.log(error)
      })
    }
  },
  getters: {
    getAuthError: state => {
      return state.authError
    },
    getAuthUser: state => {
      return state.authUser
    }
  }
})
