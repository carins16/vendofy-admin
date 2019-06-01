import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './registerServiceWorker'
import firebase from 'firebase'
import VueHtmlToPaper from 'vue-html-to-paper'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'googleapis/vuetify.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

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

    firebase.firestore().settings({
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    })

    firebase.firestore().enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    })

    this.$store.dispatch('onUserAuth')
  }
}).$mount('#app')
