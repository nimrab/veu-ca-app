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

    isAuthenticated(state,getters) {
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
    login({commit}, payload) {
      commit('setToken', payload)
    }
  }
}