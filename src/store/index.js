import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: false,
    comments: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setComments (state, payload) {
      state.comments = payload
    }
  },
  actions: {
    addComment ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('comments').push(payload)
      .then(
        commit('setLoading', false)
      )
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
        commit('setError', error)
      })
    },
    deleteComment ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('comments').orderByChild('text').equalTo(payload)
        .once('value').then(function (snapshot) {
          commit('setLoading', false)
          snapshot.forEach(function (childSnapshot) {
            // remove each child
            firebase.database().ref('comments').child(childSnapshot.key).remove()
          })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    getComments ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('comments').once('value')
      .then(data => {
        console.log(data.val())
        commit('setLoading', false)
        commit('setComments', data.val())
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
        commit('setError', error)
      })
    },
    userProvider ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithPopup(payload)
        .then(result => {
          commit('setLoading', false)
          // eslint-disable-next-line
          user => {
            const newUser = {
              id: user.uid,
              email: user.email,
              name: user.displayName,
              comments: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        })
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    userAuto ({commit}, payload) {
      commit('setLoading', false)
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        name: payload.displayName,
        photo: payload.photoURL,
        comments: [],
        fbKeys: {}
      })
    },
    userLogout ({commit}) {
      firebase.auth().signOut()
      commit('setLoading', false)
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    comments (state) {
      return state.comments
    }
  }
})
