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
    requestItem: (state) => (id) => {
      return state.requests.find(r=>r?.id === id)
    }
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
    },

    async getRequest({dispatch}, id) {
      try {
        const token = store.getters['auth/authToken']
        const {data} = await requestAxios.get(`/requests.json?auth=${token}`)

        if (id in data) {
          return ({id, ...data[id]})
        }
        return null

      } catch (e) {
        dispatch('setMessage', {
          type: 'danger',
          message: error(e?.response?.request?.statusText),
        }, {root: true})
      }
    },

    async removeRequest({dispatch}, id) {
      try {
        const token = store.getters['auth/authToken']
        await requestAxios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch('getRequests')
        dispatch('setMessage', {
          type: 'primary',
          message: 'Заявка удалена',
        }, {root: true})
      } catch(e) {
        dispatch('setMessage', {
          type: 'danger',
          message: error(e?.response?.request?.statusText),
        }, {root: true})
      }
    },

    async updateRequest({dispatch}, request) {
      try {
        const token = store.getters['auth/authToken']
        await requestAxios.put(`/requests/${request.id}.json?auth=${token}`, request)

        dispatch('setMessage', {
          type: 'primary',
          message: 'Заявка обновлена',
        }, {root: true})

      } catch(e) {
        dispatch('setMessage', {
          type: 'danger',
          message: error(e?.response?.request?.statusText),
        }, {root: true})
      }
    },
  }
}