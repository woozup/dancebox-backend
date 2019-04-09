import { getToken } from '@/utils/auth'
import { create, getList, createGame, getDetail } from '@/api/activity'
const activity = {
  state: {
    token: getToken(),
    detail: {
      game: {},
      activity: {}
    },
    showDetail: false,
    personal_list: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SHOW_DETAIL: (state, status) => {
      state.showDetail = status
    },
    SET_GUEST: (state, list) => {
      state.detail.guest = list
    },
    SET_TABLE: (state, project) => {
      state.detail.project = project
    },
    SET_ORGANIZER: (state, organizer) => {
      state.detail.organizer = organizer
    },
    SET_SPONSOR: (state, sponsor) => {
      state.detail.sponsor = sponsor
    },
    SET_DETAIL: (state, detail) => {
      state.detail = detail
    }
  },
  actions: {
    async createActivity({ commit, state }, data) {
      return create(data)
    },
    async getActivityList({ commit, state }, data) {
      return getList(data)
    },
    async getDetail({ commit, state }, id) {
      const detail = await getDetail(id)
      commit('SET_DETAIL', detail)
    },
    async createGame({ commit, state }, { activity_id }) {
      return createGame({
        desc: state.detail.desc,
        guest: state.detail.guest,
        project: state.detail.project,
        organizer: state.detail.organizer,
        sponsor: state.detail.sponsor,
        activity_id
      })
    }
  }
}

export default activity
