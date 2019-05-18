import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  
  },
  state: {
    authUser: null,
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
    onUserAuth ({commit}) {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          commit('setAuthUser', { uid: user.uid, email: user.email })
        }
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
