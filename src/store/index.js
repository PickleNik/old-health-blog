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
    userFetch ({commit}, payload) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + payload.id + '/comments/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let swappedPairs = {}
        let comments = []
        for (let key in dataPairs) {
          comments.push(dataPairs[key])
          dataPairs[key].todo = true
          swappedPairs[dataPairs[key].link] = key
        }
        const updatedUser = {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          comments: comments,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })

      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    userLogout ({commit}) {
      firebase.auth().signOut()
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
