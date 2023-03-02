import store from '/src/store/index'
import requestAxios from '@/axios/request'
import {error} from '@/utils/errors';

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
      message: null,
    }
  },

  getters: {
    allRequests(state) {
      return state.requests
    },
  },

  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },

    addRequest(state, request) {
      state.requests.push(request)
    },

  },

  actions: {
      async createRequest({commit, dispatch}, payload) {
        try {
          const token = store.getters['auth/authToken']
          const {data} = await requestAxios.post(`/requests.json?auth=${token}`, payload)

          if (data) {
            commit('addRequest', {...payload, id: data.name})

            dispatch('setMessage', {
              type: 'primary',
              message: 'Заявка создана успешно',
            }, {root: true})
          }

        } catch(e) {
          console.log('ERROR', e)
          dispatch('setMessage', {
            type: 'danger',
            message: error(e?.response?.request?.statusText),
          }, {root: true})
        }
      },

    async getRequests({commit, dispatch}) {
        try {
          const token = store.getters['auth/authToken']
          const {data} = await requestAxios.get(`/requests.json?auth=${token}`)

          if (data) {
            const arrayData = Array.from(Object.entries(data), el => {
              return {
                id: el[0],
                ...el[1]
              }
            })

            commit('setRequests', arrayData)
          }

        } catch (e) {
          dispatch('setMessage', {
            type: 'danger',
            message: error(e?.response?.request?.statusText),
          }, {root: true})
        }
    }
  }
}