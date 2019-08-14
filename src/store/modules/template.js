import { getToken } from '@/utils/auth'
import { create, getTemplateDetail } from '@/api/template'

const template = {
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
    async createTemplate({ commit, state }, data) {
      return create(data)
    },
    async getTemplateDetail({ commit, state }, id) {
      const detail = await getProjectDetail(id)
      commit('SET_DETAIL', detail)
    }
  }
}

export default template
