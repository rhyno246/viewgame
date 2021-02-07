import Vue from 'vue'
import Vuex from 'vuex'
import gameMod from './game';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game  : gameMod,
  }
})
