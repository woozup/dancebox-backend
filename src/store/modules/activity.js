import { getToken } from '@/utils/auth'
import { create, getList } from '@/api/activity'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    async createActivity({ commit, state }, data) {
      return create(data)
    },
    async getActivityList({ commit, state }, data) {
      return getList(data)
    }
  }
}

export default user
