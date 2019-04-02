import { getToken } from '@/utils/auth'
import { create } from '@/api/activity'
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
    // 登出
    async createActivity({ commit, state }, data) {
      return create(data)
    }
  }
}

export default user
