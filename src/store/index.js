import {createStore, createLogger} from 'vuex'
import auth from './modules/auth.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
    }
  },
  getters: {},
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
    resetMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({state, commit}, payload) {
      commit('setMessage', payload)
      setTimeout(() => {
        commit('resetMessage')
      }, 5000)
    }
  },
  modules: {
    auth,
  }
})
