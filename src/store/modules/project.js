import { getToken } from '@/utils/auth'
import { create, getProjectDetail } from '@/api/project'

const project = {
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
    async createProject({ commit, state }, data) {
      return create(data)
    },
    async getProjectDetail({ commit, state }, id) {
      const detail = await getProjectDetail(id)
      commit('SET_DETAIL', detail)
    }
  }
}

export default project
