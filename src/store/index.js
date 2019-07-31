import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import admin from './modules/admin'
import activity from './modules/activity'
import project from './modules/project'
import referee from './modules/referee'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    admin,
    activity,
    project,
    referee
  },
  getters
})

export default store
