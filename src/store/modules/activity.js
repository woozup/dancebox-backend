import { getToken } from '@/utils/auth'
import { create, getList, createGame, getDetail, createTeach } from '@/api/activity'
import { createCompetition, getCompetitionList, getCompetitionDetail } from '@/api/competition'
const activity = {
  state: {
    token: getToken(),
    detail: {
      game: {
        project: {
          table: []
        }
      },
      teach_info: {},
      activity: {}
    },
    showDetail: false,
    personal_list: [],
    competitions: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SHOW_DETAIL: (state, status) => {
      state.showDetail = status
    },
    SET_GUEST: (state, list) => {
      state.detail.game.guest = list
    },
    SET_ORG: (state, list) => {
      state.detail.game.organizer = list
    },
    SET_SPO: (state, list) => {
      state.detail.game.sponsor = list
    },
    SET_TEACHER: (state, list) => {
      state.detail.teach_info.teacher = list
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
    },
    SET_COMPETITIONS: (state, competitions) => {
      state.competitions = competitions
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
      const desc = window.tinymce.get('desc').getContent()
      // console.log(desc)
      return createGame({
        desc: desc,
        guest: state.detail.game.guest,
        project: state.detail.game.project,
        organizer: state.detail.game.organizer,
        sponsor: state.detail.game.sponsor,
        activity_id
      })
    },
    async createTeach({ commit, state }, { activity_id }) {
      return createTeach({
        desc: state.detail.teach_info.desc,
        location: state.detail.teach_info.location,
        time: state.detail.teach_info.time,
        teacher: state.detail.teach_info.teacher,
        activity_id
      })
    },
    async getCompetitions({ commit, state }, activity_id) {
      const competitions = await getCompetitionList(activity_id)
      commit('SET_COMPETITIONS', competitions)
    },
  }
}

export default activity
