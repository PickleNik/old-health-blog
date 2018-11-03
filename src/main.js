// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import firebase from 'firebase/app'
import 'firebase/auth'

import Sharing from 'vue-social-sharing'

Vue.use(Sharing)

var Vue = require('vue');
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 333,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.use(Vuetify, {
  iconfont: 'fa'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC4_Eg8Rcx7PcVlw48YvV2Qc4YBZC6lEIE',
      authDomain: 'health-fair.firebaseapp.com',
      databaseURL: 'https://health-fair.firebaseio.com',
      projectId: 'health-fair',
      storageBucket: 'health-fair.appspot.com',
      messagingSenderId: '75866806330'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('userFetch', user)
      }
    })
  }
})
