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
    error: false
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
    addComment (state, payload) {
      const src = payload.src
      if (state.user.comments.findIndex(source => source === src) >= 0) {
        return null
      } else {
        state.user.comments.push(src)
        state.user.fbKeys[src.link] = payload.fbKey
      }
    },
    removeComment (state, payload) {
      const comments = state.user.comments
      comments.splice(comments.findIndex(source => source === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload.link)
    }
  },
  actions: {
    userProvider ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', false)
      firebase.auth().signInWithPopup(payload)
        .then(result => {
          // eslint-disable-next-line
          user => {
            commit('setLoading', false)
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
            commit('setLoading', false)
            commit('setError', error.message)
          }
        )
    },
    userAuto ({commit}, payload) {
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
    }
  }
})
