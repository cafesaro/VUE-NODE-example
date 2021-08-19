import Vue from 'vue'
import Vuex from 'vuex'
import clubs from '@/store/clubs/clubs'
import players from '@/store/players/players'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    clubs,
    players
  }
})
