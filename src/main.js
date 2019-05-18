import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBf1VjLPZpSoptX4uT_6HmbwFfXIldNGIQ",
      authDomain: "vendofy.firebaseapp.com",
      databaseURL: "https://vendofy.firebaseio.com",
      projectId: "vendofy",
      storageBucket: "vendofy.appspot.com",
      messagingSenderId: "1051291964270",
      appId: "1:1051291964270:web:e5ebe328bf86d72c"
    })

    this.$store.dispatch('onUserAuth')
  }
}).$mount('#app')
