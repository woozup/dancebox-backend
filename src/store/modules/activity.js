import { getToken } from '@/utils/auth'
import { create, getList } from '@/api/activity'
const activity = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    detail: {},
    showDetail: false
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SHOW_DETAIL: (state, status) => {
      state.showDetail = status
    }
  },
  actions: {
    async createActivity({ commit, state }, data) {
      return create(data)
    },
    async getActivityList({ commit, state }, data) {
      return getList(data)
    },
    async showDetail({ commit, state }, data) {

    }
  }
}

export default activity
