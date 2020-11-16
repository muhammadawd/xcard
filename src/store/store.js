import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);

import moduleAuth from './auth/moduleAuth.js'
import moduleCommon from './common/moduleCommon.js'
import moduleClient from './client/moduleClient.js'
import moduleRole from './role/moduleRole.js'
import moduleAdmin from './admin/moduleAdmin.js'
import moduleSocket from './socket/moduleSocket.js'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    moduleAuth: moduleAuth,
    moduleCommon: moduleCommon,
    moduleClient: moduleClient,
    moduleRole: moduleRole,
    moduleAdmin: moduleAdmin,
    moduleSocket: moduleSocket,
  },
  strict: process.env.NODE_ENV !== 'production'
})
