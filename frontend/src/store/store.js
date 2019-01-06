import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default new Vuex.Store({
    state: {
        iduser: 'user1',
        type: 0,
        menuUser: [],
        menuStaff: [],
        iduser: '',
        userType: -1,
        listAccountUser: [],
        numAccountEliminate: "",
        listAccountTransfers: [],
        lenListAccountUser: 0,
        messageRequest: '',
        listTransactionHistory: [],
        numAccountHistory: "",
        listReceiver: [],
        url: 'http://localhost:3000/api/'
    },
    getters,
    mutations,
    actions
})