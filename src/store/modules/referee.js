import { getToken } from '@/utils/auth'
import { create, getRefereeDetail } from '@/api/referee'

const referee = {
  state: {
    token: getToken(),
    detail: { },
    showDetail: false
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SHOW_DETAIL: (state, status) => {
      state.showDetail = status
    },
    SET_DETAIL: (state, detail) => {
      state.detail = detail
    }
  },
  actions: {
    async createReferee({ commit, state }, data) {
      return create(data)
    },
    async getRefereeDetail({ commit, state }, id) {
      const detail = await getProjectDetail(id)
      commit('SET_DETAIL', detail)
    }
  }
}

export default referee
