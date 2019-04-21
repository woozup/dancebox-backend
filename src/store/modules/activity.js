import { getToken } from '@/utils/auth'
import { create, getList, createGame, getDetail } from '@/api/activity'
const activity = {
  state: {
    token: getToken(),
    detail: {
      game: {
        project: {
          table: []
        }
      },
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
    SET_TABLE: (state, data) => {
      // console.log(state.detail.game.project.table)
      // state.detail.game.project.table.push(data)
      state.detail.game.project = data
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
        desc: state.detail.game.desc,
        guest: state.detail.game.guest,
        project: state.detail.game.project,
        organizer: state.detail.game.organizer,
        sponsor: state.detail.game.sponsor,
        activity_id
      })
    }
  }
}

export default activity
