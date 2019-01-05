import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default new Vuex.Store({
    state: {
        iduser: 'user1',
        listAccountUser: [],
        numAccountEliminate: "",
        listAccountTransfers: [],
        lenListAccountUser: 0,
        messageRequest: '',
        listTransactionHistory: [],
        numAccountHistory: "",
        listReceiver: [],
    },
    getters,
    mutations,
    actions
})