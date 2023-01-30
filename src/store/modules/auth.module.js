import axios from 'axios'
import {error} from "@/utils/errors";

export default {
  namespaced: true, //чтобы сделать названия actions локальными, иначе можно из модуля случайно обратиться к глобальному экшену
  state() {
    return {
      token: localStorage.getItem('authToken'),
    }
  },

  getters: {
    authToken(state) {
      return state.token
    },

    isAuthenticated(state, getters) {
      return !!getters.authToken
    }
  },

  mutations: {
    setToken(state, tokenValue) {
      state.token = tokenValue
      localStorage.setItem('authToken', tokenValue)
    },
    resetToken(state) {
      state.token = null
      localStorage.removeItem('authToken')
    }
  },

  actions: {
    async login({commit}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const response = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', response.data.idToken)
      } catch (e) {
        commit('setMessage', error(e.response.data.error.message), {root: true})
        throw new Error()

      }
    }
  }
}